import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Crown, MapPin } from "lucide-react";

export default function ArtistProfileCarousel({ title = "The Battle Artists" }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    base44.entities.Artist.list("order", 50).then(data => {
      setArtists(data || []);
    }).catch(() => {});
  }, []);

  if (artists.length === 0) return null;

  return (
    <div className="w-full py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
            <Crown className="w-3 h-3" /> {title}
          </p>
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
        </div>
      </motion.div>

      <div className="flex justify-center gap-3 flex-wrap">
        {artists.slice(0, 5).map((artist, i) => {
          const colors = [
            { color: "#FFD700", glow: "rgba(255,215,0,0.6)" },
            { color: "#C084FC", glow: "rgba(192,132,252,0.6)" },
            { color: "#38BDF8", glow: "rgba(56,189,248,0.6)" },
            { color: "#F87171", glow: "rgba(248,113,113,0.6)" },
            { color: "#34D399", glow: "rgba(52,211,153,0.6)" },
          ];
          const cardColor = colors[i % colors.length];

          return (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative rounded-sm overflow-hidden cursor-pointer"
              style={{
                width: "120px",
                height: "160px",
                border: `1px solid ${cardColor.color}50`,
                boxShadow: `0 0 15px ${cardColor.glow}`,
              }}
            >
              {artist.photo_url ? (
                <motion.img
                  src={artist.photo_url}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  style={{ filter: "contrast(1.1) saturate(1.15) brightness(0.9)" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-display font-bold" style={{ color: cardColor.color }}>
                  {artist.name?.charAt(0)}
                </div>
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Name badge */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <h4 className="font-display text-xs uppercase tracking-wider font-bold text-white text-center" style={{ textShadow: `0 0 8px ${cardColor.glow}` }}>
                  {artist.name}
                </h4>
                {(artist.city || artist.state) && (
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    <MapPin className="w-2 h-2" style={{ color: cardColor.color }} />
                    <span className="text-[7px] text-muted-foreground font-heading uppercase tracking-wider">
                      {[artist.city, artist.state].filter(Boolean).join(", ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Rank badge */}
              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-display font-bold"
                style={{ background: cardColor.color, color: "#000", boxShadow: `0 0 8px ${cardColor.glow}` }}>
                #{i + 1}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
