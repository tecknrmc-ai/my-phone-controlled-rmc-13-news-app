import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";

const FIGURES = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/134186e29_IMG_1344.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/776678b6f_IMG_1338.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/18dea22b0_IMG_1337.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/e315f3320_IMG_1341.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/cf0e03d3b_IMG_1348.jpg",
];

export default function GloryFigureCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % FIGURES.length), 3500);
    return () => clearInterval(timer);
  }, [paused]);

  const go = (n) => setIndex((i) => (n + FIGURES.length) % FIGURES.length);

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={index}
            src={FIGURES[index]}
            alt={`Glory Figure ${index + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.7)" }} />

        {/* Arrows */}
        <button
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {FIGURES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ${i === index ? "bg-primary w-4 h-1.5" : "bg-white/40 w-1.5 h-1.5"}`}
          />
        ))}
      </div>

      {/* Caption */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-sm bg-black/50 backdrop-blur-sm border border-primary/30">
        <Crown className="w-3 h-3 text-primary" />
        <span className="text-primary font-heading text-[9px] uppercase tracking-[0.3em]">
          Glory Figures
        </span>
      </div>
    </div>
  );
}
