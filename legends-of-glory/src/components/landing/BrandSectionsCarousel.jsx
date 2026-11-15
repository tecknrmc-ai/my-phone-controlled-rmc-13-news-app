import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";

const SECTIONS = [
  {
    heading: "ABOUT GLORY",
    paragraphs: [
      "The legends of Glory battle cypher features 5 underground artist Bizzybaggz, Hottunez, Nef, KxngD.o.p.e. And Gotti, all artist from the Inland Empire. Each artist is put into the studio with former Lafilm student And rmc13 producers Teckn and Nee'Cole to record their unique verses in the same environment to see who can give off the best verse with the producer.",
      "After each artist finished their verse, Rmcglobal set up one of the biggest film sets the inland empire will ever see to showcase their actual performances and give a cinematic feel to the project. Stay tuned as we wrap up post production for our season one battle cypher.",
    ],
    image: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c6f90834c_IMG_1388.jpg",
  },
  {
    heading: "MBRACE",
    paragraphs: [
      "Legends of Glory started out as just an Mbrace modeling commercial for Nee'Coles modeling agency. Models from the Inland Empire were scouted hand picked and set on the center stage of the project bringing a major cinema feel to the battle cypher.",
    ],
    image: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/511ef4a8f_IMG_1393.jpg",
  },
  {
    heading: "RMCVFX",
    paragraphs: [
      "ALL post production and commercial visuals are done by RMCVFX AND Rmc13 productions to give the legends of glory a trans media feel and expert level energy for our fans. backstories and interviews with visual fx coming soon.",
    ],
    image: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/6dffc5770_IMG_1390.jpg",
  },
];

export default function BrandSectionsCarousel() {
  const rowRef = useRef(null);

  const scrollRow = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector("div[data-card]");
    const step = card ? card.offsetWidth + 16 : 600;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
        <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em]">
          The Brands
        </p>
        <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
      </div>
      <div className="relative">
        <button
          onClick={() => scrollRow(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollRow(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto pb-3 px-12"
          style={{
            scrollSnapType: "x proximity",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {SECTIONS.map((sec, i) => (
            <div
              key={i}
              data-card
              className="flex-shrink-0 rounded-sm overflow-hidden bg-white text-black"
              style={{
                width: "min(92vw, 880px)",
                scrollSnapAlign: "start",
                border: "1px solid rgba(212,160,23,0.3)",
                boxShadow: "0 0 24px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Left: text */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-black mb-3">
                    {sec.heading}
                  </h3>
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="text-black/80 text-xs md:text-sm leading-relaxed mb-3 font-body">
                      {p}
                    </p>
                  ))}
                  <div className="mt-auto pt-4">
                    <p className="font-heading text-xs font-bold uppercase tracking-wider text-black">
                      RMCGLOBAL
                    </p>
                    <p className="text-center text-[10px] text-black/70 font-heading uppercase tracking-wider mt-1">
                      Www.legendsofglory.online
                    </p>
                  </div>
                </div>
                {/* Right: visual */}
                <div className="md:w-[42%] flex flex-col bg-black">
                  <div className="flex justify-center items-center py-3 px-2 bg-black">
                    <img src={LOGO_URL} alt="Legends of Glory" className="h-12 w-auto object-contain" style={{ filter: "brightness(1.3)" }} />
                  </div>
                  <img
                    src={sec.image}
                    alt={sec.heading}
                    className="w-full h-full object-cover object-center"
                    style={{ minHeight: "180px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
