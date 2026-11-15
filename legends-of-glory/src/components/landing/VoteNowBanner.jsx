import React, { useState } from "react";
import { motion } from "framer-motion";
import CypherStoryPopup from "@/components/landing/CypherStoryPopup";

const BANNER_IMAGE = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c21fbd0c5_IMG_7190.png";

export default function VoteNowBanner() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Background image with dark overlay so text pops */}
      <div className="absolute inset-0">
        <img
          src={BANNER_IMAGE}
          alt=""
          className="w-full h-full object-cover object-top"
        />
        {/* Heavy dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[600px] md:min-h-[700px] flex flex-col py-8 px-4">
        {/* Top bar — RMC branding */}
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full mb-auto">
          <div className="flex items-center gap-4">
            <span className="font-heading text-white text-sm md:text-lg font-bold tracking-[0.1em]">RMC</span>
            <span className="font-heading text-white/80 text-xs md:text-sm tracking-[0.15em]">RMCUNSIGNED</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["BIZZYBAGZ", "HOTTUNEZ", "NEF", "KXNGD.O.P.E.", "COTTI"].map((name) => (
              <span key={name} className="font-heading text-white/70 text-xs tracking-[0.1em] hover:text-white cursor-pointer transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Center content */}
        <div className="max-w-7xl mx-auto w-full text-center my-auto py-12">
          {/* VOTE NOW!!! */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none mb-6"
            style={{ textShadow: "0 0 60px rgba(255,255,255,0.6), 0 0 120px rgba(255,255,255,0.3)" }}
          >
            VOTE NOW!!!
          </motion.h1>

          {/* Body text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white text-sm md:text-lg max-w-3xl mx-auto mb-6 font-heading uppercase tracking-[0.08em] leading-relaxed px-4"
          >
            RMCGLOBAL BRINGS TO YOU 5 UNDERGROUND ARTIST TO ONE RING TO SEE WHO HAS WHAT IT TAKES TO BE THE BEST ARTIST OF THE SEASON. STAY TUNED FOR THE OFFICIAL VIDEO.
          </motion.p>

          {/* ONLY ONE CAN WIN!!! */}
          <motion.p
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-10"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.5)" }}
          >
            ONLY ONE CAN WIN!!!
          </motion.p>

          {/* Vote CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            onClick={() => setOpen(true)}
            className="inline-block px-10 py-4 rounded-sm bg-primary text-primary-foreground font-display text-lg md:text-xl uppercase tracking-[0.15em] font-bold hover:bg-primary/90 transition-all animate-pulse-gold cursor-pointer border-0"
            style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.5), 0 0 80px rgba(212, 160, 23, 0.25)" }}
          >
            Cast Your Vote
          </motion.button>
        </div>
      </div>

      {/* Popup Modal */}
      <CypherStoryPopup open={open} onOpenChange={setOpen} />
    </section>
  );
}
