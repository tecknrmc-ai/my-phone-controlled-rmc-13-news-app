import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Users, Crown } from "lucide-react";

const ARTISTS = [
  {
    name: "Bizzy Baggz",
    card: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/b09ca1903_IMG_1377.jpg",
  },
  {
    name: "Hot Tunez",
    card: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/41a6e024e_IMG_1378.jpg",
  },
  {
    name: "Nef T.A.M.",
    card: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/50d67a461_IMG_1384.jpg",
  },
  {
    name: "Kxng D.O.P.E.",
    card: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/cd4d271df_IMG_1380.jpg",
  },
  {
    name: "Gotti",
    card: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/df8022cf8_IMG_1383.jpg",
  },
];

export default function ArtistBackstoryHub() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background via-card/40 to-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Users className="w-5 h-5 text-primary" />
            <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em]">
              Artist Backstory Hub
            </p>
          </div>
          <h2
            className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight"
            style={{
              background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212,160,23,0.4)",
            }}
          >
            Choose Your Artist
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg mx-auto">
            Select an artist from the menu to reveal their Glory Figure backstory card.
          </p>
        </motion.div>

        {/* Dropdown */}
        <div className="relative max-w-md mx-auto mb-10">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-sm transition-all"
            style={{
              background: "linear-gradient(135deg, rgba(212,160,23,0.12), rgba(212,160,23,0.04))",
              border: "1px solid rgba(212,160,23,0.45)",
              boxShadow: "0 0 24px rgba(212,160,23,0.15)",
            }}
          >
            <span className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-primary" />
              <span className="font-heading text-sm uppercase tracking-[0.2em] text-primary">
                {selected ? selected.name : "Select an Artist"}
              </span>
            </span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-5 h-5 text-primary" />
            </motion.span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 z-30 overflow-hidden rounded-sm"
                style={{
                  background: "rgba(13,13,13,0.98)",
                  border: "1px solid rgba(212,160,23,0.4)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.8)",
                }}
              >
                {ARTISTS.map((artist, i) => (
                  <motion.button
                    key={artist.name}
                    whileHover={{ x: 4, backgroundColor: "rgba(212,160,23,0.12)" }}
                    onClick={() => {
                      setSelected(artist);
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-primary/10"
                    style={{ borderBottom: i < ARTISTS.length - 1 ? "1px solid rgba(212,160,23,0.12)" : "none" }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-heading"
                      style={{
                        background: "linear-gradient(135deg, #D4A017, #A07800)",
                        color: "#000",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-heading text-sm uppercase tracking-[0.15em] text-white/90">
                      {artist.name}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Artist Card */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              {/* Artist name (big gold) */}
              <h3
                className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-center mb-5"
                style={{
                  background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(212,160,23,0.5)",
                }}
              >
                {selected.name}
              </h3>

              {/* Glory Figure card image */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative rounded-sm overflow-hidden"
                style={{
                  border: "1px solid rgba(212,160,23,0.4)",
                  boxShadow: "0 0 50px rgba(0,0,0,0.8), 0 0 80px rgba(212,160,23,0.15)",
                }}
              >
                <img
                  src={selected.card}
                  alt={`${selected.name} Glory Figure Card`}
                  className="w-full h-auto block"
                />
              </motion.div>

              <p className="text-center text-muted-foreground text-[10px] font-heading uppercase tracking-[0.3em] mt-4">
                www.Legendsofglory.online
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
