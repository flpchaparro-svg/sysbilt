import React, { useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { SystemPillarDetail } from '../../types';
import { getDesktopGridClass, getTabletGridClass } from '../../utils/gridHelpers';

interface GridItemProps {
  pillar: SystemPillarDetail;
  isSelected: boolean;
  selectedId: string | null;
  onToggle: () => void;
  onNavigate: (path: string) => void;
}

const GridItem: React.FC<GridItemProps> = ({ pillar, isSelected, selectedId, onToggle, onNavigate }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isPillar7 = pillar.id === 'pillar7';

  // COMBINE LOGIC: Mobile (1) -> Tablet (2) -> Desktop (3)
  // col-span-1: Default for mobile (1 col)
  // md:class: Tablet logic
  // lg:class: Desktop logic
  const spanClasses = `col-span-1 ${getTabletGridClass(pillar.id, selectedId)} ${getDesktopGridClass(pillar.id, selectedId)}`;

  // Accent Logic
  const accentColor = pillar.categoryHex;
  const displayAccent = (isSelected && isPillar7) ? 'var(--white)' : accentColor;
  const bgClass = isSelected ? "bg-dark" : "bg-white hover:bg-cream";
  
  const borderStyle = {
      borderColor: isSelected 
          ? accentColor 
          : 'rgba(26, 26, 26, 0.1)',
  };

  // --- IMPROVED SCROLL LOGIC ---
  const handleToggle = () => {
    onToggle();
    // Only engage scroll if we are OPENING the card
    if (!isSelected) {
      setTimeout(() => {
        if (itemRef.current) {
          const rect = itemRef.current.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          // -80px offset to leave room for the sticky header
          const targetY = rect.top + scrollTop - 80;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }, 400); 
    }
  };

  return (
    <m.div
      layout
      ref={itemRef}
      onClick={handleToggle}
      className={`relative ${spanClasses} ${bgClass} border transition-all duration-500 ease-luxury overflow-hidden group cursor-pointer`}
      style={{ 
          minHeight: isSelected ? 'auto' : '280px',
          ...borderStyle
      }}
      onMouseEnter={(e) => {
          if(!isSelected) e.currentTarget.style.borderColor = accentColor;
      }}
      onMouseLeave={(e) => {
          if(!isSelected) e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.1)';
      }}
    >
      {isSelected && (
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
              style={{ backgroundImage: `radial-gradient(circle, ${displayAccent} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
         />
      )}

      {/* --- CLOSED STATE --- */}
      {!isSelected && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
              <span
                className="font-serif text-3xl md:text-4xl text-dark/10 font-bold absolute top-4 right-6 group-hover:text-dark/20 transition-colors"
                aria-hidden="true"
              >
                 {pillar.number}
              </span>
           </div>

           <div className="relative z-10 mt-4">
              <pillar.icon 
                className="w-6 h-6 md:w-8 md:h-8 mb-4 opacity-100 group-hover:scale-110 transition-all duration-snap" 
                style={{ color: accentColor }}
              />
              <h3 className="font-serif text-2xl md:text-3xl text-dark mb-2 leading-none tracking-tight group-hover:translate-x-1 transition-transform duration-snap">
                 <span className="md:hidden">{pillar.subtitleMobile || pillar.subtitle}</span>
                 <span className="hidden md:inline">{pillar.subtitle}</span>
              </h3>
              <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-3 md:mb-4" style={{ color: `${accentColor}80` }}>
                 {pillar.title}
              </p>
              
              <p className="font-sans text-xs md:text-sm text-dark/70 leading-relaxed line-clamp-2 md:line-clamp-none">
                 {pillar.body}
              </p>
           </div>

           <div className="flex justify-between items-center border-t border-dark/10 pt-4 mt-auto">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-dark/70 transition-colors font-bold group-hover:text-black">
                 PILLAR {pillar.number}
              </span>
              <div 
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: `${accentColor}10` }}
              >
                 <Plus 
                    className="w-4 h-4 group-hover:rotate-90 transition-all duration-snap" 
                    style={{ color: accentColor }}
                 />
              </div>
           </div>
        </m.div>
      )}

      {/* --- EXPANDED STATE --- */}
      <AnimatePresence>
        {isSelected && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }} exit={{ opacity: 0 }} className="relative w-full p-6 md:p-10 lg:p-16 flex flex-col">
            <button 
               onClick={(e) => { e.stopPropagation(); handleToggle(); }}
               className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white transition-all z-20"
            >
               <Minus className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="flex flex-col justify-between items-start border-b border-white/10 pb-8 mb-8 md:mb-10 pr-12">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: displayAccent }}>
                        {pillar.number} / {pillar.categoryLabel}
                     </span>
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-[0.95] tracking-tighter">
                     {pillar.title}
                  </h3>
                  <p className="font-sans text-base md:text-lg lg:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
                     {pillar.description}
                  </p>
               </div>
               
               <pillar.icon 
                  className="hidden lg:block w-24 h-24 absolute top-16 right-16 opacity-30" 
                  style={{ color: displayAccent }}
               />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-8 md:mb-12">
               <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {pillar.subServices.map((sub, i: number) => (
                     <div key={i} className="space-y-3">
                        <span 
                            className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border-l-2 pl-3 block"
                            style={{ color: displayAccent, borderColor: displayAccent }}
                        >
                           {sub.title}
                        </span>
                        <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed pl-3.5">
                           {sub.description}
                        </p>
                     </div>
                  ))}
               </div>

               <div className="bg-white/5 p-6 border border-white/10 flex flex-col justify-between rounded-sm">
                  <div>
                     <span className="font-mono text-[9px] md:text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] block mb-2">WHAT THIS SOLVES</span>
                     <p className="font-serif text-lg md:text-xl italic text-white mb-8">"{pillar.systemPurpose}"</p>
                  </div>
                  
                  <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
                     <button 
                        onClick={() => onNavigate(pillar.id)}
                        className="w-full py-4 bg-white text-dark font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                     >
                        SEE HOW IT WORKS <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

export default GridItem;
