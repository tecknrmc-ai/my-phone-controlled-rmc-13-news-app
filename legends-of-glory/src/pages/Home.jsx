import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ChevronRight, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import GloryIQQuiz from "../components/landing/GloryIQQuiz";
import BTSTeaser from "../components/landing/BTSTeaser";
import CommercialSection from "../components/landing/CommercialSection";
import SneakPeekTrailer from "../components/landing/SneakPeekTrailer";
import Navbar from "../components/landing/Navbar";
import BannerCarousel from "../components/landing/BannerCarousel";
import HeroSection from "../components/landing/HeroSection";
import VideoSection from "../components/landing/VideoSection";
import ArtistShowcaseSection from "../components/landing/ArtistShowcaseSection";
import StaffSection from "../components/landing/StaffSection";
import CreditsSection from "../components/landing/CreditsSection";
import Footer from "../components/landing/Footer";
import MobileBottomNav from "../components/landing/MobileBottomNav";
import CranezAdBanner from "../components/landing/CranezAdBanner";
import VoteNowBanner from "../components/landing/VoteNowBanner";
import RmcPresentsBanner from "../components/landing/RmcPresentsBanner";
import DocumentaryAd from "../components/landing/DocumentaryAd";
import TitleCard from "../components/landing/TitleCard";
import HubTab from "../components/landing/HubTab";

const IMG = (id) => `https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/${id}`;

