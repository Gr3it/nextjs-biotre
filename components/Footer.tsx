import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-bg-dark text-white/90 px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-sm md:text-base">
          {/* Column 1: Info & Logo */}
          <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <Link href="/">
              <Image
                src="/logo/LogoWithText.png"
                alt="Biotre GAS Logo"
                width={1080}
                height={532}
                className="object-contain w-auto h-20 opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="flex flex-col gap-1 text-white/70">
              <p>© 2026 — Biotre GAS Trento</p>
              <p className="text-xs mt-1">
                Acquisto critico, a km 0 e biologico.
              </p>
              <p className="text-xs mt-2 text-white/40 flex items-center justify-center md:justify-start gap-1.5 font-light">
                Sito creato da{" "}
                <a
                  href="https://emanuelezini.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors inline-flex items-center gap-1 group text-white/60 hover:text-primary-light"
                >
                  <span className="underline underline-offset-4 decoration-white/10 group-hover:decoration-primary-light transition-colors font-medium">
                    Emanuele Zini
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Documenti */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="font-serif text-lg font-semibold text-white">
              Documenti
            </h4>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              <a
                href="/documents/regolamento.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-light transition-colors"
                download
              >
                Regolamento (PDF)
              </a>
              <a
                href="/documents/statuto.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-light transition-colors"
                download
              >
                Statuto (PDF)
              </a>
              <a
                href="/documents/modulo-iscrizione.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-light transition-colors"
                download
              >
                Modulo iscrizione (PDF)
              </a>
            </nav>
          </div>

          {/* Column 3: Link Rapidi */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="font-serif text-lg font-semibold text-white">
              Link Rapidi
            </h4>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              <a
                href="http://www.agora-gas.it/gas/ag3_biotre/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary-light transition-colors"
              >
                Gestionale Ordini <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="http://webmail.biotre-tn.it/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary-light transition-colors"
              >
                Webmail <ExternalLink className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
