import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Calendar, User, ChevronRight, Film, Music, Users, Megaphone, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/42e17e462_IMG_5328.jpg";
const VIDEO_URL = "https://media.base44.com/videos/public/user_697099ce8b25797c6c3cf9b2/8382dee6b_RecordIt-1771812791.mov";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    base44.entities.News.list("-published_date", 50).then(data => {
      setNews(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredNews = filter === "all" ? news : news.filter(n => n.category === filter);

  const getCategoryColor = (category) => {
    switch(category) {
      case "artist": return "#FFD700";
      case "staff": return "#38BDF8";
      default: return "#F87171";
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case "artist": return <Music className="w-3 h-3" />;
      case "staff": return <Users className="w-3 h-3" />;
      default: return <Film className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-background via-card to-background overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0 opacity-60">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={VIDEO_URL} type="video/quicktime" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <img src={LOGO_URL} alt="Legends of Glory" className="w-48 h-48 mx-auto object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="font-heading tracking-[0.3em] text-xs uppercase mb-2 text-primary">Latest Updates</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              Legends News
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Stay updated with the latest news about our artists and staff
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <button
              onClick={() => setFilter("all")}
              className={`text-xs font-heading uppercase tracking-wider px-4 py-2 rounded-sm transition-colors ${
                filter === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              All News
            </button>
            <button
              onClick={() => setFilter("artist")}
              className={`text-xs font-heading uppercase tracking-wider px-4 py-2 rounded-sm transition-colors ${
                filter === "artist" 
                  ? "bg-primary text-primary-foreground" 
                  : "border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              Artists
            </button>
            <button
              onClick={() => setFilter("staff")}
              className={`text-xs font-heading uppercase tracking-wider px-4 py-2 rounded-sm transition-colors ${
                filter === "staff" 
                  ? "bg-primary text-primary-foreground" 
                  : "border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              Staff
            </button>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news articles yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article, index) => {
                const categoryColor = getCategoryColor(article.category);
                
                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      onClick={() => setSelectedArticle(article)}
                      className="relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 h-full cursor-pointer"
                    >
                      {/* Featured Image */}
                      <div className="aspect-[16/9] overflow-hidden">
                        {article.photo_url ? (
                          <motion.img
                            src={article.photo_url}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            style={{ filter: "contrast(1.1) saturate(1.1) brightness(0.9)" }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary">
                            <Film className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Sponsored Badge */}
                      {article.author === "RMC Global" && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-sm flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/50">
                            <Megaphone className="w-3 h-3" />
                            Sponsored Ad
                          </span>
                        </div>
                      )}

                      {/* Category Badge */}
                      {article.author !== "RMC Global" && (
                        <div className="absolute top-3 left-3">
                          <span
                            className="text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-sm flex items-center gap-1"
                            style={{
                              background: `${categoryColor}20`,
                              color: categoryColor,
                              border: `1px solid ${categoryColor}50`,
                            }}
                          >
                            {getCategoryIcon(article.category)}
                            {article.category}
                          </span>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {article.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-sm bg-primary text-primary-foreground">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-display text-lg uppercase font-bold text-primary mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                          {article.content?.substring(0, 150)}...
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {article.published_date 
                                ? new Date(article.published_date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })
                                : 'Recent'
                              }
                            </span>
                          </div>
                          {article.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span className="truncate max-w-[100px]">{article.author}</span>
                            </div>
                          )}
                        </div>

                        {/* Read More */}
                        <div className="mt-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedArticle(article); }}
                            className="text-xs font-heading uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                          >
                            Read More <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Border glow on hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 rounded-xl" style={{ boxShadow: `inset 0 0 30px ${categoryColor}30` }} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => { if (!open) setSelectedArticle(null); }}>
        {selectedArticle && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border p-0">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              {selectedArticle.photo_url && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={selectedArticle.photo_url}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    style={{ filter: "contrast(1.1) saturate(1.1) brightness(0.9)" }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                  {selectedArticle.author === "RMC Global" ? (
                    <span className="text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-sm flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/50">
                      <Megaphone className="w-3 h-3" />
                      Sponsored Ad
                    </span>
                  ) : (
                    <span
                      className="text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-sm flex items-center gap-1"
                      style={{
                        background: `${getCategoryColor(selectedArticle.category)}20`,
                        color: getCategoryColor(selectedArticle.category),
                        border: `1px solid ${getCategoryColor(selectedArticle.category)}50`,
                      }}
                    >
                      {getCategoryIcon(selectedArticle.category)}
                      {selectedArticle.category}
                    </span>
                  )}
                  {selectedArticle.featured && (
                    <span className="text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-sm bg-primary text-primary-foreground">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <DialogTitle className="font-display text-2xl uppercase font-bold text-primary mb-3 leading-tight">
                  {selectedArticle.title}
                </DialogTitle>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {selectedArticle.published_date
                        ? new Date(selectedArticle.published_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : 'Recent'
                      }
                    </span>
                  </div>
                  {selectedArticle.author && (
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{selectedArticle.author}</span>
                    </div>
                  )}
                </div>

                {/* Full Content */}
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </div>
  );
}