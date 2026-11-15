import React from "react";
import { motion } from "framer-motion";
import { Film, Music, MapPin, Users, Trophy } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import BackstoryCarousel from "../components/landing/BackstoryCarousel";
import Footer from "../components/landing/Footer";
import ArtistVersePreviewCarousel from "../components/landing/ArtistVersePreviewCarousel";
import ArtistBackstoryHub from "../components/landing/ArtistBackstoryHub";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";
const VIDEO_URL = "https://media.base44.com/videos/public/user_697099ce8b25797c6c3cf9b2/8382dee6b_RecordIt-1771812791.mov";

export default function Backstory() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-background via-card to-background overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0 opacity-60">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={VIDEO_URL} type="video/quicktime" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src={LOGO_URL} alt="Legends of Glory" className="w-56 h-56 mx-auto object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading tracking-[0.3em] text-xs uppercase mb-2 text-primary"
          >
            The Origin Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-primary mb-6"
            style={{ textShadow: "0 0 40px rgba(212, 160, 23, 0.5)" }}
          >
            Legends of Glory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Where the Inland Empire meets Los Angeles in the ultimate hip-hop showcase
          </motion.p>
        </div>
      </section>

      {/* Artist Backstory Hub — dropdown choice menu */}
      <ArtistBackstoryHub />

      {/* Artist Verse Preview Carousel */}
      <ArtistVersePreviewCarousel />

      {/* Photo Carousel */}
      <BackstoryCarousel />

      {/* Story Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl uppercase font-bold text-primary mb-4">The Mission</h2>
            <p className="text-foreground/90 leading-relaxed max-w-3xl mx-auto">
              Legends of Glory was born from a vision to unite two of California's most vibrant hip-hop communities. 
              The Inland Empire and Los Angeles have long been powerhouses of West Coast culture, yet rarely do they 
              collide on one stage. This is more than a battle—it's a celebration of talent, dedication, and the 
              unbreakable spirit of artists who refuse to be overlooked.
            </p>
          </motion.div>

          {/* The Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-primary pl-6 md:pl-8"
          >
            <h3 className="font-display text-2xl uppercase font-bold text-primary mb-3">The Vision</h3>
            <p className="text-foreground/80 leading-relaxed">
              Executive produced by Teckn, Nicole, Nee'Cole, and Cash Champ, Legends of Glory represents the culmination 
              of years of dedication to the culture. The goal was simple yet ambitious: create a platform where five 
              elite artists could showcase their skills, tell their stories, and compete for glory in front of an 
              audience that understands the grind.
            </p>
          </motion.div>

          {/* The Artists */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="font-display text-2xl uppercase font-bold text-primary">The Artists</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Five artists. Five distinct voices. Bizzybaggz brings raw street narratives from Riverside. Hottunez 
              delivers melodic anthems from San Bernardino. Nef represents battle-ready technical precision. 
              Kxng D.O.P.E. offers conscious introspection and emotional depth. Directedxgotti bridges the visual 
              and musical worlds. Each artist was selected not just for their talent, but for their unique 
              contribution to the IE hip-hop landscape.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Together, they represent the diversity, creativity, and resilience of a region that has consistently 
              produced some of hip-hop's most authentic voices.
            </p>
          </motion.div>

          {/* The Production */}
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
            <p className="text-foreground/80 leading-relaxed mb-4">
              Behind every great performance is a team of dedicated professionals. From pre-production with Nef to 
              post-production led by Chains, every detail was crafted with precision. Camera operators Mikeshootit, 
              J-Hyde, Kev, and Tabs captured every angle, while Manny ensured the audio met industry standards.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              The result is a cinematic experience that honors the artists and the culture they represent.
            </p>
          </motion.div>

          {/* The Cypher */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative p-8 rounded-xl border border-primary/30"
            style={{ background: "linear-gradient(135deg, rgba(212, 160, 23, 0.05), transparent)" }}
          >
            <div className="text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-display text-2xl uppercase font-bold text-primary mb-3">The Battle Cypher</h3>
              <p className="text-foreground/90 leading-relaxed max-w-2xl mx-auto">
                This is where legends are made. Five artists. One stage. Infinite possibilities. 
                The Battle Cypher isn't just about competition—it's about elevation. Each artist 
                brings their A-game, pushing themselves and each other to new heights. The energy 
                is electric, the bars are lethal, and the glory is eternal.
              </p>
            </div>
          </motion.div>

          {/* The Community */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="font-display text-2xl uppercase font-bold text-primary">The Community</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              Legends of Glory is more than a project—it's a movement. It's about giving back to the communities 
              that raised us, creating opportunities for the next generation, and proving that the Inland Empire 
              and Los Angeles are force to be reckoned with in the hip-hop world. This is our legacy. This is our glory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-t from-card to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl uppercase font-bold text-primary mb-6">Be Part of The Glory</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Watch the cypher. Vote for your favorite artist. Share the movement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#vote"
                className="inline-block text-sm font-heading uppercase tracking-wider px-8 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Vote Now
              </a>
              <a
                href="/"
                className="inline-block text-sm font-heading uppercase tracking-wider px-8 py-3 rounded-sm border border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                Watch The Cypher
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
