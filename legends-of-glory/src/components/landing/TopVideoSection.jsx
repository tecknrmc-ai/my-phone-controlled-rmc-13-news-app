import React from "react";
import { motion } from "framer-motion";

const VIDEO_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/cc74bac54_Untitled_converted.mov";
const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";
const SPOTIFY_LOGO = "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg";
const CRANEZ_LOGO = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/00d37d554_IMG_0239.png";

export default function TopVideoSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={VIDEO_URL} type="video/quicktime" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      
      {/* Top Section: Logo and Headliner */}
      <div className="absolute top-0 left-0 right-0 px-4 pt-8 md:pt-12">
        {/* Logo at Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <img
            src={LOGO_URL}
            alt="Legends of Glory"
            className="h-20 md:h-28 w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
        
        {/* Headliner Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-primary font-heading tracking-[0.4em] text-xs md:text-sm uppercase mb-2"
            style={{ textShadow: "0 0 30px rgba(212, 160, 23, 0.8)" }}
          >
            RMC GLOBAL PRESENTS
          </motion.p>
          
          {/* Artist Names */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-primary font-heading tracking-[0.15em] text-xs md:text-sm uppercase mb-4 font-bold"
            style={{ textShadow: "0 0 20px rgba(212, 160, 23, 0.6)" }}
          >
            BIZZYBAGGZ vs HOTTUNEZ vs NEF vs KXNG D.O.P.E. vs GOTTI
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-display text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F5D060 50%, #D4A017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 60px rgba(212, 160, 23, 0.6)",
            }}
          >
            RMC GLOBAL BRINGS OUT SOME OF THE INLAND EMPIRE'S BEST
          </motion.h1>
          
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, delay: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
            style={{ boxShadow: "0 0 20px rgba(212, 160, 23, 0.8)" }}
          />
        </motion.div>
      </div>
      
      {/* Streaming Platforms - Center Bottom */}
      <div className="absolute bottom-32 md:bottom-40 left-0 right-0 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase">
            OUT NOW ON
          </p>
          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-primary transition-colors"
            >
              <img src={SPOTIFY_LOGO} alt="Spotify" className="w-8 h-8 md:w-10 md:h-10" />
            </a>
            <a
              href="https://cramezmusicdistro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-primary transition-colors"
            >
              <img src={CRANEZ_LOGO} alt="Cranez Music Distribution" className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-sm p-1" />
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Section: Title, Artists, Sponsors */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center space-y-3"
        >
          {/* Legends of Glory Title */}
          <h2 className="font-display text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
            LEGENDS OF GLORY
          </h2>
          
          {/* Artist Names */}
          <p className="text-primary font-heading tracking-[0.25em] text-xs md:text-sm uppercase">
            TECKN • CASH CHAMP • TIANNA • NEE COLE
          </p>
          
          {/* Sponsors */}
          <div className="pt-2 border-t border-primary/30 mt-4">
            <p className="text-[10px] md:text-xs text-muted-foreground/70 font-heading uppercase tracking-wider">
              AD SPONSORED BY RMC GLOBAL AND CRAMEZMUSICDISTRO.COM
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
