import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function CranezAdBanner() {
  return (
    <section className="relative py-6 px-4 bg-gradient-to-r from-background via-card/50 to-background border-y border-primary/20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-xl"
          style={{
            background: "linear-gradient(135deg, rgba(212, 160, 23, 0.08) 0%, rgba(212, 160, 23, 0.03) 100%)",
            border: "1px solid rgba(212, 160, 23, 0.3)",
            boxShadow: "0 0 30px rgba(212, 160, 23, 0.1)",
          }}
        >
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-heading uppercase tracking-[0.3em] text-primary/80">Sponsored</p>
            <div className="w-px h-4 bg-primary/30" />
            <p className="text-xs md:text-sm font-heading uppercase tracking-wider text-foreground/80">
              Music distribution & publishing
            </p>
          </div>
          <a
            href="https://cranezmusicdistro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-primary text-primary-foreground font-heading text-xs uppercase tracking-[0.15em] hover:bg-primary/90 transition-colors group"
            style={{ boxShadow: "0 0 20px rgba(212, 160, 23, 0.4)" }}
          >
            Check out cranezmusicdistro.com
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
