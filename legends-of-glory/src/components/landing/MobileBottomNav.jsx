import React, { useState, useEffect } from "react";
import { Home, Film, Newspaper, Trophy, Settings, Users } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

export default function MobileBottomNav() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await base44.auth.me();
        if (user?.role === "admin") setIsAdmin(true);
      } catch {
        // not logged in
      }
    };
    checkUser();
  }, []);

  const navItems = [
    { label: "Home", to: "/home", icon: Home },
    { label: "Trailers", to: "/trailers", icon: Film },
    { label: "News", to: "/news", icon: Newspaper },
    { label: "Artists", to: "/artist-stories", icon: Users },
    { label: "Vote", to: "/vote", icon: Trophy },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            onClick={() => setActive(label)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-sm transition-colors min-w-[56px] ${
              active === label ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-heading uppercase tracking-wider">{label}</span>
          </Link>
        ))}

        {isAdmin && (
          <Link
            to="/staff-management"
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-sm transition-colors min-w-[56px] text-muted-foreground hover:text-primary"
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-heading uppercase tracking-wider">Manage</span>
          </Link>
        )}
      </div>
    </div>
  );
}
