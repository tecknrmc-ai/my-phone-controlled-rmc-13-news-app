import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StaffSection() {
  const [staff, setStaff] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadStaff = async () => {
      const data = await base44.entities.Staff.list("order", 50);
      setStaff(data);
    };
    loadStaff();
  }, []);

  const cardsToShow = 3;
  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, Math.max(staff.length - cardsToShow, 0)));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleStaff = staff.slice(currentIndex, currentIndex + cardsToShow);

  if (staff.length === 0) return null;

  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-2">
            Behind The Scenes
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-primary">
            Legends Of Glory Staff
          </h2>
        </motion.div>

        <div className="relative">
          {staff.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-primary/20 border border-border p-2 rounded-sm transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-primary/20 border border-border p-2 rounded-sm transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </>
          )}

          <div className="flex gap-4 justify-center">
            {visibleStaff.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative overflow-hidden rounded-sm border border-border bg-card hover:border-primary/50 transition-all w-full max-w-xs flex-shrink-0"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-display text-xs uppercase tracking-wide text-primary font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-[9px] mt-0.5 font-heading uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {staff.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {staff.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
