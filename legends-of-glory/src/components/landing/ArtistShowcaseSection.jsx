import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Star, MapPin, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import MatrixRain from "./MatrixRain";

// Each artist slot gets a unique signature glow color
const CARD_COLORS = [
  { color: "#FFD700", glow: "rgba(255,215,0,0.75)",   border: "rgba(255,215,0,0.8)",  label: "LEGENDARY" },
  { color: "#C084FC", glow: "rgba(192,132,252,0.75)", border: "rgba(192,132,252,0.8)", label: "EPIC" },
  { color: "#38BDF8", glow: "rgba(56,189,248,0.75)",  border: "rgba(56,189,248,0.8)",  label: "RARE" },
  { color: "#F87171", glow: "rgba(248,113,113,0.75)", border: "rgba(248,113,113,0.8)", label: "ELITE" },
  { color: "#34D399", glow: "rgba(52,211,153,0.75)",  border: "rgba(52,211,153,0.8)",  label: "FIERCE" },
  { color: "#FB923C", glow: "rgba(251,146,60,0.75)",  border: "rgba(251,146,60,0.8)",  label: "FIRE" },
];

export default function ArtistShowcaseSection() {
  const [artists, setArtists] = useState([]);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [hoveredOffset, setHoveredOffset] = useState(null);

  useEffect(() => {
    // Load artists
    base44.entities.Artist.list("order", 50).then(data => {
      setArtists(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));

    // Load votes and count per artist
    const loadVotes = async () => {
      const allVotes = await base44.entities.Vote.list();
      const voteCounts = {};
      allVotes.forEach(v => {
        voteCounts[v.artist_id] = (voteCounts[v.artist_id] || 0) + 1;
      });
      setVotes(voteCounts);
    };
    loadVotes();

    // Subscribe to real-time vote changes
    const unsubscribe = base44.entities.Vote.subscribe((event) => {
      if (event.type === 'create' || event.type === 'delete') {
        loadVotes();
      }
    });
    return () => unsubscribe();
  }, []);

  const prev = () => setCurrent(i => (i - 1 + artists.length) % artists.length);
  const next = () => setCurrent(i => (i + 1) % artists.length);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (artists.length === 0) return null;

  const getVisible = () => {
    if (artists.length === 1) return [{ artist: artists[0], offset: 0, artistIndex: 0 }];
    const result = [];
    for (let offset = -2; offset <= 2; offset++) {
      const idx = (current + offset + artists.length) % artists.length;
      result.push({ artist: artists[idx], offset, artistIndex: idx });
    }
    return result;
  };

  const centerArtistIndex = current % CARD_COLORS.length;
  const centerColor = CARD_COLORS[centerArtistIndex];

  return (
    <section className="relative py-12 px-4 bg-gradient-to-b from-background via-[#050508] to-card overflow-hidden">
      {/* Matrix rain behind everything — color shifts with center card */}
      <MatrixRain color={centerColor.color} />

      {/* Deep radial spotlight focused on carousel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${centerColor.glow}18 0%, transparent 70%)`,
          transition: "background 0.8s ease",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="font-heading tracking-[0.3em] text-xs uppercase mb-2" style={{ color: centerColor.color }}>
            Meet The Battle Cypher
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight"
            style={{ color: centerColor.color, textShadow: `0 0 30px ${centerColor.glow}, 0 0 60px ${centerColor.glow}50` }}
          >
            The Artists
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Five elite artists. One stage. Discover their stories, skills, and what makes them legends in the making.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center" style={{ height: 560 }}>
          {getVisible().map(({ artist, offset, artistIndex }) => {
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            const cardColor = CARD_COLORS[artistIndex % CARD_COLORS.length];
            const isHovered = hoveredOffset === offset;

            const scale = isCenter ? (isHovered ? 1.05 : 1) : absOffset === 1 ? (isHovered ? 0.88 : 0.82) : 0.66;
            const translateX = offset * 290;
            const zIndex = isHovered ? 20 : 10 - absOffset;
            const opacity = absOffset === 2 ? 0.3 : absOffset === 1 ? 0.65 : 1;

            return (
              <motion.div
                key={artist.id + "-" + offset}
                animate={{ scale, x: translateX, zIndex, opacity }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="absolute"
                style={{ width: 320 }}
                onHoverStart={() => setHoveredOffset(offset)}
                onHoverEnd={() => setHoveredOffset(null)}
                onClick={() => {
                  if (offset === -1) prev();
                  else if (offset === 1) next();
                }}
              >
                <Link
                  to={isCenter ? `/artist/${artist.id}` : undefined}
                  onClick={e => { if (!isCenter) e.preventDefault(); }}
                  className="block relative"
                >
                  {/* Outer glow ring — pulses on hover */}
                  <motion.div
                    className="absolute -inset-2 rounded-2xl pointer-events-none"
                    animate={{
                      opacity: isCenter ? (isHovered ? 1 : 0.7) : isHovered ? 0.7 : 0.15,
                      scale: isHovered ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.35 }}
                    style={{
                      background: `linear-gradient(135deg, ${cardColor.color}70, transparent 50%, ${cardColor.color}50)`,
                      filter: `blur(${isHovered ? 14 : 7}px)`,
                      boxShadow: isHovered || isCenter
                        ? `0 0 60px ${cardColor.glow}, 0 0 100px ${cardColor.glow}50`
                        : `0 0 20px ${cardColor.glow}40`,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      aspectRatio: "3/4",
                      border: `1.5px solid ${isHovered || isCenter ? cardColor.color : "rgba(255,255,255,0.07)"}`,
                      boxShadow: isCenter || isHovered
                        ? `0 0 40px ${cardColor.glow}, 0 0 80px ${cardColor.glow}50, inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 ${cardColor.color}30`
                        : "0 4px 24px rgba(0,0,0,0.7)",
                      transition: "box-shadow 0.5s ease, border-color 0.4s ease",
                      background: "#050508",
                    }}
                  >
                    {/* Shimmer top strip */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 z-30 pointer-events-none"
                      style={{ background: `linear-gradient(to right, transparent, ${cardColor.color}, transparent)`, opacity: isCenter ? 1 : 0.4 }}
                    />

                    {/* Photo */}
                    {artist.photo_url ? (
                      <motion.img
                        src={artist.photo_url}
                        alt={artist.name}
                        className="w-full h-full object-cover object-top"
                        animate={{ scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          filter: isCenter
                            ? "contrast(1.15) saturate(1.2) brightness(0.88)"
                            : "contrast(0.9) saturate(0.6) brightness(0.65)",
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-display font-bold"
                        style={{ background: `linear-gradient(135deg, ${cardColor.color}15, #050508)`, color: cardColor.color }}>
                        {artist.name?.charAt(0)}
                      </div>
                    )}

                    {/* Cinematic vignette — hard edges, spotlight center */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background: `
                          radial-gradient(ellipse 65% 55% at 50% 38%, transparent 0%, transparent 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.88) 100%),
                          linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.97) 100%)
                        `,
                      }}
                    />

                    {/* Colored tint overlay on hover */}
                    <motion.div
                      className="absolute inset-0 z-10 pointer-events-none"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `radial-gradient(ellipse at 50% 30%, ${cardColor.color}18 0%, transparent 65%)`,
                      }}
                    />

                    {/* Rarity badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span
                        className="text-[8px] font-heading uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm"
                        style={{
                          background: `${cardColor.color}20`,
                          color: cardColor.color,
                          border: `1px solid ${cardColor.color}50`,
                          textShadow: `0 0 8px ${cardColor.glow}`,
                        }}
                      >
                        {cardColor.label}
                      </span>
                    </div>

                    {/* ESPN-style sports card info panel */}
                    <div className="absolute bottom-0 left-0 right-0 z-20">
                      {/* Gradient overlay for readability */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 60%, transparent 100%)`,
                        }}
                      />
                      
                      {/* Card content */}
                      <div className="relative p-3 pb-3.5">
                        {/* Artist name - bold header */}
                        <h3
                          className="font-display text-lg uppercase tracking-wider font-bold leading-none"
                          style={{
                            color: "#fff",
                            textShadow: `0 0 12px ${cardColor.glow}, 0 2px 4px rgba(0,0,0,0.9)`,
                          }}
                        >
                          {artist.name}
                        </h3>
                        
                        {/* Genre/Style badge - ESPN style */}
                        {artist.rap_styles && artist.rap_styles.length > 0 && (
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <span
                              className="text-[9px] font-heading uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold"
                              style={{
                                background: `linear-gradient(135deg, ${cardColor.color}ee, ${cardColor.color}99)`,
                                color: "#000",
                                boxShadow: `0 0 8px ${cardColor.glow}50`,
                              }}
                            >
                              {artist.rap_styles[0]}
                            </span>
                            {artist.rap_styles.length > 1 && (
                              <span className="text-[9px] font-heading uppercase tracking-wider text-foreground/70">
                                +{artist.rap_styles.length - 1} more
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Stats row - Rating, Votes, Location */}
                        <div className="flex items-center gap-3 mt-2">
                          {artist.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" style={{ color: cardColor.color }} fill={cardColor.color} />
                              <span className="text-[10px] font-heading font-bold tracking-wider text-foreground">{artist.rating}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" style={{ color: cardColor.color }} />
                            <span className="text-[10px] font-heading uppercase tracking-wider text-foreground/80">
                              {votes[artist.id] || 0}
                            </span>
                          </div>
                          {(artist.city || artist.state) && (
                            <div className="flex items-center gap-1 ml-auto">
                              <MapPin className="w-2.5 h-2.5 text-muted-foreground" />
                              <p className="text-muted-foreground text-[9px] font-heading uppercase tracking-wider truncate max-w-[120px]">
                                {[artist.city, artist.state].filter(Boolean).join(", ")}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Hometown & Projects - compact description */}
                        {(artist.high_school || artist.businesses || artist.songs_achievements) && (
                          <div className="mt-2 pt-2 border-t border-white/10">
                            <p className="text-[9px] font-body leading-tight text-foreground/80 line-clamp-2">
                              {artist.high_school && `${artist.high_school}${artist.businesses || artist.songs_achievements ? ' • ' : ''}`}
                              {artist.businesses && artist.businesses.length > 0 && `${artist.businesses[0]}${artist.songs_achievements ? ' • ' : ''}`}
                              {artist.songs_achievements && artist.songs_achievements.split('\n')[0]?.replace('• ', '')}
                            </p>
                          </div>
                        )}
                        
                        {/* View Profile CTA - only on center card */}
                        <AnimatePresence>
                          {isCenter && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.25 }}
                              className="mt-2.5"
                            >
                              <span
                                className="inline-block text-[9px] font-heading uppercase tracking-wider px-4 py-1.5 rounded-sm font-bold"
                                style={{
                                  background: `linear-gradient(135deg, ${cardColor.color}ee, ${cardColor.color}99)`,
                                  color: "#000",
                                  boxShadow: `0 0 12px ${cardColor.glow}60`,
                                }}
                              >
                                View Profile →
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Bottom shimmer */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 z-30 pointer-events-none"
                      style={{ background: `linear-gradient(to right, transparent, ${cardColor.color}80, transparent)` }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-6 relative z-10">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: `1.5px solid ${centerColor.border}`,
              color: centerColor.color,
              boxShadow: `0 0 12px ${centerColor.glow}40`,
              background: `${centerColor.color}10`,
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-2">
            {artists.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                whileHover={{ scale: 1.3 }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 28 : 7,
                  height: 7,
                  background: i === current ? CARD_COLORS[i % CARD_COLORS.length].color : "rgba(255,255,255,0.15)",
                  boxShadow: i === current ? `0 0 8px ${CARD_COLORS[i % CARD_COLORS.length].glow}` : "none",
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: `1.5px solid ${centerColor.border}`,
              color: centerColor.color,
              boxShadow: `0 0 12px ${centerColor.glow}40`,
              background: `${centerColor.color}10`,
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
