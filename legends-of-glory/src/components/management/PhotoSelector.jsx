import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PhotoSelector({ value, onChange, existingPhotos = [] }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log("File selected:", file.name, file.type, file.size);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please select an image file");
      e.target.value = "";
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be less than 10MB");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setError("");
    try {
      // Convert File to base64 data URL for UploadFile integration
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log("Base64 conversion complete, length:", reader.result?.length);
          resolve(reader.result);
        };
        reader.onerror = () => {
          console.error("FileReader error:", reader.error);
          reject(reader.error);
        };
        reader.readAsDataURL(file);
      });
      
      console.log("Calling UploadFile integration...");
      const result = await base44.integrations.Core.UploadFile({ file: base64 });
      console.log("UploadFile result:", result);
      
      if (result && result.file_url) {
        onChange(result.file_url);
      } else {
        setError("Upload failed: No URL returned");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const uniquePhotos = [...new Set(existingPhotos.filter(Boolean))];

  return (
    <div className="space-y-2">
      <Label>Photo</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setError("");
          }}
          placeholder="Paste URL or upload"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current.click()}
          disabled={uploading}
          className="shrink-0"
        >
          <Upload className="w-4 h-4 mr-1" />
          {uploading ? "..." : "Upload"}
        </Button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {uniquePhotos.length > 0 && (
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Or pick existing:</label>
          <div className="relative">
            <select
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setError("");
              }}
              className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="">— select existing —</option>
              {uniquePhotos.map((url, i) => (
                <option key={i} value={url}>{url.split("/").pop().slice(0, 50)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      )}

      {value && (
        <div className="relative inline-block">
          <img src={value} alt="preview" className="w-20 h-24 object-cover rounded-sm border border-border mt-1" />
          <button
            type="button"
            onClick={() => {
              onChange("");
              setError("");
            }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
