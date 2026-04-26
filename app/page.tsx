import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import FaqAccordion from "@/components/FaqAccordion";
import ProducersGrid from "@/components/ProducersGrid";
import { Heart, Leaf, Handshake, MapPin } from "lucide-react";
import { getGoogleSheetData } from "@/lib/sheets";

export const revalidate = 86400; // Cache for 24 hours

async function getProducersData() {
  try {
    const rows = await getGoogleSheetData("Sheet1!A1:C200");
    if (!rows || rows.length <= 1) return [];

    // Filter out rows where producer name is empty or looks like a header
    return rows
      .slice(1)
      .filter(
        (row) =>
          row[0] &&
          String(row[0]).trim() !== "" &&
          String(row[0]).toLowerCase() !== "produttore",
      )
      .map((row) => ({
        name: String(row[0]).trim(),
        products: String(row[1] || "").trim(),
        origin: String(row[2] || "").trim(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("[Producers] Error fetching data:", error);
    return [];
  }
}

export default async function Home() {
  const producers = await getProducersData();
  return (
    <div className="flex flex-col w-full">
      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-16 lg:py-24 px-4 sm:px-6 lg:px-12"
      >
        <div className="max-w-[1100px] w-full flex flex-col items-center gap-16 lg:gap-24">
          {/* Layout Split: Testo/CTA (Sinistra) - Logo (Destra) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Brand Anchor (Logo) - SOPRA su mobile */}
            <div className="flex justify-center lg:justify-end fade-in-delay-1 order-1 lg:order-2">
              <div className="relative w-full max-w-[400px] lg:max-w-[600px] group">
                <Image
                  src="/logo/LogoWithText.png"
                  alt="Biotre GAS Logo"
                  width={1080}
                  height={532}
                  className="object-contain w-full h-auto drop-shadow-sm"
                  priority
                  loading="eager"
                />
              </div>
            </div>

            {/* Messaggio Core & CTA - SOTTO su mobile */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left fade-in order-2 lg:order-1">
              <h1 className="sr-only">Biotre GAS Trento</h1>

              <h2 className="text-h1 lg:text-display font-serif text-primary-dark leading-[1.15] mb-6">
                Più di una spesa, <br className="hidden md:block" /> un patto
                con la terra.
              </h2>

              <p className="text-h3 text-text-muted font-serif font-medium tracking-wide max-w-[550px]">
                Acquisto critico, a km 0 e biologico{" "}
                <br className="hidden sm:block" /> nel territorio di Trento.
              </p>

              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                <a
                  href="#pilastri"
                  className="px-8 py-4 bg-primary text-white rounded-full font-medium shadow-md hover:bg-primary-dark transition-all"
                >
                  Scopri i nostri valori
                </a>
                <a
                  href="#come-funziona"
                  className="px-8 py-4 bg-white text-primary border border-primary/20 rounded-full font-medium shadow-sm hover:border-primary hover:bg-bg-alt transition-all"
                >
                  Come funziona
                </a>
              </div>
            </div>
          </div>

          {/* Carousel Sottostante */}
          <div className="w-full max-w-[1100px] mx-auto fade-in-delay-2 relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-border/60"></div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                La nostra realtà
              </span>
              <div className="h-px flex-1 bg-border/60"></div>
            </div>
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* ================= I PILASTRI SECTION ================= */}
      <section
        id="pilastri"
        className="w-full bg-bg-alt py-16 lg:py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-4 max-w-[800px] mx-auto">
            <h2 className="text-h2 font-serif text-primary-dark">
              I pilastri del nostro GAS
            </h2>
            <p className="text-body text-text-muted">
              Non è solo un modo per fare la spesa, ma un modello di consumo
              critico basato sulla relazione, la salute e il rispetto
              dell'ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Qualità */}
            <div className="bg-white p-8 rounded-3xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-h3 font-serif text-primary-dark">
                Qualità e Salute
              </h3>
              <p className="text-small text-text-muted">
                Scegliamo prodotti biologici e biodinamici, privi di trattamenti
                chimici, per garantire un'alimentazione sana e naturale.
              </p>
            </div>

            {/* Card 2: Sostenibilità */}
            <div className="bg-white p-8 rounded-3xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-h3 font-serif text-primary-dark">
                Sostenibilità
              </h3>
              <p className="text-small text-text-muted">
                Proteggiamo il terreno, le falde acquifere e la biodiversità
                sostenendo metodi di coltivazione rispettosi dei cicli della
                natura.
              </p>
            </div>

            {/* Card 3: Etica */}
            <div className="bg-white p-8 rounded-3xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-h3 font-serif text-primary-dark">
                Etica e Solidarietà
              </h3>
              <p className="text-small text-text-muted">
                Garantiamo al produttore un prezzo giusto e sosteniamo il lavoro
                dignitoso, eliminando gli intermediari speculativi.
              </p>
            </div>

            {/* Card 4: Filiera Corta */}
            <div className="bg-white p-8 rounded-3xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-h3 font-serif text-primary-dark">
                Filiera Corta
              </h3>
              <p className="text-small text-text-muted">
                Privilegiamo produttori locali per ridurre l'impatto ambientale
                dei trasporti e sostenere l'economia del territorio trentino.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. CHI SIAMO (Identità) ================= */}
      <section
        id="chi-siamo"
        className="w-full bg-bg py-16 lg:py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <h2 className="text-h2 font-serif text-primary-dark">Chi siamo</h2>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1 bg-primary-light/20 text-primary-dark font-medium rounded-full border border-primary-light/30 text-xs">
                km 0
              </span>
              <span className="px-4 py-1 bg-primary-light/20 text-primary-dark font-medium rounded-full border border-primary-light/30 text-xs">
                biologico
              </span>
            </div>

            <div className="flex flex-col gap-4 text-body text-text max-w-[65ch]">
              <p>
                Per capire chi siamo, bisogna partire dal “giardino di Roberta”.
                Roberta è una delle socie fondatrici del gruppo e nel suo
                giardino c’è una “cassa” dalla quale i soci ritirano i prodotti
                che hanno ordinato.
              </p>
              <p>
                Il “via vai” che si forma e l’incontro dei soci creano
                affiatamento e gruppo. Ognuno dei soci ha un “compito” ben
                preciso: questo è l’unico modo perché l’Associazione possa
                esistere.
              </p>
              <p>
                I prodotti vengono ordinati direttamente dal produttore che deve
                essere possibilmente piccolo, biologico e il più vicino
                possibile ai soci. Vogliamo andare oltre al semplice acquisto,
                cercando di sviluppare un consumo critico e promuovendo il
                rispetto delle risorse naturali, dei saperi e delle tradizioni.
              </p>
            </div>
          </div>

          <div className="w-full relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg border border-border order-1 lg:order-2">
            <Image
              src="/images/Members.jpg"
              alt="I soci di Biotre GAS Trento"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= 3. TERRITORIO (Vicinanza) ================= */}
      <section
        id="territorio"
        className="w-full bg-bg-alt py-16 lg:py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-1 lg:order-1 bg-bg-alt p-10 lg:p-16 rounded-3xl border border-border flex flex-col items-center text-center gap-6 shadow-sm">
            <div className="w-20 h-20 bg-primary-dark rounded-full flex items-center justify-center text-white shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-h3 font-serif text-primary-dark mb-2">
                Zona di riferimento
              </h3>
              <p className="text-h3 text-text-muted">Trento Nord & Gardolo</p>
            </div>
            <div className="w-full h-px bg-border/60"></div>
            <p className="text-small italic text-text-muted max-w-[40ch]">
              "La filiera corta richiede un impegno comune per ridurre
              l'inquinamento e valorizzare il legame sociale del territorio."
            </p>
          </div>

          <div className="order-2 lg:order-2 flex flex-col gap-6">
            <h2 className="text-h2 font-serif text-primary-dark">
              Il valore della vicinanza
            </h2>

            <div className="flex flex-col gap-4 text-body text-text max-w-[65ch]">
              <p>
                Per garantire che il beneficio ecologico dell'acquisto
                collettivo non venga disperso, operiamo principalmente nella
                zona che abbraccia <strong>Trento Nord e Gardolo</strong>.
              </p>
              <p>
                Mantenere le distanze ridotte ci permette di abbattere le
                emissioni di CO2 e ottimizzare il tempo dedicato al ritiro,
                rafforzando il legame con il nostro territorio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. COME FUNZIONA (Azione) ================= */}
      <section
        id="come-funziona"
        className="w-full bg-bg py-16 lg:py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-h2 font-serif text-primary-dark">
              L'impegno del socio
            </h2>
            <p className="text-body text-text-muted max-w-[700px]">
              Il cuore del GAS è la partecipazione attiva. Qui non ci sono
              "clienti", ma soci che collaborano per far funzionare
              l'associazione.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mt-8">
            <div className="flex flex-col items-center text-center gap-6 group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-dark font-serif text-2xl font-bold border border-border group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                1
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-h4 text-primary-dark">La Programmazione</h4>
                <p className="text-small text-text-muted max-w-[35ch]">
                  A differenza del supermercato, il GAS richiede di pianificare
                  i propri consumi in base ai calendari di consegna stagionali.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-6 group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-dark font-serif text-2xl font-bold border border-border group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                2
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-h4 text-primary-dark">
                  Il ruolo del Referente
                </h4>
                <p className="text-small text-text-muted max-w-[35ch]">
                  Puoi gestire il rapporto con un produttore: raccogli gli
                  ordini, ricevi la merce e coordina il ritiro con gli altri
                  soci.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-6 group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-dark font-serif text-2xl font-bold border border-border group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                3
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-h4 text-primary-dark">La Fiducia</h4>
                <p className="text-small text-text-muted max-w-[35ch]">
                  Scegliamo i fornitori tramite visite dirette in azienda, per
                  conoscere di persona chi produce il nostro cibo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4.5 PRODUTTORI (Data from Sheets) ================= */}
      <section
        id="produttori"
        className="w-full bg-bg-alt py-16 lg:py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-h2 font-serif text-primary-dark">
              I nostri Produttori
            </h2>
            <p className="text-body text-text-muted max-w-[700px]">
              Il legame diretto con chi coltiva e produce è alla base della
              nostra fiducia. Ecco i partner che rendono possibile la nostra
              spesa etica e di qualità.
            </p>
          </div>

          <ProducersGrid producers={producers} />
        </div>
      </section>

      {/* ================= 5. DOMANDE E CURIOSITÀ ================= */}
      <section
        id="faq"
        className="w-full bg-bg py-16 lg:py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-12 sm:gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-h2 font-serif text-primary-dark">
              Domande e curiosità
            </h2>
            <p className="text-body text-text-muted max-w-[600px]">
              Tutto quello che c'è da sapere per partecipare serenamente alla
              vita del nostro gruppo di acquisto.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* ================= 6. CONTATTI ================= */}
      <section
        id="contatti"
        className="w-full bg-bg-alt py-16 lg:py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20"
      >
        <div className="max-w-[800px] mx-auto w-full flex flex-col items-center text-center gap-8 bg-white p-10 sm:p-14 lg:p-16 rounded-3xl shadow-sm border border-border">
          <h2 className="text-h2 font-serif text-primary-dark">
            Vuoi saperne di più?
          </h2>

          <p className="text-body text-text max-w-[65ch]">
            Se sei interessato a conoscere la nostra associazione o vuoi
            partecipare alle nostre attività, scrivici. Riceverai tutte le
            informazioni per diventare un "Gasista".
          </p>

          <a
            href="mailto:info@biotre-tn.it"
            className="mt-2 inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-md"
          >
            Invia un'email a info@biotre-tn.it
          </a>
        </div>
      </section>
    </div>
  );
}
