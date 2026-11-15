import React, { useEffect, useRef } from "react";

const CHARS = "0123456789LEGENDSOFGLORYRMCGLOBAL01リフアエイウカキクケコサシスセソタチツテトナニヌネノABCDEF".split("");

export default function MatrixRain({ color = "#D4A017", opacity = 0.18 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    let cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -120);
    // Each column gets a random speed multiplier for variety
    const speeds = Array.from({ length: cols }, () => 0.3 + Math.random() * 0.5);

    const draw = () => {
      cols = Math.floor(canvas.width / fontSize);
      // Fade trail — lower alpha = longer glowing tail
      ctx.fillStyle = "rgba(0,0,0,0.045)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;

        // Head character — bright white flash
        const headChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fillText(headChar, i * fontSize, y);

        // Second char — bright colored
        const char2 = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.font = `bold ${fontSize - 1}px monospace`;
        ctx.fillStyle = color + "ee";
        ctx.fillText(char2, i * fontSize, y - fontSize);

        // Trail chars — dimmer
        const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.font = `${fontSize - 2}px monospace`;
        ctx.fillStyle = color + "66";
        ctx.fillText(trailChar, i * fontSize, y - fontSize * 2);

        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, mixBlendMode: "screen" }}
    />
  );
}
