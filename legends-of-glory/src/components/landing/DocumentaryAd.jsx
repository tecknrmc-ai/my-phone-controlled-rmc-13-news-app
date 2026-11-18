import React from "react";
import { motion } from "framer-motion";

const AD_IMAGE = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/de02b89ee_IMG_8829.png";

export default function DocumentaryAd() {
  return (
    <section className="relative bg-black py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto"
      >
        <p
          className="text-center font-heading text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground/50 mb-4"
        >
          Sponsored
        </p>
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            borderRadius: "8px",
            boxShadow: "0 0 50px rgba(212, 160, 23, 0.3), 0 0 100px rgba(212, 160, 23, 0.1)",
            border: "1px solid rgba(212, 160, 23, 0.35)",
          }}
        >
          <img
            src={AD_IMAGE}
            alt="The Documentary of Glory — Coming Soon"
            className="w-full h-auto object-cover relative z-10"
            style={{ filter: "contrast(1.08) saturate(1.1) brightness(0.95)" }}
          />
          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 65% 55% at 50% 50%, transparent 0%, transparent 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.5) 100%)
              `,
            }}
          />
          {/* Spotlight */}
          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 30% 35% at 50% 45%, rgba(255,255,255,0.05) 0%, transparent 60%),
                radial-gradient(ellipse 20% 25% at 50% 45%, rgba(212,160,23,0.04) 0%, transparent 50%)
              `,
            }}
          />
        </div>
        <div className="text-center mt-5">
          <p
            className="font-display text-xl md:text-2xl uppercase tracking-[0.15em]"
            style={{
              background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(212, 160, 23, 0.5)",
            }}
          >
            Documentary Coming Soon
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2 font-heading uppercase tracking-[0.2em]">
            An RMC Global Production
          </p>
        </div>
      </motion.div>
    </section>
  );
}
