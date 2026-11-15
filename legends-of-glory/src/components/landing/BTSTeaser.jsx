import React from "react";
import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BTS_VIDEO_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/87ce98de9_bsglo.mov";

export default function BTSTeaser() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-sm overflow-hidden border border-border group"
        >
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-video object-cover"
            style={{ filter: "brightness(0.5) contrast(1.1)" }}
          >
            <source src={BTS_VIDEO_URL} type="video/quicktime" />
            <source src={BTS_VIDEO_URL} type="video/mp4" />
          </video>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.85) 100%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-primary font-heading text-xs uppercase tracking-[0.3em]">Exclusive Access</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground drop-shadow-xl mb-3">
              Behind The Scenes
            </h2>
            <p className="text-muted-foreground text-sm max-w-md font-heading uppercase tracking-wider mb-6">
              Go inside the studio & set — stories, videos & more
            </p>
            <Link
              to="/behind-the-scenes"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-heading uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors rounded-sm"
            >
              <Camera className="w-4 h-4" />
              Explore BTS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
