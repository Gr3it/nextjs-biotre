import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
      ?.replace(/\\n/g, "\n")
      .replace(/(^"|"$)/g, "")
      .replace(/(^'|'$)/g, ""),
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

export interface DriveFile {
  id: string;
  name: string;
  webViewLink: string;
  year: string;
}

async function getFolderId(
  name: string,
  parentId?: string,
): Promise<string | null> {
  let query = `name = '${name}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  if (parentId) {
    query += ` and '${parentId}' in parents`;
  }

  console.log(
    `[Drive] Searching for folder: "${name}" (Parent: ${parentId || "root"})`,
  );

  const res = await drive.files.list({
    q: query,
    fields: "files(id, name)",
    spaces: "drive",
  });

  const id = res.data.files?.[0]?.id || null;
  console.log(`[Drive] Result for "${name}": ${id || "NOT FOUND"}`);
  return id;
}

export async function getFilesFromFolder(path: string): Promise<DriveFile[]> {
  try {
    const parts = path.split("/").filter(Boolean);
    let parentId: string | undefined;

    // Check if we have a root folder ID in env to start from
    if (process.env.GOOGLE_DRIVE_ROOT_ID) {
      parentId = process.env.GOOGLE_DRIVE_ROOT_ID;
      console.log(`[Drive] Starting from ROOT_ID: ${parentId}`);
    } else if (
      process.env.GOOGLE_DRIVE_FOLDER_ID &&
      parts[0] === "Archivio Atti"
    ) {
      // If we are looking for the root archive and have an ID, use it
      parentId = process.env.GOOGLE_DRIVE_FOLDER_ID;
      parts.shift(); // Remove "Archivio Atti" from parts as we already have its ID
      console.log(`[Drive] Using GOOGLE_DRIVE_FOLDER_ID for base: ${parentId}`);
    }

    for (const part of parts) {
      const folderId = await getFolderId(part, parentId);
      if (!folderId) {
        console.error(`[Drive] Path part not found: ${part}`);
        // Fallback: try to find the folder anywhere if it's a specific category
        if (
          ["Bilanci", "Verbali Assemblea", "Verbali Direttivo"].includes(part)
        ) {
          console.log(`[Drive] Fallback search for "${part}" anywhere...`);
          const anywhereId = await getFolderId(part);
          if (anywhereId) {
            parentId = anywhereId;
            continue;
          }
        }
        return [];
      }
      parentId = folderId;
    }

    if (!parentId) return [];

    console.log(`[Drive] Listing files in folder ID: ${parentId}`);
    const res = await drive.files.list({
      q: `'${parentId}' in parents and trashed = false and mimeType = 'application/pdf'`,
      fields: "files(id, name, webViewLink, createdTime)",
      orderBy: "name desc",
    });

    console.log(`[Drive] Found ${res.data.files?.length || 0} files`);

    return (res.data.files || []).map((file) => {
      let year = "";
      const name = file.name || "";

      // Bilanci: anno_Bilancio (es: 2023_Bilancio)
      if (name.includes("_Bilancio")) {
        year = name.split("_")[0];
      }
      // Verbali: yyyy-mm-dd_Assemblea (es: 2024-03-12_Assemblea)
      else if (name.includes("_Assemblea") || name.includes("_Direttivo")) {
        const match = name.match(/^(\d{4})/);
        if (match) year = match[1];
      }

      return {
        id: file.id!,
        name: file.name!,
        webViewLink: file.webViewLink!,
        year,
      };
    });
  } catch (error) {
    console.error("[Drive] Error fetching files:", error);
    return [];
  }
}
