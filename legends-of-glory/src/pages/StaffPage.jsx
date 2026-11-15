import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/42e17e462_IMG_5328.jpg";
const VIDEO_URL = "https://media.base44.com/videos/public/user_697099ce8b25797c6c3cf9b2/8382dee6b_RecordIt-1771812791.mov";

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Staff.list("order", 50).then(data => {
      setStaff(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-background via-card to-background overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0 opacity-60">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={VIDEO_URL} type="video/quicktime" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <img src={LOGO_URL} alt="Legends of Glory" className="w-48 h-48 mx-auto object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="font-heading tracking-[0.3em] text-xs uppercase mb-2 text-primary">The Team Behind The Glory</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              Glory Staff
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              The dedicated professionals who brought Legends of Glory to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-colors duration-300">
                  {/* Photo */}
                  <div className="aspect-[3/4] overflow-hidden">
                    {member.photo_url ? (
                      <motion.img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        style={{ filter: "contrast(1.1) saturate(1.1) brightness(0.9)" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary">
                        <span className="text-4xl font-display font-bold text-primary">
                          {member.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-xl uppercase tracking-widest font-bold text-primary">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 font-heading uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-xl" style={{ boxShadow: "inset 0 0 30px rgba(212, 160, 23, 0.3)" }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
