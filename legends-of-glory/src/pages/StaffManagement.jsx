import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Save, X, Trash2, ArrowUp, ArrowDown, Images } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import PhotoSelector from "../components/management/PhotoSelector";
import NewsTab from "./NewsTab";
import TrailersTab from "./TrailersTab";
import VotingDashboard from "../components/management/VotingDashboard";

function StaffTab() {
  const [staff, setStaff] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", photo_url: "", order: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => { loadStaff(); }, []);

  const loadStaff = async () => {
    const data = await base44.entities.Staff.list("order", 50);
    setStaff(data);
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({ name: member.name || "", role: member.role || "", photo_url: member.photo_url || "", order: member.order || 0 });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", role: "", photo_url: "", order: 0 });
    setIsAdding(false);
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await base44.entities.Staff.create(formData);
        toast({ title: "Staff Added", description: `${formData.name} added successfully`, duration: 2000 });
      } else {
        await base44.entities.Staff.update(editingId, formData);
        toast({ title: "Updated", description: `${formData.name} updated successfully`, duration: 2000 });
      }
      await loadStaff();
      handleCancel();
    } catch (error) {
      toast({ title: "Error", description: "Failed to save", variant: "destructive", duration: 2000 });
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete ${name}?`)) return;
    await base44.entities.Staff.delete(id);
    toast({ title: "Deleted", description: `${name} removed`, duration: 2000 });
    await loadStaff();
  };

  const handleReorder = async (index, direction) => {
    const newStaff = [...staff];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newStaff.length) return;
    [newStaff[index], newStaff[swapIndex]] = [newStaff[swapIndex], newStaff[index]];
    for (let i = 0; i < newStaff.length; i++) {
      await base44.entities.Staff.update(newStaff[i].id, { order: i });
    }
    setStaff(newStaff);
  };

  return (
    <div>
      <div className="mb-6">
        <Button onClick={() => { setIsAdding(true); setFormData({ name: "", role: "", photo_url: "", order: staff.length }); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Staff Member
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card className="mb-6 border-primary/30">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Staff member name" />
            </div>
            <div>
              <Label>Role</Label>
              <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="Role or title" />
            </div>
            <PhotoSelector
              value={formData.photo_url}
              onChange={(url) => setFormData({ ...formData, photo_url: url })}
              existingPhotos={staff.map(s => s.photo_url)}
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm"><Save className="w-4 h-4 mr-2" />Save</Button>
              <Button onClick={handleCancel} variant="outline" size="sm"><X className="w-4 h-4 mr-2" />Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {staff.map((member, index) => (
          <Card key={member.id} className="border-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                {member.photo_url && (
                  <img src={member.photo_url} alt={member.name} className="w-16 h-20 object-cover rounded-sm border border-border" />
                )}
                <div className="flex-1">
                  <h3 className="font-display text-lg uppercase text-primary font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground text-xs">{member.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleReorder(index, "up")} disabled={index === 0}><ArrowUp className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleReorder(index, "down")} disabled={index === staff.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id, member.name)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ArtistTab() {
  const [artists, setArtists] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", photo_url: "", photos: [], bio: "", city: "", state: "", high_school: "", rating: "", songs_achievements: "", legends_of_glory_story: "", recording_story: "", filming_story: "", order: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => { loadArtists(); }, []);

  const loadArtists = async () => {
    const data = await base44.entities.Artist.list("order", 50);
    setArtists(data);
  };

  const handleEdit = (artist) => {
    setEditingId(artist.id);
    setFormData({
      name: artist.name || "",
      photo_url: artist.photo_url || "",
      photos: artist.photos || [],
      bio: artist.bio || "",
      city: artist.city || "",
      state: artist.state || "",
      high_school: artist.high_school || "",
      rating: artist.rating || "",
      songs_achievements: artist.songs_achievements || "",
      legends_of_glory_story: artist.legends_of_glory_story || "",
      recording_story: artist.recording_story || "",
      filming_story: artist.filming_story || "",
      order: artist.order || 0,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", photo_url: "", photos: [], bio: "", city: "", state: "", high_school: "", rating: "", songs_achievements: "", legends_of_glory_story: "", recording_story: "", filming_story: "", order: 0 });
    setIsAdding(false);
  };

  const handleSave = async () => {
    try {
      // Filter out empty photo URLs from carousel
      const photos = (formData.photos || []).filter(p => p && p.trim() !== "");
      const payload = { 
        ...formData, 
        rating: formData.rating ? Number(formData.rating) : undefined,
        photos 
      };
      if (isAdding) {
        await base44.entities.Artist.create(payload);
        toast({ title: "Artist Added", description: `${formData.name} added successfully`, duration: 2000 });
      } else {
        await base44.entities.Artist.update(editingId, payload);
        toast({ title: "Updated", description: `${formData.name} updated successfully`, duration: 2000 });
      }
      await loadArtists();
      handleCancel();
    } catch (error) {
      console.error("Save error:", error);
      toast({ title: "Error", description: error.message || "Failed to save", variant: "destructive", duration: 3000 });
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete ${name}?`)) return;
    await base44.entities.Artist.delete(id);
    toast({ title: "Deleted", description: `${name} removed`, duration: 2000 });
    await loadArtists();
  };

  const handleReorder = async (index, direction) => {
    const newArtists = [...artists];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newArtists.length) return;
    [newArtists[index], newArtists[swapIndex]] = [newArtists[swapIndex], newArtists[index]];
    for (let i = 0; i < newArtists.length; i++) {
      await base44.entities.Artist.update(newArtists[i].id, { order: i });
    }
    setArtists(newArtists);
  };

  return (
    <div>
      <div className="mb-6">
        <Button onClick={() => { setIsAdding(true); setFormData({ name: "", photo_url: "", photos: [], bio: "", city: "", state: "", high_school: "", rating: "", songs_achievements: "", legends_of_glory_story: "", recording_story: "", filming_story: "", order: artists.length }); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Artist
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card className="mb-6 border-primary/30">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Artist name" />
              </div>
              <div className="sm:col-span-2">
                <PhotoSelector
                  value={formData.photo_url}
                  onChange={(url) => setFormData({ ...formData, photo_url: url })}
                  existingPhotos={[...(artists.flatMap(a => a.photos) || []), ...(artists.map(a => a.photo_url) || [])]}
                />
              </div>
              <div>
                <Label>City</Label>
                <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="City" />
              </div>
              <div>
                <Label>State</Label>
                <Input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} placeholder="State" />
              </div>
              <div>
                <Label>High School</Label>
                <Input value={formData.high_school} onChange={(e) => setFormData({ ...formData, high_school: e.target.value })} placeholder="High school" />
              </div>
              <div>
                <Label>Rating (1-100)</Label>
                <Input type="number" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} placeholder="85" />
              </div>
            </div>
            <div>
              <Label>Bio / Story</Label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Artist backstory..."
                rows={4}
                className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <Label>Songs & Achievements</Label>
              <textarea
                value={formData.songs_achievements}
                onChange={(e) => setFormData({ ...formData, songs_achievements: e.target.value })}
                placeholder="Discography, achievements..."
                rows={4}
                className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <Label>How They Got on Legends of Glory</Label>
              <textarea
                value={formData.legends_of_glory_story}
                onChange={(e) => setFormData({ ...formData, legends_of_glory_story: e.target.value })}
                placeholder="Their path to the cypher..."
                rows={4}
                className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <Label>Recording Their Verse (Behind the Scenes)</Label>
              <textarea
                value={formData.recording_story}
                onChange={(e) => setFormData({ ...formData, recording_story: e.target.value })}
                placeholder="Short story about recording in the studio..."
                rows={4}
                className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <Label>Filming Their Verse (Behind the Scenes)</Label>
              <textarea
                value={formData.filming_story}
                onChange={(e) => setFormData({ ...formData, filming_story: e.target.value })}
                placeholder="Short story about filming their verse..."
                rows={4}
                className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            {/* Photo Carousel Management */}
            <div>
              <Label className="flex items-center gap-2 mb-2"><Images className="w-4 h-4" /> Photo Carousel (additional photos)</Label>
              <div className="space-y-2">
                {(formData.photos || []).map((url, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <PhotoSelector
                      value={url}
                      onChange={(newUrl) => {
                        setFormData(prev => {
                          const updated = [...prev.photos];
                          updated[i] = newUrl;
                          return { ...prev, photos: updated };
                        });
                      }}
                      existingPhotos={[...(artists.flatMap(a => a.photos) || []), ...(artists.map(a => a.photo_url) || [])]}
                    />
                    <Button variant="ghost" size="icon" onClick={() => {
                      setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, idx) => idx !== i) }));
                    }}><X className="w-4 h-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, photos: [...(prev.photos || []), ""] }))}>
                  <Plus className="w-4 h-4 mr-2" /> Add Photo
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm"><Save className="w-4 h-4 mr-2" />Save</Button>
              <Button onClick={handleCancel} variant="outline" size="sm"><X className="w-4 h-4 mr-2" />Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {artists.map((artist, index) => (
          <Card key={artist.id} className="border-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                {artist.photo_url ? (
                  <img src={artist.photo_url} alt={artist.name} className="w-16 h-20 object-cover rounded-sm border border-border" />
                ) : (
                  <div className="w-16 h-20 rounded-sm border border-border bg-secondary flex items-center justify-center font-heading text-xl text-primary font-bold">
                    {artist.name?.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-display text-lg uppercase text-primary font-semibold">{artist.name}</h3>
                  <p className="text-muted-foreground text-xs">{artist.city}{artist.state ? `, ${artist.state}` : ""}</p>
                  {artist.rating && <p className="text-xs text-foreground mt-1">Rating: {artist.rating}/100</p>}
                  {artist.bio && <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{artist.bio}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleReorder(index, "up")} disabled={index === 0}><ArrowUp className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleReorder(index, "down")} disabled={index === artists.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(artist)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(artist.id, artist.name)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function StaffManagement() {
  const [activeTab, setActiveTab] = useState("staff");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold uppercase text-primary mb-2">
              Management
            </h1>
            <p className="text-muted-foreground text-sm">Manage staff, artists, news, and trailers</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("staff")}
              className={`px-6 py-3 text-sm font-heading uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "staff" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Staff
            </button>
            <button
              onClick={() => setActiveTab("artists")}
              className={`px-6 py-3 text-sm font-heading uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "artists" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Artists
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-6 py-3 text-sm font-heading uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "news" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab("trailers")}
              className={`px-6 py-3 text-sm font-heading uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "trailers" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Trailers
            </button>
            <button
              onClick={() => setActiveTab("voting")}
              className={`px-6 py-3 text-sm font-heading uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "voting" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Vote Dashboard
            </button>
          </div>

          {activeTab === "staff" && <StaffTab />}
          {activeTab === "artists" && <ArtistTab />}
          {activeTab === "news" && <NewsTab />}
          {activeTab === "trailers" && <TrailersTab />}
          {activeTab === "voting" && <VotingDashboard />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
