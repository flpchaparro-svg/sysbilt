import React, { useState, useRef, useMemo } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface EvidenceVisualCompareProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string; // Explicitly typed
  afterImage?: string;  // Explicitly typed
}

const EvidenceVisual_Compare: React.FC<EvidenceVisualCompareProps> = ({ 
  beforeLabel = "BEFORE", 
  afterLabel = "AFTER",
  beforeImage = "/images/group7-before.webp",
  afterImage = "/images/group7-after.webp"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const clipPath = useMemo(() => {
    return `inset(0 ${100 - sliderPosition}% 0 0)`;
  }, [sliderPosition]);

  const beforeLabelOpacity = useMemo(() => {
    if (sliderPosition < 15) return Math.max(0, sliderPosition / 15);
    return 1;
  }, [sliderPosition]);

  const afterLabelOpacity = useMemo(() => {
    if (sliderPosition > 85) return Math.max(0, (100 - sliderPosition) / 15);
    return 1;
  }, [sliderPosition]);

  return (
    <div 
      ref={containerRef}
      // FIX: Added 'touch-none' to prevent page scrolling while dragging the slider on mobile
      className="w-full aspect-video md:h-[500px] md:aspect-auto relative overflow-hidden cursor-col-resize select-none border border-black/10 bg-white touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* --- AFTER IMAGE (Background / Clean) --- */}
      <div className="absolute inset-0">
        <img 
          src={afterImage} 
          alt={afterLabel}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* --- BEFORE IMAGE (Clipped using clip-path) --- */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt={beforeLabel}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          style={{ clipPath }}
        />
      </div>

      {/* --- FLOATING LABELS --- */}
      <div 
        className="absolute top-4 left-4 z-40 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        style={{ opacity: beforeLabelOpacity }}
      >
        <span className="text-white text-xs font-mono uppercase tracking-wider">
          {beforeLabel}
        </span>
      </div>

      <div 
        className="absolute top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur-sm transition-opacity duration-200"
        style={{ opacity: afterLabelOpacity }}
      >
        <span className="text-gold-on-cream text-xs font-mono uppercase tracking-wider font-semibold">
          {afterLabel}
        </span>
      </div>

      {/* --- SLIDER HANDLE --- */}
      <div 
        className="absolute top-0 bottom-0 w-px bg-white cursor-ew-resize z-50 flex items-center justify-center shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <MoveHorizontal className="w-4 h-4 text-black/60" />
        </div>
      </div>
    </div>
  );
};

export default EvidenceVisual_Compare;