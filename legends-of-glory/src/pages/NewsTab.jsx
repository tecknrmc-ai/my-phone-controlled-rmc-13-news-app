import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Save, X, Trash2 } from "lucide-react";
import PhotoSelector from "../components/management/PhotoSelector";

export default function NewsTab() {
  const [news, setNews] = useState([]);
  const [artists, setArtists] = useState([]);
  const [staff, setStaff] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    photo_url: "",
    category: "general",
    related_artist_id: "",
    related_staff_id: "",
    published_date: new Date().toISOString().slice(0, 16),
    author: "",
    featured: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [newsData, artistsData, staffData] = await Promise.all([
        base44.entities.News.list("-published_date", 50),
        base44.entities.Artist.list("order", 50),
        base44.entities.Staff.list("order", 50),
      ]);
      setNews(newsData || []);
      setArtists(artistsData || []);
      setStaff(staffData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleEdit = (article) => {
    setEditingId(article.id);
    setIsAdding(false);
    setFormData({
      title: article.title || "",
      content: article.content || "",
      photo_url: article.photo_url || "",
      category: article.category || "general",
      related_artist_id: article.related_artist_id || "",
      related_staff_id: article.related_staff_id || "",
      published_date: article.published_date 
        ? new Date(article.published_date).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
      author: article.author || "",
      featured: article.featured || false,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      photo_url: "",
      category: "general",
      related_artist_id: "",
      related_staff_id: "",
      published_date: new Date().toISOString().slice(0, 16),
      author: "",
      featured: false,
    });
    setIsAdding(false);
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await base44.entities.News.create(formData);
        toast({ title: "Article Added", description: `${formData.title} added successfully`, duration: 2000 });
      } else {
        await base44.entities.News.update(editingId, formData);
        toast({ title: "Updated", description: `${formData.title} updated successfully`, duration: 2000 });
      }
      await loadData();
      handleCancel();
    } catch (error) {
      toast({ title: "Error", description: error.message || "Failed to save", variant: "destructive", duration: 3000 });
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete ${title}?`)) return;
    await base44.entities.News.delete(id);
    toast({ title: "Deleted", description: `${title} removed`, duration: 2000 });
    await loadData();
  };

  return (
    <div>
      <div className="mb-6">
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add News Article
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card className="mb-6 border-primary/30">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Article title" />
            </div>

            <div>
              <Label>Content</Label>
              <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Article content" rows={4} />
            </div>

            <PhotoSelector
              value={formData.photo_url}
              onChange={(url) => setFormData({ ...formData, photo_url: url })}
              existingPhotos={news.map(n => n.photo_url).filter(Boolean)}
            />

            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="artist">Artist</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Related Artist (Optional)</Label>
              <Select value={formData.related_artist_id || ""} onValueChange={(value) => setFormData({ ...formData, related_artist_id: value || "" })}>
                <SelectTrigger><SelectValue placeholder="Select artist" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>None</SelectItem>
                  {artists.map(artist => (
                    <SelectItem key={artist.id} value={artist.id}>{artist.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Related Staff (Optional)</Label>
              <Select value={formData.related_staff_id || ""} onValueChange={(value) => setFormData({ ...formData, related_staff_id: value || "" })}>
                <SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>None</SelectItem>
                  {staff.map(member => (
                    <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Published Date</Label>
                <Input type="datetime-local" value={formData.published_date} onChange={(e) => setFormData({ ...formData, published_date: e.target.value })} />
              </div>
              <div>
                <Label>Author</Label>
                <Input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} placeholder="Author name" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4" />
              <Label htmlFor="featured">Featured</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm"><Save className="w-4 h-4 mr-2" />Save</Button>
              <Button onClick={handleCancel} variant="outline" size="sm"><X className="w-4 h-4 mr-2" />Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {news.map((article) => (
          <Card key={article.id} className="border-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  {article.photo_url ? (
                    <img src={article.photo_url} alt={article.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-heading uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{
                      background: article.category === "artist" ? "rgba(255,215,0,0.2)" : 
                                  article.category === "staff" ? "rgba(56,189,248,0.2)" : "rgba(248,113,113,0.2)",
                      color: article.category === "artist" ? "#FFD700" : 
                             article.category === "staff" ? "#38BDF8" : "#F87171",
                    }}>
                      {article.category}
                    </span>
                    {article.featured && <span className="text-[10px] font-heading uppercase tracking-wider px-2 py-0.5 rounded-sm bg-primary text-primary-foreground">Featured</span>}
                  </div>
                  <h3 className="font-display text-base uppercase font-bold text-primary">{article.title}</h3>
                  <p className="text-xs text-muted-foreground">{article.content?.substring(0, 80)}...</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id, article.title)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
