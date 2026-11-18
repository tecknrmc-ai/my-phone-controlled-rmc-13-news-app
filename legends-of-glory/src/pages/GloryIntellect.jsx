import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, BookOpen, Lightbulb, Music, Users, Film, ChevronRight, X, Menu } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import MobileBottomNav from "../components/landing/MobileBottomNav";
import MatrixRain from "../components/landing/MatrixRain";

const KNOWLEDGE_CATEGORIES = [
  { id: "all", label: "All", icon: BookOpen, color: "#D4A017" },
  { id: "artist", label: "Artists", icon: Users, color: "#C084FC" },
  { id: "staff", label: "Staff", icon: Users, color: "#38BDF8" },
  { id: "production", label: "Production", icon: Film, color: "#F87171" },
  { id: "music", label: "Music", icon: Music, color: "#34D399" },
  { id: "general", label: "General", icon: Lightbulb, color: "#FB923C" },
];

const SAMPLE_QUESTIONS = [
  "Who are the 5 battle artists?",
  "Who are the executive producers?",
  "How do I vote?",
  "Where can I listen to the music?",
  "What is the Battle Cypher?",
  "Tell me about the artists' backgrounds",
];

export default function GloryIntellect() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Welcome to Glory Intellect — your AI guide to Legends of Glory! Ask me anything about the artists, production, music, or the Battle Cypher. I'm here to help!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [filteredKnowledge, setFilteredKnowledge] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showKnowledge, setShowKnowledge] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    loadKnowledgeBase();
    loadArtists();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredKnowledge(knowledgeBase);
    } else {
      setFilteredKnowledge(knowledgeBase.filter(k => k.category === selectedCategory));
    }
  }, [selectedCategory, knowledgeBase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const loadKnowledgeBase = async () => {
    try {
      const data = await base44.entities.KnowledgeBase.list();
      setKnowledgeBase(data || []);
    } catch (error) {
      console.error("Failed to load knowledge base:", error);
    }
  };

  const loadArtists = async () => {
    try {
      const data = await base44.entities.Artist.list("order", 50);
      setArtists(data || []);
    } catch (error) {
      console.error("Failed to load artists:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await base44.functions.invoke("gloryIntellectAI", { message: userMessage });
      setChatHistory(prev => [...prev, { role: "assistant", content: response.data.answer || response.data.error || "I couldn't process that request." }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Featured Trailer Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          {/* Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "contrast(1.2) saturate(1.15) brightness(0.85)",
            }}
          >
            <source src="https://media.base44.com/videos/public/6a2db64ae683a6c053ea9251/b6754fd9f_logcommerceoff1_converted.mp4" type="video/mp4" />
          </video>

          {/* Hard spotlight overlay - dark vignette with hard focus center */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(ellipse 40% 35% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.9) 100%),
                radial-gradient(ellipse 30% 25% at 50% 50%, rgba(212, 160, 23, 0.12) 0%, transparent 70%)
              `,
            }}
          />
          {/* Hard vignette - very dark corners */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(ellipse 55% 45% at 50% 50%, transparent 0%, transparent 30%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.95) 100%)
              `,
            }}
          />

          {/* Glory Logo overlay */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
            <img
              src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png"
              alt="Legends of Glory"
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 30px rgba(212, 160, 23, 0.6))",
              }}
            />
          </div>

          {/* Headliner at bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display text-2xl md:text-4xl font-bold uppercase tracking-[0.3em]"
              style={{
                background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(212, 160, 23, 0.5)",
              }}
            >
              Glory Season 1
            </motion.p>
          </div>
        </div>
      </section>

      {/* Matrix rain background */}
      <MatrixRain color="#D4A017" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-xs uppercase tracking-[0.3em] mb-3">
            AI-Powered Knowledge Hub
          </p>

          {/* Mascot Logo with Floating Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ duration: 0.8, y: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
            className="relative inline-block mb-6"
            style={{
              filter: "drop-shadow(0 0 30px rgba(212, 160, 23, 0.5)) drop-shadow(0 0 60px rgba(212, 160, 23, 0.3))",
            }}
          >
            {/* Floating particles around mascot */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.2, 0],
                    x: Math.cos((i / 8) * Math.PI * 2) * 120,
                    y: Math.sin((i / 8) * Math.PI * 2) * 120 - 20,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                  style={{
                    background: "radial-gradient(circle, #D4A017, transparent)",
                    boxShadow: "0 0 12px rgba(212, 160, 23, 0.8)",
                  }}
                />
              ))}
            </div>

            {/* Rotating glow ring */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -m-8 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, rgba(212, 160, 23, 0.1) 50%, transparent 100%)",
                filter: "blur(8px)",
              }}
            />

            {/* Mascot Image */}
            <img
              src="https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png"
              alt="Glory Intellect Mascot"
              className="relative z-10 w-48 h-48 md:w-56 md:h-56 object-contain mx-auto"
              style={{
                borderRadius: "50%",
                border: "2px solid rgba(212, 160, 23, 0.3)",
                background: "radial-gradient(circle, rgba(212, 160, 23, 0.1) 0%, transparent 70%)",
              }}
            />
          </motion.div>

          <h1
            className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4"
            style={{
              background: "linear-gradient(135deg, #F5D060 0%, #D4A017 50%, #A07800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212, 160, 23, 0.4)",
            }}
          >
            Glory Intellect
          </h1>
          <p className="text-muted-foreground/90 text-sm md:text-base max-w-2xl mx-auto">
            Your intelligent guide to Legends of Glory. Ask questions, explore the knowledge base, and discover everything about the Battle Cypher.
          </p>
        </motion.div>
      </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* AI Chat Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.15)" }}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(212, 160, 23, 0.2)", border: "1px solid rgba(212, 160, 23, 0.4)" }}>
                  <Sparkles className="w-5 h-5" style={{ color: "#D4A017" }} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wider">Glory AI Assistant</h3>
                  <p className="text-[10px] text-muted-foreground font-heading uppercase tracking-wider">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted border border-border rounded-lg p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sample Questions */}
            <div className="px-4 pb-3">
              <p className="text-[9px] font-heading uppercase tracking-wider text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUESTIONS.slice(0, 3).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(q)}
                    className="text-[9px] px-2 py-1 rounded-sm bg-muted/50 border border-border hover:border-primary/50 transition-colors text-muted-foreground hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-gradient-to-r from-transparent to-primary/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Legends of Glory..."
                  className="flex-1 bg-background border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !message.trim()}
                  className="px-4 py-2 rounded-sm font-heading uppercase tracking-wider text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #D4A017, #A07800)",
                    color: "#000",
                    boxShadow: "0 0 12px rgba(212, 160, 23, 0.4)",
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Knowledge Base Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.15)" }}
          >
            {/* Knowledge Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(212, 160, 23, 0.2)", border: "1px solid rgba(212, 160, 23, 0.4)" }}>
                    <BookOpen className="w-5 h-5" style={{ color: "#D4A017" }} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider">Knowledge Base</h3>
                    <p className="text-[10px] text-muted-foreground font-heading uppercase tracking-wider">{filteredKnowledge.length} entries</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowKnowledge(!showKnowledge)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {showKnowledge ? <X className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              {/* Category Filters */}
              {showKnowledge && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {KNOWLEDGE_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[9px] font-heading uppercase tracking-wider transition-all ${
                          isSelected
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                        style={
                          isSelected
                            ? {
                                background: `linear-gradient(135deg, ${cat.color}, ${cat.color}99)`,
                                boxShadow: `0 0 8px ${cat.color}60`,
                              }
                            : {
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                              }
                        }
                      >
                        <Icon className="w-3 h-3" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Knowledge Entries */}
            {showKnowledge && (
              <div className="h-[500px] overflow-y-auto p-4 space-y-3">
                {filteredKnowledge.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">No knowledge entries yet</p>
                  </div>
                ) : (
                  filteredKnowledge.map((entry, idx) => {
                    const category = KNOWLEDGE_CATEGORIES.find(c => c.id === entry.category);
                    return (
                      <motion.div
                        key={entry.id || idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="p-3 rounded-sm border border-border bg-background/50 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          {category && (
                            <div
                              className="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: `${category.color}20`, border: `1px solid ${category.color}40` }}
                            >
                              <category.icon className="w-3 h-3" style={{ color: category.color }} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-foreground mb-1">{entry.question}</p>
                            <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-3">{entry.answer}</p>
                            {entry.keywords && entry.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {entry.keywords.slice(0, 3).map((kw, kidx) => (
                                  <span key={kidx} className="text-[8px] px-1.5 py-0.5 rounded-sm bg-muted/50 text-muted-foreground font-heading uppercase tracking-wider">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Artists Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
          style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.15)" }}
        >
          <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-4 text-center">Battle Cypher Artists</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {artists.map((artist, idx) => (
              <Link
                key={artist.id}
                to={`/artist/${artist.id}`}
                className="group text-center p-3 rounded-sm border border-border bg-background/30 hover:border-primary/50 transition-all"
              >
                {artist.photo_url ? (
                  <img
                    src={artist.photo_url}
                    alt={artist.name}
                    className="w-16 h-16 mx-auto rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-colors mb-2"
                  />
                ) : (
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 border-primary/30 mb-2 text-2xl font-bold" style={{ background: "rgba(212, 160, 23, 0.2)", color: "#D4A017" }}>
                    {artist.name?.charAt(0)}
                  </div>
                )}
                <p className="text-xs font-heading uppercase tracking-wider font-bold text-foreground group-hover:text-primary transition-colors">{artist.name}</p>
                {artist.rating && (
                  <p className="text-[9px] text-muted-foreground mt-0.5">Rating: {artist.rating}</p>
                )}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Glory Statements & Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 grid md:grid-cols-2 gap-6"
        >
          {/* Glory Statements */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6" style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.15)" }}>
            <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: "#D4A017" }} />
              Glory Statements
            </h3>
            <div className="space-y-3">
              {[
                { text: "Five artists. One cypher. Infinite glory.", author: "Legends of Glory" },
                { text: "Inland Empire meets LA in the ultimate battle.", author: "The Cypher" },
                { text: "When the beat drops, legends rise.", author: "Battle Anthem" },
                { text: "Not just a competition — a movement.", author: "Glory Creed" },
              ].map((statement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="p-3 rounded-sm border-l-2 border-primary bg-background/30"
                >
                  <p className="text-sm italic text-foreground/90">"{statement.text}"</p>
                  <p className="text-[9px] text-muted-foreground mt-1 font-heading uppercase tracking-wider">— {statement.author}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6" style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.15)" }}>
            <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" style={{ color: "#D4A017" }} />
              Quick Facts
            </h3>
            <div className="space-y-3">
              {[
                { label: "Marketing Goal", value: "$100,000" },
                { label: "Battle Artists", value: "5 Elite MCs" },
                { label: "Regions", value: "Inland Empire × LA" },
                { label: "Executive Producers", value: "4 Visionaries" },
                { label: "Platform", value: "Spotify & Apple Music" },
                { label: "Distribution", value: "Cranez Music Distro" },
              ].map((fact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-sm bg-background/30 border border-border/50"
                >
                  <span className="text-[10px] text-muted-foreground font-heading uppercase tracking-wider">{fact.label}</span>
                  <span className="text-xs font-bold text-primary">{fact.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
      <MobileBottomNav />
      <div className="h-16 md:hidden" />
    </div>
  );
}
