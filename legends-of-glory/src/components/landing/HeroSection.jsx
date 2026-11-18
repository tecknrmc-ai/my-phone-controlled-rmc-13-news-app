import React from "react";
import { motion } from "framer-motion";
import { Play, Music } from "lucide-react";
import ArtistCarousel from "./ArtistCarousel";
import LogoWithMatrixEffects from "./LogoWithMatrixEffects";

const VIDEO_URL = "https://media.base44.com/videos/public/user_697099ce8b25797c6c3cf9b2/8382dee6b_RecordIt-1771812791.mov";
const CINEMATIC_PHOTO = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/4163690de_IMG_4232.jpg";
const SPOTLIGHT_PHOTO = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/fd2dce69c_IMG_0756.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src={VIDEO_URL} type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Artist Profile Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10"
        >
          <ArtistCarousel />
        </motion.div>

        {/* Logo with 3D effects and matrix animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <LogoWithMatrixEffects />
        </motion.div>

        {/* Cinematic spotlight photo with vignette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-10 relative mx-auto max-w-md"
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)',
            border: '1px solid rgba(212, 160, 23, 0.4)',
          }}
        >
          {/* Spotlight overlay - hard focus center, not too dark */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(ellipse 50% 45% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.75) 100%),
                radial-gradient(ellipse 40% 35% at 50% 35%, rgba(212, 160, 23, 0.08) 0%, transparent 70%)
              `,
            }}
          />
          {/* Hard vignette - dark corners */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, transparent 40%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.92) 100%)
              `,
            }}
          />
          <img
            src={SPOTLIGHT_PHOTO}
            alt="Legends of Glory Artist"
            className="w-full h-auto object-cover"
            style={{
              filter: 'contrast(1.1) saturate(1.15) brightness(0.92)',
            }}
          />
        </motion.div>

        {/* Executive Producers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-6"
        >
          <p className="text-primary font-heading text-xs md:text-sm uppercase tracking-[0.25em] mb-4">
            Executive Produced by Teckn, Nicole, Nee'Cole, &amp; Cash Champ
          </p>
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/ca17a75cb_IMG_8841.jpg"
              alt="Teckn"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-primary/30"
            />
            <img
              src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/cc58ff4c2_IMG_9032.jpg"
              alt="Nicole"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-primary/30"
            />
            <img
              src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/0d22a5396_IMG_9008.jpg"
              alt="Nee'Cole"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-primary/30"
            />
            <img
              src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/f696e4913_IMG_8969.jpg"
              alt="Cash Champ"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-primary/30"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-muted-foreground text-xs md:text-sm tracking-[0.3em] uppercase mb-8 font-heading"
        >
          Inland Empire × Los Angeles
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-muted-foreground text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed"
        >
          Five elite artists. One cypher. Battle vs. Mode. 
          The Inland Empire and LA collide in the ultimate showcase.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#video"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-heading uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors rounded-sm"
          >
            <Play className="w-4 h-4" />
            Watch Teaser
          </a>
          <a
            href="#vote"
            className="flex items-center gap-2 border border-primary text-primary px-8 py-3 font-heading uppercase tracking-wider text-sm hover:bg-primary/10 transition-colors rounded-sm"
          >
            <Music className="w-4 h-4" />
            Vote Now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-xs font-heading uppercase tracking-widest"
          >
            ▶ Spotify
          </a>
          <span className="text-border">|</span>
          <a
            href="https://music.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-xs font-heading uppercase tracking-widest"
          >
            ▶ Apple Music
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-12 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-pulse" />
      </motion.div>
    </section>
  );
}
