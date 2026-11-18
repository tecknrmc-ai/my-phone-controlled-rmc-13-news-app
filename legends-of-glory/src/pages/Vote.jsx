import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import VoteSection from "../components/landing/VoteSection";
import Footer from "../components/landing/Footer";
import MobileBottomNav from "../components/landing/MobileBottomNav";
import MatrixRain from "../components/landing/MatrixRain";
import ArtistProfileCarousel from "../components/landing/ArtistProfileCarousel";
import { X, Info, List, Smartphone, BookOpen, User, Play } from "lucide-react";

export default function Vote() {
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Matrix rain behind everything */}
      <MatrixRain color="#D4A017" opacity={0.22} />
      {/* Radial spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212,160,23,0.07) 0%, transparent 70%)",
        }}
      />
      <Navbar />
      <div className="relative z-10 pt-20">
        {/* Hero banner image with instructions button */}
        <div className="px-4 mb-4 relative">
          <img
            src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c21fbd0c5_IMG_7190.png"
            alt="Vote Now - Only One Can Win"
            className="w-full max-w-4xl mx-auto rounded-sm block"
            style={{ border: "1px solid rgba(212,160,23,0.3)", boxShadow: "0 0 30px rgba(0,0,0,0.6)" }}
          />
          {/* Voters Instructions Button */}
          <button
            onClick={() => setInstructionsOpen(true)}
            className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 px-4 py-2 rounded-sm font-heading uppercase tracking-wider text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #D4A017, #A07800)",
              color: "#000",
              boxShadow: "0 0 20px rgba(212,160,23,0.6)",
              border: "1px solid rgba(212,160,23,0.8)",
            }}
          >
            <Info className="w-4 h-4" />
            Voters Instructions
          </button>
        </div>

        {/* Artist Profile Carousel */}
        <div className="px-4 mb-4">
          <ArtistProfileCarousel title="Vote for Your Favorite" />
        </div>

        {/* How It Works Steps */}
        <div className="px-4 mb-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
            <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] flex items-center gap-1.5">
              <List className="w-3 h-3" /> How to Participate
            </p>
            <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
        </div>

        {/* Streaming Players */}
        <div className="px-4 mb-6 max-w-4xl mx-auto space-y-3">
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em] text-center mb-3">🎵 Stream the Cypher</p>

          {/* Spotify Embed */}
          <div className="rounded-sm overflow-hidden" style={{ border: "1px solid rgba(212,160,23,0.25)" }}>
            <iframe
              style={{ borderRadius: "0" }}
              src="https://open.spotify.com/embed/album/4cCZdxiVzUhQtLvlzmI4Sk?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify - Legends of Glory"
            />
          </div>

          {/* Apple Music Embed */}
          <div className="rounded-sm overflow-hidden" style={{ border: "1px solid rgba(212,160,23,0.25)" }}>
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="152"
              style={{ width: "100%", overflow: "hidden", background: "transparent" }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/album/legends-of-glory/1866932446?i=1866932460"
              title="Apple Music - Legends of Glory"
            />
          </div>
        </div>

        <VoteSection />
      </div>
      <Footer />
      <MobileBottomNav />
      <div className="h-16 md:hidden" />

      {/* Instructions Popup Modal */}
      {instructionsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setInstructionsOpen(false)}>
          <div 
            className="relative w-full max-w-lg" 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 40%, #111 70%, #080808 100%)",
              border: "1px solid rgba(212,160,23,0.5)",
              boxShadow: "0 0 60px rgba(212,160,23,0.3), 0 0 120px rgba(212,160,23,0.12)",
              borderRadius: "12px",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setInstructionsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ 
                background: "rgba(212,160,23,0.12)", 
                border: "1px solid rgba(212,160,23,0.3)", 
                color: "#D4A017" 
              }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo Banner */}
            <div className="relative h-32 overflow-hidden rounded-t-lg">
              <img
                src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png"
                alt="Legends of Glory"
                className="w-full h-full object-contain"
                style={{ filter: "brightness(1.2)", background: "rgba(0,0,0,0.8)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
                <h2 
                  className="font-display text-2xl uppercase tracking-widest font-bold"
                  style={{ 
                    color: "#D4A017",
                    textShadow: "0 0 20px rgba(212,160,23,0.8)" 
                  }}
                >
                  How to Vote
                </h2>
              </div>
            </div>

            {/* Instructions Content */}
            <div className="p-6 pt-4">
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
                    style={{ 
                      background: "linear-gradient(135deg, #D4A017, #A07800)",
                      color: "#000",
                      boxShadow: "0 0 12px rgba(212,160,23,0.6)"
                    }}
                  >
                    1
                  </div>
                  <div>
                    <h3 className="font-heading uppercase tracking-wider text-sm font-bold text-primary mb-1">
                      Read Artist Backstories
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Go to the Artist page and read through each artist's backstory to understand their journey and style.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
                    style={{ 
                      background: "linear-gradient(135deg, #D4A017, #A07800)",
                      color: "#000",
                      boxShadow: "0 0 12px rgba(212,160,23,0.6)"
                    }}
                  >
                    2
                  </div>
                  <div>
                    <h3 className="font-heading uppercase tracking-wider text-sm font-bold text-primary mb-1">
                      Listen to the Track
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Stream the Battle Cypher track on Spotify or Apple Music to hear each artist's performance.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
                    style={{ 
                      background: "linear-gradient(135deg, #D4A017, #A07800)",
                      color: "#000",
                      boxShadow: "0 0 12px rgba(212,160,23,0.6)"
                    }}
                  >
                    3
                  </div>
                  <div>
                    <h3 className="font-heading uppercase tracking-wider text-sm font-bold text-primary mb-1">
                      Cast Your Vote
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Vote for who you think was the best based on their lyrics, flow, and overall performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div 
                className="h-px mt-6"
                style={{ background: "linear-gradient(to right, transparent, #D4A017, transparent)" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}