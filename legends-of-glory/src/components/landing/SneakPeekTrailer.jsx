import React from "react";
import { motion } from "framer-motion";

const SNEAK_PEEK_URL = "https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/b6754fd9f_logcommerceoff1_converted.mp4";

export default function SneakPeekTrailer() {
  return (
    <section className="w-full">
      <video
        controls
        playsInline
        className="w-full aspect-video bg-black block"
      >
        <source src={SNEAK_PEEK_URL} type="video/mp4" />
      </video>
    </section>
  );
}