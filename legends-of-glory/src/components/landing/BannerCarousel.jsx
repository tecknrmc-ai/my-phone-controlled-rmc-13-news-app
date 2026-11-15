import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BANNER_IMG = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/d0b78101c_IMG_7031.jpg";
const CINEMATIC_PHOTO = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/4163690de_IMG_4232.jpg";
const MANNY_VIDEO = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/df73cd98d_IMG_5683.mov";
const NEW_VIDEO = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/dfedf25c2_RecordIt-1771812791.mov";

const slides = [
  {
    type: "image",
    src: BANNER_IMG,
    label: "★ Now Featuring ★",
    title: "Legends of Glory",
    subtitle: "Battle Cypher · Season 1",
    meta: "Presented by RMC Global",
  },
  {
    type: "image",
    src: CINEMATIC_PHOTO,
    label: "★ Inland Empire ★",
    title: "The inland empire constructs an extremely lucrative project for San Bernardino California",
    subtitle: null,
    meta: null,
  },
  {
    type: "video",
    src: MANNY_VIDEO,
    label: null,
    title: "Manny from 713 Masters Legends of Glory in Houston",
    subtitle: null,
    meta: null,
  },
  {
    type: "video",
    src: NEW_VIDEO,
    label: null,
    title: null,
    subtitle: null,
    meta: null,
  },
];

const INTERVAL_MS = 5000;

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
      {/* Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.92) 100%)" }}
      />
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.95) 100%)" }}
      />
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 50% at 50% 35%, rgba(212,160,23,0.08) 0%, transparent 70%)" }}
      />

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {slide.type === "image" ? (
            <img
              src={slide.src}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.9) contrast(1.1) saturate(1.15)" }}
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.88) contrast(1.08) saturate(1.1)" }}
            >
              <source src={slide.src} type="video/quicktime" />
              <source src={slide.src} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Top label */}
      {slide.label && (
        <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-20 text-center">
          <span className="inline-block border border-primary/60 text-primary font-heading text-[10px] uppercase tracking-[0.4em] px-4 py-1 bg-black/40 backdrop-blur-sm">
            {slide.label}
          </span>
        </div>
      )}

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6 md:pb-10 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="font-display text-2xl md:text-5xl font-bold uppercase tracking-tight text-white drop-shadow-2xl"
              style={{ textShadow: "0 0 40px rgba(212,160,23,0.5), 0 2px 12px rgba(0,0,0,0.9)" }}
            >
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-primary font-heading text-xs md:text-sm uppercase tracking-[0.35em] mt-2 drop-shadow-lg">
                {slide.subtitle}
              </p>
            )}
            {slide.meta && (
              <p className="text-white/60 text-xs font-heading uppercase tracking-widest mt-1">
                {slide.meta}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-4" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
