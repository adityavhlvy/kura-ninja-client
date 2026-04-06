"use client";

import { useState, useEffect } from "react";
import { Settings, Eye, Type, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccessibilityWidget() {
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">("normal");

  // Load saved preferences on mount
  useEffect(() => {
    const savedContrast = localStorage.getItem("a11y-high-contrast") === "true";
    const savedGrayscale = localStorage.getItem("a11y-grayscale") === "true";
    const savedSize = localStorage.getItem("a11y-text-size") as "normal" | "large" | "xlarge" || "normal";
    
    setHighContrast(savedContrast);
    setGrayscale(savedGrayscale);
    setTextSize(savedSize);
  }, []);

  // Apply classes when state changes
  useEffect(() => {
    // Apply High Contrast
    if (highContrast) {
      document.documentElement.classList.add("high-contrast-mode");
      localStorage.setItem("a11y-high-contrast", "true");
    } else {
      document.documentElement.classList.remove("high-contrast-mode");
      localStorage.setItem("a11y-high-contrast", "false");
    }

    // Apply Grayscale
    if (grayscale) {
      document.documentElement.classList.add("grayscale-mode");
      localStorage.setItem("a11y-grayscale", "true");
    } else {
      document.documentElement.classList.remove("grayscale-mode");
      localStorage.setItem("a11y-grayscale", "false");
    }

    // Apply Text Size
    document.documentElement.classList.remove("text-base", "text-lg", "text-xl");
    if (textSize === "large") {
      document.documentElement.classList.add("text-lg");
    } else if (textSize === "xlarge") {
      document.documentElement.classList.add("text-xl");
    } else {
      document.documentElement.classList.add("text-base");
    }
    localStorage.setItem("a11y-text-size", textSize);
  }, [highContrast, grayscale, textSize]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="h-12 w-12 rounded-full shadow-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
            <Settings className="h-6 w-6 animate-spin-slow" style={{ animationDuration: '10s' }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-2xl border-border">
          <DropdownMenuLabel className="font-bold flex items-center gap-2 text-primary">
            <Eye className="h-4 w-4" /> Accessibility
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel className="text-xs text-muted-foreground mt-1">Display Filters</DropdownMenuLabel>
          <DropdownMenuItem onClick={(e) => { e.preventDefault(); setHighContrast(!highContrast); }} className="flex justify-between cursor-pointer focus:bg-accent focus:text-accent-foreground">
            <span className="flex items-center gap-2"><Contrast className="h-4 w-4 opacity-70"/> High Contrast</span>
            <span className="text-xs font-mono font-bold">{highContrast ? "ON" : "OFF"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { e.preventDefault(); setGrayscale(!grayscale); }} className="flex justify-between cursor-pointer focus:bg-accent focus:text-accent-foreground">
            <span className="flex items-center gap-2"><Eye className="h-4 w-4 opacity-70"/> Grayscale</span>
            <span className="text-xs font-mono font-bold">{grayscale ? "ON" : "OFF"}</span>
          </DropdownMenuItem>

          <DropdownMenuLabel className="text-xs text-muted-foreground mt-2">Global Text Size</DropdownMenuLabel>
          <div className="flex justify-between gap-1 p-1">
            <Button 
              variant={textSize === "normal" ? "default" : "outline"} 
              size="sm" 
              className="px-2 py-1 h-8 text-xs flex-1 font-bold"
              onClick={(e) => { e.preventDefault(); setTextSize("normal"); }}
            >
              A
            </Button>
            <Button 
              variant={textSize === "large" ? "default" : "outline"} 
              size="sm" 
              className="px-2 py-1 h-8 text-sm flex-1 font-bold"
              onClick={(e) => { e.preventDefault(); setTextSize("large"); }}
            >
              A
            </Button>
            <Button 
              variant={textSize === "xlarge" ? "default" : "outline"} 
              size="sm" 
              className="px-2 py-1 h-8 text-base flex-1 font-bold"
              onClick={(e) => { e.preventDefault(); setTextSize("xlarge"); }}
            >
              A
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
