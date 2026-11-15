import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ChevronDown, Star, MapPin, Music, Film, Award, BookOpen, X } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import VoteNowBanner from "../components/landing/VoteNowBanner";
import StaffCarousel from "../components/landing/StaffCarousel";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";
const VIDEO_URL = "https://media.base44.com/videos/public/user_697099ce8b25797c6c3cf9b2/8382dee6b_RecordIt-1771812791.mov";

const CARD_COLORS = [
  { color: "#FFD700", glow: "rgba(255,215,0,0.75)", label: "LEGENDARY" },
  { color: "#C084FC", glow: "rgba(192,132,252,0.75)", label: "EPIC" },
  { color: "#38BDF8", glow: "rgba(56,189,248,0.75)", label: "RARE" },
  { color: "#F87171", glow: "rgba(248,113,113,0.75)", label: "ELITE" },
  { color: "#34D399", glow: "rgba(52,211,153,0.75)", label: "FIERCE" },
];

export default function ArtistStories() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    base44.entities.Artist.list("order", 50).then(data => {
      setArtists(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

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
      
      {/* Hero Section with Logo */}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="font-heading tracking-[0.3em] text-xs uppercase mb-2 text-primary">Meet The Battle Cypher</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              Artist Stories
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Select an artist to explore their journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden border border-primary/30" style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.3)" }}>
            <video autoPlay loop muted playsInline className="w-full max-h-[400px] object-cover">
              <source src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/077a5f1f6_Untitled_converted.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Dropdown Hub */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Main Dropdown Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full relative overflow-hidden rounded-xl border-2 border-primary/50 bg-card hover:border-primary transition-all duration-300 p-6"
              style={{ boxShadow: "0 0 30px rgba(212, 160, 23, 0.2)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-display uppercase font-bold text-primary">
                    {selectedArtist ? `Select: ${selectedArtist.name}` : "Choose An Artist"}
                  </span>
                </div>
                <ChevronDown className={`w-6 h-6 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-primary/30 rounded-xl overflow-hidden shadow-2xl z-50"
                  style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.3)" }}
                >
                  <div className="grid gap-2 p-4">
                    {artists.map((artist, index) => {
                      const cardColor = CARD_COLORS[index % CARD_COLORS.length];
                      
                      return (
                        <motion.button
                          key={artist.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setSelectedArtist(artist);
                            setIsOpen(false);
                          }}
                          className="relative overflow-hidden rounded-lg p-4 text-left group transition-all duration-300 hover:scale-[1.02]"
                          style={{
                            background: `linear-gradient(135deg, ${cardColor.color}15, rgba(0,0,0,0.8))`,
                            border: `1px solid ${cardColor.color}40`,
                          }}
                        >
                          {/* Background Photo */}
                          {artist.photo_url && (
                            <div
                              className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                              style={{
                                backgroundImage: `url(${artist.photo_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "top",
                                filter: "contrast(1.1) saturate(1.1)",
                              }}
                            />
                          )}
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />

                          {/* Content */}
                          <div className="relative z-10 flex items-center gap-4">
                            {/* Mini Photo */}
                            {artist.photo_url ? (
                              <div
                                className="w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 relative"
                                style={{ borderColor: cardColor.color }}
                              >
                                <img
                                  src={artist.photo_url}
                                  alt={artist.name}
                                  className="w-full h-full object-cover"
                                  style={{
                                    filter: "contrast(1.2) saturate(1.15) brightness(0.9) sharpen(2px)",
                                    clipPath: "inset(0 0 0 0 round 8px)"
                                  }}
                                />
                                {/* Vignette overlay */}
                                <div
                                  className="absolute inset-0 pointer-events-none"
                                  style={{
                                    background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)"
                                  }}
                                />
                              </div>
                            ) : (
                              <div
                                className="w-16 h-16 rounded-lg flex items-center justify-center border-2 flex-shrink-0"
                                style={{ borderColor: cardColor.color, background: `${cardColor.color}20` }}
                              >
                                <span className="text-xl font-display font-bold" style={{ color: cardColor.color }}>
                                  {artist.name?.charAt(0)}
                                </span>
                              </div>
                            )}

                            {/* Info */}
                            <div className="flex-1">
                              <h3
                                className="font-display text-lg uppercase font-bold"
                                style={{ color: cardColor.color, textShadow: `0 0 10px ${cardColor.glow}` }}
                              >
                                {artist.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-1">
                                {artist.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3" style={{ color: cardColor.color }} />
                                    <span className="text-xs font-heading" style={{ color: cardColor.color }}>
                                      {artist.rating}
                                    </span>
                                  </div>
                                )}
                                {(artist.city || artist.state) && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      {[artist.city, artist.state].filter(Boolean).join(", ")}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex-shrink-0">
                              <span
                                className="text-xs font-heading uppercase tracking-wider px-3 py-1 rounded-sm"
                                style={{
                                  background: `${cardColor.color}20`,
                                  color: cardColor.color,
                                  border: `1px solid ${cardColor.color}50`,
                                }}
                              >
                                View Story →
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Selected Artist Story */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-4"
          >
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Photo Card */}
                <div className="relative">
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      aspectRatio: "3/4",
                      border: `2px solid ${CARD_COLORS[artists.findIndex(a => a.id === selectedArtist.id) % CARD_COLORS.length].color}`,
                      boxShadow: `0 0 40px ${CARD_COLORS[artists.findIndex(a => a.id === selectedArtist.id) % CARD_COLORS.length].glow}`,
                    }}
                  >
                    {selectedArtist.photo_url ? (
                      <>
                        <img
                          src={selectedArtist.photo_url}
                          alt={selectedArtist.name}
                          className="w-full h-full object-cover object-top"
                          style={{
                            filter: "contrast(1.25) saturate(1.2) brightness(0.88) sharpen(2px)",
                            clipPath: "inset(0 0 0 0 round 12px)"
                          }}
                        />
                        {/* Cinematic vignette with spotlight */}
                        <div
                          className="absolute inset-0 pointer-events-none rounded-xl"
                          style={{
                            background: "radial-gradient(ellipse 60% 70% at 50% 45%, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.75) 100%)",
                            boxShadow: "inset 0 0 60px rgba(0,0,0,0.7)"
                          }}
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary">
                        <span className="text-6xl font-display font-bold text-primary">
                          {selectedArtist.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Story Content */}
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mb-4 text-primary">
                      {selectedArtist.name}
                    </h2>
                    {selectedArtist.bio && (
                      <p className="text-foreground/90 leading-relaxed text-sm md:text-base">
                        {selectedArtist.bio}
                      </p>
                    )}
                  </div>

                  {selectedArtist.high_school && (
                    <div className="border-l-2 border-primary pl-4">
                      <p className="text-xs font-heading uppercase tracking-wider text-muted-foreground mb-1">High School</p>
                      <p className="text-foreground font-medium">{selectedArtist.high_school}</p>
                    </div>
                  )}

                  {selectedArtist.skills && selectedArtist.skills.length > 0 && (
                    <div>
                      <p className="text-xs font-heading uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                        <Award className="w-3 h-3" /> Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtist.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-heading uppercase tracking-wider px-3 py-1 rounded-sm border border-primary/30 text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedArtist.rap_styles && selectedArtist.rap_styles.length > 0 && (
                    <div>
                      <p className="text-xs font-heading uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                        <Music className="w-3 h-3" /> Rap Styles
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtist.rap_styles.map((style, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-heading uppercase tracking-wider px-3 py-1 rounded-sm bg-primary/10 text-primary"
                          >
                            {style}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedArtist.songs_achievements && (
                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-heading uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                        <BookOpen className="w-3 h-3" /> Songs & Achievements
                      </p>
                      <div className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                        {selectedArtist.songs_achievements}
                      </div>
                    </div>
                  )}

                  {selectedArtist.music_videos && selectedArtist.music_videos.length > 0 && (
                    <div>
                      <p className="text-xs font-heading uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                        <Film className="w-3 h-3" /> Music Videos
                      </p>
                      <div className="space-y-2">
                        {selectedArtist.music_videos.map((video, i) => (
                          <a
                            key={i}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            ▶ {video.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedArtist.businesses && selectedArtist.businesses.length > 0 && (
                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-heading uppercase tracking-wider text-muted-foreground mb-2">Businesses</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtist.businesses.map((biz, i) => (
                          <span key={i} className="text-xs text-foreground/70">
                            {biz}{i < selectedArtist.businesses.length - 1 ? " •" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Link
                      to={`/artist/${selectedArtist.id}`}
                      className="inline-block text-sm font-heading uppercase tracking-wider px-8 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      View Full Profile →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <VoteNowBanner />

      {/* Staff Carousel */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <StaffCarousel title="The Team" subtitle="RMC Global Production Staff" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
