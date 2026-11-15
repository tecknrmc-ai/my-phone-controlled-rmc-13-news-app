import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function FeaturedNewsCarousel() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  const load = async () => {
    try {
      const items = await base44.entities.FeaturedNews.list("order", 50);
      setCards((items || []).filter((c) => c.active !== false));
    } catch (e) {
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const unsub = base44.entities.FeaturedNews.subscribe(() => load());
    return unsub;
  }, []);

  const scrollRow = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector("div[data-card]");
    const step = card ? card.offsetWidth + 12 : 260;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!loading && cards.length === 0) return null;

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
        <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
          <Crown className="w-3 h-3" /> Featured News
        </p>
        <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
      </div>

      {loading ? (
        <div className="flex gap-3 px-9 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-shrink-0 rounded-sm bg-card/60 animate-pulse" style={{ width: "min(80vw, 260px)", height: "340px" }} />
          ))}
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => scrollRow(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollRow(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div
            ref={rowRef}
            className="flex gap-3 overflow-x-auto pb-3 px-9"
            style={{ scrollSnapType: "x proximity", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {cards.map((c, i) => {
              const inner = (
                <div
                  data-card
                  className="flex-shrink-0 relative rounded-sm overflow-hidden group"
                  style={{
                    width: "min(80vw, 260px)",
                    height: "340px",
                    scrollSnapAlign: "start",
                    border: "1px solid rgba(212,160,23,0.3)",
                    boxShadow: "0 0 24px rgba(0,0,0,0.7)",
                  }}
                >
                  <img
                    src={c.photo_url}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                    style={{ filter: "contrast(1.05) brightness(0.95)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-primary font-heading text-[9px] uppercase tracking-[0.3em] mb-1" style={{ textShadow: "0 0 10px rgba(212,160,23,0.6)" }}>
                      Featured
                    </p>
                    <h3 className="font-display text-lg md:text-xl uppercase tracking-tight font-bold text-white leading-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                      {c.title}
                    </h3>
                  </div>
                </div>
              );

              if (c.link) {
                return (
                  <a key={c.id || i} href={c.link} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                );
              }
              return <div key={c.id || i}>{inner}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}