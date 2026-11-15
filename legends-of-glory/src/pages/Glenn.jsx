import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus, Trash2, Star, StarOff, ExternalLink } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const LOGO_URL = "https://media.base44.com/images/public/6a2db64ae683a6c053ea9251/135dc082e_BlackModernMSLogo12.png";

export default function Glenn() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", photo_url: "", link: "", order: 0 });

  const load = async () => {
    try {
      const items = await base44.entities.FeaturedNews.list("order", 100);
      setCards(items || []);
    } catch (e) {
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    base44.auth.me().then((u) => setIsAdmin(u?.role === "admin")).catch(() => setIsAdmin(false));
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.photo_url) return;
    setSaving(true);
    try {
      await base44.entities.FeaturedNews.create({
        title: form.title,
        photo_url: form.photo_url,
        link: form.link || "",
        order: Number(form.order) || 0,
        active: true,
      });
      setForm({ title: "", photo_url: "", link: "", order: 0 });
      await load();
    } catch (err) {
      alert(err?.message || "Failed to add card");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this featured news card?")) return;
    try {
      await base44.entities.FeaturedNews.delete(id);
      await load();
    } catch (err) {
      alert(err?.message || "Failed to delete");
    }
  };

  const toggle = async (card) => {
    try {
      await base44.entities.FeaturedNews.update(card.id, { active: !card.active });
      await load();
    } catch (err) {
      alert(err?.message || "Failed to update");
    }
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-black text-foreground flex flex-col items-center justify-center px-4 text-center">
        <img src={LOGO_URL} alt="Legends of Glory" className="h-12 w-auto mb-4" style={{ filter: "brightness(1.2)" }} />
        <h1 className="font-display text-2xl uppercase tracking-tight mb-2">Admins Only</h1>
        <p className="text-muted-foreground text-sm mb-6">You need an admin account to manage featured news cards.</p>
        <Link to="/" className="text-primary font-heading text-xs uppercase tracking-[0.2em] hover:underline">Back to Seasons</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6">
        <Link to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-heading text-xs uppercase tracking-[0.2em]">
          <ChevronLeft className="w-4 h-4" /> Back to Seasons
        </Link>
        <img src={LOGO_URL} alt="Legends of Glory" className="h-10 w-auto object-contain" style={{ filter: "brightness(1.2)" }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4 pt-6 pb-4">
        <p className="text-primary font-heading text-[10px] uppercase tracking-[0.4em]">Featured News Manager</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight" style={{ background: "linear-gradient(135deg,#F5D060,#D4A017,#A07800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Glenn — Add Featured Cards
        </h1>
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        {/* Add form */}
        <form onSubmit={submit} className="rounded-sm border border-primary/30 bg-card/40 p-5 mb-8 space-y-4">
          <div className="space-y-2">
            <Label className="font-heading text-xs uppercase tracking-wider text-primary">Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Legends of Glory TV Series Coming Soon"
              required
              className="bg-background border-primary/30"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-heading text-xs uppercase tracking-wider text-primary">Photo URL</Label>
            <Input
              value={form.photo_url}
              onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
              placeholder="https://..."
              required
              className="bg-background border-primary/30"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-heading text-xs uppercase tracking-wider text-primary">Link (optional)</Label>
              <Input
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://... (opens in new tab)"
                className="bg-background border-primary/30"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-heading text-xs uppercase tracking-wider text-primary">Display Order</Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="bg-background border-primary/30"
              />
            </div>
          </div>
          <Button type="submit" disabled={saving} className="w-full" style={{ background: "linear-gradient(135deg,#D4A017,#A07800)" }}>
            <Plus className="w-4 h-4 mr-2" /> {saving ? "Adding..." : "Add Featured Card"}
          </Button>
        </form>

        {/* Existing cards */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
          <p className="text-primary font-heading text-[10px] uppercase tracking-[0.35em]">Current Cards</p>
          <div className="h-px flex-1 bg-primary/30 max-w-[60px]" />
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground text-sm">Loading...</p>
        ) : cards.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm">No cards yet — add your first one above.</p>
        ) : (
          <div className="space-y-3">
            {cards.map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-sm border border-border bg-card/40 p-3">
                <img src={c.photo_url} alt={c.title} className="w-16 h-20 object-cover rounded-sm flex-shrink-0 border border-primary/20" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm uppercase tracking-tight text-foreground truncate">{c.title}</p>
                  <p className="text-[10px] text-muted-foreground font-heading uppercase tracking-wider">Order: {c.order ?? 0}{c.active === false ? " · Hidden" : ""}</p>
                  {c.link && (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline inline-flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Link
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => toggle(c)} title={c.active === false ? "Show" : "Hide"} className="p-1.5 rounded-sm border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
                    {c.active === false ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" fill="currentColor" />}
                  </button>
                  <button onClick={() => remove(c.id)} title="Delete" className="p-1.5 rounded-sm border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
