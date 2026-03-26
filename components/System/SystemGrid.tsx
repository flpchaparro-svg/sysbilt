import React, { useState, useRef } from 'react';
import { m } from 'framer-motion';
import GridItem from './SystemGridItem';
import { getAllPillars } from '../../constants/systemPillars';

const ALL_PILLARS = getAllPillars();

interface SystemGridProps {
  onNavigate: (path: string) => void;
}

const SystemGrid: React.FC<SystemGridProps> = ({ onNavigate }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);

  // --- THE LOGIC ENGINE ---
  const getGridClasses = (currentId: string, selectedId: string | null) => {
    
    // --- 1. TABLET LOGIC (2 Columns) ---
    // Default: 1 Column
    let tablet = 'md:col-span-1';

    // Rule A: Selected Card & Card 7 are ALWAYS Full Width
    if (currentId === selectedId || currentId === 'pillar7') {
      tablet = 'md:col-span-2';
    } 
    // Rule B: If Selected is ODD (1, 3, 5), Card 6 must expand to close the offset.
    else if (['pillar1', 'pillar3', 'pillar5'].includes(selectedId || '')) {
      if (currentId === 'pillar6') tablet = 'md:col-span-2';
    }
    // Rule C: If Selected is EVEN (2, 4, 6), the neighbor BEFORE it must expand.
    else if (selectedId === 'pillar2' && currentId === 'pillar1') tablet = 'md:col-span-2';
    else if (selectedId === 'pillar4' && currentId === 'pillar3') tablet = 'md:col-span-2';
    else if (selectedId === 'pillar6' && currentId === 'pillar5') tablet = 'md:col-span-2';


    // --- 2. DESKTOP LOGIC (3 Columns) ---
    // Default: 1 Column
    let desktop = 'lg:col-span-1';

    // Rule A: Selected Card & Card 7 are ALWAYS Full Width
    if (currentId === selectedId || currentId === 'pillar7') {
      desktop = 'lg:col-span-3';
    }
    // Rule B: Row 1 Logic (1-2-3)
    else if (['pillar1', 'pillar2', 'pillar3'].includes(selectedId || '')) {
      // If 1 Selected -> 3 Stretches
      if (selectedId === 'pillar1' && currentId === 'pillar3') desktop = 'lg:col-span-2';
      // If 2 Selected -> 1 & 3 become Full (to clear row)
      if (selectedId === 'pillar2' && (currentId === 'pillar1' || currentId === 'pillar3')) desktop = 'lg:col-span-3';
      // If 3 Selected -> 1 Stretches
      if (selectedId === 'pillar3' && currentId === 'pillar1') desktop = 'lg:col-span-2';
    }
    // Rule C: Row 2 Logic (4-5-6)
    else if (['pillar4', 'pillar5', 'pillar6'].includes(selectedId || '')) {
      // If 4 Selected -> 6 Stretches
      if (selectedId === 'pillar4' && currentId === 'pillar6') desktop = 'lg:col-span-2';
      // If 5 Selected -> 4 & 6 become Full
      if (selectedId === 'pillar5' && (currentId === 'pillar4' || currentId === 'pillar6')) desktop = 'lg:col-span-3';
      // If 6 Selected -> 4 Stretches
      if (selectedId === 'pillar6' && currentId === 'pillar4') desktop = 'lg:col-span-2';
    }

    return `${tablet} ${desktop}`;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto mb-20 pt-10">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-on-cream mb-6 flex items-center justify-center gap-2">
             <div className="w-2 h-2 rounded-sm bg-gold" />
             / THE 7 PILLARS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-6">
            Pick what you <span className="italic font-serif text-gold-on-cream">need</span>
          </h2>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl mx-auto">
            Each pillar works on its own but they're built to connect. Click any one to see how.
          </p>
      </div>

      {/* GRID */}
      <m.div 
        ref={gridSectionRef}
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-dark/20 bg-dark/10"
      >
        {ALL_PILLARS.map((pillar) => {
          const isSelected = selectedPillarId === pillar.id;
          const gridClasses = getGridClasses(pillar.id, selectedPillarId);
          
          return (
            <m.div 
              layout
              key={pillar.id}
              className={`relative col-span-1 ${gridClasses}`}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <GridItem 
                pillar={pillar}
                isSelected={isSelected}
                selectedId={selectedPillarId}
                onToggle={() => {
                  const newId = selectedPillarId === pillar.id ? null : pillar.id;
                  setSelectedPillarId(newId);
                }}
                onNavigate={onNavigate}
              />
            </m.div>
          );
        })}
      </m.div>

    </div>
  );
};

export default SystemGrid;