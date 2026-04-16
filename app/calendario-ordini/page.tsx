import type { Metadata } from "next";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Check } from "lucide-react";
import { getGoogleSheetData } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Calendario Ordini — Biotre GAS Trento",
  description:
    "Calendario degli ordini del Gruppo di Acquisto Solidale Biotre. Consulta le date di apertura e chiusura degli ordini.",
};

async function getSheetData(): Promise<any[][] | null> {
  try {
    const rows = await getGoogleSheetData();
    return rows || null;
  } catch {
    return null;
  }
}

const MONTH_PREFIXES = [
  "gen",
  "feb",
  "mar",
  "apr",
  "mag",
  "giu",
  "lug",
  "ago",
  "set",
  "ott",
  "nov",
  "dic",
];

export default async function CalendarioOrdiniPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login?returnTo=/calendario-ordini");
  }

  const rows = await getSheetData();
  const rawHeaders = rows?.[0]?.map((h) => String(h).trim()) ?? [];
  const rawData = rows?.slice(1) ?? [];

  // Filtra headers e dati saltando la quinta colonna
  const headers = rawHeaders.filter((_, i) => i !== 4);
  const sanitizedData = rawData.map((row) =>
    headers.map((_, i) => String(row[i < 4 ? i : i + 1] ?? "").trim()),
  );

  return (
    <main className="flex flex-col w-full min-h-screen bg-bg">
      <section className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-8 md:gap-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-primary-dark font-bold tracking-tight">
            Calendario Ordini
          </h1>
          {!rows ? (
            <div className="bg-white p-8 rounded-2xl border border-error/20 flex flex-col items-center gap-4 text-center shadow-sm">
              <p className="text-lg text-error font-medium">
                Impossibile caricare i dati del calendario.
              </p>
              <p className="text-text-muted">
                Verifica la tua connessione o riprova più tardi.
              </p>
            </div>
          ) : rows.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-border flex flex-col items-center gap-4 text-center shadow-sm">
              <p className="text-xl text-text-muted font-serif italic">
                Nessun ordine presente al momento.
              </p>
            </div>
          ) : (
            <div className="w-full group">
              <div className="w-full overflow-auto rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-md duration-300">
                <div
                  className="min-w-fit grid"
                  style={{
                    gridTemplateColumns: headers
                      .map((h) =>
                        MONTH_PREFIXES.some((m) =>
                          h.toLowerCase().startsWith(m),
                        )
                          ? "40px"
                          : "minmax(150px, 1fr)",
                      )
                      .join(" "),
                  }}
                >
                  {/* Header */}
                  {headers.map((header, i) => {
                    const isMonth = MONTH_PREFIXES.some((m) =>
                      header.toLowerCase().startsWith(m),
                    );
                    return (
                      <div
                        key={`h-${i}`}
                        className={`py-3 ${isMonth ? "px-1" : "px-3"} font-serif font-semibold text-sm bg-primary-dark text-white border-b border-r border-white/10 flex items-center justify-center text-center`}
                      >
                        {header}
                      </div>
                    );
                  })}

                  {/* Body */}
                  {sanitizedData.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      const isMonth = MONTH_PREFIXES.some((m) =>
                        headers[colIndex].toLowerCase().startsWith(m),
                      );
                      const isChecked =
                        isMonth && cell.toUpperCase() === "TRUE";

                      return (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`
                            py-3 ${isMonth ? "px-1" : "px-3"} text-sm text-text-muted border-b border-r border-border/50 flex items-center 
                            ${colIndex === 0 ? "sticky left-0 z-10 font-medium text-primary " : isMonth ? "justify-center" : "justify-start"}
                            ${rowIndex % 2 !== 0 ? "bg-[#f2f0ea]" : "bg-white"}
                            group-hover/row:bg-primary/5 transition-colors duration-150
                          `}
                        >
                          {isChecked ? (
                            <Check className="w-5 h-5 text-success stroke-3" />
                          ) : isMonth ? (
                            ""
                          ) : (
                            cell
                          )}
                        </div>
                      );
                    }),
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 text-xs md:hidden text-text-muted italic px-2">
                <div className="w-10 h-1 bg-border rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-primary/30 animate-pulse" />
                </div>
                <span>Scorri lateralmente per i dettagli</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
