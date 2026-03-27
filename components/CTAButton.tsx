import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'light' | 'dark';
  variant?: 'solid' | 'bracket';
  size?: 'default' | 'sm';
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button',
  theme = 'light',
  variant = 'solid',
  size = 'default',
  className = "" 
}) => {
  
  const isLightTheme = theme === 'light'; 

  // ============================================
  // VARIANT: BRACKET (Fixed for Responsive)
  // ============================================
  if (variant === 'bracket') {
    // Light: dark text on cream, hover gold. Dark: gold on black, hover white.
    const idleText = isLightTheme ? 'text-dark' : 'text-gold-on-dark';
    const hoverText = isLightTheme ? 'hover:text-gold-on-cream' : 'hover:text-white';

    // Size Logic
    const fontSize = size === 'sm' ? 'text-[10px]' : 'text-xs';
    const padding = size === 'sm' ? 'px-1 py-1' : 'px-3 py-2';

    return (
      <button 
        type={type}
        onClick={onClick}
        className={`
          group relative inline-flex items-center justify-center gap-[2px]
          font-mono font-bold uppercase tracking-[0.2em] 
          bg-transparent border-none
          transition-colors duration-snap
          max-w-full whitespace-normal text-center leading-tight
          ${idleText} ${fontSize} ${padding} ${className}
          ${hoverText}
        `}
      >
        {/* Left Bracket - Squeezes In */}
        <span className="transition-transform duration-snap group-hover:translate-x-[2px] shrink-0">
          [
        </span>
        
        {/* The Text - Allows Wrapping */}
        <span className="mx-1 break-words">
          {children}
        </span>
        
        {/* Right Bracket - Squeezes In */}
        <span className="transition-transform duration-snap group-hover:-translate-x-[2px] shrink-0">
          ]
        </span>
      </button>
    );
  }

  // ============================================
  // VARIANT: SOLID (Fixed for Responsive)
  // ============================================
  const initialBg = isLightTheme ? 'bg-dark' : 'bg-gold-on-dark';
  const initialText = isLightTheme ? 'text-cream' : 'text-dark';
  const initialBorder = isLightTheme ? 'border-dark' : 'border-gold-on-dark';
  const hoverBg = isLightTheme ? 'bg-gold' : 'bg-cream';
  const solidSize = size === 'sm' ? 'px-6 py-3 text-[10px]' : 'px-8 py-4 text-xs';

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`
        group relative ${solidSize} 
        font-mono font-bold uppercase tracking-[0.2em] 
        overflow-hidden transition-all duration-snap 
        border ${initialBorder} ${initialBg} ${initialText} 
        max-w-full w-auto h-auto min-h-[3rem]
        ${className}
      `}
    >
      <div className={`absolute inset-0 ${initialBg} group-hover:-translate-y-full transition-transform duration-flow cubic-bezier(0.23, 1, 0.32, 1)`} />
      <div className={`absolute inset-0 ${hoverBg} translate-y-full group-hover:translate-y-0 transition-transform duration-flow cubic-bezier(0.23, 1, 0.32, 1)`} />
      
      <span className={`relative z-10 flex items-center justify-center gap-3 transition-colors duration-flow group-hover:text-dark flex-wrap text-center`}>
        <span className="whitespace-normal leading-relaxed">{children}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </span>
    </button>
  );
};

export default CTAButton;