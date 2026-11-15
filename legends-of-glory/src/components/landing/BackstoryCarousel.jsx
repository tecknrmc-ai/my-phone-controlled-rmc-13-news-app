import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/ad3b13eaf_IMG_7054.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/31dddd748_IMG_7053.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/0719dc6bf_IMG_7056.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/34308dd96_IMG_7057.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/5735c2eb9_IMG_7058.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/f42dcd125_IMG_7055.jpg",
];

export default function BackstoryCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PHOTOS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c === 0 ? PHOTOS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c + 1) % PHOTOS.length);

  return (
    <section className="relative py-12 px-4 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
            border: "1px solid rgba(212, 160, 23, 0.4)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={PHOTOS[current]}
                alt={`Behind the scenes ${current + 1}`}
                className="w-full h-auto object-cover relative z-10"
                style={{ filter: "contrast(1.08) saturate(1.1) brightness(0.95)" }}
              />
              {/* Cinematic vignette — dark edges */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse 65% 55% at 50% 50%, transparent 0%, transparent 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.55) 100%)
                  `,
                }}
              />
              {/* Hard focus spotlight — center glow */}
              <div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse 30% 35% at 50% 45%, rgba(255,255,255,0.06) 0%, transparent 60%),
                    radial-gradient(ellipse 20% 25% at 50% 45%, rgba(212,160,23,0.04) 0%, transparent 50%)
                  `,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary hover:bg-black/70 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary hover:bg-black/70 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-primary scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
