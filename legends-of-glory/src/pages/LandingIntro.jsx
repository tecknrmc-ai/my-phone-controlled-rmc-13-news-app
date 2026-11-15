import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Crown, ChevronLeft } from "lucide-react";
import BrandSectionsCarousel from "../components/landing/BrandSectionsCarousel";

const PHOTOS = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/7d0686ed3_IMG_1362.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/292bd8857_IMG_1371.png",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/38999b753_IMG_1373.png",
];

const FIGURE_CARDS = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/ef920ba91_IMG_1344.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/1dcb8253d_IMG_1337.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/3d7b2e468_IMG_1338.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/ec335e21e_IMG_1346.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c95ad463a_IMG_1348.jpg",
];

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";

export default function LandingIntro() {
  const rowRef = useRef(null);
  const headerRowRef = useRef(null);

  const scrollRow = (ref, dir) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("div[data-card]");
    const step = card ? card.offsetWidth + 12 : 200;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="bg-black text-foreground flex flex-col min-h-screen">
      {/* Top logo bar */}
      <div className="flex justify-center pt-6 pb-2">
        <img src={LOGO_URL} alt="Legends of Glory" className="h-14 w-auto object-contain" style={{ filter: "brightness(1.2)" }} />
      </div>

      {/* Header one-row scroll carousel */}
      <div className="w-full px-4 pt-4 pb-2">
        <div className="relative">
          <button
            onClick={() => scrollRow(headerRowRef, -1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollRow(headerRowRef, 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div
            ref={headerRowRef}
            className="flex gap-3 overflow-x-auto py-2 px-10"
            style={{
              scrollSnapType: "x proximity",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {PHOTOS.map((src, i) => (
              <div
                key={i}
                data-card
                className="flex-shrink-0 relative rounded-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                style={{
                  width: "min(85vw, 640px)",
                  scrollSnapAlign: "start",
                  border: "1px solid rgba(212,160,23,0.3)",
                  boxShadow: "0 0 24px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={src}
                  alt={`Legends of Glory ${i + 1}`}
                  className="w-full h-auto block object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-playing feature video with playback controls */}
      <div className="w-full px-4 py-6">
        <div
          className="max-w-4xl mx-auto rounded-sm overflow-hidden"
          style={{
            border: "1px solid rgba(212,160,23,0.3)",
            boxShadow: "0 0 30px rgba(0,0,0,0.6)",
          }}
        >
          <video
            src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/94638edbb_logpr.m4v"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-auto block object-cover"
          />
        </div>
      </div>

      {/* Brand sections one-row scroll carousel */}
      <BrandSectionsCarousel />

      {/* One-row scroll carousel */}
      <div className="w-full px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
            <Crown className="w-3 h-3" /> The Glory Figures
          </p>
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
        </div>
        <div className="relative">
          <button
            onClick={() => scrollRow(rowRef, -1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollRow(rowRef, 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div
            ref={rowRef}
            className="flex gap-3 overflow-x-auto pb-3 px-9"
            style={{
              scrollSnapType: "x proximity",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {FIGURE_CARDS.map((src, i) => (
              <div
                key={i}
                data-card
                className="flex-shrink-0 relative rounded-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.04] hover:-translate-y-1"
                style={{
                  width: "180px",
                  height: "240px",
                  scrollSnapAlign: "start",
                  border: "1px solid rgba(212,160,23,0.3)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={src}
                  alt={`Glory Figure ${i + 1}`}
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "contrast(1.05) brightness(0.95)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="pb-12 flex flex-col items-center">
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
            style={{ background: "linear-gradient(135deg, #D4A017, #A07800)", filter: "blur(15px)" }}
          />
          <Link
            to="/landing"
            className="relative flex items-center gap-3 px-10 py-4 font-heading text-sm uppercase tracking-[0.3em] text-primary-foreground rounded-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #D4A017 0%, #A07800 100%)",
              boxShadow: "0 0 30px rgba(212,160,23,0.5), 0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <Crown className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Continue
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.p
          className="text-center text-white/30 text-[10px] font-heading uppercase tracking-widest mt-3"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Legends of Glory — Season 1
        </motion.p>
      </div>
    </div>
  );
}
