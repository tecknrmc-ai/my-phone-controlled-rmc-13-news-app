import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Music, Film, Sparkles, Star } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import MobileBottomNav from "../components/landing/MobileBottomNav";

const HONOR_PHOTOS = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/379c8f418_IMG_1151.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c0948b950_IMG_1139copy.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/27bff2815_IMG_9008.jpg",
];

const BANNER_PHOTO = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/3f98f22f0_IMG_1139copy.jpg";

const BTS_PHOTOS = [
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/0e2759262_IMG_8919.jpg",
  "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/df2d5cca4_IMG_8914.jpg",
];

const TRIBUTE_VIDEO = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/4a267c9ee_mbracecomm10.mov";

export default function Neecole() {
  const [honorSlide, setHonorSlide] = useState(0);
  const [btsSlide, setBtsSlide] = useState(0);

  useEffect(() => {
    const honorTimer = setInterval(() => {
      setHonorSlide((prev) => (prev + 1) % HONOR_PHOTOS.length);
    }, 5000);
    const btsTimer = setInterval(() => {
      setBtsSlide((prev) => (prev + 1) % BTS_PHOTOS.length);
    }, 5000);
    return () => {
      clearInterval(honorTimer);
      clearInterval(btsTimer);
    };
  }, []);

  const nextHonorSlide = () => setHonorSlide((prev) => (prev + 1) % HONOR_PHOTOS.length);
  const prevHonorSlide = () => setHonorSlide((prev) => (prev - 1 + HONOR_PHOTOS.length) % HONOR_PHOTOS.length);
  const nextBtsSlide = () => setBtsSlide((prev) => (prev + 1) % BTS_PHOTOS.length);
  const prevBtsSlide = () => setBtsSlide((prev) => (prev - 1 + BTS_PHOTOS.length) % BTS_PHOTOS.length);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-background via-card to-background overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
            <source src={TRIBUTE_VIDEO} type="video/quicktime" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Heart className="w-12 h-12 mx-auto text-primary mb-4" style={{ filter: "drop-shadow(0 0 20px rgba(212, 160, 23, 0.6))" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading tracking-[0.3em] text-xs uppercase mb-2 text-primary"
          >
            In Loving Memory
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-primary mb-6"
            style={{
              background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212, 160, 23, 0.5)",
            }}
          >
            Nee'Cole
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed italic"
          >
            Visionary. Creator. Legend. The heart behind Legends of Glory.
          </motion.p>
        </div>
      </section>

      {/* Tribute Video */}
      <section className="relative py-12 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
              border: "1px solid rgba(212, 160, 23, 0.4)",
              aspectRatio: "16/9",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "contrast(1.1) saturate(1.1) brightness(0.95)",
              }}
            >
              <source src={TRIBUTE_VIDEO} type="video/quicktime" />
            </video>

            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `
                  radial-gradient(ellipse 45% 40% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.5) 100%),
                  radial-gradient(ellipse 35% 30% at 50% 50%, rgba(212, 160, 23, 0.08) 0%, transparent 70%)
                `,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `
                  radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.7) 100%)
                `,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Mbrace Modeling Video */}
      <section className="relative py-12 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-2">Mbrace Modeling</p>
            <h2
              className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight"
              style={{
                background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Shutting Down the Cypher
            </h2>
            <p className="text-muted-foreground/90 text-sm mt-2 font-heading uppercase tracking-[0.2em]">
              Beautiful models from all over join Mbrace Modeling on the Glory Season 1 set
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
              border: "1px solid rgba(212, 160, 23, 0.4)",
              aspectRatio: "16/9",
            }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "contrast(1.1) saturate(1.1) brightness(0.95)" }}
            >
              <source src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/513d421e4_logs1.mov" type="video/quicktime" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* The Vision Story */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-card/50 to-background">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-primary">
                The Vision
              </h2>
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground/90 leading-relaxed text-lg max-w-3xl mx-auto">
              What began as an Mbrace modeling commercial transformed into possibly one of the biggest battle cyphers 
              the Inland Empire will ever witness. Nee'Cole's vision was to create something extraordinary — a platform 
              where talent, dedication, and culture would collide in the ultimate showcase of hip-hop excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-primary pl-6 md:pl-8"
          >
            <h3 className="font-display text-2xl uppercase font-bold text-primary mb-3">A Dream Born from Community</h3>
            <p className="text-foreground/80 leading-relaxed">
              Together with Teckn, Nee'Cole dreamed of uniting the Inland Empire and Los Angeles hip-hop communities. 
              They saw beyond competition — they saw celebration. They saw a stage where five elite artists could tell 
              their stories, showcase their gifts, and compete for glory in front of an audience that truly understands 
              the grind.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-6 h-6 text-primary" />
              <h3 className="font-display text-2xl uppercase font-bold text-primary">The Artists</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Nee'Cole personally selected five distinct voices to represent the diversity of the culture. 
              Bizzybaggz with raw street narratives. Hottunez delivering melodic anthems. Nef with battle-ready precision. 
              Kxng D.O.P.E. bringing conscious depth. Directedxgotti bridging visual and musical worlds. 
              Each artist was chosen not just for talent, but for their unique contribution to the hip-hop landscape.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Film className="w-6 h-6 text-primary" />
              <h3 className="font-display text-2xl uppercase font-bold text-primary">The Production</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              From pre-production to post, every detail was crafted with precision and love. Camera operators, 
              audio engineers, editors — all united by Nee'Cole's vision to create a cinematic experience that 
              honors the artists and the culture they represent. This was more than production — it was devotion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative p-8 rounded-xl border border-primary/30"
            style={{ background: "linear-gradient(135deg, rgba(212, 160, 23, 0.05), transparent)" }}
          >
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-display text-2xl uppercase font-bold text-primary mb-3">The Legacy</h3>
              <p className="text-foreground/90 leading-relaxed max-w-2xl mx-auto">
                Legends of Glory is Nee'Cole's enduring gift to the culture. A movement that gives back to the 
                communities that raised us, creates opportunities for the next generation, and proves that the 
                Inland Empire and Los Angeles are forces to be reckoned with. This is her legacy. This is her glory.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Galleries */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-card/95 via-background to-card/95 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full text-center mb-12"
          >
            <h2
              className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6"
              style={{
                background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(212, 160, 23, 0.4)",
              }}
            >
              Memories & Moments
            </h2>
            <div className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full mb-12"
          >
            <div
              className="relative w-full mx-auto"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
                border: "1px solid rgba(212, 160, 23, 0.4)",
                maxHeight: "400px",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `
                    radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.35) 100%),
                    radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212, 160, 23, 0.05) 0%, transparent 75%)
                  `,
                }}
              />
              <img
                src={BANNER_PHOTO}
                alt="Nee'Cole - Legends of Glory"
                className="w-full h-full object-cover object-top"
                style={{
                  filter: "contrast(1.15) saturate(1.2) brightness(0.95)",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 justify-center items-center"
          >
            {/* Honor carousel */}
            <div className="text-center">
              <p className="text-primary font-heading text-xs uppercase tracking-[0.2em] mb-4">In Honor</p>
              <div
                className="relative"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
                  border: "1px solid rgba(212, 160, 23, 0.4)",
                  width: "280px",
                  height: "400px",
                }}
              >
                <button
                  onClick={prevHonorSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
                >
                  <span className="text-xl">‹</span>
                </button>
                <button
                  onClick={nextHonorSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
                >
                  <span className="text-xl">›</span>
                </button>

                {HONOR_PHOTOS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: honorSlide === idx ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background: `
                          radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.3) 100%),
                          radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212, 160, 23, 0.03) 0%, transparent 75%)
                        `,
                      }}
                    />
                    <img
                      src={HONOR_PHOTOS[idx]}
                      alt={`Nee'Cole Memorial ${idx + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        filter: "contrast(1.18) saturate(1.25) brightness(0.97)",
                      }}
                    />
                  </motion.div>
                ))}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {HONOR_PHOTOS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHonorSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === honorSlide ? "bg-primary w-4" : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* BTS carousel */}
            <div className="text-center">
              <p className="text-primary font-heading text-xs uppercase tracking-[0.2em] mb-4">Behind The Scenes</p>
              <div
                className="relative"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 0 60px rgba(212, 160, 23, 0.3), 0 0 120px rgba(212, 160, 23, 0.15)",
                  border: "1px solid rgba(212, 160, 23, 0.4)",
                  width: "280px",
                  height: "400px",
                }}
              >
                <button
                  onClick={prevBtsSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
                >
                  <span className="text-xl">‹</span>
                </button>
                <button
                  onClick={nextBtsSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
                >
                  <span className="text-xl">›</span>
                </button>

                {BTS_PHOTOS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: btsSlide === idx ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background: `
                          radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.3) 100%),
                          radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212, 160, 23, 0.03) 0%, transparent 75%)
                        `,
                      }}
                    />
                    <img
                      src={BTS_PHOTOS[idx]}
                      alt={`Behind The Scenes ${idx + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        filter: "contrast(1.18) saturate(1.25) brightness(0.97)",
                      }}
                    />
                  </motion.div>
                ))}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {BTS_PHOTOS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBtsSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === btsSlide ? "bg-primary w-4" : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Tribute */}
      <section className="py-20 px-4 bg-gradient-to-t from-card to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-primary" style={{ filter: "drop-shadow(0 0 30px rgba(212, 160, 23, 0.6))" }} />
            <h2
              className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6"
              style={{
                background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(212, 160, 23, 0.4)",
              }}
            >
              Forever in Our Glory
            </h2>
            <p className="text-muted-foreground/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto italic">
              "Legends never die — they become the foundation for future greatness."
            </p>
            <p className="text-muted-foreground/80 text-sm mt-6">
              Thank you, Nee'Cole, for your vision, your passion, and your unwavering belief in the culture. 
              The Battle Cypher lives on because you made it possible.
            </p>
            <div className="mt-12 flex items-center justify-center gap-2 text-primary font-heading uppercase tracking-[0.2em] text-xs">
              <span>Rest In Power</span>
              <span>•</span>
              <span>Forever Legendary</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
      <div className="h-16 md:hidden" />
    </div>
  );
}
