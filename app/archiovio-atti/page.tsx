import type { Metadata } from "next";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getFilesFromFolder, DriveFile } from "@/lib/drive";
import { FileText, ChevronRight, FileDown } from "lucide-react";
import ArchivioTabs from "@/components/ArchivioTabs";

export const metadata: Metadata = {
  title: "Archivio Atti — Biotre GAS Trento",
  description:
    "Archivio dei bilanci e dei verbali delle assemblee e del direttivo del Biotre GAS.",
};

export default async function ArchivioAttiPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login?returnTo=/archiovio-atti");
  }

  const { type = "bilanci" } = await searchParams;

  // Fetch all categories
  const [bilanci, assemblea, direttivo] = await Promise.all([
    getFilesFromFolder("/Archivio Atti/Bilanci"),
    getFilesFromFolder("/Archivio Atti/Verbali Assemblea"),
    getFilesFromFolder("/Archivio Atti/Verbali Direttivo"),
  ]);

  // Group by year
  const yearsSet = new Set<string>();
  [...bilanci, ...assemblea, ...direttivo].forEach((f) => {
    if (f.year) yearsSet.add(f.year);
  });

  const years = Array.from(yearsSet).sort((a, b) => b.localeCompare(a));

  const dataByYear = years.map((year) => ({
    year,
    bilanci: bilanci.filter((f) => f.year === year),
    assemblea: assemblea.filter((f) => f.year === year),
    direttivo: direttivo.filter((f) => f.year === year),
  }));

  const hasFiles =
    bilanci.length > 0 || assemblea.length > 0 || direttivo.length > 0;

  return (
    <main className="flex flex-col w-full min-h-screen bg-bg">
      <section className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-8 md:gap-11 fade-in">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-serif text-primary-dark font-bold tracking-tight">
              Archivio Atti
            </h1>
          </div>

          {!hasFiles ? (
            <div className="bg-white p-12 rounded-3xl border border-border flex flex-col items-center gap-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-bg flex items-center justify-center rounded-full">
                <FileText className="w-8 h-8 text-primary/40" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl text-primary-dark font-serif font-bold">
                  Nessun documento trovato
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table View (Visible from lg screen upwards) */}
              <div className="hidden lg:block w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-dark text-white font-serif">
                      <th className="py-4 px-6 text-left w-24 border-r border-white/10 italic">
                        Anno
                      </th>
                      <th className="py-4 px-6 text-left border-r border-white/10">
                        Bilanci
                      </th>
                      <th className="py-4 px-6 text-left border-r border-white/10">
                        Verbali Assemblea
                      </th>
                      <th className="py-4 px-6 text-left">Verbali Direttivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataByYear.map((row, i) => (
                      <tr
                        key={row.year}
                        className={`border-b border-border/50 hover:bg-primary/5 transition-colors duration-150 ${i % 2 !== 0 ? "bg-[#f2f0ea]/30" : "bg-white"}`}
                      >
                        <td className="py-6 px-6 font-serif font-bold text-primary-dark align-top border-r border-border/50 text-center">
                          {row.year}
                        </td>
                        <td className="py-6 px-6 align-top border-r border-border/50">
                          <FileList files={row.bilanci} />
                        </td>
                        <td className="py-6 px-6 align-top border-r border-border/50">
                          <FileList files={row.assemblea} />
                        </td>
                        <td className="py-6 px-6 align-top">
                          <FileList files={row.direttivo} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tabbed View (Visible up to lg screen) */}
              <div className="lg:hidden flex flex-col gap-6">
                <ArchivioTabs activeType={type} />

                <div className="flex flex-col gap-6">
                  {years.map((year) => {
                    const yearFiles =
                      type === "bilanci"
                        ? bilanci.filter((f) => f.year === year)
                        : type === "assemblea"
                          ? assemblea.filter((f) => f.year === year)
                          : direttivo.filter((f) => f.year === year);

                    if (yearFiles.length === 0) return null;

                    return (
                      <div
                        key={year}
                        className="bg-white rounded-xl border border-border p-5 shadow-sm"
                      >
                        <h3 className="text-xl font-serif font-bold text-primary-dark mb-4 pb-2 border-b border-border/50">
                          {year}
                        </h3>
                        <div className="flex flex-col gap-3">
                          {yearFiles.map((file) => (
                            <a
                              key={file.id}
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded-lg bg-bg hover:bg-primary/10 text-primary-dark transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-primary/60" />
                                <span className="text-sm font-medium line-clamp-1">
                                  {file.name}
                                </span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-text-muted group-hover:translate-x-1 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function FileList({ files }: { files: DriveFile[] }) {
  if (files.length === 0)
    return <span className="text-text-muted italic text-sm">Nessun file</span>;

  return (
    <ul className="flex flex-col gap-3">
      {files.map((file) => (
        <li key={file.id}>
          <a
            href={file.webViewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-2 text-sm text-text hover:text-primary-dark transition-colors"
          >
            <div className="mt-0.5 p-1 rounded bg-bg group-hover:bg-primary/10 transition-colors">
              <FileDown className="w-3.5 h-3.5 text-primary/70" />
            </div>
            <span className="flex-1 underline underline-offset-4 decoration-border group-hover:decoration-primary/30">
              {file.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
