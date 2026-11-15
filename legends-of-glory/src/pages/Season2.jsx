import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Music, Crown, Lock } from "lucide-react";
import YouTubePosterVideo from "../components/landing/YouTubePosterVideo";
import { base44 } from "@/api/base44Client";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";
const HEADER_BANNER = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/7dbcc976d_IMG_3059.jpeg";
const VIDEO_ID = "vf7eyHhtkA0";

const QUICK_PICKS = ["Hot Tunez", "BizzyBaggz", "Elicorleone", "Rugaral29", "TipsBloomington"];

export default function Season2() {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    base44.auth.me().then((u) => setIsAdmin(u?.role === "admin")).catch(() => setIsAdmin(false));
  }, []);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Locked screen — only admins can bypass
  if (!isAdmin) {
    return (
      <div className="bg-black text-foreground flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-4 pt-6">
          <Link to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-heading text-xs uppercase tracking-[0.2em]">
            <ChevronLeft className="w-4 h-4" /> Back to Seasons
          </Link>
          <img src={LOGO_URL} alt="Legends of Glory" className="h-10 w-auto object-contain" style={{ filter: "brightness(1.2)" }} />
        </div>

        <div className="relative w-full overflow-hidden">
          <img src={HEADER_BANNER} alt="Legends of Glory 2" className="w-full h-auto block object-cover" style={{ filter: "contrast(1.05) brightness(0.4)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{ background: "rgba(0,0,0,0.8)", border: "2px solid rgba(212,160,23,0.6)", boxShadow: "0 0 40px rgba(212,160,23,0.4)" }}
          >
            <Lock className="w-9 h-9 text-primary" />
          </motion.div>
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.4em] mb-2">Locked</p>
          <h1 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight mb-3" style={{ background: "linear-gradient(135deg,#F5D060,#D4A017,#A07800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Season 2 is Coming Soon
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mb-8">
            This season is currently locked. Check back soon — Season 2 drops on Glory mobile, Rmc streamers world and Cranez music distro.
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-heading text-xs uppercase tracking-[0.2em]"
          >
            <ChevronLeft className="w-4 h-4" /> All Seasons
          </Link>
        </div>
      </div>
    );
  }

  // Admin view — full page
  return (
    <div className="bg-black text-foreground flex flex-col min-h-screen">
      {/* Back nav + logo */}
      <div className="flex items-center justify-between px-4 pt-6">
        <Link to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-heading text-xs uppercase tracking-[0.2em]">
          <ChevronLeft className="w-4 h-4" /> Back to Seasons
        </Link>
        <img src={LOGO_URL} alt="Legends of Glory" className="h-10 w-auto object-contain" style={{ filter: "brightness(1.2)" }} />
      </div>

      {/* Header banner */}
      <div className="w-full px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto rounded-sm overflow-hidden"
          style={{ border: "1px solid rgba(212,160,23,0.4)", boxShadow: "0 0 40px rgba(0,0,0,0.7)" }}
        >
          <img src={HEADER_BANNER} alt="Legends of Glory 2" className="w-full h-auto block object-cover" style={{ filter: "contrast(1.05) brightness(0.95)" }} />
        </motion.div>
      </div>

      {/* Header title */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4 pt-6 pb-4">
        <p className="text-primary font-heading text-[10px] md:text-xs uppercase tracking-[0.4em]" style={{ textShadow: "0 0 20px rgba(212,160,23,0.6)" }}>
          New Season
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
          Legends of Glory Season 2
        </h1>
      </motion.div>

      {/* Video — auto-plays on user click, photo poster shows first */}
      <div className="w-full px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <YouTubePosterVideo videoId={VIDEO_ID} title="Legends of Glory Season 2" />
        </div>
      </div>

      {/* Quick picks */}
      <div className="w-full px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
            <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
              <Music className="w-3 h-3" /> Quick Pick
            </p>
            <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {QUICK_PICKS.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center p-3 rounded-sm border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg,#D4A017,#A07800)", boxShadow: "0 0 16px rgba(212,160,23,0.4)" }}>
                  <span className="text-black font-heading text-sm font-bold">{i + 1}</span>
                </div>
                <p className="font-heading text-xs uppercase tracking-wider text-foreground/90">{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Track coming soon */}
      <div className="w-full px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto text-center p-6 rounded-sm"
          style={{ border: "1px solid rgba(212,160,23,0.3)", background: "rgba(212,160,23,0.05)" }}
        >
          <Crown className="w-6 h-6 text-primary mx-auto mb-2" style={{ filter: "drop-shadow(0 0 10px rgba(212,160,23,0.6))" }} />
          <p className="font-display text-lg md:text-xl uppercase tracking-[0.2em] text-foreground" style={{ textShadow: "0 0 20px rgba(212,160,23,0.4)" }}>
            Track Coming Soon
          </p>
          <p className="text-muted-foreground text-xs font-heading uppercase tracking-wider mt-2">
            Full Season 2 cypher dropping soon — stay tuned
          </p>
        </motion.div>
      </div>

      {/* Back to seasons */}
      <div className="pb-12 flex justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-heading text-xs uppercase tracking-[0.2em]"
        >
          <ChevronLeft className="w-4 h-4" /> All Seasons
        </Link>
      </div>
    </div>
  );
}
