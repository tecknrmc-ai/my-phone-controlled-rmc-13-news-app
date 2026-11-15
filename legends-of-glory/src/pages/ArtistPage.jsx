import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Star, MapPin, School, Briefcase, Music, Video, Play, Mic, TrendingUp, ArrowLeft, Camera, BookOpen, Film, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import MobileBottomNav from "../components/landing/MobileBottomNav";

const CARD_COLORS = [
  { color: "#FFD700", glow: "rgba(255,215,0,0.75)", border: "rgba(255,215,0,0.8)", label: "LEGENDARY" },
  { color: "#C084FC", glow: "rgba(192,132,252,0.75)", border: "rgba(192,132,252,0.8)", label: "EPIC" },
  { color: "#38BDF8", glow: "rgba(56,189,248,0.75)", border: "rgba(56,189,248,0.8)", label: "RARE" },
  { color: "#F87171", glow: "rgba(248,113,113,0.75)", border: "rgba(248,113,113,0.8)", label: "ELITE" },
  { color: "#34D399", glow: "rgba(52,211,153,0.75)", border: "rgba(52,211,153,0.8)", label: "FIERCE" },
  { color: "#FB923C", glow: "rgba(251,146,60,0.75)", border: "rgba(251,146,60,0.8)", label: "FIRE" },
];

