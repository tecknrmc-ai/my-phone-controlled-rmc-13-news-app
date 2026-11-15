import React from "react";
import { motion } from "framer-motion";

const COMMERCIAL_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/15d9c9bee_logcommercialtheatre.mov";

export default function CommercialSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-sm overflow-hidden border border-border"
        >
          {/* Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-video object-cover"
            style={{ filter: "brightness(0.75) contrast(1.15)" }}
          >
            <source src={COMMERCIAL_URL} type="video/mp4" />
          </video>

          {/* Hard spotlight vignette — dark edges, bright center focus */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 0%, transparent 25%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.82) 80%, rgba(0,0,0,0.94) 100%)",
            }}
          />

          {/* Bottom gradient for headline legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

          {/* Headliner */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 text-center pointer-events-none">
            <p className="text-primary font-heading tracking-[0.3em] text-[10px] uppercase mb-1">Breaking</p>
            <h2 className="font-display text-xl md:text-3xl font-bold uppercase tracking-tight text-foreground drop-shadow-2xl leading-tight">
              San Bernardino Turns Up Cypher Heat
              <br />
              <span className="text-primary">With 5 Battle Artists</span>
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
