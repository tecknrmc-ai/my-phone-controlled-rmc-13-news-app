import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Play, Pause, ChevronLeft, ChevronRight, Music } from "lucide-react";

const VERSE_VIDEOS = [
  {
    video_url: "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/cc74bac54_Untitled_converted.mov",
    title: "Battle Cypher Preview",
  },
  {
    video_url: "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/15d9c9bee_logcommercialtheatre.mov",
    title: "Commercial Theatre",
  },
];

export default function ArtistVersePreviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    base44.entities.Artist.list("order", 50).then(data => {
      setArtists(data || []);
    }).catch(() => {});
  }, []);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % VERSE_VIDEOS.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + VERSE_VIDEOS.length) % VERSE_VIDEOS.length);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative py-12 px-4 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px flex-1 bg-primary/30 max-w-[80px]" />
            <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
              <Music className="w-3 h-3" /> Artist Verse Preview
            </p>
            <div className="h-px flex-1 bg-primary/30 max-w-[80px]" />
          </div>
          <h2
            className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight"
            style={{
              background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212, 160, 23, 0.5)",
            }}
          >
            Watch the Artists in Action
          </h2>
        </motion.div>

        {/* Video Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
            border: "1px solid rgba(212, 160, 23, 0.4)",
            aspectRatio: "16/9",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <video
                autoPlay={isPlaying}
                loop={isPlaying}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: "contrast(1.2) saturate(1.15) brightness(0.88)",
                }}
              >
                <source src={VERSE_VIDEOS[currentIndex].video_url} type="video/quicktime" />
              </video>
            </motion.div>
          </AnimatePresence>

          {/* Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(ellipse 45% 40% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.85) 100%),
                radial-gradient(ellipse 35% 30% at 50% 50%, rgba(212, 160, 23, 0.1) 0%, transparent 75%)
              `,
            }}
          />

          {/* Navigation Buttons */}
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(212,160,23,0.2)",
              border: "1px solid rgba(212,160,23,0.5)",
              color: "#D4A017",
              backdropFilter: "blur(4px)",
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(212,160,23,0.2)",
              border: "1px solid rgba(212,160,23,0.5)",
              color: "#D4A017",
              backdropFilter: "blur(4px)",
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(212,160,23,0.3)",
              border: "1px solid rgba(212,160,23,0.6)",
              color: "#D4A017",
              backdropFilter: "blur(4px)",
            }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Title */}
          <div className="absolute top-4 left-4 z-20">
            <span className="text-xs font-heading uppercase tracking-wider px-3 py-1.5 rounded-sm"
              style={{
                background: "rgba(212,160,23,0.2)",
                border: "1px solid rgba(212,160,23,0.4)",
                color: "#D4A017",
                backdropFilter: "blur(4px)",
              }}
            >
              {VERSE_VIDEOS[currentIndex].title}
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
            {VERSE_VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-primary w-6" : "bg-white/40"}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Artist Thumbnails */}
        {artists.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-3 mt-6 flex-wrap"
          >
            {artists.slice(0, 5).map((artist, i) => (
              <motion.div
                key={artist.id}
                whileHover={{ scale: 1.1, y: -5 }}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40"
                style={{ boxShadow: "0 0 12px rgba(212,160,23,0.4)" }}
              >
                {artist.photo_url ? (
                  <img
                    src={artist.photo_url}
                    alt={artist.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-display font-bold text-sm">
                    {artist.name?.charAt(0)}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
