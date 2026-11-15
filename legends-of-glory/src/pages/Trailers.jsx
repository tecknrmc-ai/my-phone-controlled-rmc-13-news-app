import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Play, Calendar, Film } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import ArtistProfileCarousel from "../components/landing/ArtistProfileCarousel";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/42e17e462_IMG_5328.jpg";
const VIDEO_URL = "https://media.base44.com/videos/public/user_697099ce8b25797c6c3cf9b2/8382dee6b_RecordIt-1771812791.mov";

export default function Trailers() {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  useEffect(() => {
    loadTrailers();
  }, []);

  const loadTrailers = async () => {
    try {
      const data = await base44.entities.Trailer.list("order", 50);
      setTrailers(data || []);
    } catch (error) {
      console.error("Error loading trailers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case "behind_the_scenes": return "#38BDF8";
      case "music_video": return "#F87171";
      case "teaser": return "#FFD700";
      case "commercial": return "#34D399";
      default: return "#94a3b8";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-background via-card to-background overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0 opacity-60">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={VIDEO_URL} type="video/quicktime" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <img src={LOGO_URL} alt="Legends of Glory" className="w-48 h-48 mx-auto object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-primary mb-4"
            style={{ textShadow: "0 0 40px rgba(212, 160, 23, 0.5)" }}
          >
            Mbrace Modeling Takes Over Glory Battle Cypher
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="font-heading tracking-[0.3em] text-xs uppercase mb-2 text-primary">Watch Now</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              Trailers
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Behind the scenes, music videos, teasers and more
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="relative py-12 px-4 bg-background overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2
              className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight"
              style={{
                background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(212, 160, 23, 0.5)",
              }}
            >
              Mbrace Modeling Takes Over Glory Battle Cypher
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
              border: "1px solid rgba(212, 160, 23, 0.4)",
              aspectRatio: "16/9",
            }}
          >
            {/* Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "contrast(1.2) saturate(1.15) brightness(0.85)",
              }}
            >
              <source src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/4a267c9ee_mbracecomm10.mov" type="video/quicktime" />
            </video>

            {/* Hard spotlight overlay - dark vignette with hard focus center */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `
                  radial-gradient(ellipse 40% 35% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.9) 100%),
                  radial-gradient(ellipse 30% 25% at 50% 50%, rgba(212, 160, 23, 0.12) 0%, transparent 70%)
                `,
              }}
            />
            {/* Hard vignette - very dark corners */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `
                  radial-gradient(ellipse 55% 45% at 50% 50%, transparent 0%, transparent 30%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.95) 100%)
                `,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Artist Profile Carousel */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <ArtistProfileCarousel title="The Battle Artists" />
        </div>
      </section>

      {/* Trailers Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {trailers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No trailers yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trailers.map((trailer, index) => {
                const categoryColor = getCategoryColor(trailer.category);
                
                return (
                  <motion.article
                    key={trailer.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300">
                      {/* Thumbnail */}
                      <div className="aspect-[16/9] relative overflow-hidden cursor-pointer" onClick={() => setSelectedTrailer(trailer)}>
                        {trailer.thumbnail_url ? (
                          <motion.img
                            src={trailer.thumbnail_url}
                            alt={trailer.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            style={{ filter: "contrast(1.1) saturate(1.1) brightness(0.9)" }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary">
                            <Film className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="w-8 h-8 text-primary-foreground ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-sm flex items-center gap-1"
                          style={{
                            background: `${categoryColor}20`,
                            color: categoryColor,
                            border: `1px solid ${categoryColor}50`,
                          }}
                        >
                          {trailer.category.replace("_", " ")}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {trailer.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-sm bg-primary text-primary-foreground">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-display text-lg uppercase font-bold text-primary mb-2 line-clamp-2">
                          {trailer.title}
                        </h3>
                        
                        {trailer.description && (
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {trailer.description}
                          </p>
                        )}

                        {/* Meta */}
                        {trailer.release_date && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(trailer.release_date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Border glow on hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 rounded-xl" style={{ boxShadow: `inset 0 0 30px ${categoryColor}30` }} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedTrailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedTrailer(null)}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedTrailer(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <span className="text-4xl">×</span>
            </button>
            <div className="aspect-video rounded-xl overflow-hidden">
              <video
                src={selectedTrailer.video_url}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-display text-xl uppercase font-bold text-primary">{selectedTrailer.title}</h3>
              {selectedTrailer.description && (
                <p className="text-sm text-muted-foreground mt-2">{selectedTrailer.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
