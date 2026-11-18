import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, Play, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import MobileBottomNav from "../components/landing/MobileBottomNav";

const BTS_VIDEO_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/87ce98de9_bsglo.mov";
const MANNY_VIDEO_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/df73cd98d_IMG_5683.mov";

const ARTICLES = [
  {
    title: "Inside the Studio: Recording Legends of Glory",
    subtitle: "How five artists laid down their verses in one session",
    icon: Mic,
    type: "Recording",
  },
  {
    title: "On Location: Filming the Cypher in Houston",
    subtitle: "A look at the cameras, crew, and creative vision behind the shoot",
    icon: Camera,
    type: "Filming",
  },
  {
    title: "The Making of a Battle Cypher",
    subtitle: "From concept to screen — the full story of Legends of Glory",
    icon: BookOpen,
    type: "Story",
  },
];

export default function BehindTheScenes() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    base44.entities.Artist.list("order", 50).then(data => setArtists(data || []));
  }, []);

  const artistsWithBts = artists.filter(a => a.recording_story || a.filming_story);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-16 overflow-hidden">
        <div className="relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-[60vh] object-cover"
            style={{ filter: "brightness(0.6) contrast(1.1)" }}
          >
            <source src={BTS_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.85) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-2">Exclusive Access</p>
              <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground drop-shadow-2xl">
                Behind The Scenes
              </h1>
              <p className="text-muted-foreground font-heading uppercase tracking-wider text-sm mt-3">
                Legends of Glory — The Making Of
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mbrace Modeling Video */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-center"
          >
            <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-2">Mbrace Modeling</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground">
              Shutting Down the Cypher
            </h2>
            <p className="text-muted-foreground font-heading uppercase tracking-wider text-sm mt-2">
              Beautiful models from all over join Mbrace Modeling on the Glory Season 1 set
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden border border-primary/30"
            style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.2)" }}
          >
            <video controls playsInline preload="metadata" className="w-full aspect-video bg-black">
              <source src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/513d421e4_logs1.mov" type="video/quicktime" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* Manny Featured Video */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-center"
          >
            <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-2">Featured</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground">
              Manny from 713 Studios Masters Legends of Glory Battle Cypher
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden border border-primary/30"
            style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.2)" }}
          >
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 35%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.95) 100%)" }}
            />
            <video autoPlay loop muted playsInline className="w-full aspect-video bg-black">
              <source src={MANNY_VIDEO_URL} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 pb-24 space-y-16">

        {/* Featured BTS Video */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-1">Exclusive</p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">Featured Video</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden border border-border"
          >
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.9) 100%)" }}
            />
            <video controls className="w-full aspect-video bg-black">
              <source src={BTS_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background via-background/70 to-transparent p-4 text-center pointer-events-none">
              <p className="font-display text-lg md:text-2xl font-bold uppercase tracking-tight text-primary">
                Legends of Glory — Behind the Scenes
              </p>
            </div>
          </motion.div>
        </section>

        {/* Articles / Headliners */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-1">Insider Stories</p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">Headliners</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ARTICLES.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-sm p-5 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center">
                    <article.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-heading uppercase tracking-widest text-primary">{article.type}</span>
                </div>
                <h3 className="font-display text-base uppercase font-bold text-foreground leading-tight mb-2">{article.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{article.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Artist BTS Stories */}
        {artistsWithBts.length > 0 && (
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
              <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-1">The Artists</p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight">Their Stories</h2>
            </motion.div>
            <div className="space-y-6">
              {artistsWithBts.map((artist, i) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-sm overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-4 border-b border-border">
                    {artist.photo_url ? (
                      <img src={artist.photo_url} alt={artist.name} className="w-12 h-12 rounded-full object-cover border border-border flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-heading font-bold text-lg flex-shrink-0">
                        {artist.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-lg uppercase font-bold text-primary">{artist.name}</h3>
                      {(artist.city || artist.state) && (
                        <p className="text-muted-foreground text-xs">{[artist.city, artist.state].filter(Boolean).join(", ")}</p>
                      )}
                    </div>
                    <Link
                      to={`/artist/${artist.id}`}
                      className="ml-auto text-xs font-heading uppercase tracking-wider text-primary border border-primary/40 px-3 py-1.5 rounded-sm hover:bg-primary/10 transition-colors flex-shrink-0"
                    >
                      Full Hub →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    {artist.recording_story && (
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Mic className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-heading uppercase tracking-widest text-primary">Recording</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{artist.recording_story}</p>
                      </div>
                    )}
                    {artist.filming_story && (
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-heading uppercase tracking-widest text-primary">Filming</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{artist.filming_story}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
      <MobileBottomNav />
      <div className="h-16 md:hidden" />
    </div>
  );
}
