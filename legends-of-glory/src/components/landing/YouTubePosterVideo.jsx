import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function YouTubePosterVideo({ videoId, title = "Video" }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{ aspectRatio: "16/9", border: "1px solid rgba(212,160,23,0.4)", boxShadow: "0 0 40px rgba(0,0,0,0.7)" }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full block group"
          aria-label={`Play ${title}`}
        >
          <img
            src={thumb}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "contrast(1.05) brightness(0.85)" }}
            onError={(e) => { e.currentTarget.src = fallbackThumb; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <motion.div whileHover={{ scale: 1.12 }} className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#D4A017,#A07800)", boxShadow: "0 0 40px rgba(212,160,23,0.7)" }}>
              <Play className="w-7 h-7 md:w-9 md:h-9 text-black ml-1" fill="black" />
            </div>
          </motion.div>
          <p className="absolute bottom-3 left-3 font-heading text-[10px] uppercase tracking-[0.25em] text-primary" style={{ textShadow: "0 0 10px rgba(0,0,0,0.9)" }}>
            Tap to Play
          </p>
        </button>
      )}
    </div>
  );
}