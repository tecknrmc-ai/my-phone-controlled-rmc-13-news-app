import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Music, Play, ExternalLink, X } from "lucide-react";

const VIDEO_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/9940bfe82_logs1.mov";

export default function CypherStoryPopup({ open, onOpenChange }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;
    const play = () => { if (video.paused) video.play().catch(() => {}); };
    play();
    const events = ["click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, play, { once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, play));
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-card border-primary/30 text-foreground max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors border border-white/20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cinematic Video Header */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "contrast(1.06) saturate(1.1) brightness(0.92)" }}
          />

          {/* Dark cinematic vignette — subtle edges, not too dark */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(ellipse 65% 55% at 50% 50%, transparent 0%, transparent 45%, rgba(0,0,0,0.15) 72%, rgba(0,0,0,0.35) 100%)
              `,
            }}
          />

          {/* Hard focus spotlight — center glow */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: `
                radial-gradient(ellipse 30% 35% at 50% 48%, rgba(255,255,255,0.06) 0%, transparent 60%),
                radial-gradient(ellipse 20% 25% at 50% 48%, rgba(212,160,23,0.04) 0%, transparent 50%)
              `,
            }}
          />

          {/* Glory Season 1 Title Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-16 pb-3 px-4">
            <p className="text-primary font-heading tracking-[0.3em] text-[10px] uppercase mb-1 text-center"
              style={{ textShadow: "0 0 12px rgba(212,160,23,0.6)" }}
            >
              RMCGLOBAL Presents
            </p>
            <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-white text-center"
              style={{ textShadow: "0 0 30px rgba(255,255,255,0.5)" }}
            >
              Glory Season 1
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 pt-5">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase tracking-tight text-center"
              style={{
                background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Legends of Glory Battle Cypher
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-muted-foreground leading-relaxed space-y-4 font-body mt-4">
            <p>
              In the heart of the Inland Empire, five elite artists stepped into one ring for a battle unlike any other.
              Executive producers <strong className="text-foreground">Teckn</strong>,{" "}
              <strong className="text-foreground">Cash Champ Nicole</strong>, and{" "}
              <strong className="text-foreground">NEECOLE</strong> brought together
              a lineup built on raw talent, lyrical fire, and pure competitive energy.
            </p>

            <p>
              <strong className="text-foreground">Bizzybaggz</strong> brought street-born aggression and G-Funk swagger.
              <strong className="text-foreground"> Hottunez</strong> delivered melodic anthems and infectious energy.
              <strong className="text-foreground"> Nef</strong> came with battle-ready bars and technical precision.
              <strong className="text-foreground"> Kxng D.O.P.E.</strong> laid down conscious, emotional storytelling.
              And <strong className="text-foreground">directedxgotti</strong> brought the full cinematic vision — both behind and in front of the camera.
            </p>

            <p>
              Each artist battled head-to-head in a cypher format, pouring everything they had into every bar.
              The energy was electric, the competition fierce, and the stakes couldn't be higher —
              a <strong className="text-foreground">$100K marketing campaign</strong> is on the line for the winner.
            </p>
          </div>

          {/* Soundtrack Section */}
          <div className="mt-6 pt-5 border-t border-border">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <Music className="w-4 h-4 text-primary" />
              <p className="font-heading text-sm uppercase tracking-[0.2em] text-foreground font-bold">
                Listen to the Soundtrack Now
              </p>
            </div>

            {/* Spotify Embed Player — direct playback */}
            <div className="rounded-sm overflow-hidden border border-border mb-4"
              style={{ boxShadow: "0 0 20px rgba(212,160,23,0.15)" }}
            >
              <iframe
                src="https://open.spotify.com/embed/track/7m2qU0nLYkSp58MNfDuee2?utm_source=generator"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full"
                title="Legends of Glory — Teckn"
              />
            </div>

            {/* Streaming Links */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://open.spotify.com/track/7m2qU0nLYkSp58MNfDuee2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-[#1DB954]/10 border border-[#1DB954]/30 hover:bg-[#1DB954]/20 transition-colors text-xs font-heading uppercase tracking-wider text-foreground"
              >
                <span className="text-[#1DB954] text-base font-bold">♪</span> Spotify
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href="https://music.apple.com/us/album/legends-of-glory-single/1866932446"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-[#FC3C44]/10 border border-[#FC3C44]/30 hover:bg-[#FC3C44]/20 transition-colors text-xs font-heading uppercase tracking-wider text-foreground"
              >
                <span className="text-[#FC3C44] text-base font-bold">♫</span> Apple Music
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href="https://tidal.com/search?q=Teckn+Legends+of+Glory"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-foreground/5 border border-border hover:bg-foreground/10 transition-colors text-xs font-heading uppercase tracking-wider text-foreground"
              >
                <span className="text-foreground text-base font-bold">♪</span> Tidal
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-6 pt-5 border-t border-border">
            <Link
              to="/vote"
              onClick={() => onOpenChange(false)}
              className="block w-full text-center px-6 py-3 rounded-sm bg-primary text-primary-foreground font-display text-base uppercase tracking-[0.15em] font-bold hover:bg-primary/90 transition-colors"
              style={{ boxShadow: "0 0 25px rgba(212, 160, 23, 0.4)" }}
            >
              Go Vote Now
            </Link>

            <p className="text-[10px] text-muted-foreground/60 text-center font-heading uppercase tracking-[0.15em]">
              Vote on the Soundtrack Now
            </p>

            <div className="flex items-center justify-center gap-2 pt-2">
              <Play className="w-3 h-3 text-primary/60" />
              <p className="text-[10px] text-primary/70 text-center font-heading uppercase tracking-[0.2em]">
                Battle Cypher Music Video — Coming Soon
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}