export default function Home() {
  const [iqOpen, setIqOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <TitleCard />
      {/* Top Campaign Header */}
      <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-primary font-heading text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold"
          style={{ textShadow: "0 0 12px rgba(212, 160, 23, 0.6)" }}
        >
          Battle for 100k Marketing Campaign
        </motion.p>
      </div>
      <RmcPresentsBanner />
      {/* Glory IQ Quiz — top launch tab */}
      <section className="relative py-8 px-4 bg-gradient-to-b from-card/50 to-background overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIqOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-sm"
            style={{
              background: "linear-gradient(135deg, #D4A017 0%, #A07800 100%)",
              boxShadow: "0 0 40px rgba(212,160,23,0.4), 0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Brain className="w-6 h-6 text-black" />
            </motion.div>
            <div className="text-left">
              <p className="text-black/80 font-heading text-[10px] uppercase tracking-[0.3em] font-bold">
                Test Your Knowledge
              </p>
              <p className="text-black font-display text-xl md:text-2xl uppercase tracking-wider font-bold">
                Legends of Glory IQ
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-black" />
          </motion.button>
          <p className="text-muted-foreground text-xs mt-3 font-heading uppercase tracking-wider">
            10 Questions · Show your IQ on our biggest project
          </p>
        </div>
      </section>
      <BannerCarousel />
      <CranezAdBanner />

      {/* ── HUB TAB SECTIONS (all start closed) ── */}
      <div className="max-w-5xl mx-auto mt-4 px-2">
        <HubTab
          title="Mbrace Modeling × Legends of Glory"
          description="By Nee'Cole — cinematic modeling commercial"
          image={IMG("0e8d35751_IMG_9160.jpg")}
        >
          <section className="relative py-8 px-2 bg-background overflow-hidden">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6"
              >
                <h2
                  className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 40px rgba(212, 160, 23, 0.5)",
                  }}
                >
                  MbracemodelingxLegendsofglory
                </h2>
                <p className="text-muted-foreground/90 text-sm md:text-base mt-2 font-heading uppercase tracking-[0.2em]">
                  by Nee'Cole
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                  style={{ filter: "contrast(1.1) saturate(1.1) brightness(0.95)" }}
                >
                  <source src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/4a267c9ee_mbracecomm10.mov" type="video/quicktime" />
                </video>
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse 45% 40% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.5) 100%), radial-gradient(ellipse 35% 30% at 50% 50%, rgba(212, 160, 23, 0.08) 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.7) 100%)`,
                  }}
                />
              </motion.div>
            </div>
          </section>
        </HubTab>

        <HubTab
          title="In Honor of Nee'Cole"
          description="Tribute page — a legend remembered"
          image={IMG("c9461a4aa_IMG_4235.jpg")}
        >
          <section className="relative py-8 px-2 bg-gradient-to-b from-background to-card/50">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to="/neecole"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-sm border border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all group"
                  style={{ boxShadow: "0 0 30px rgba(212, 160, 23, 0.2)" }}
                >
                  <Heart className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" style={{ filter: "drop-shadow(0 0 8px rgba(212, 160, 23, 0.6))" }} />
                  <div className="text-left">
                    <p className="text-primary font-heading text-xs uppercase tracking-[0.2em] font-bold">In Honor Of</p>
                    <p className="text-foreground font-display text-lg uppercase tracking-wider">Nee'Cole Tribute Page</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>
        </HubTab>

        <HubTab
          title="The Cypher"
          description="5 artists take the stage — an Inland Empire battle like never before"
          image={IMG("1657e47a1_IMG_7033.jpg")}
        >
          <HeroSection />
          <section className="relative py-12 px-2 bg-gradient-to-b from-background via-background/95 to-card/95 overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-3"
                style={{ textShadow: "0 0 20px rgba(212, 160, 23, 0.5)" }}
              >
                The Cypher
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4"
                style={{
                  background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 40px rgba(212, 160, 23, 0.4)",
                }}
              >
                5 Artists Take the Stage for an Inland Empire Battle Like Never Before
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground/90 text-sm md:text-base leading-relaxed"
              >
                Five elite artists. One cypher. Battle vs. Mode. The Inland Empire and LA collide in the ultimate showcase of lyrical prowess.
              </motion.p>
            </div>
          </section>
        </HubTab>

        <HubTab
          title="The Team"
          description="RMC Global production staff"
          image={IMG("b473f4856_IMG_7054.jpg")}
        >
          <div id="staff">
            <StaffSection />
          </div>
        </HubTab>

        <HubTab
          title="The Battle Artists"
          description="Artist showcase carousel — meet the cypher contenders"
          image={IMG("ec6021ef1_IMG_7032.jpg")}
        >
          <div id="artists">
            <ArtistShowcaseSection />
          </div>
        </HubTab>

        <HubTab
          title="Vote Now"
          description="Only one can win — cast your vote for the cypher champion"
          image={IMG("c21fbd0c5_IMG_7190.png")}
        >
          <VoteNowBanner />
        </HubTab>

        <HubTab
          title="Sneak Peek Trailer"
          description="First look at the Legends of Glory battle cypher"
          image={IMG("d0b78101c_IMG_7031.jpg")}
        >
          <SneakPeekTrailer />
        </HubTab>

        <HubTab
          title="Watch the Cypher"
          description="Full video sections and performances"
          image={IMG("2033579ea_IMG_0507.jpg")}
        >
          <VideoSection />
        </HubTab>

        <HubTab
          title="Commercials"
          description="RMC commercial spots and promos"
          image={IMG("5c7ed6766_IMG_9571.jpg")}
        >
          <CommercialSection />
        </HubTab>

        <HubTab
          title="Behind the Scenes"
          description="BTS teaser — how the cypher came together"
          image={IMG("955bb2b05_IMG_7036.jpg")}
        >
          <BTSTeaser />
        </HubTab>

        <HubTab
          title="Credits"
          description="Production credits — RMC Global"
          image={IMG("135dc082e_BlackModernMSLogo12.png")}
        >
          <div id="credits">
            <CreditsSection />
          </div>
        </HubTab>

        <HubTab
          title="Documentary"
          description="The Legends of Glory documentary — coming soon"
          image={IMG("fd0b4405c_IMG_5978.jpg")}
        >
          <DocumentaryAd />
        </HubTab>
      </div>

      <Footer />
      <MobileBottomNav />
      {/* Spacer so content isn't hidden behind bottom nav on mobile */}
      <div className="h-16 md:hidden" />

      {/* Glory IQ Quiz Popup */}
      <GloryIQQuiz open={iqOpen} onClose={() => setIqOpen(false)} />
    </div>
  );
}
