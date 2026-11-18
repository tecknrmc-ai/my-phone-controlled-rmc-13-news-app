import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HONOR_PHOTOS = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/379c8f418_IMG_1151.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c0948b950_IMG_1139copy.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/27bff2815_IMG_9008.jpg",
];

const BANNER_PHOTO = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/3f98f22f0_IMG_1139copy.jpg";

const BTS_PHOTOS = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/0e2759262_IMG_8919.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/df2d5cca4_IMG_8914.jpg",
];

export default function HonoringNeeCole() {
  const [honorSlide, setHonorSlide] = useState(0);
  const [btsSlide, setBtsSlide] = useState(0);

  // Auto-advance carousels every 5 seconds
  useEffect(() => {
    const honorTimer = setInterval(() => {
      setHonorSlide((prev) => (prev + 1) % HONOR_PHOTOS.length);
    }, 5000);
    const btsTimer = setInterval(() => {
      setBtsSlide((prev) => (prev + 1) % BTS_PHOTOS.length);
    }, 5000);
    return () => {
      clearInterval(honorTimer);
      clearInterval(btsTimer);
    };
  }, []);

  const nextHonorSlide = () => setHonorSlide((prev) => (prev + 1) % HONOR_PHOTOS.length);
  const prevHonorSlide = () => setHonorSlide((prev) => (prev - 1 + HONOR_PHOTOS.length) % HONOR_PHOTOS.length);
  const nextBtsSlide = () => setBtsSlide((prev) => (prev + 1) % BTS_PHOTOS.length);
  const prevBtsSlide = () => setBtsSlide((prev) => (prev - 1 + BTS_PHOTOS.length) % BTS_PHOTOS.length);

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-card/95 via-background to-card/95 overflow-hidden">
      {/* Subtle glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8">
        {/* Text content at the top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center"
        >
          <p className="text-primary font-heading text-xs uppercase tracking-[0.3em] mb-2" style={{ textShadow: "0 0 20px rgba(212, 160, 23, 0.5)" }}>
            In Honor Of
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6"
            style={{
              background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212, 160, 23, 0.4)",
            }}
          >
            Honoring Nee'Cole
          </h2>
          <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed italic max-w-xl mx-auto">
            "Legends of Glory was originally an Mbrace modeling commercial, it turned out to be possibly one of the biggest battle cyphers the Inland Empire will ever see."
          </p>
          <div className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* Banner section below text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div
            className="relative w-full mx-auto"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
              border: "1px solid rgba(212, 160, 23, 0.4)",
              maxHeight: "200px",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `
                  radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.35) 100%),
                  radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212, 160, 23, 0.05) 0%, transparent 75%)
                `,
              }}
            />
            <img
              src={BANNER_PHOTO}
              alt="Honoring Nee'Cole - Legends of Glory"
              className="w-full h-full object-cover object-top"
              style={{
                filter: "contrast(1.15) saturate(1.2) brightness(0.95)",
              }}
            />
          </div>
        </motion.div>

        {/* Photo carousels below banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-row gap-4 justify-center"
        >
          {/* Honor carousel */}
          <div
            className="relative"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
              border: "1px solid rgba(212, 160, 23, 0.4)",
              width: "180px",
              height: "270px",
            }}
          >
            {/* Navigation arrows */}
            <button
              onClick={prevHonorSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextHonorSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={honorSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Lighter spotlight overlay for clarity */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `
                      radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.3) 100%),
                      radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212, 160, 23, 0.03) 0%, transparent 75%)
                    `,
                  }}
                />
                {/* Softer vignette */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `
                      radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, transparent 60%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0.45) 100%)
                    `,
                  }}
                />
                <img
                  src={HONOR_PHOTOS[honorSlide]}
                  alt={`Honoring Nee'Cole - Legends of Glory ${honorSlide + 1}`}
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: "contrast(1.18) saturate(1.25) brightness(0.97)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {HONOR_PHOTOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHonorSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === honorSlide ? "bg-primary w-4" : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* BTS carousel */}
          <div
            className="relative"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
              border: "1px solid rgba(212, 160, 23, 0.4)",
              width: "180px",
              height: "270px",
            }}
          >
            {/* Navigation arrows */}
            <button
              onClick={prevBtsSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextBtsSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={btsSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Lighter spotlight overlay for clarity */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `
                      radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.3) 100%),
                      radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212, 160, 23, 0.03) 0%, transparent 75%)
                    `,
                  }}
                />
                {/* Softer vignette */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `
                      radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, transparent 60%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0.45) 100%)
                    `,
                  }}
                />
                <img
                  src={BTS_PHOTOS[btsSlide]}
                  alt={`Behind The Scenes ${btsSlide + 1}`}
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: "contrast(1.18) saturate(1.25) brightness(0.97)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {BTS_PHOTOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setBtsSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === btsSlide ? "bg-primary w-4" : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
