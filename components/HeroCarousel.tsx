"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/images/hero/Manifestazione.jpeg", alt: "Manifestazione Biotre" },
  { src: "/images/hero/Stand.jpeg", alt: "Stand Biotre" },
  { src: "/images/hero/Verdure.jpg", alt: "Verdure a Km 0" },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToIndex = (idx: number) => setCurrentIndex(idx);

  return (
    <div className="relative w-full aspect-square sm:aspect-video max-h-[600px] overflow-hidden rounded-2xl shadow-md group border border-border">
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full relative">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Overlay controls - fade in on hover */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={goToPrev}
          className="p-2 rounded-full bg-white/80 text-primary-dark hover:bg-white hover:scale-105 transition-all shadow-sm"
          aria-label="Immagine precedente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-white/80 text-primary-dark hover:bg-white hover:scale-105 transition-all shadow-sm"
          aria-label="Immagine successiva"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentIndex
                ? "bg-white scale-110 shadow-sm"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Vai all'immagine ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
