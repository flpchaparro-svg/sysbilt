import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box } from 'lucide-react';
import { SERVICES } from '~/constants';
import { colors } from '~/constants/theme';
import { ServiceDetail } from '~/types';
import ViewportViz from '~/components/ViewportViz';
import CTAButton from '~/components/CTAButton';

interface SystemPhasesProps {
  onNavigate?: (view: string, id?: string) => void;
}

// --- DATA STRUCTURE ---
type GridItem = 
  | { type: 'service'; data: ServiceDetail }
  | { 
      type: 'header'; 
      id: string; 
      label: string; 
      title: string; 
      body: string; 
      accentColor: string; 
      textColor: string;   
      buttonText: string;
      targetPillarId: string;
    };

const SystemPhases: React.FC<SystemPhasesProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState<string>('pillar1'); 
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 1. CONSTRUCT ITEMS
  const ITEMS: GridItem[] = [
    { type: 'service', data: SERVICES.find(s => s.id === 'pillar1')! },
    { type: 'service', data: SERVICES.find(s => s.id === 'pillar2')! },
    { type: 'service', data: SERVICES.find(s => s.id === 'pillar3')! },
    
    // PHASE 1 CHECKPOINT
    { 
      type: 'header', 
      id: 'HEADER_ACQ', 
      label: 'PHASE 01 / GET CLIENTS', 
      title: 'The Capture Loop', 
      body: "Your website catches leads. Your CRM holds them. Automation chases them. Nothing slips through.", 
      accentColor: colors.redSolid,
      textColor: colors.redText,
      buttonText: 'VIEW SYSTEM',
      targetPillarId: 'system'
    },

    { type: 'service', data: SERVICES.find(s => s.id === 'pillar4')! },
    { type: 'service', data: SERVICES.find(s => s.id === 'pillar5')! },
    { type: 'service', data: SERVICES.find(s => s.id === 'pillar6')! },
    
    // PHASE 2 CHECKPOINT
    { 
      type: 'header', 
      id: 'HEADER_VEL', 
      label: 'PHASE 02 / SCALE FASTER', 
      title: 'The Multiplier', 
      body: "Content fills your funnel. AI handles the overflow. Training keeps your team sharp. You grow without burning out.", 
      accentColor: colors.gold,        
      textColor: colors.goldOnCream,   
      buttonText: 'VIEW SYSTEM',
      targetPillarId: 'system'
    },

    { type: 'service', data: SERVICES.find(s => s.id === 'pillar7')! },
    
    // PHASE 3 CHECKPOINT
    { 
      type: 'header', 
      id: 'HEADER_INT', 
      label: 'PHASE 03 / SEE CLEARLY', 
      title: "The Control Room",
      body: "One dashboard. Live data. You see what's working. You fix what's broken. Before it costs you money.",
      accentColor: colors.dark,
      textColor: colors.dark,
      buttonText: 'VIEW SYSTEM',
      targetPillarId: 'system'
    },
  ];

  // SERVICES don't include icon names; use Box as default for service cards
  const getIcon = (_iconName?: string) => Box;

  const handleServiceClick = (service: ServiceDetail) => {
    if (onNavigate) onNavigate(service.id);
  };

  const handleItemClick = (id: string) => {
    setActiveId(id);
    setTimeout(() => {
        const element = itemRefs.current[id];
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        }
    }, 400);
  };

  return (
    <section id="architecture" className="py-24 lg:py-32 bg-cream border-t border-dark/10 relative overflow-hidden">
      
      {/* Background Tech Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
         <div className="absolute left-[12%] top-0 bottom-0 w-[1px] bg-black" />
         <div className="absolute right-[12%] top-0 bottom-0 w-[1px] bg-black" />
         <div className="absolute left-0 right-0 top-[15%] h-[1px] bg-black" />
         <div className="absolute left-0 right-0 bottom-[15%] h-[1px] bg-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
            <span className="font-mono text-[10px] md:text-xs text-dark tracking-[0.3em] mb-4 block uppercase font-bold">
              <span className="text-gold-muted">/</span> THE SYSTEM
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-dark leading-[0.9] tracking-tighter mb-6">
              7 Pillars, <span className="italic text-gold-on-cream">3 Outcomes</span>
            </h2>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl mx-auto">
              Some businesses need everything built from scratch. Some just need one piece fixed. Each service works alone. But they're built to connect when you're ready.
            </p>
        </div>

        {/* --- KINETIC ACCORDION --- */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] w-full select-none border border-dark/10 bg-white shadow-xl">
            {ITEMS.map((item, idx) => {
                
                // === TYPE A: HEADER CARD ===
                if (item.type === 'header') {
                    const isHeaderActive = activeId === item.id;
                    return (
                        <motion.div
                            key={item.id}
                            ref={(el) => (itemRefs.current[item.id] = el)}
                            layout
                            onClick={() => handleItemClick(item.id)}
                            className={`
                                relative overflow-hidden cursor-pointer transition-all duration-flow 
                                border-b lg:border-b-0 lg:border-r border-dark/10
                                ${isHeaderActive 
                                    ? 'lg:flex-[5] flex-[10] h-auto min-h-[400px]' 
                                    : 'lg:flex-[0.8] flex-[1] min-h-[60px]'
                                }
                                flex flex-col group
                            `}
                            // Inject accent color as CSS var for hover effects
                            style={{ 
                                backgroundColor: colors.cream, 
                                borderTop: isHeaderActive ? `4px solid ${item.accentColor}` : 'none',
                                // @ts-ignore
                                '--accent': item.accentColor 
                            }}
                        >
                            {isHeaderActive ? (
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    className="p-8 lg:p-10 h-full flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="type-eyebrow block mb-8" style={{ color: item.textColor }}>
                                            {item.label}
                                        </span>
                                        <h3 className="font-serif text-3xl md:text-5xl leading-[0.95] mb-6 tracking-tighter" style={{ color: item.textColor }}>
                                            {item.title}
                                        </h3>
                                        <p className="font-sans text-lg md:text-xl font-light leading-relaxed max-w-xl text-dark/80">
                                            {item.body}
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <CTAButton theme='light' onClick={() => onNavigate && onNavigate(item.targetPillarId)}>
                                            {item.buttonText}
                                        </CTAButton>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-cream hover:bg-cream-light transition-colors group-hover:bg-[var(--accent)]/10">
                                    <span 
                                        className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold lg:-rotate-90 whitespace-nowrap flex items-center gap-3"
                                        style={{ color: item.textColor }}
                                    >
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accentColor }}></span>
                                        {item.label.split('/')[1]?.trim() || item.label}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    );
                }

                // === TYPE B: SERVICE CARD ===
                const service = item.data;
                const isActive = activeId === service.id;
                const sysGroup = service.systemGroup || 'GET CLIENTS';
                const Icon = getIcon(service.icon);
                
                let accentColor: string = colors.redSolid; 
                let textColor: string = colors.redText;

                if (sysGroup === 'SCALE FASTER') {
                    accentColor = colors.gold;
                    textColor = colors.goldOnCream;
                } 
                if (sysGroup === 'SEE CLEARLY') {
                    accentColor = colors.dark;
                    textColor = colors.dark;
                }

                return (
                    <motion.div
                        key={service.id}
                        ref={(el) => (itemRefs.current[service.id] = el)}
                        layout
                        onClick={() => handleItemClick(service.id)}
                        className={`
                            relative overflow-hidden cursor-pointer transition-colors duration-flow 
                            border-b lg:border-b-0 lg:border-r border-dark/10
                            ${isActive 
                                ? 'lg:flex-[12] flex-[12] h-auto min-h-[600px] lg:min-h-auto' 
                                : 'lg:flex-[0.6] flex-[1] min-h-[60px]'
                            }
                            ${isActive ? 'bg-off-white' : 'bg-white'}
                            flex flex-col lg:flex-row group
                        `}
                        // Inject Accent Color into CSS Variable for Pure CSS Hovers
                        style={{ 
                            // @ts-ignore
                            '--accent': accentColor 
                        }}
                    >
                        {isActive && (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="relative lg:absolute inset-0 w-full h-full flex flex-col lg:flex-row"
                            >
                                {/* LEFT: CONTENT */}
                                <motion.div 
                                    layout
                                    className="w-full lg:w-[45%] h-auto lg:h-full p-8 lg:p-12 flex flex-col justify-between relative z-20 bg-white border-b lg:border-b-0 lg:border-r border-dark/5"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border" style={{ borderColor: accentColor, color: textColor }}>
                                                {sysGroup}
                                            </span>
                                            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: textColor }}>
                                                0{Number(service.id.replace('pillar', ''))}
                                            </span>
                                        </div>
                                        
                                        <h3 className="font-serif text-3xl md:text-4xl leading-[1.0] mb-6 tracking-tight" style={{ color: textColor }}>
                                            {service.title}
                                        </h3>
                                        
                                        <p className="font-sans text-base text-dark/70 leading-relaxed mb-8">
                                            {service.description}
                                        </p>

                                        <ul className="space-y-2 mb-8">
                                            {service.features.slice(0,3).map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[11px] font-mono text-dark/60 uppercase tracking-wide">
                                                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accentColor }} />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-8 lg:mt-auto">
                                        <CTAButton theme="light" variant="bracket" onClick={(e) => { e.stopPropagation(); handleServiceClick(service); }}>
                                            EXPLORE PILLAR
                                        </CTAButton>
                                    </div>
                                </motion.div>

                                {/* RIGHT: VISUALIZER */}
                                <motion.div 
                                    layout
                                    className="w-full lg:w-[55%] h-[350px] lg:h-full relative bg-gray-100 overflow-hidden border-l border-dark/5"
                                >
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ViewportViz type={service.visualPrompt} color={accentColor} />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {!isActive && (
                            <div className="absolute inset-0 w-full h-full flex flex-row lg:flex-col items-center justify-center p-4">
                                {/* CSS-BASED HOVER BACKGROUND */}
                                <div className="absolute inset-0 transition-opacity duration-snap opacity-0 group-hover:opacity-10 bg-[var(--accent)] pointer-events-none" />
                                
                                {/* CSS-BASED HOVER BAR */}
                                <div className="absolute bottom-0 left-0 w-1 lg:w-full h-full lg:h-1 transition-colors duration-snap bg-transparent group-hover:bg-[var(--accent)] pointer-events-none" />
                                
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="lg:-rotate-90 lg:whitespace-nowrap">
                                        <span 
                                            className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold transition-colors flex items-center gap-2 text-dark/60 group-hover:text-[var(--accent)]"
                                        >
                                            {service.title}
                                        </span>
                                    </div>
                                </div>

                                {/* NUMBER: LEFT ON MOBILE, BOTTOM CENTER ON DESKTOP */}
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 lg:translate-y-0 lg:top-auto lg:left-0 lg:right-0 lg:bottom-6 text-left lg:text-center pointer-events-none">
                                    <span 
                                        className="font-mono text-[10px] font-bold transition-colors text-dark/70 group-hover:text-[var(--accent)]"
                                    >
                                        0{Number(service.id.replace('pillar', ''))}
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>

      </div>
    </section>
  );
};

export default SystemPhases;