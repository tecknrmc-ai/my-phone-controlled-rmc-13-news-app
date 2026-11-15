import React from "react";
import { motion } from "framer-motion";

const credits = [
  { role: "Produced By", name: "Teckn" },
  { role: "Executive Producer", name: "Teckn" },
  { role: "Executive Producer", name: "Cash Champ Nicole" },
  { role: "Executive Producer", name: "NEECOLE" },
];

export default function CreditsSection() {
  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-2">
            Behind The Cypher
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-12">
            Credits
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {credits.map((credit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border rounded-sm p-6 bg-card hover:border-primary/30 transition-colors"
            >
              <p className="text-primary font-heading tracking-[0.2em] text-[10px] uppercase mb-1">
                {credit.role}
              </p>
              <p className="font-display text-lg uppercase font-semibold tracking-wide">
                {credit.name}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground text-xs tracking-wider uppercase font-heading">
            Inland Empire × Los Angeles, California
          </p>
          <p className="text-muted-foreground/50 text-[10px] mt-2 tracking-wider uppercase font-heading">
            Battle vs Mode Cypher — Featuring IE Artists &amp; Models
          </p>
        </motion.div>
      </div>
    </section>
  );
}
