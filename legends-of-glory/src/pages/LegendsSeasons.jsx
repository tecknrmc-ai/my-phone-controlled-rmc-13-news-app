import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SeasonHubCard from "../components/landing/SeasonHubCard";
import FeaturedNewsCarousel from "../components/landing/FeaturedNewsCarousel";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";

const S1_POSTER = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/de02b89ee_IMG_8829.png";
const S2_POSTER = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/7dbcc976d_IMG_3059.jpeg";
const S3_POSTER = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/ab5acaa43_IMG_3056.jpeg";

const CAROUSEL_POSTERS = [
  { src: S1_POSTER, label: "Season 1" },
  { src: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/1657e47a1_IMG_7033.jpg", label: "The Cypher" },
  { src: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c21fbd0c5_IMG_7190.png", label: "Vote Now" },
  { src: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/d0b78101c_IMG_7031.jpg", label: "Sneak Peek" },
  { src: S2_POSTER, label: "Season 2" },
  { src: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/5c7ed6766_IMG_9571.jpg", label: "Commercials" },
  { src: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/b473f4856_IMG_7054.jpg", label: "The Team" },
  { src: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/fd0b4405c_IMG_5978.jpg", label: "Documentary" },
];

export default function LegendsSeasons() {
  const rowRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then((u) => setIsAdmin(u?.role === "admin")).catch(() => setIsAdmin(false));
  }, []);

  const scrollRow = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector("div[data-card]");
    const step = card ? card.offsetWidth + 12 : 200;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="bg-black text-foreground flex flex-col min-h-screen">
      {/* Header video banner — auto-plays over everything */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "52vh" }}>
        <video
          src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/32ea17b56_Untitleddesign15.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "contrast(1.05) saturate(1.05) brightness(0.95)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.85) 100%)" }}
        />
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4" style={{ minHeight: "52vh" }}>
          <img src={LOGO_URL} alt="Legends of Glory" className="h-16 w-auto object-contain mb-3" style={{ filter: "brightness(1.3)" }} />
          <h1
            className="font-display text-3xl md:text-6xl font-bold uppercase tracking-tight"
            style={{
              background: "linear-gradient(135deg,#F5D060 0%,#D4A017 50%,#A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 50px rgba(212,160,23,0.6)",
              filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.8))",
            }}
          >
            Legends of Glory
          </h1>
          <p className="font-display text-lg md:text-2xl uppercase tracking-[0.3em] text-white/90 mt-1" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}>
            Seasons
          </p>
        </div>
      </section>

      {/* Testers commercial reel — auto-plays beneath header */}
      <section className="relative w-full overflow-hidden">
        <video
          src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/867a6078a_GloryapptesterscommercialReelfootage.m4v"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-auto block object-cover"
          style={{ filter: "contrast(1.05) saturate(1.05) brightness(0.95)" }}
        />
      </section>

      {/* Featured news one-row scroll carousel */}
      <FeaturedNewsCarousel />

      {/* Top logo bar */}
      <div className="flex justify-center pt-6 pb-2">
        <img src={LOGO_URL} alt="Legends of Glory" className="h-14 w-auto object-contain" style={{ filter: "brightness(1.2)" }} />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center px-4 pt-4 pb-2"
      >
        <p className="text-primary font-heading text-[10px] md:text-xs uppercase tracking-[0.4em]" style={{ textShadow: "0 0 20px rgba(212,160,23,0.6)" }}>
          The Hub
        </p>
        <h1
          className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight"
          style={{
            background: "linear-gradient(135deg,#F5D060 0%,#D4A017 50%,#A07800 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px rgba(212,160,23,0.4)",
          }}
        >
          Legends of Glory Seasons
        </h1>
      </motion.div>

      {/* Movie poster scroll carousel */}
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
            <Crown className="w-3 h-3" /> Featured Posters
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
            {CAROUSEL_POSTERS.map((p, i) => (
              <div
                key={i}
                data-card
                className="flex-shrink-0 relative rounded-sm overflow-hidden"
                style={{ width: "180px", height: "260px", scrollSnapAlign: "start", border: "1px solid rgba(212,160,23,0.3)", boxShadow: "0 0 20px rgba(0,0,0,0.6)" }}
              >
                <img src={p.src} alt={p.label} className="w-full h-full object-cover object-top" style={{ filter: "contrast(1.05) brightness(0.92)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[9px] font-heading uppercase tracking-wider text-primary" style={{ textShadow: "0 0 8px rgba(0,0,0,0.9)" }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hub cards */}
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
            <Crown className="w-3 h-3" /> Choose a Season
          </p>
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
        </div>
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          <SeasonHubCard title="Legends of Glory" subtitle="Season 1" badge="Live Now" poster={S1_POSTER} to="/season-1" />
          <SeasonHubCard title="Legends of Glory" subtitle="Season 2" badge="Coming Soon" poster={S2_POSTER} to="/season-2" locked adminCanBypass={isAdmin} />
          <SeasonHubCard title="Legends of Glory 3" subtitle="Producers Battle" badge="In Preproduction" poster={S3_POSTER} to="/season-3" />
        </div>
      </div>

      {/* Continue */}
      <div className="pb-12 flex flex-col items-center pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <motion.div
            className="absolute -inset-1 rounded-sm"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ background: "linear-gradient(135deg,#D4A017,#A07800)", filter: "blur(15px)" }}
          />
          <Link
            to="/landing"
            className="relative flex items-center gap-3 px-10 py-4 font-heading text-sm uppercase tracking-[0.3em] text-primary-foreground rounded-sm transition-all"
            style={{ background: "linear-gradient(135deg,#D4A017 0%,#A07800 100%)", boxShadow: "0 0 30px rgba(212,160,23,0.5), 0 4px 20px rgba(0,0,0,0.5)" }}
          >
            <Crown className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Continue <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.p
          className="text-center text-white/30 text-[10px] font-heading uppercase tracking-widest mt-3"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Legends of Glory — Seasons Hub
        </motion.p>
      </div>
    </div>
  );
}
