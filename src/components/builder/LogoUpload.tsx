"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, Upload } from "lucide-react";
import { toast } from "sonner";

interface LogoUploadProps {
  currentLogo?: string;
  onLogoChange: (logoDataUrl: string) => void;
  onLogoRemove: () => void;
}

const MAX_SIZE = 500 * 1024; // 500KB

export function LogoUpload({ currentLogo, onLogoChange, onLogoRemove }: LogoUploadProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Image must be under 500KB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onLogoChange(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      {currentLogo ? (
        <div className="flex items-center gap-3">
          <img
            src={currentLogo}
            alt="Logo"
            className="h-14 w-auto object-contain border rounded p-1"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5 mr-1" />
              Change
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogoRemove}
            >
              <X className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
        >
          <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-xs text-muted-foreground">
            Click or drag to upload logo (max 500KB)
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
