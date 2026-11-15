import React from "react";
import { motion } from "framer-motion";

const BANNER_IMG = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/d0b78101c_IMG_7031.jpg";

export default function MovieBanner() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "auto" }}>
      {/* Spotlight vignette overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.92) 100%)"
        }}
      />
      {/* Dark edges */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.95) 100%)"
        }}
      />

      {/* Main image — hard focus center */}
      <img
        src={BANNER_IMG}
        alt="Legends of Glory"
        className="w-full h-auto block"
        style={{ filter: "brightness(0.9) contrast(1.1) saturate(1.15)" }}
      />

      {/* Spotlight beam effect */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 50% 35%, rgba(212,160,23,0.08) 0%, transparent 70%)"
        }}
      />

      {/* Featured label */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 z-20 text-center"
      >
        <span className="inline-block border border-primary/60 text-primary font-heading text-[10px] uppercase tracking-[0.4em] px-4 py-1 bg-black/40 backdrop-blur-sm">
          ★ Now Featuring ★
        </span>
      </motion.div>

      {/* Bottom title text */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-10 text-center"
      >
        <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white drop-shadow-2xl"
          style={{ textShadow: "0 0 40px rgba(212,160,23,0.5), 0 2px 12px rgba(0,0,0,0.9)" }}
        >
          Legends of Glory
        </h1>
        <p className="text-primary font-heading text-xs md:text-sm uppercase tracking-[0.35em] mt-2 drop-shadow-lg">
          Battle Cypher · Season 1
        </p>
        <p className="text-white/60 text-xs font-heading uppercase tracking-widest mt-1">
          Presented by RMC Global
        </p>
      </motion.div>
    </div>
  );
}
