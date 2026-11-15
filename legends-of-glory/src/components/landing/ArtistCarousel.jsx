import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ArtistCarousel() {
  const [artists, setArtists] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    base44.entities.Artist.list("order", 50).then(data => setArtists(data || [])).catch(() => {});
  }, []);

  const prev = () => setCurrent(i => (i - 1 + artists.length) % artists.length);
  const next = () => setCurrent(i => (i + 1) % artists.length);

  if (artists.length === 0) return null;

  const getVisible = () => {
    if (artists.length <= 5) return artists.map((artist, i) => ({ artist, offset: i - Math.floor(artists.length / 2) }));
    const result = [];
    for (let offset = -2; offset <= 2; offset++) {
      const idx = (current + offset + artists.length) % artists.length;
      result.push({ artist: artists[idx], offset });
    }
    return result;
  };

  return (
    <div className="relative w-full px-8 flex items-center justify-center" style={{ height: 100 }}>
      <motion.button
        onClick={prev}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-0 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-background/80 border border-border hover:border-primary transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-foreground" />
      </motion.button>

      <div className="flex items-center justify-center gap-4">
        {getVisible().map(({ artist, offset }) => {
          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);
          const scale = isCenter ? 1 : absOffset === 1 ? 0.85 : 0.7;
          const opacity = isCenter ? 1 : absOffset === 1 ? 0.7 : 0.4;

          return (
            <motion.div
              key={artist.id + "-" + offset}
              animate={{ scale, opacity }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col items-center gap-1"
              whileHover={{ scale: isCenter ? 1.05 : scale }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-1 ring-offset-background bg-card flex-shrink-0">
                {artist.photo_url ? (
                  <img src={artist.photo_url} alt={artist.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-primary font-heading text-sm font-bold">
                    {artist.name?.charAt(0)}
                  </div>
                )}
              </div>
              {isCenter && (
                <span className="text-[8px] font-heading uppercase tracking-wider text-primary leading-tight text-center max-w-[70px] truncate">
                  {artist.name}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.button
        onClick={next}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-0 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-background/80 border border-border hover:border-primary transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-foreground" />
      </motion.button>
    </div>
  );
}
