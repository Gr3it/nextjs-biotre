"use client";

import { useState } from "react";
import { ChevronDown, Store, MapPin } from "lucide-react";

interface Producer {
  name: string;
  products: string;
  origin?: string;
}

interface ProducersGridProps {
  producers: Producer[];
}

export default function ProducersGrid({ producers }: ProducersGridProps) {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 12;
  const displayedProducers = showAll
    ? producers
    : producers.slice(0, initialCount);

  if (producers.length === 0) return null;

  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {displayedProducers.map((producer, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-2xl border border-border/50 shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Store className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-serif font-bold text-primary-dark">
                  {producer.name}
                </h3>
                <p className="text-small text-text-muted leading-relaxed">
                  {producer.products}
                </p>
              </div>
            </div>
            {producer.origin && (
              <div className="flex items-center gap-2 mt-3 text-primary/70">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider truncate">
                  {producer.origin}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {producers.length > initialCount && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="group flex items-center gap-2 px-8 py-3 bg-white border border-border rounded-full text-primary-dark font-medium shadow-xs hover:bg-bg-alt hover:border-primary/30 transition-all duration-300 cursor-pointer"
        >
          <span>
            {showAll
              ? "Mostra meno"
              : `Vedi tutti i ${producers.length} produttori`}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              showAll ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
}
