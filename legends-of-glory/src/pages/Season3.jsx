import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Crown, Zap, Star, Diamond } from "lucide-react";

const LOGO_BANNER = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/ab5acaa43_IMG_3056.jpeg";

const CAST = [
  { name: "Teckn", role: "Executive Producer", photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/0c72b0023_IMG_2850.jpg" },
  { name: "Cash Champ", role: "Executive Producer", photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/f87e90b2f_IMG_9148.jpg" },
  { name: "Nef", role: "Executive Producer", photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/28359b6cf_IMG_9100.jpg" },
  { name: "Nicole", role: "Executive Producer", photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/9de8b0255_IMG_1448.jpg" },
];

const BACK_LOGO = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";

export default function Season3() {
  const rowRef = useRef(null);

  const scrollRow = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector("div[data-card]");
    const step = card ? card.offsetWidth + 12 : 220;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="bg-black text-foreground flex flex-col min-h-screen">
      {/* Back link */}
      <div className="px-4 pt-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-heading text-xs uppercase tracking-[0.2em]">
          <ChevronLeft className="w-4 h-4" /> Back to Seasons
        </Link>
      </div>

      {/* Logo banner header */}
      <section className="relative w-full overflow-hidden">
        <img src={LOGO_BANNER} alt="Legends of Glory 3 — Executive Producers Battle" className="w-full h-auto block object-cover" style={{ filter: "contrast(1.05) saturate(1.05)" }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* LIVE badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-sm"
          style={{ background: "linear-gradient(135deg,#D4A017,#A07800)", boxShadow: "0 0 20px rgba(212,160,23,0.7)" }}
        >
          <Zap className="w-3 h-3 text-black" fill="currentColor" />
          <span className="font-heading text-[10px] uppercase tracking-[0.3em] font-bold text-black">Live</span>
          <Star className="w-3 h-3 text-black" fill="currentColor" />
        </motion.div>

        {/* Title overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end text-center px-4 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <Star className="w-4 h-4 text-primary" />
            <Diamond className="w-4 h-4 text-primary" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight"
            style={{
              background: "linear-gradient(135deg,#FFF9C4 0%,#D4AF37 50%,#8B4513 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212,160,23,0.6)",
              filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.9))",
            }}
          >
            Legends of Glory 3
          </motion.h1>
          <p className="font-heading text-xs md:text-base uppercase tracking-[0.3em] text-primary mt-1" style={{ textShadow: "0 0 12px rgba(0,0,0,0.9)" }}>
            Executive Producers Battle
          </p>
        </div>
      </section>

      {/* Ribbon callout */}
      <div className="px-4 py-3">
        <div
          className="max-w-3xl mx-auto rounded-sm px-4 py-2 text-center"
          style={{ background: "#0A0A0A", border: "1px solid #D4AF37", boxShadow: "0 0 20px rgba(212,160,23,0.3)" }}
        >
          <p className="text-white/90 font-heading text-[10px] md:text-xs uppercase tracking-[0.2em]">
            streamers Series, only coming to Rmc streamers world and Cranez music distro
          </p>
        </div>
      </div>

      {/* Producer description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto px-4 py-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
            <Crown className="w-3 h-3" /> The Producers Battle
          </p>
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
        </div>
        <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed font-body">
          Executive producers Teckn, cash champ, Ned and I am Nicole battle head to head for executive producer position for season 3 glory. Each producer tells their producer story as they lead artist into the booth for song production. Battling out the position on the stage once again. Stay tuned season3 is in preproduction.
        </p>
      </motion.div>

      {/* Main cast one-row scroll carousel */}
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
            <Star className="w-3 h-3" /> Main Cast
          </p>
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
        </div>
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
            {CAST.map((c, i) => (
              <div
                key={i}
                data-card
                className="flex-shrink-0 relative rounded-sm overflow-hidden group"
                style={{ width: "200px", height: "280px", scrollSnapAlign: "start", border: "1px solid rgba(212,160,23,0.3)", boxShadow: "0 0 24px rgba(0,0,0,0.7)" }}
              >
                <img src={c.photo} alt={c.name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform group-hover:scale-105" style={{ filter: "contrast(1.05) brightness(0.95)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-primary font-heading text-[9px] uppercase tracking-[0.3em] mb-0.5" style={{ textShadow: "0 0 8px rgba(0,0,0,0.9)" }}>{c.role}</p>
                  <h3 className="font-display text-lg uppercase tracking-tight font-bold text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>{c.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-12 flex flex-col items-center pt-6">
        <img src={BACK_LOGO} alt="Legends of Glory" className="h-10 w-auto object-contain mb-3" style={{ filter: "brightness(1.2)" }} />
        <motion.p
          className="text-center text-white/30 text-[10px] font-heading uppercase tracking-widest"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Legends of Glory 3 — In Preproduction
        </motion.p>
      </div>
    </div>
  );
}
