import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CypherStoryPopup from "@/components/landing/CypherStoryPopup";

const BANNER_IMAGE = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/c21fbd0c5_IMG_7190.png";

export default function RmcPresentsBanner() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef(null);

  // Mouse position for 3D parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    const el = sectionRef.current;
    if (el) el.addEventListener("mousemove", handleMouseMove);
    return () => { if (el) el.removeEventListener("mousemove", handleMouseMove); };
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden" style={{ perspective: "1200px" }}>
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src={BANNER_IMAGE}
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center py-12 px-4 text-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* RMC branding top left */}
        <div className="absolute top-6 left-6 flex items-center gap-4">
          <span className="font-heading text-white text-sm md:text-lg font-bold tracking-[0.1em]">RMC</span>
          <span className="font-heading text-white/80 text-xs md:text-sm tracking-[0.15em]">RMCUNSIGNED</span>
        </div>

        {/* RMCGLOBAL PRESENTS */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-heading tracking-[0.3em] text-sm md:text-base uppercase mb-4"
          style={{ textShadow: "0 0 15px rgba(212, 160, 23, 0.5)" }}
        >
          RMCGLOBAL PRESENTS
        </motion.p>

        {/* Title with glow + hover + 3D transform */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, rotateX: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 80 }}
          whileHover={{
            scale: 1.04,
            textShadow: "0 0 60px rgba(255,255,255,0.8), 0 0 100px rgba(212,160,23,0.5), 0 0 150px rgba(212,160,23,0.3)",
            transition: { duration: 0.3 }
          }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 cursor-default select-none"
          style={{
            textShadow: "0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(212,160,23,0.25)",
            transformStyle: "preserve-3d",
          }}
        >
          <span style={{ display: "inline-block", transform: "translateZ(30px)" }}>
            Legends of Glory<br />Battle Cypher
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/85 text-sm md:text-lg max-w-2xl mx-auto font-heading uppercase tracking-[0.05em] leading-relaxed mb-8"
        >
          5 Elite Underground Artists. One Cypher. Battle vs. Mode. The Inland Empire and LA collide in the ultimate showcase of lyrical prowess — where only the strongest will rise.
        </motion.p>

        {/* Checkout Now Button — opens popup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-heading text-sm md:text-base font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-primary/90 transition-all shadow-xl group"
            style={{ boxShadow: "0 0 50px rgba(212, 160, 23, 0.5), 0 0 100px rgba(212, 160, 23, 0.2)" }}
          >
            Checkout Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Popup Modal */}
      <CypherStoryPopup open={open} onOpenChange={setOpen} />
    </section>
  );
}
