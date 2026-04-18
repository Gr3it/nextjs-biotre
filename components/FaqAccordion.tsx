"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Iscrizione",
    question: "Qual è la quota associativa e quando posso iscrivermi?",
    answer:
      "La quota associativa annuale è di [X] euro. Le iscrizioni sono solitamente sempre aperte, ma consigliamo di contattarci per verificare eventuali periodi di inserimento facilitato per i nuovi soci.",
  },
  {
    category: "Gestione Ordini",
    question: "C'è un minimo d'ordine o una frequenza fissa?",
    answer:
      "Non c'è un minimo d'ordine obbligatorio per ogni socio. I listini dei vari prodotti (verdura, frutta, formaggi, ecc.) si aprono con frequenze diverse: alcuni sono settimanali, altri mensili o stagionali.",
  },
  {
    category: "Logistica dei Ritiri",
    question: "Dove e quando si ritira la spesa?",
    answer:
      "I ritiri avvengono presso i punti di distribuzione stabiliti a Trento Nord e Gardolo. Gli orari sono solitamente fissi per agevolare il lavoro del referente e dei soci volontari.",
  },
  {
    category: "Compiti del Socio",
    question: "Cosa devo fare oltre ad ordinare la spesa?",
    answer:
      "Essere soci di un GAS significa partecipare attivamente. È richiesto di contribuire alla vita dell'associazione, ad esempio aiutando nello smistamento dei prodotti o partecipando alle assemblee annuali.",
  },
  {
    category: "Comunicazioni",
    question: "Come vengono gestite le comunicazioni ufficiali?",
    answer:
      "Utilizziamo principalmente l'email per le comunicazioni formali e i listini. Per avvisi più veloci o coordinamento dei ritiri, utilizziamo gruppi dedicati su [WhatsApp/Telegram].",
  },
  {
    category: "Pagamenti",
    question: "Come si paga la merce?",
    answer:
      "Il pagamento avviene solitamente tramite [Bonifico/Borsellino virtuale/Contanti]. Ogni produttore può avere modalità specifiche che vengono indicate chiaramente al momento dell'ordine.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[800px] mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-border rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-bg-alt/50 transition-colors gap-4 cursor-pointer"
            aria-expanded={openIndex === index}
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
                {faq.category}
              </span>
              <span className="text-h3 font-serif text-primary-dark leading-tight">
                {faq.question}
              </span>
            </div>
            <div
              className={`shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary-dark transition-transform duration-300 ${
                openIndex === index ? "rotate-180 bg-primary/20" : ""
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-5 sm:p-6 pt-0 text-text border-t border-border/30 bg-bg-alt/20">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
