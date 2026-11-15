import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";
const MATRIX_CHARS = "0123456789LEGENDSOFGLORYリフアエイウカキクケコサシスセソタチツテトナニヌネノ";

export default function LogoWithMatrixEffects() {
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!canvas || !bgCanvas) return;
    const ctx = canvas.getContext("2d");
    const bgCtx = bgCanvas.getContext("2d");
    let animId;
    let particles = [];
    let drops = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      bgCanvas.width = bgCanvas.offsetWidth;
      bgCanvas.height = bgCanvas.offsetHeight;
      
      // Initialize matrix rain drops
      const cols = Math.floor(bgCanvas.width / 14);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles emanating from center
    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        life: 1,
        decay: 0.003 + Math.random() * 0.005,
        size: 10 + Math.random() * 6,
      };
    };

    const draw = () => {
      // Clear foreground canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fade background for matrix rain trail
      bgCtx.fillStyle = "rgba(0,0,0,0.05)";
      bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

      // Spawn new particles
      if (particles.length < 150 && Math.random() > 0.7) {
        particles.push(createParticle());
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.font = `bold ${p.size}px monospace`;
        ctx.fillStyle = `rgba(212, 160, 23, ${p.life * 0.8})`;
        ctx.fillText(p.char, p.x, p.y);

        ctx.shadowColor = "rgba(212, 160, 23, 0.6)";
        ctx.shadowBlur = 8;
      }

      // Draw matrix rain falling down background
      const cols = Math.floor(bgCanvas.width / 14);
      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const y = drops[i] * 14;

        // Flash white at head
        bgCtx.font = "bold 14px monospace";
        bgCtx.fillStyle = `rgba(255,255,255,0.9)`;
        bgCtx.fillText(char, i * 14, y);

        // Trail in gold
        bgCtx.fillStyle = "rgba(212, 160, 23, 0.7)";
        bgCtx.font = "14px monospace";
        bgCtx.fillText(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)], i * 14, y - 14);

        if (y > bgCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.35;
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Background matrix rain canvas */}
      <canvas
        ref={bgCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        style={{ zIndex: 0 }}
      />
      
      {/* Matrix particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* 3D Logo with floating animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateY: 0,
          y: [0, -15, 0],
        }}
        transition={{
          duration: 1,
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative z-10"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Glow behind logo */}
        <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full opacity-40" />
        
        {/* Logo with 3D transforms */}
        <img
          src={LOGO_URL}
          alt="Legends of Glory Logo"
          className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] object-contain drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(212, 160, 23, 0.4))",
            transform: "translateZ(50px)",
          }}
        />
        
        {/* Secondary glow layer */}
        <div
          className="absolute inset-0 bg-gradient-radial from-primary/40 via-transparent to-transparent blur-2xl"
          style={{ transform: "translateZ(30px)" }}
        />
      </motion.div>
    </div>
  );
}
