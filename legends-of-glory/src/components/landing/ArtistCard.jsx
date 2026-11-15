import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Crown, ThumbsUp, MapPin, Zap, BookOpen, X } from "lucide-react";

const RARITY = {
  0: { label: "LEGENDARY", color: "#FFD700", glow: "rgba(255,215,0,0.9)",   rgb: "255,215,0",   dark: "#7A5C00" },
  1: { label: "EPIC",      color: "#D480FF", glow: "rgba(212,128,255,0.9)", rgb: "212,128,255", dark: "#6B2E9A" },
  2: { label: "RARE",      color: "#4FC3F7", glow: "rgba(79,195,247,0.9)",  rgb: "79,195,247",  dark: "#0A5D7A" },
  3: { label: "UNCOMMON",  color: "#4ADE80", glow: "rgba(74,222,128,0.9)",  rgb: "74,222,128",  dark: "#1A6B3A" },
  default: { label: "STANDARD", color: "#D4A017", glow: "rgba(212,160,23,0.85)", rgb: "212,160,23", dark: "#7A5A00" },
};

// Animated rotating conic gradient border
function GlowBorder({ color, rgb, active }) {
  return (
    <motion.div
      className="absolute -inset-[2px] rounded-xl pointer-events-none z-0"
      animate={{ rotate: active ? 360 : 0 }}
      transition={{ duration: active ? 4 : 0, repeat: Infinity, ease: "linear" }}
      style={{
        background: `conic-gradient(from 0deg, transparent 0deg, rgba(${rgb},0.9) 60deg, rgba(${rgb},0.4) 120deg, transparent 180deg, rgba(${rgb},0.6) 270deg, transparent 360deg)`,
        filter: `blur(${active ? 4 : 2}px)`,
        opacity: active ? 1 : 0.3,
        transition: "opacity 0.4s ease",
      }}
    />
  );
}

