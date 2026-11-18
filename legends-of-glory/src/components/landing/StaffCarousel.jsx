import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const STAFF_PHOTOS = [
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/42e17e462_IMG_5328.jpg", label: "Legends of Glory", isLogo: true },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/f315fe5a3_IMG_8983.jpg", label: "Executive Producer" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/529ba3cb4_IMG_8984.jpg", label: "RMC Global" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/ca17a75cb_IMG_8841.jpg", label: "Staff" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/27bff2815_IMG_9008.jpg", label: "Staff" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/196fbafa7_IMG_8966.jpg", label: "Videographer" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/f696e4913_IMG_8969.jpg", label: "Staff" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/e13d5fb27_IMG_8965.jpg", label: "Staff" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/aeae28af5_IMG_8962.jpg", label: "Team" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/a2d75662c_IMG_8970.jpg", label: "Videographer" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/8c4e88219_IMG_8967.jpg", label: "Sound Engineer" },
  { photo: "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/cc58ff4c2_IMG_9032.jpg", label: "Team" },
];

export default function StaffCarousel({ title = "The Team", subtitle = "RMC Global Production Staff" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-3.5 h-3.5 text-primary" style={{ filter: "drop-shadow(0 0 6px rgba(212,160,23,0.8))" }} />
        <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em]">{title}</p>
      </div>
      {subtitle && (
        <p className="text-white/40 font-heading text-[9px] uppercase tracking-widest mb-3">{subtitle}</p>
      )}

      {/* Scrollable strip */}
      <div
        className="flex gap-3 overflow-x-auto pb-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {STAFF_PHOTOS.map((member, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.06, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 relative rounded-sm overflow-hidden group"
            style={{
              width: "140px",
              height: "185px",
              scrollSnapAlign: "start",
              border: "1px solid rgba(212,160,23,0.25)",
              boxShadow: "0 0 16px rgba(0,0,0,0.6)",
              background: "#080808",
            }}
          >
            <img
              src={member.photo}
              alt={member.label}
              className={`w-full h-full transition-all duration-500 group-hover:scale-105 ${member.isLogo ? "object-contain p-4" : "object-cover object-top"}`}
              style={{ filter: member.isLogo ? "brightness(1)" : "contrast(1.1) brightness(0.9) saturate(1.1)" }}
            />
            {/* Hover glow border */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm"
              style={{ boxShadow: "inset 0 0 0 1.5px rgba(212,160,23,0.7), inset 0 0 20px rgba(212,160,23,0.12)" }}
            />
            {/* Bottom gradient + label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2">
              <span
                className="text-[8px] font-heading uppercase tracking-[0.2em]"
                style={{ color: "rgba(212,160,23,0.85)", textShadow: "0 0 8px rgba(212,160,23,0.5)" }}
              >
                {member.label}
              </span>
            </div>
            {/* Top shimmer on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(to right, transparent, rgba(212,160,23,0.8), transparent)" }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
