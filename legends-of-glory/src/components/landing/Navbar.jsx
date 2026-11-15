import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Settings, Home, Music, Camera, ChevronDown, Film, Newspaper, Users, BookOpen, FileText, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";

const links = [
  { label: "The Cypher", href: "#video" },
  { label: "Credits", href: "#credits" },
];

const moreLinks = [
  { label: "Staff", href: "/staff" },
  { label: "Artist Stories", href: "/artist-stories" },
  { label: "Backstory", href: "/backstory" },
  { label: "News", href: "/news" },
  { label: "Glory Intellect", href: "/glory-intellect" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user?.role === "admin") setIsAdmin(true);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/home" className="flex items-center gap-2">
          <img src={LOGO_URL} alt="Legends of Glory" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/home"
            className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          {/* More Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              More <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-background/95 backdrop-blur-md border border-border rounded-sm shadow-xl z-50 overflow-hidden">
                <Link
                  to="/trailers"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Film className="w-3.5 h-3.5" /> Trailers
                </Link>
                <Link
                  to="/staff"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Users className="w-3.5 h-3.5" /> Staff
                </Link>
                <Link
                  to="/artist-stories"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Music className="w-3.5 h-3.5" /> Artist Stories
                </Link>
                <Link
                  to="/backstory"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Backstory
                </Link>
                <Link
                  to="/behind-the-scenes"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" /> Behind the Scenes
                </Link>
                <Link
                  to="/glory-intellect"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-[0.2em] text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Glory Intellect
                </Link>
                <Link
                  to="/neecole"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-[0.2em] text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5" /> In Honor of Nee'Cole
                </Link>
                {isAdmin && (
                  <>
                    <Link
                      to="/staff-management"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-[0.2em] text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" /> Management
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <Link
            to="/vote"
            className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            <Music className="w-3.5 h-3.5" />
            Vote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-4 pb-4">
          <Link
            to="/home"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="border-t border-border pt-2">
            <Link
              to="/trailers"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              <Film className="w-4 h-4" /> Trailers
            </Link>
            <Link
              to="/staff"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              <Users className="w-4 h-4" /> Staff
            </Link>
            <Link
              to="/artist-stories"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              <Music className="w-4 h-4" /> Artist Stories
            </Link>
            <Link
              to="/backstory"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Backstory
            </Link>
            <Link
              to="/news"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              <Newspaper className="w-4 h-4" /> News
            </Link>
            <Link
              to="/behind-the-scenes"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              <Camera className="w-4 h-4" /> Behind the Scenes
            </Link>
            <Link
              to="/glory-intellect"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
            >
              <Sparkles className="w-4 h-4" /> Glory Intellect
            </Link>
            <Link
              to="/neecole"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
            >
              <Heart className="w-4 h-4" /> In Honor of Nee'Cole
            </Link>
          </div>
          <Link
            to="/vote"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            <Music className="w-4 h-4" />
            Vote
          </Link>
          {isAdmin && (
            <Link
              to="/staff-management"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-heading uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
            >
              <Settings className="w-4 h-4" /> Management
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
