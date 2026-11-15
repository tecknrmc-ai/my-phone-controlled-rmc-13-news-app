import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Music, Smartphone, ChevronRight, Sparkles, Zap, Crown, List, BookOpen, User, Play } from "lucide-react";
import MatrixRain from "../components/landing/MatrixRain";
import StaffCarousel from "../components/landing/StaffCarousel";
import ArtistBattlePreview from "../components/landing/ArtistBattlePreview";
import ArtistProfileCarousel from "../components/landing/ArtistProfileCarousel";
import GloryFigureCarousel from "../components/landing/GloryFigureCarousel";

const IMAGES = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/de02b89ee_IMG_8829.png",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/0e8d35751_IMG_9160.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c9461a4aa_IMG_4235.jpg",
];

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";

const BANNER_IMAGES = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/5c7ed6766_IMG_9571.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/b473f4856_IMG_7054.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/d0b78101c_IMG_7031.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/2033579ea_IMG_0507.jpg",
];

const ARTISTS = [
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/1657e47a1_IMG_7033.jpg", name: "Artist 1" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/ec6021ef1_IMG_7032.jpg", name: "Artist 2" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/109b778a9_IMG_7029.jpg", name: "Artist 3" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/955bb2b05_IMG_7036.jpg", name: "Artist 4" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/fd0b4405c_IMG_5978.jpg", name: "Artist 5" },
];

const MBRACE_PHOTOS = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c9461a4aa_IMG_4235.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/0e8d35751_IMG_9160.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/0e2759262_IMG_8919.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/df2d5cca4_IMG_8914.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c3c205d18_IMG_0749.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/4163690de_IMG_4232.jpg",
];

