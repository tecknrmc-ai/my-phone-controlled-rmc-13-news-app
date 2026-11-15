import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Play, Lock } from "lucide-react";

export default function SeasonHubCard({ title, subtitle, poster, to, badge, locked, adminCanBypass }) {
  const isLocked = locked && !adminCanBypass;

  const cardContent = (
    <div className="relative" style={{ aspectRatio: "2/3" }}>
      <img
        src={poster}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: isLocked ? "contrast(1.05) brightness(0.45)" : "contrast(1.05) brightness(0.9)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {badge && (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm" style={{ background: "linear-gradient(135deg,#D4A017,#A07800)", boxShadow: "0 0 14px rgba(212,160,23,0.5)" }}>
          <span className="text-black font-heading text-[9px] uppercase tracking-[0.25em] font-bold">{badge}</span>
        </div>
      )}

      {locked && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(212,160,23,0.6)", boxShadow: "0 0 14px rgba(212,160,23,0.4)" }}>
            <Lock className="w-4 h-4 text-primary" />
          </div>
        </div>
      )}

      {isLocked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(212,160,23,0.5)" }}>
            <Lock className="w-6 h-6 text-primary" />
          </motion.div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div whileHover={{ scale: 1.15 }} className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(212,160,23,0.92)", boxShadow: "0 0 30px rgba(212,160,23,0.6)" }}>
            <Play className="w-6 h-6 text-black ml-1" fill="black" />
          </motion.div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-primary font-heading text-[10px] uppercase tracking-[0.3em] mb-1" style={{ textShadow: "0 0 12px rgba(212,160,23,0.6)" }}>{subtitle}</p>
        <h3 className="font-display text-xl uppercase tracking-tight font-bold text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>{title}</h3>
        <div className="flex items-center gap-1 mt-2 text-primary/90 font-heading text-[10px] uppercase tracking-wider">
          {isLocked ? "Locked" : <>Enter <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></>}
        </div>
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, y: -4 }}
        className="flex-shrink-0 cursor-not-allowed"
        style={{ width: "min(80vw, 300px)" }}
      >
        <div className="block relative rounded-sm overflow-hidden group" style={{ border: "1px solid rgba(212,160,23,0.4)", boxShadow: "0 0 30px rgba(0,0,0,0.6)" }}>
          {cardContent}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="flex-shrink-0"
      style={{ width: "min(80vw, 300px)" }}
    >
      <Link
        to={to}
        className="block relative rounded-sm overflow-hidden group"
        style={{ border: "1px solid rgba(212,160,23,0.4)", boxShadow: "0 0 30px rgba(0,0,0,0.6)" }}
      >
        {cardContent}
      </Link>
    </motion.div>
  );
}
