import React from "react";
import { motion } from "framer-motion";
import { Play, Menu, ChevronDown, Mic, Zap, Shield, Trophy, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";

export default function TitleCard() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Background gradient and watermark */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, rgba(212, 160, 23, 0.08) 0%, transparent 70%)"
        }} />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <h1 className="font-display text-[20vw] font-bold uppercase tracking-tighter text-white">LEGENDS OF GLORY</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 text-center">
        
        {/* Header Icons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <img src={LOGO_URL} alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center">
            <span className="text-[8px] font-heading uppercase tracking-widest text-primary">LOG</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center">
            <span className="text-xs text-primary font-bold"></span>
          </div>
          <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center">
            <Play className="w-4 h-4 text-primary" />
          </div>
        </motion.div>

        {/* App Store Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-6"
        >
          Coming Soon to the App Store & Google Play
        </motion.p>

        {/* Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center justify-between mb-8 px-2"
        >
          <Link to="/" className="text-primary hover:text-primary-light transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <Menu className="w-6 h-6 text-primary" />
        </motion.div>

        {/* Dropdown Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-primary rounded-full mb-8 cursor-pointer hover:border-primary-light transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[10px] font-heading uppercase tracking-widest text-primary">Legends of Glory</span>
          <ChevronDown className="w-3 h-3 text-primary" />
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-3">
            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight" style={{
              background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212, 160, 23, 0.5)"
            }}>
              LEGENDS
            </h1>
            <div className="bg-red-600 px-3 py-1 rounded-sm">
              <span className="text-white text-xs font-bold uppercase tracking-wider">OF</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight" style={{
              background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212, 160, 23, 0.5)"
            }}>
              GLORY
            </h1>
          </div>
        </motion.div>

        {/* Subtitle with lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
          <p className="text-primary font-heading text-xs uppercase tracking-[0.3em] font-bold">
            Where Legends Are Forged
          </p>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
        </motion.div>

        {/* Attribute Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center justify-center gap-6 mb-4"
        >
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-heading uppercase tracking-wider text-gray-300">Rap Battle</span>
          </div>
          <div className="w-px h-4 bg-primary/30" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-heading uppercase tracking-wider text-gray-300">Hip-Hop</span>
          </div>
          <div className="w-px h-4 bg-primary/30" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-heading uppercase tracking-wider text-gray-300">Competition</span>
          </div>
        </motion.div>

        {/* Sub-attribute */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-primary font-heading text-xs uppercase tracking-[0.2em] mb-6"
        >
          🏆 RMC13
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md mx-auto"
        >
          The ultimate rap battle competition. Season 1 — where the most talented artists in the game step into the arena to claim glory.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="px-8 py-3 border border-white rounded-full bg-black text-white text-xs font-heading uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all cursor-pointer"
        >
          Season 1
        </motion.button>
      </div>
    </section>
  );
}
