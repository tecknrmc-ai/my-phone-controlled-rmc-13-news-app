import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-foreground/40">
          Legends of Glory Battle Cypher
        </p>
        <p className="text-[10px] text-muted-foreground/40 mt-2 tracking-wider uppercase font-heading">
          © {new Date().getFullYear()} All Rights Reserved — Inland Empire × LA
        </p>
      </div>
    </footer>
  );
}