export default function Landing() {
  const [imgIndex, setImgIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((i) => (i + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((i) => (i + 1) % BANNER_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-foreground flex flex-col">

      {/* ── HEADER PHOTO ── */}
      <div className="w-full relative">
        <img
          src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c6da8a2ce_IMG_1376.jpg"
          alt="Legends of Glory Season 1"
          className="w-full h-auto block object-cover"
        />
      </div>

      {/* ── GLORY FIGURE CAROUSEL ── */}
      <GloryFigureCarousel />

      {/* ── TOP BANNER ── */}
      <div className="w-full relative" style={{ height: "220px", overflow: "hidden" }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={bannerIndex}
            src={BANNER_IMAGES[bannerIndex]}
            alt="Legends of Glory Banner"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Dot indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {BANNER_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIndex(i)}
              className={`rounded-full transition-all ${i === bannerIndex ? "bg-primary w-3 h-1.5" : "bg-white/40 w-1.5 h-1.5"}`}
            />
          ))}
        </div>
      </div>

      {/* ── HERO (background carousel + content) ── */}
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background image carousel */}
        <AnimatePresence mode="sync">
          <motion.div
            key={imgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${IMAGES[imgIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
        </AnimatePresence>

        {/* Matrix rain */}
        <MatrixRain color="#D4A017" opacity={0.18} />

        {/* Dark overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/75 via-black/65 to-black/95" />

        {/* Content */}
        <div className="relative z-20 flex flex-col min-h-screen px-4">
          {/* Logo */}
          <div className="pt-10 flex justify-center">
            <img src={LOGO_URL} alt="Legends of Glory" className="h-16 w-auto object-contain" style={{ filter: "brightness(1.2)" }} />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full py-8">
            {/* Floating logos */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: -50,
                    opacity: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    y: window.innerHeight + 50,
                    opacity: [0, 0.3, 0.3, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: Math.random() * 10 + 15, 
                    repeat: Infinity, 
                    delay: i * 2.5,
                    ease: "linear"
                  }}
                  style={{ left: `${15 + i * 15}%` }}
                >
                  {i % 3 === 0 ? (
                    <Crown className="w-6 h-6" style={{ color: "#D4A017", opacity: 0.2 }} />
                  ) : i % 3 === 1 ? (
                    <Music className="w-5 h-5" style={{ color: "#D4A017", opacity: 0.2 }} />
                  ) : (
                    <Sparkles className="w-4 h-4" style={{ color: "#D4A017", opacity: 0.2 }} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Season badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 px-4 py-1 border border-primary/50 rounded-sm bg-primary/10 relative z-10"
            >
              <span className="text-primary font-heading text-[10px] uppercase tracking-[0.4em]">Season 1 — Now Live</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight mb-2"
              style={{
                background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(212,160,23,0.5))",
              }}
            >
              Legends of Glory
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-display text-xl md:text-3xl uppercase tracking-[0.2em] text-white/80 mb-6"
            >
              Battle Cypher
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white/90 text-sm md:text-base leading-relaxed max-w-lg mb-8 font-body px-5 py-4 rounded-sm"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            >
              Five elite artists from the Inland Empire and Los Angeles step into the ring for the ultimate lyrical showdown. Battle vs. Mode — raw bars, real stories, and a fight for the crown in the most cinematic rap cypher ever produced. An RMCGlobal Production.
            </motion.p>

            {/* How It Works Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="w-full mb-8 relative z-10"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
                <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
                  <List className="w-3 h-3" /> How It Works
                </p>
                <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                {/* Step 1 */}
                <div className="p-3 rounded-sm border border-primary/20 bg-primary/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold font-heading">1</div>
                    <Smartphone className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[9px] font-heading uppercase tracking-wider text-white/80">Surf the App</p>
                </div>
                {/* Step 2 */}
                <div className="p-3 rounded-sm border border-primary/20 bg-primary/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold font-heading">2</div>
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[9px] font-heading uppercase tracking-wider text-white/80">Read News & Meet Staff</p>
                </div>
                {/* Step 3 */}
                <div className="p-3 rounded-sm border border-primary/20 bg-primary/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold font-heading">3</div>
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[9px] font-heading uppercase tracking-wider text-white/80">Learn About the Artists</p>
                </div>
                {/* Step 4 */}
                <div className="p-3 rounded-sm border border-primary/20 bg-primary/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold font-heading">4</div>
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[9px] font-heading uppercase tracking-wider text-white/80">Play Music & Vote</p>
                </div>
              </div>
            </motion.div>

            {/* Streaming section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="w-full mb-8 relative z-10"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px flex-1 bg-primary/30 max-w-[80px]" />
                <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
                  <Music className="w-3 h-3" /> Out Now On
                </p>
                <div className="h-px flex-1 bg-primary/30 max-w-[80px]" />
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {[
                  { name: "Spotify", icon: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z", color: "text-green-400" },
                  { name: "Apple Music", icon: "M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.048-2.31-2.08-3.13A5.022 5.022 0 0019.2.28c-.65-.23-1.33-.35-2.01-.41-.6-.06-1.22-.07-1.82-.07H8.63c-.6 0-1.22.01-1.82.07-.68.06-1.36.18-2.01.41a5.022 5.022 0 00-2.474.824C1.294 1.624.563 2.624.246 3.934A9.23 9.23 0 00.006 6.124C-.004 6.724 0 7.344 0 7.944v8.12c0 .6-.004 1.22.006 1.82.023.75.12 1.5.24 2.19.317 1.31 1.048 2.31 2.08 3.13a5.022 5.022 0 002.474.824c.65.23 1.33.35 2.01.41.6.06 1.22.07 1.82.07h6.74c.6 0 1.22-.01 1.82-.07.68-.06 1.36-.18 2.01-.41a5.022 5.022 0 002.474-.824c1.032-.82 1.763-1.82 2.08-3.13.12-.69.217-1.44.24-2.19.01-.6.006-1.22.006-1.82V7.944c0-.6.004-1.22-.006-1.82zM12 18.16c-3.398 0-6.16-2.763-6.16-6.16 0-3.398 2.762-6.16 6.16-6.16 3.397 0 6.16 2.762 6.16 6.16 0 3.397-2.763 6.16-6.16 6.16zm6.406-11.114a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88zm-6.406 1.834a4.326 4.326 0 100 8.652 4.326 4.326 0 000-8.652z", color: "text-pink-400" },
                ].map((platform) => (
                  <motion.a
                    key={platform.name}
                    href={platform.name === "Spotify" ? "https://open.spotify.com" : "https://music.apple.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all text-xs font-heading uppercase tracking-wider text-white/80 hover:text-primary"
                  >
                    <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-current ${platform.color}`}>
                      <path d={platform.icon} />
                    </svg>
                    {platform.name}
                  </motion.a>
                ))}
                <motion.span 
                  className="text-white/40 text-xs font-heading uppercase tracking-wider"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  & More
                </motion.span>
              </div>
            </motion.div>

            {/* Staff Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full mb-8"
            >
              <StaffCarousel title="The Team" subtitle="RMC Global Production Staff" />
            </motion.div>

            {/* Artist Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="w-full mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
                <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
                  <Crown className="w-3 h-3" /> The Battle Artists
                </p>
                <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
                {ARTISTS.map((artist, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex-shrink-0 relative rounded-sm overflow-hidden cursor-pointer"
                    style={{
                      width: "140px",
                      height: "185px",
                      scrollSnapAlign: "start",
                      border: "1px solid rgba(212,160,23,0.3)",
                      boxShadow: "0 0 20px rgba(0,0,0,0.6)",
                    }}
                  >
                    <img
                      src={artist.photo}
                      alt={artist.name}
                      className="w-full h-full object-cover object-top"
                      style={{ filter: "contrast(1.05) brightness(0.9)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Quote on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center p-2"
                      style={{ background: "rgba(0,0,0,0.75)" }}
                    >
                      <div className="text-center">
                        <Zap className="w-3 h-3 mx-auto mb-1" style={{ color: "#D4A017" }} />
                        <p className="text-[8px] font-heading uppercase tracking-wider text-white/90">
                          Battle Ready
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Artist Profile Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="w-full mb-6"
            >
              <ArtistProfileCarousel title="The Battle Artists" />
            </motion.div>

            {/* Artist Battle Preview Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.02 }}
              className="w-full mb-8"
            >
              <ArtistBattlePreview />
            </motion.div>

            {/* Mbrace Modeling Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.97 }}
              className="w-full mb-8"
            >
              <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] text-center mb-3">Mbrace Modeling</p>
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
                {MBRACE_PHOTOS.map((photo, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex-shrink-0 relative rounded-sm overflow-hidden cursor-pointer"
                    style={{
                      width: "200px",
                      height: "140px",
                      scrollSnapAlign: "start",
                      border: "1px solid rgba(212,160,23,0.3)",
                      boxShadow: "0 0 20px rgba(0,0,0,0.6)",
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Mbrace Modeling ${i + 1}`}
                      className="w-full h-full object-cover object-center"
                      style={{ filter: "contrast(1.05) brightness(0.9)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vote Now Banner Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.99 }}
              className="w-full mb-8 relative"
            >
              <motion.img
                whileHover={{ scale: 1.02 }}
                src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c21fbd0c5_IMG_7190.png"
                alt="Vote Now - Only One Can Win"
                className="w-full rounded-sm cursor-pointer"
                style={{ border: "1px solid rgba(212,160,23,0.3)", boxShadow: "0 0 30px rgba(0,0,0,0.6)" }}
              />
              {/* Floating badges */}
              <motion.div
                className="absolute -top-3 -right-3 z-10"
                animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="px-3 py-1.5 rounded-sm" style={{ background: "linear-gradient(135deg, #D4A017, #A07800)", boxShadow: "0 0 20px rgba(212,160,23,0.6)" }}>
                  <Crown className="w-4 h-4 text-black" />
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -left-3 z-10"
                animate={{ rotate: [0, -10, 10, 0], y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                <div className="px-3 py-1.5 rounded-sm" style={{ background: "linear-gradient(135deg, #D4A017, #A07800)", boxShadow: "0 0 20px rgba(212,160,23,0.6)" }}>
                  <Zap className="w-4 h-4 text-black" />
                </div>
              </motion.div>
            </motion.div>

            {/* Coming soon mobile app */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="w-full mb-10"
            >
              <div className="flex items-center justify-center gap-3 px-5 py-3 rounded-sm border border-primary/20 bg-primary/5 max-w-sm mx-auto">
                <Smartphone className="w-5 h-5 text-primary flex-shrink-0" style={{ filter: "drop-shadow(0 0 8px rgba(212,160,23,0.6))" }} />
                <div className="text-left">
                  <p className="text-primary font-heading text-[9px] uppercase tracking-[0.3em]">Coming Soon</p>
                  <p className="text-white/80 font-heading text-xs uppercase tracking-wider">Battle Cypher Video — Legends of Glory Mobile App</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enter App button */}
          <div className="pb-12 flex justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 rounded-sm"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    background: "linear-gradient(135deg, #D4A017, #A07800)",
                    filter: "blur(15px)",
                  }}
                />
                <Link
                  to="/home"
                  className="relative flex items-center gap-3 px-10 py-4 font-heading text-sm uppercase tracking-[0.3em] text-primary-foreground rounded-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, #D4A017 0%, #A07800 100%)",
                    boxShadow: "0 0 30px rgba(212,160,23,0.5), 0 4px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  <Crown className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Enter App
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.p
                className="text-center text-white/30 text-[10px] font-heading uppercase tracking-widest mt-3"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Legends of Glory Platform
              </motion.p>
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? "bg-primary w-4" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
