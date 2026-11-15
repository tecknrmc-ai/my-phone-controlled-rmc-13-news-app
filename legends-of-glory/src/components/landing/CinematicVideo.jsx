import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const VIDEO_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/5688163ac_Mar-1-2026-1-1772432863_2950990.mov";

export default function CinematicVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => { if (video.paused) video.play().catch(() => {}); };
    play();
    // Retry on any user interaction (unlocks autoplay on mobile)
    const events = ["click", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, play, { once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, play));
  }, []);

  return (
    <section className="relative bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto px-4 py-4"
      >
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            borderRadius: "8px",
            boxShadow: "0 0 40px rgba(212, 160, 23, 0.25), 0 0 80px rgba(212, 160, 23, 0.1)",
            border: "1px solid rgba(212, 160, 23, 0.3)",
            aspectRatio: "16/9",
          }}
        >
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "contrast(1.06) saturate(1.1) brightness(0.92)" }}
          />
          {/* Cinematic vignette — dark edges, not too heavy */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 65% 55% at 50% 50%, transparent 0%, transparent 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.45) 100%)
              `,
            }}
          />
          {/* Hard focus spotlight — center glow */}
          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 28% 32% at 50% 45%, rgba(255,255,255,0.07) 0%, transparent 60%),
                radial-gradient(ellipse 18% 22% at 50% 45%, rgba(212,160,23,0.05) 0%, transparent 50%)
              `,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
