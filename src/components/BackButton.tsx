import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string; // Default: "Return Home"
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  label = "Return Home", 
  onClick, 
  className = "" 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`group flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/80 hover:text-gold-on-cream transition-colors ${className}`}
    >
      {/* Arrow moves slightly left on hover */}
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-snap" />
      <span className="relative top-[1px]">/ {label}</span>
    </button>
  );
};

export default BackButton;
