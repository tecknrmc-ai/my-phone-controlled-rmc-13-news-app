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

export default function TrailersTab() {
  const [trailers, setTrailers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    thumbnail_url: "",
    description: "",
    category: "teaser",
    featured: false,
    order: 0,
    release_date: new Date().toISOString().slice(0, 16),
  });
  const { toast } = useToast();

  useEffect(() => {
    loadTrailers();
  }, []);

  const loadTrailers = async () => {
    const data = await base44.entities.Trailer.list("order", 50);
    setTrailers(data || []);
  };

  const handleEdit = (trailer) => {
    setEditingId(trailer.id);
    setIsAdding(false);
    setFormData({
      title: trailer.title || "",
      video_url: trailer.video_url || "",
      thumbnail_url: trailer.thumbnail_url || "",
      description: trailer.description || "",
      category: trailer.category || "teaser",
      featured: trailer.featured || false,
      order: trailer.order || 0,
      release_date: trailer.release_date 
        ? new Date(trailer.release_date).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: "",
      video_url: "",
      thumbnail_url: "",
      description: "",
      category: "teaser",
      featured: false,
      order: trailers.length,
      release_date: new Date().toISOString().slice(0, 16),
    });
    setIsAdding(false);
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await base44.entities.Trailer.create(formData);
        toast({ title: "Trailer Added", description: `${formData.title} added successfully`, duration: 2000 });
      } else {
        await base44.entities.Trailer.update(editingId, formData);
        toast({ title: "Updated", description: `${formData.title} updated successfully`, duration: 2000 });
      }
      await loadTrailers();
      handleCancel();
    } catch (error) {
      toast({ title: "Error", description: error.message || "Failed to save", variant: "destructive", duration: 3000 });
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete ${title}?`)) return;
    await base44.entities.Trailer.delete(id);
    toast({ title: "Deleted", description: `${title} removed`, duration: 2000 });
    await loadTrailers();
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/') && !file.type.startsWith('image/')) {
      alert("Please select a video or image file");
      return;
    }

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      
      const result = await base44.integrations.Core.UploadFile({ file: base64 });
      
      if (result && result.file_url) {
        setFormData({ ...formData, [field]: result.file_url });
      }
    } catch (error) {
      toast({ title: "Upload Error", description: error.message, variant: "destructive", duration: 3000 });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Button onClick={() => { setIsAdding(true); setFormData({ ...formData, order: trailers.length }); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Trailer
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card className="mb-6 border-primary/30">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Trailer title" />
            </div>

            <div>
              <Label>Video URL</Label>
              <div className="flex gap-2">
                <Input value={formData.video_url} onChange={(e) => setFormData({ ...formData, video_url: e.target.value })} placeholder="Paste URL or upload" className="flex-1" />
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('video-upload').click()}><Plus className="w-4 h-4" /></Button>
                <input id="video-upload" type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, 'video_url')} />
              </div>
              {formData.video_url && <video src={formData.video_url} controls className="w-full max-w-xs rounded-lg mt-2" />}
            </div>

            <div>
              <Label>Thumbnail URL</Label>
              <div className="flex gap-2">
                <Input value={formData.thumbnail_url} onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })} placeholder="Paste URL or upload" className="flex-1" />
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('thumbnail-upload').click()}><Plus className="w-4 h-4" /></Button>
                <input id="thumbnail-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail_url')} />
              </div>
              {formData.thumbnail_url && <img src={formData.thumbnail_url} alt="Thumbnail" className="w-32 h-20 object-cover rounded-lg mt-2" />}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" rows={3} />
            </div>

            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="teaser">Teaser</SelectItem>
                  <SelectItem value="behind_the_scenes">Behind The Scenes</SelectItem>
                  <SelectItem value="music_video">Music Video</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Order</Label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <Label>Release Date</Label>
                <Input type="datetime-local" value={formData.release_date} onChange={(e) => setFormData({ ...formData, release_date: e.target.value })} />
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
        {trailers.map((trailer) => (
          <Card key={trailer.id} className="border-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                <div className="w-32 h-20 rounded-lg overflow-hidden bg-secondary relative flex-shrink-0">
                  {trailer.thumbnail_url ? (
                    <img src={trailer.thumbnail_url} alt={trailer.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Thumbnail</div>
                  )}
                  {trailer.featured && <span className="absolute top-1 right-1 text-[8px] px-1 py-0.5 bg-primary text-primary-foreground rounded">Featured</span>}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg uppercase text-primary font-semibold">{trailer.title}</h3>
                  <p className="text-xs text-muted-foreground">{trailer.category.replace("_", " ")}{trailer.description && ` - ${trailer.description?.substring(0, 60)}...`}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(trailer)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(trailer.id, trailer.title)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
