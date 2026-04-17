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



  const res = await drive.files.list({
    q: query,
    fields: "files(id, name)",
    spaces: "drive",
  });

  const id = res.data.files?.[0]?.id || null;
  return id;
}

export async function getFilesFromFolder(path: string): Promise<DriveFile[]> {
  try {
    const parts = path.split("/").filter(Boolean);
    let parentId: string | undefined;

    // Check if we have a root folder ID in env to start from
    if (process.env.GOOGLE_DRIVE_ROOT_ID) {
      parentId = process.env.GOOGLE_DRIVE_ROOT_ID;
    } else if (
      process.env.GOOGLE_DRIVE_FOLDER_ID &&
      parts[0] === "Archivio Atti"
    ) {
      // If we are looking for the root archive and have an ID, use it
      parentId = process.env.GOOGLE_DRIVE_FOLDER_ID;
      parts.shift(); // Remove "Archivio Atti" from parts as we already have its ID
    }

    for (const part of parts) {
      const folderId = await getFolderId(part, parentId);
      if (!folderId) {
        // Fallback: try to find the folder anywhere if it's a specific category
        if (
          ["Bilanci", "Verbali Assemblea", "Verbali Direttivo"].includes(part)
        ) {
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

    const res = await drive.files.list({
      q: `'${parentId}' in parents and trashed = false and mimeType = 'application/pdf'`,
      fields: "files(id, name, webViewLink, createdTime)",
      orderBy: "name desc",
    });

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
  } catch {
    return [];
  }
}
