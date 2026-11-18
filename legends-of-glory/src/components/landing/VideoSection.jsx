import React from "react";
import { motion } from "framer-motion";
import { Film, ExternalLink } from "lucide-react";

const VIDEO_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/2f3c7dcbb_LegendsofGloryPreinterview.mp4";

export default function VideoSection() {
  return (
    <section id="video" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-2">
            Exclusive Preview
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
            The Cypher
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-sm overflow-hidden"
        >
          <video
            controls
            className="w-full aspect-video"
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Headliner title at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background via-background/80 to-transparent p-6 pointer-events-none">
            <h3 className="font-display text-xl md:text-3xl font-bold uppercase tracking-tight text-primary text-center">
              The Legends of Glory Battle Cypher
            </h3>
            <p className="font-heading text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground text-center mt-1">
              Produced by Teckn
            </p>
          </div>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 border border-primary/30 bg-primary/5 rounded-sm p-4 flex items-center justify-center gap-3"
        >
          <Film className="w-5 h-5 text-primary" />
          <p className="text-sm font-heading uppercase tracking-wider text-foreground/80">
            Full Music Video — Coming Soon
          </p>
        </motion.div>

        {/* Streaming Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1DB954] text-white px-6 py-3 rounded-sm font-heading uppercase tracking-wider text-xs hover:bg-[#1DB954]/90 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Listen on Spotify
          </a>
          <a
            href="https://music.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FA243C] text-white px-6 py-3 rounded-sm font-heading uppercase tracking-wider text-xs hover:bg-[#FA243C]/90 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Listen on Apple Music
          </a>
        </div>
      </div>
    </section>
  );
}