function BiographyPopup({ artist, r, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 40%, #111 70%, #080808 100%)",
            border: `1px solid rgba(${r.rgb},0.5)`,
            boxShadow: `0 0 60px rgba(${r.rgb},0.3), 0 0 120px rgba(${r.rgb},0.12), 0 30px 80px rgba(0,0,0,0.9)`,
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${r.color}, #fff, ${r.color}, transparent)` }} />
          {/* Bottom shimmer */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${r.rgb},0.5), transparent)` }} />
          {/* Metal sheen */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(255,255,255,0.02) 70%, transparent 100%)" }} />
          {/* Glow corner */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(${r.rgb},0.15) 0%, transparent 70%)` }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ background: `rgba(${r.rgb},0.12)`, border: `1px solid rgba(${r.rgb},0.3)`, color: r.color }}
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="p-6 pt-5">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              {artist.photo_url && (
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ border: `1px solid rgba(${r.rgb},0.4)` }}>
                  <img src={artist.photo_url} alt={artist.name} className="w-full h-full object-cover object-top" />
                </div>
              )}
              <div>
                <p className="text-[8px] font-heading uppercase tracking-[0.3em] mb-0.5" style={{ color: r.color }}>{r.label}</p>
                <h3 className="font-display text-xl uppercase tracking-widest font-black" style={{ color: r.color, textShadow: `0 0 14px ${r.glow}` }}>{artist.name}</h3>
                {(artist.city || artist.state) && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" style={{ color: r.color }} />
                    <span className="text-[9px] font-heading uppercase tracking-wider" style={{ color: r.color }}>{[artist.city, artist.state].filter(Boolean).join(", ")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-4" style={{ background: `linear-gradient(to right, transparent, ${r.color}, transparent)` }} />

            {/* Bio */}
            <p className="text-sm leading-relaxed font-body" style={{ color: "rgba(255,255,255,0.8)" }}>
              {artist.bio}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ArtistCard({ artist, rank, voteCount, totalVotes, onVote, hasVoted, isLeader }) {
  const [hovered, setHovered] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
  const r = RARITY[rank] ?? RARITY.default;
  const skills = artist.skills?.slice(0, 4) ?? [];

  // Mouse-tracking tilt
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 20 });
  const springY = useSpring(my, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const glareX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <>
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: rank * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative cursor-default"
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
      }}
    >
      {/* ── Rotating conic glow border ── */}
      <GlowBorder color={r.color} rgb={r.rgb} active={hovered} />

      {/* ── Ambient outer bloom ── */}
      <motion.div
        className="absolute -inset-4 rounded-2xl pointer-events-none"
        animate={{
          opacity: hovered ? 0.7 : 0,
          scale: hovered ? 1.05 : 0.95,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(ellipse at 50% 60%, rgba(${r.rgb},0.25) 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* ── Card surface (tilts with mouse) ── */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-xl overflow-hidden"
      >
        {/* Metallic black multi-layer background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 30%, #111111 60%, #080808 100%),
              radial-gradient(ellipse at 30% 0%, rgba(${r.rgb},0.06) 0%, transparent 50%)
            `,
          }}
        />
        {/* Metal sheen — subtle diagonal highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(255,255,255,0.02) 70%, transparent 100%)",
          }}
        />

        {/* ── Mouse-tracked glare ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,${hovered ? 0.07 : 0}) 0%, transparent 55%)`
            ),
          }}
        />

        {/* ── Border ── */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none z-20"
          style={{
            border: `1px solid ${hovered ? `rgba(${r.rgb},0.8)` : `rgba(${r.rgb},0.25)`}`,
            transition: "border-color 0.4s ease",
          }}
        />

        {/* ── Top shimmer line ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px z-30 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0.5 }}
          style={{ background: `linear-gradient(to right, transparent 0%, ${r.color} 30%, #fff 50%, ${r.color} 70%, transparent 100%)` }}
        />

        {/* ── Watermark ── */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none flex flex-col items-center justify-center overflow-hidden">
          <span
            className="font-display font-black uppercase text-center leading-none"
            style={{ fontSize: 52, color: r.color, opacity: hovered ? 0.06 : 0.03, letterSpacing: "0.05em", transition: "opacity 0.4s" }}
          >
            RMC<br />GLORY
          </span>
        </div>

        {/* ── Header row ── */}
        <div className="relative z-20 px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {isLeader && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              >
                <Crown
                  className="w-3.5 h-3.5"
                  style={{ color: r.color, filter: `drop-shadow(0 0 8px ${r.glow})` }}
                />
              </motion.div>
            )}
            <span
              className="text-[8px] font-heading uppercase tracking-[0.3em]"
              style={{ color: r.color, textShadow: `0 0 10px ${r.glow}` }}
            >
              {r.label}
            </span>
          </div>

          {/* Rank badge */}
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm"
            animate={{
              boxShadow: hovered
                ? `0 0 0 1px ${r.color}, 0 0 20px ${r.glow}, 0 0 40px rgba(${r.rgb},0.4)`
                : `0 0 0 1px rgba(${r.rgb},0.5), 0 0 8px rgba(${r.rgb},0.3)`,
            }}
            transition={{ duration: 0.35 }}
            style={{
              background: `linear-gradient(135deg, ${r.dark} 0%, #111 60%)`,
              color: r.color,
              textShadow: `0 0 10px ${r.glow}`,
            }}
          >
            #{rank + 1}
          </motion.div>
        </div>

        {/* ── Photo ── */}
        <div
          className="relative z-10 mx-3 rounded-lg overflow-hidden"
          style={{ aspectRatio: "3/4", maxHeight: 290 }}
        >
          {/* Color spotlight sweep on hover */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: `radial-gradient(ellipse at 50% 30%, rgba(${r.rgb},0.18) 0%, transparent 65%)`,
            }}
          />

          {artist.photo_url ? (
            <motion.img
              src={artist.photo_url}
              alt={artist.name}
              className="w-full h-full object-cover object-top"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                filter: hovered
                  ? `contrast(1.2) saturate(1.35) brightness(1.05) drop-shadow(0 0 12px rgba(${r.rgb},0.3))`
                  : "contrast(1.1) saturate(1.1) brightness(0.92)",
                transition: "filter 0.5s ease",
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-5xl font-display font-black"
              style={{ background: `linear-gradient(135deg, ${r.dark}, #111)`, color: r.color }}
            >
              {artist.name?.charAt(0)}
            </div>
          )}

          {/* Bottom fade to card bg */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-20"
            style={{ background: "linear-gradient(to top, #0d0d0d, transparent)" }}
          />

          {/* Metal frame on photo */}
          <div
            className="absolute inset-0 rounded-lg z-30 pointer-events-none"
            style={{ border: `1px solid rgba(${r.rgb},${hovered ? 0.4 : 0.12})`, transition: "border-color 0.4s" }}
          />
        </div>

        {/* ── Name + Location ── */}
        <div className="relative z-20 px-4 pt-3 pb-1 text-center">
          <motion.h3
            className="font-display text-xl uppercase tracking-widest font-black leading-tight"
            animate={{
              textShadow: hovered
                ? `0 0 16px ${r.glow}, 0 0 40px rgba(${r.rgb},0.5), 0 2px 4px rgba(0,0,0,0.9)`
                : `0 0 8px rgba(${r.rgb},0.4), 0 2px 4px rgba(0,0,0,0.9)`,
            }}
            style={{ color: r.color }}
          >
            {artist.name}
          </motion.h3>

          {(artist.city || artist.state) && (
            <motion.div
              className="flex items-center justify-center gap-1 mt-1.5"
              animate={{ opacity: hovered ? 1 : 0.7 }}
            >
              <MapPin
                className="w-3 h-3 flex-shrink-0"
                style={{ color: r.color, filter: `drop-shadow(0 0 4px ${r.glow})` }}
              />
              <span
                className="text-[10px] font-heading uppercase tracking-[0.2em] font-bold"
                style={{ color: r.color, textShadow: `0 0 6px ${r.glow}` }}
              >
                {[artist.city, artist.state].filter(Boolean).join(", ")}
              </span>
            </motion.div>
          )}
        </div>

        {/* ── Divider ── */}
        <motion.div
          className="relative z-20 mx-4 my-2.5 h-px"
          animate={{ opacity: hovered ? 1 : 0.4 }}
          style={{ background: `linear-gradient(to right, transparent, ${r.color}, transparent)` }}
        />

        {/* ── Bio button ── */}
        {artist.bio && (
          <div className="relative z-20 px-4 pb-2 flex justify-center">
            <motion.button
              onClick={() => setBioOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[9px] font-heading uppercase tracking-[0.2em] transition-all"
              style={{
                background: `rgba(${r.rgb},0.08)`,
                border: `1px solid rgba(${r.rgb},0.3)`,
                color: r.color,
                textShadow: `0 0 6px ${r.glow}`,
              }}
            >
              <BookOpen className="w-2.5 h-2.5" />
              Read Biography
            </motion.button>
          </div>
        )}

        {/* ── Glowing skill tags ── */}
        {skills.length > 0 && (
          <div className="relative z-20 px-4 pb-3 flex flex-wrap gap-1.5 justify-center">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                animate={{
                  boxShadow: hovered
                    ? `0 0 16px rgba(${r.rgb},0.6), inset 0 0 10px rgba(${r.rgb},0.1)`
                    : `0 0 4px rgba(${r.rgb},0.2)`,
                }}
                transition={{ duration: 0.3 }}
                className="text-[9px] font-heading uppercase tracking-wider px-2.5 py-1 rounded-sm font-bold"
                style={{
                  background: `linear-gradient(135deg, rgba(${r.rgb},0.12), rgba(${r.rgb},0.05))`,
                  color: r.color,
                  border: `1px solid rgba(${r.rgb},0.4)`,
                  textShadow: `0 0 6px ${r.glow}`,
                }}
              >
                <Zap className="inline w-2 h-2 mr-0.5 -mt-0.5" />
                {skill}
              </motion.span>
            ))}
          </div>
        )}

        {/* ── Vote progress bar ── */}
        <div className="relative z-20 px-4 pb-2">
          <div className="flex justify-between mb-1 font-heading uppercase tracking-wider" style={{ fontSize: 9 }}>
            <span className="text-muted-foreground">{voteCount} votes</span>
            <span style={{ color: r.color }}>{percentage}%</span>
          </div>
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 6, background: "rgba(255,255,255,0.05)", border: `1px solid rgba(${r.rgb},0.15)` }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, rgba(${r.rgb},0.6), ${r.color})`,
                boxShadow: `0 0 12px ${r.glow}, 0 0 4px ${r.color}`,
              }}
            />
          </div>
        </div>

        {/* ── Vote button — always on top, never covered ── */}
        <div className="relative z-20 px-4 pb-5 pt-2">
          <motion.button
            onClick={() => onVote(artist)}
            disabled={hasVoted}
            whileHover={!hasVoted ? { scale: 1.04 } : {}}
            whileTap={!hasVoted ? { scale: 0.96 } : {}}
            className="w-full py-3 rounded-lg font-heading uppercase tracking-widest text-xs font-black flex items-center justify-center gap-2 transition-all duration-300"
            style={hasVoted ? {
              background: "linear-gradient(135deg, #1a1a1a, #111)",
              color: "rgba(255,255,255,0.25)",
              border: "1px solid rgba(255,255,255,0.08)",
            } : {
              background: `linear-gradient(135deg, ${r.color} 0%, ${r.dark} 100%)`,
              color: "#000",
              border: `1px solid rgba(${r.rgb},0.6)`,
              boxShadow: hovered
                ? `0 0 30px ${r.glow}, 0 0 60px rgba(${r.rgb},0.35), inset 0 1px 0 rgba(255,255,255,0.2)`
                : `0 0 14px rgba(${r.rgb},0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            {hasVoted ? "Vote Recorded" : "Vote Now"}
          </motion.button>
        </div>

        {/* ── Bottom shimmer line ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px z-30 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0.4 }}
          style={{ background: `linear-gradient(to right, transparent 0%, ${r.color} 30%, #fff 50%, ${r.color} 70%, transparent 100%)` }}
        />
      </motion.div>
    </motion.div>

    {/* ── Biography Popup ── */}
    {bioOpen && <BiographyPopup artist={artist} r={r} onClose={() => setBioOpen(false)} />}
    </>
  );
}