export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [allArtists, setAllArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeTab, setActiveTab] = useState("story");
  const [videoMuted, setVideoMuted] = useState(true);
  const carouselRef = useRef(null);
  const storyVideoRef = useRef(null);

  useEffect(() => {
    if (activeTab !== "story") return;
    const video = storyVideoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [activeTab]);

  const verseVideoUrl = (() => {
    const name = artist?.name?.toLowerCase() || "";
    if (name.includes("nef") && !name.includes("nee")) return "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/e317312fb_logs1.mov";
    if (name.includes("hottunez")) return "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/a4b04c381_logs1.mov";
    if (name.includes("kxng") || name.includes("d.o.p.e")) return "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/a3850d391_logs1.mov";
    if (name.includes("gotti") || name.includes("directedx")) return "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/8dc6db6ad_logs1.mov";
    return "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/9940bfe82_logs1.mov";
  })();

  const toggleMute = () => {
    const video = storyVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setVideoMuted(video.muted);
  };

  useEffect(() => {
    base44.entities.Artist.list("order", 50).then(data => {
      setAllArtists(data || []);
    }).catch(() => {});
    base44.entities.Artist.filter({ id }).then(data => {
      setArtist(data?.[0] || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const currentIndex = useMemo(() => allArtists.findIndex(a => a.id === id), [allArtists, id]);

  const slideLeft = () => {
    if (currentIndex > 0) navigate(`/artist/${allArtists[currentIndex - 1].id}`);
  };
  const slideRight = () => {
    if (currentIndex < allArtists.length - 1) navigate(`/artist/${allArtists[currentIndex + 1].id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground font-heading uppercase tracking-wider">Artist not found</p>
        <Link to="/" className="text-primary font-heading uppercase tracking-wider text-sm flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>
      </div>
    );
  }

  const allPhotos = [artist.photo_url, ...(artist.photos || [])].filter(Boolean);

  const tabs = [
    { key: "story", label: "Story", icon: BookOpen },
    { key: "music", label: "Music", icon: Music },
    { key: "profile", label: "Profile", icon: TrendingUp },
    { key: "bts", label: "Behind the Scenes", icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Featured Video Banner */}
      {artist.featured_video_url && (
        <div className="relative pt-16">
          <div className="w-full bg-black relative group cursor-pointer" onClick={() => document.querySelector('video')?.play()}>
            <video
              controls
              className="w-full max-h-[500px] object-cover"
              poster={allPhotos[0] || artist.photo_url}
            >
              <source src={artist.featured_video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artist Card Carousel */}
      <div className={`relative ${artist.featured_video_url ? '' : 'pt-16'} bg-card border-b border-border overflow-hidden`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={slideLeft}
              disabled={currentIndex <= 0}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-border bg-background/80 text-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div ref={carouselRef} className="flex gap-3 overflow-x-auto flex-1 px-1 py-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {allArtists.map((a, i) => {
                const isActive = a.id === id;
                const cardColor = CARD_COLORS[i % CARD_COLORS.length];
                return (
                  <Link
                    key={a.id}
                    to={`/artist/${a.id}`}
                    className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${isActive ? "ring-2 scale-105" : "opacity-60 hover:opacity-90"}`}
                    style={{
                      width: 120,
                      aspectRatio: "3/4",
                      border: isActive ? `2px solid ${cardColor.border}` : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: isActive ? `0 0 15px ${cardColor.glow}50` : "0 2px 10px rgba(0,0,0,0.5)",
                      background: "#050508",
                    }}
                  >
                    <div className="relative w-full h-full">
                      {a.photo_url ? (
                        <img src={a.photo_url} alt={a.name} className="w-full h-full object-cover object-top" style={{ filter: isActive ? "contrast(1.1) brightness(0.9)" : "contrast(0.8) brightness(0.5)" }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ color: cardColor.color }}>
                          <span className="text-xl font-display font-bold">{a.name?.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-1.5">
                        <p className="text-[9px] font-heading uppercase tracking-wider text-white font-bold leading-tight text-center" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}>
                          {a.name}
                        </p>
                      </div>
                      {isActive && (
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: cardColor.color, boxShadow: `0 0 6px ${cardColor.glow}` }} />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={slideRight}
              disabled={currentIndex >= allArtists.length - 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-border bg-background/80 text-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className={`relative overflow-hidden`}>
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={allPhotos[activePhoto] || artist.photo_url}
            alt={artist.name}
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.7) contrast(1.05)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

          {/* Back button */}
          <Link
            to="/#artists"
            className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/70 backdrop-blur-sm border border-border px-3 py-2 rounded-sm text-xs font-heading uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Artists
          </Link>
        </div>

        {/* Artist Info */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-primary drop-shadow-lg">
              {artist.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {artist.rating && (
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-heading uppercase tracking-wider text-foreground">{artist.rating}/100</span>
                </div>
              )}
              {(artist.city || artist.state) && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-heading uppercase tracking-wider text-foreground">
                    {[artist.city, artist.state].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Photo Thumbnails */}
      {allPhotos.length > 1 && (
        <div className="px-4 md:px-8 py-4 flex gap-2 overflow-x-auto">
          {allPhotos.map((url, i) => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                i === activePhoto ? "border-primary" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border px-4">
        <div className="max-w-4xl mx-auto flex overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                activeTab === key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 pb-24">
        {activeTab === "story" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Cinematic Verse Video */}
            <div className="relative w-full overflow-hidden rounded-sm group" style={{ aspectRatio: "16/9", boxShadow: "0 0 30px rgba(212,160,23,0.25)" }} >
              <video
                ref={storyVideoRef}
                src={verseVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "contrast(1.06) saturate(1.1) brightness(0.92)" }}
              />
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.55) 100%)"
              }} />

              {/* Headliner Label */}
              <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/70 to-transparent pt-4 pb-6 px-4">
                <p className="text-primary font-heading tracking-[0.15em] text-[10px] uppercase text-center mb-1"
                  style={{ textShadow: "0 0 12px rgba(212,160,23,0.5)" }}>
                  Headliner
                </p>
                <p className="text-white font-display text-sm md:text-base uppercase tracking-wider font-bold text-center"
                  style={{ textShadow: "0 0 20px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.8)" }}>
                  {artist.name} — Verse 1 Sneak Peek
                </p>
              </div>

              {/* Unmute Button */}
              <button
                onClick={toggleMute}
                className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white/85 hover:text-white transition-all border border-white/20 opacity-0 group-hover:opacity-100"
                aria-label={videoMuted ? "Unmute" : "Mute"}
              >
                {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent pt-10 pb-3 px-4">
                <p className="text-primary font-heading tracking-[0.2em] text-[10px] uppercase text-center"
                  style={{ textShadow: "0 0 10px rgba(212,160,23,0.5)" }}>
                  {artist.name} <span className="text-white/80">× Verse 1</span>
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase text-primary font-bold mb-3">The Journey</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{artist.bio || "Story coming soon."}</p>
            </div>
            {artist.legends_of_glory_story && (
              <div className="bg-card border border-border rounded-sm p-5">
                <h3 className="font-display text-lg uppercase text-primary font-bold mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" /> How They Got on Legends of Glory
                </h3>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{artist.legends_of_glory_story}</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "music" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {artist.songs_achievements && (
              <div>
                <h2 className="font-display text-2xl uppercase text-primary font-bold mb-3 flex items-center gap-2">
                  <Music className="w-5 h-5" /> Discography & Achievements
                </h2>
                <div className="bg-card border border-border rounded-sm p-5">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">{artist.songs_achievements}</p>
                </div>
              </div>
            )}
            {artist.music_videos && artist.music_videos.length > 0 && (
              <div>
                <h2 className="font-display text-2xl uppercase text-primary font-bold mb-3 flex items-center gap-2">
                  <Video className="w-5 h-5" /> Music Videos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artist.music_videos.map((video, idx) => (
                    <a
                      key={idx}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 bg-card border border-border rounded-sm p-4 hover:border-primary/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors flex-shrink-0">
                        <Play className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-heading uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                        {video.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {artist.skills && artist.skills.length > 0 && (
              <div>
                <h2 className="font-display text-2xl uppercase text-primary font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {artist.skills.map((skill, idx) => (
                    <span key={idx} className="bg-primary/10 border border-primary/30 text-primary px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {artist.rap_styles && artist.rap_styles.length > 0 && (
              <div>
                <h2 className="font-display text-2xl uppercase text-primary font-bold mb-3 flex items-center gap-2">
                  <Mic className="w-5 h-5" /> Rap Styles
                </h2>
                <div className="flex flex-wrap gap-2">
                  {artist.rap_styles.map((style, idx) => (
                    <span key={idx} className="bg-accent/10 border border-accent/30 text-accent px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {artist.high_school && (
                <div className="bg-card border border-border rounded-sm p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <School className="w-5 h-5 text-primary" />
                    <h4 className="font-heading uppercase tracking-wider text-foreground text-sm">High School</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">{artist.high_school}</p>
                </div>
              )}
              {artist.businesses && artist.businesses.length > 0 && (
                <div className="bg-card border border-border rounded-sm p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h4 className="font-heading uppercase tracking-wider text-foreground text-sm">Businesses & Partnerships</h4>
                  </div>
                  <ul className="space-y-1">
                    {artist.businesses.map((biz, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm">• {biz}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "bts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {artist.recording_story && (
              <div className="bg-card border border-border rounded-sm p-5">
                <h2 className="font-display text-xl uppercase text-primary font-bold mb-3 flex items-center gap-2">
                  <Mic className="w-4 h-4" /> Recording Their Verse
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{artist.recording_story}</p>
              </div>
            )}
            {artist.filming_story && (
              <div className="bg-card border border-border rounded-sm p-5">
                <h2 className="font-display text-xl uppercase text-primary font-bold mb-3 flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Filming Their Verse
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{artist.filming_story}</p>
              </div>
            )}
            {!artist.recording_story && !artist.filming_story && (
              <p className="text-muted-foreground font-heading uppercase tracking-wider text-sm">Behind the scenes content coming soon.</p>
            )}
          </motion.div>
        )}
      </div>

      <Footer />
      <MobileBottomNav />
      <div className="h-16 md:hidden" />
    </div>
  );
}
