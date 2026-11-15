import React from "react";
import { motion } from "framer-motion";

const PROMO_IMAGE = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/8e2119379_IMG_7054.jpg";

export default function PromoPhoto() {
  return (
    <section className="relative bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto px-4 py-6"
      >
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            borderRadius: "8px",
            boxShadow: "0 0 40px rgba(212, 160, 23, 0.25), 0 0 80px rgba(212, 160, 23, 0.1)",
            border: "1px solid rgba(212, 160, 23, 0.3)",
          }}
        >
          <img
            src={PROMO_IMAGE}
            alt="Legends of Glory Battle Cypher"
            className="w-full h-auto object-cover relative z-10"
            style={{ filter: "contrast(1.08) saturate(1.15) brightness(0.95)" }}
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
        </div>
      </motion.div>
    </section>
  );
}
