import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Zap, Crown, Star } from "lucide-react";

const CARD_COLORS = [
  { color: "#FFD700", glow: "rgba(255,215,0,0.75)", label: "LEGENDARY" },
  { color: "#C084FC", glow: "rgba(192,132,252,0.75)", label: "EPIC" },
  { color: "#38BDF8", glow: "rgba(56,189,248,0.75)", label: "RARE" },
  { color: "#F87171", glow: "rgba(248,113,113,0.75)", label: "ELITE" },
  { color: "#34D399", glow: "rgba(52,211,153,0.75)", label: "FIERCE" },
];

const QUOTES = [
  "Bars sharp as blades",
  "Flow like water",
  "Voice of the streets",
  "Rhythm in my veins",
  "Born to battle",
];

export default function ArtistBattlePreview() {
  const [artists, setArtists] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    base44.entities.Artist.list("order", 50).then(data => {
      setArtists(data || []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % Math.max(artists.length, 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [artists.length]);

  if (artists.length === 0) return null;

  const visible = [];
  for (let i = -1; i <= 1; i++) {
    const idx = (current + i + artists.length) % artists.length;
    visible.push({ artist: artists[idx], offset: i, idx });
  }

  const centerColor = CARD_COLORS[current % CARD_COLORS.length];

  return (
    <div className="w-full py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] mb-2">Battle Preview</p>
        <h3 className="font-display text-xl md:text-2xl uppercase tracking-wider" style={{ color: centerColor.color, textShadow: `0 0 20px ${centerColor.glow}` }}>
          Next Up in the Cypher
        </h3>
      </motion.div>

      <div className="relative flex items-center justify-center" style={{ height: 280 }}>
        {visible.map(({ artist, offset, idx }) => {
          const isCenter = offset === 0;
          const cardColor = CARD_COLORS[idx % CARD_COLORS.length];
          const scale = isCenter ? 1 : 0.75;
          const opacity = isCenter ? 1 : 0.5;
          const translateX = offset * 140;

          return (
            <motion.div
              key={artist.id + "-" + offset}
              animate={{ scale, x: translateX, opacity, zIndex: isCenter ? 20 : 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute"
              style={{ width: 180 }}
            >
              <div
                className="relative rounded-lg overflow-hidden cursor-pointer"
                style={{
                  aspectRatio: "3/4",
                  border: `1.5px solid ${isCenter ? cardColor.color : "rgba(255,255,255,0.1)"}`,
                  boxShadow: isCenter ? `0 0 30px ${cardColor.glow}, 0 0 60px ${cardColor.glow}40` : "0 4px 20px rgba(0,0,0,0.5)",
                  background: "#0a0a0a",
                }}
              >
                {/* Photo */}
                {artist.photo_url ? (
                  <motion.img
                    src={artist.photo_url}
                    alt={artist.name}
                    className="w-full h-full object-cover object-top"
                    animate={{ scale: isCenter ? 1.08 : 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      filter: isCenter ? "contrast(1.15) saturate(1.2) brightness(0.9)" : "contrast(0.85) saturate(0.5) brightness(0.6)",
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-display font-bold" style={{ color: cardColor.color }}>
                    {artist.name?.charAt(0)}
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)" }} />

                {/* Rarity badge */}
                {isCenter && (
                  <div className="absolute top-2 left-2">
                    <span className="text-[7px] font-heading uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-sm" style={{ background: `${cardColor.color}20`, color: cardColor.color, border: `1px solid ${cardColor.color}50` }}>
                      {cardColor.label}
                    </span>
                  </div>
                )}

                {/* Quote overlay - only on center */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-3"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <Zap className="w-2.5 h-2.5" style={{ color: cardColor.color }} />
                      <span className="text-[8px] font-heading uppercase tracking-wider" style={{ color: cardColor.color }}>
                        {QUOTES[idx % QUOTES.length]}
                      </span>
                    </div>
                    <h4 className="font-display text-sm uppercase tracking-wider font-bold text-white" style={{ textShadow: `0 0 10px ${cardColor.glow}` }}>
                      {artist.name}
                    </h4>
                    {(artist.city || artist.state) && (
                      <p className="text-[8px] text-muted-foreground mt-0.5 font-heading uppercase tracking-wider">
                        {[artist.city, artist.state].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Bottom shimmer */}
                {isCenter && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(to right, transparent, ${cardColor.color}, transparent)` }} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {artists.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            whileHover={{ scale: 1.3 }}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 24 : 6,
              height: 6,
              background: i === current ? CARD_COLORS[i % CARD_COLORS.length].color : "rgba(255,255,255,0.2)",
              boxShadow: i === current ? `0 0 8px ${CARD_COLORS[i % CARD_COLORS.length].glow}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
