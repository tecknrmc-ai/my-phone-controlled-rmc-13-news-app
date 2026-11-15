import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HubTab({ title, description, image, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-4 py-4 text-left hover:bg-primary/5 transition-colors"
      >
        {image && (
          <img
            src={image}
            alt={title}
            className="w-16 h-16 rounded-sm object-cover flex-shrink-0 border border-primary/30"
            style={{ boxShadow: "0 0 12px rgba(0,0,0,0.5)" }}
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base md:text-xl uppercase tracking-wider text-foreground truncate">
            {title}
          </h3>
          {description && (
            <p className="text-muted-foreground text-xs md:text-sm font-body truncate">{description}</p>
          )}
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-6 pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
