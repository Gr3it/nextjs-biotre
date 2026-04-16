import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-12"
      >
        <div className="max-w-[1200px] w-full flex flex-col items-center gap-10 lg:gap-14">
          {/* Logo & Tagline (Animati) */}
          <div className="flex flex-col items-center text-center fade-in">
            <h1 className="sr-only">Biotre GAS Trento</h1>
            <Image
              src="/logo/LogoWithText.png"
              alt="Biotre GAS Logo"
              width={1080}
              height={532}
              className="object-contain w-[260px] sm:w-[380px] md:w-[480px] h-auto drop-shadow-sm"
              priority
            />
            <p className="mt-8 text-xl sm:text-2xl text-text-muted font-serif font-medium tracking-wide">
              Acquisto critico, a km 0 e biologico.
            </p>
          </div>

          {/* Carosello Immagini */}
          <div className="w-full w-max-[1000px] mx-auto fade-in-delay-1 relative z-10">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* ================= CHI SIAMO SECTION ================= */}
      <section
        id="chi-siamo"
        className="w-full bg-bg-alt py-20 lg:py-32 px-4 sm:px-6 lg:px-12"
      >
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <h2 className="text-h2 font-serif text-primary-dark">Chi siamo</h2>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-primary-light/20 text-primary-dark font-medium rounded-full border border-primary-light/30 text-sm">
                km 0
              </span>
              <span className="px-4 py-1.5 bg-primary-light/20 text-primary-dark font-medium rounded-full border border-primary-light/30 text-sm">
                biologico
              </span>
            </div>

            <div className="flex flex-col gap-4 text-body text-text/90 leading-relaxed">
              <p>
                Per capire chi siamo, bisogna partire dal “giardino di Roberta”.
                Roberta è una delle socie fondatrici del gruppo e nel suo
                giardino c’è una “cassa” dalla quale i soci ritirano i prodotti
                che hanno ordinato. Il “via vai” che si forma e l’incontro dei
                soci, creano affiatamento e gruppo. Ma non è solo lei che
                distribuisce i prodotti ordinati, ognuno dei soci fa da punto di
                arrivo e distribuzione della merce e ciascuno ha un “compito”
                ben preciso, questo è l’unico modo perché l’Associazione possa
                esistere.
              </p>
              <p>
                I prodotti vengono ordinati direttamente dal produttore che deve
                essere possibilmente piccolo, biologico e il più vicino
                possibile ai soci.
              </p>
              <p>
                In particolare “Biotre” nasce da una precedente esperienza, ma
                questo “via e vai” di incontri e distribuzione, hanno portato
                alla nascita di un nuovo gruppo, che vuole andare un po’ oltre
                al semplice acquisto, cercando di sviluppare un consumo critico
                e promuovendo l’attenzione ed il rispetto delle risorse
                naturali, dei saperi e delle tradizioni.
              </p>
            </div>
          </div>

          <div className="w-full relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-border/50 order-1 lg:order-2">
            <Image
              src="/images/Members.jpeg"
              alt="I soci di Biotre GAS Trento"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= CONTATTI SECTION ================= */}
      <section
        id="contatti"
        className="w-full bg-bg py-20 lg:py-32 px-4 sm:px-6 lg:px-12"
      >
        <div className="max-w-[800px] mx-auto w-full flex flex-col items-center text-center gap-8 bg-white p-10 sm:p-14 lg:p-16 rounded-3xl shadow-sm border border-border/50">
          <h2 className="text-h2 font-serif text-primary-dark">Contatti</h2>

          <p className="text-lg text-text/90 leading-relaxed max-w-[600px]">
            Se sei interessato a conoscere la nostra associazione scrivi a{" "}
            <strong>info@biotre-tn.it</strong>, riceverai tutte le informazioni
            di cui hai bisogno.
          </p>

          <a
            href="mailto:info@biotre-tn.it"
            className="mt-2 inline-flex items-center justify-center px-8 py-3 bg-transparent text-primary border-2px border-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02]"
          >
            Invia un'email
          </a>
        </div>
      </section>
    </div>
  );
}
