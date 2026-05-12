import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Activity, Zap, X } from 'lucide-react';
import { colors } from '../../constants/theme';
import EvidenceVisual_Compare from '../EvidenceVisual_Compare';
import CTAButton from '../CTAButton';

const Feature_Group7: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock body scroll when modal is open (Robust cleanup to prevent frozen scroll)
  useEffect(() => {
    // Store original overflow value before modifying
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    if (isModalOpen) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      // Add padding to compensate for scrollbar removal (prevents layout shift)
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = originalOverflow || '';
      document.body.style.paddingRight = originalPaddingRight || '';
    }
    
    // Robust cleanup: Always restore original values, even on errors
    return () => {
      try {
        document.body.style.overflow = originalOverflow || '';
        document.body.style.paddingRight = originalPaddingRight || '';
      } catch (error) {
        // Fallback: Force restore scroll if cleanup fails
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [isModalOpen]);

  return (
    <section className="w-full bg-cream py-20 md:py-24 border-y border-black/5 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-on-cream mb-4 block">
            / REAL RESULTS
          </span>
          {/* FIXED: Smooth scaling 4xl -> 5xl -> 7xl */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-dark leading-[0.95] tracking-tighter mb-6">
            <span className="sr-only">Business Systems Case Study: Group 7 Security</span>
            <span aria-hidden="true">
              See it in <span className="italic text-gold-on-cream">action</span>
            </span>
          </h2>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/80 border-l-2 border-red-solid/30 pl-6">
            Here's what happened when we rebuilt a Sydney security company's website.
          </p>
        </div>

        {/* --- THE TRIGGER CARD (Dark Device on Cream Desk) --- */}
        <m.div 
          initial="idle"
          whileInView="scan"
          viewport={{ once: true, amount: 0.5 }}
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-dark border border-black/10 p-1 rounded-sm overflow-hidden relative cursor-pointer hover:border-gold/50 transition-colors duration-flow shadow-2xl"
        >
          
          {/* THE FORENSIC SCANNER OVERLAY */}
          <m.div 
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-red-solid to-transparent z-50 opacity-0 blur-[1px] pointer-events-none"
            variants={{
              idle: { left: '0%', opacity: 0 },
              scan: { 
                left: '120%', 
                opacity: [0, 1, 1, 0], 
                transition: { duration: 2, ease: "easeInOut" } 
              }
            }}
          />
          <m.div 
            className="absolute top-0 bottom-0 w-[60px] bg-gradient-to-r from-transparent to-red-solid/10 z-40 opacity-0 pointer-events-none"
            variants={{
              idle: { left: '-60px', opacity: 0 },
              scan: { 
                left: 'calc(120% - 60px)', 
                opacity: [0, 1, 1, 0], 
                transition: { duration: 2, ease: "easeInOut" } 
              }
            }}
          />

          {/* Header Bar */}
          <div className="flex items-start sm:items-center gap-3 px-6 py-4 border-b border-white/5 bg-black/40 relative z-30">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse shrink-0 mt-1.5 sm:mt-0" />
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-gold-on-dark tracking-[0.12em] sm:tracking-[0.2em] uppercase leading-snug flex-1 min-w-0">
                 WEBSITE REBUILD — group7security.com 4.2s load vs group7security.com.au 0.4s load
              </span>
              <Zap className="w-3 h-3 text-gold-on-dark shrink-0 mt-1 sm:mt-0 opacity-90" aria-hidden />
          </div>

          {/* The Transformation Engine (Visual Abstract) */}
          <div className="p-8 md:p-16 relative min-h-[350px] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
              
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

              {/* NODE A: LEGACY (Left - Validated Early) */}
              <m.div 
                className="relative z-10 flex flex-col items-center gap-6"
                variants={{
                  idle: { filter: "grayscale(100%)", opacity: 0.5, scale: 1 },
                  scan: { 
                    filter: "grayscale(0%)", 
                    opacity: 1, 
                    scale: 1.05, 
                    transition: { duration: 0.4, delay: 0.3 } 
                  }
                }}
              >
                  <div className="w-24 h-24 rounded-full border border-red-solid/50 flex items-center justify-center bg-red-solid/5 relative overflow-hidden">
                      <m.div 
                        className="absolute inset-0 bg-red-solid/20" 
                        variants={{ idle: { opacity: 0 }, scan: { opacity: 1, transition: { delay: 0.3 } } }} 
                      />
                      <AlertTriangle className="w-10 h-10 text-red-solid relative z-10" />
                  </div>
                  <div className="text-center">
                      {/* Type B: Card Tag */}
                      <div className="type-eyebrow text-red-text mb-2">BEFORE</div>
                      {/* Node A */}
                      <div className="font-serif text-white/70 text-2xl md:text-3xl tracking-tight mb-2">group7security.com</div>
                      {/* Type B: Card Tag */}
                      <div className="flex items-center justify-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-red-text bg-red-solid/10 px-3 py-1.5 rounded">
                          <Activity className="w-3 h-3" />
                          <span>4.2s Load</span>
                      </div>
                  </div>
              </m.div>

              {/* STREAM CORD */}
              <div className="flex-grow w-full md:w-auto h-[100px] md:h-[1px] bg-white/5 relative mx-4 md:mx-12 flex items-center justify-center">
                  <m.div 
                      className="absolute top-0 bottom-0 left-0 h-full bg-gradient-to-r from-transparent via-gold to-transparent w-1/3 opacity-30"
                      animate={{ left: ['-30%', '130%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10 bg-dark border border-gold/30 px-6 py-3 rounded-full flex items-center gap-3">
                      {/* Type B: Card Tag */}
                      <span className="font-mono text-[10px] text-gold-on-dark uppercase tracking-[0.2em] font-bold">
                          VIEW TRANSFORMATION
                      </span>
                  </div>
              </div>

              {/* NODE B: AUTHORITY (Right - Validated Late) */}
              <m.div 
                className="relative z-10 flex flex-col items-center gap-6"
                variants={{
                  idle: { scale: 1, opacity: 0.5 },
                  scan: { 
                    scale: 1.05, 
                    opacity: 1, 
                    transition: { duration: 0.4, delay: 1.2 } 
                  }
                }}
              >
                  <m.div 
                    className="w-28 h-28 rounded-full border-2 flex items-center justify-center relative overflow-hidden"
                    variants={{
idle: { borderColor: colors.gray700, backgroundColor: 'rgba(0,0,0,0)' },
                    scan: { 
                        borderColor: colors.teal, 
                        backgroundColor: `${colors.teal}1a`, 
                        boxShadow: `0 0 50px ${colors.teal}66`,
                        transition: { delay: 1.2 }
                      }
                    }}
                  >
                      <m.div
                        variants={{
                          idle: { color: colors.gold },
                          scan: { color: colors.teal, transition: { delay: 1.2 } }
                        }}
                      >
                        <ShieldCheck className="w-12 h-12" />
                      </m.div>
                  </m.div>
                  <div className="text-center">
                      <m.div 
                        className="type-eyebrow mb-2"
                        variants={{
                          idle: { color: colors.gold },
                          scan: { color: colors.teal, transition: { delay: 1.2 } }
                        }}
                      >
                        AFTER
                      </m.div>
                      {/* Node B */}
                      <div className="font-serif text-white text-3xl md:text-4xl tracking-tight mb-2">group7security.com.au</div>
                      <m.div 
                        className="flex items-center justify-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-teal bg-teal/10 px-3 py-1.5 rounded"
                        variants={{
                          idle: { opacity: 0 },
                          scan: { opacity: 1, transition: { delay: 1.5, duration: 0.5 } }
                        }}
                      >
                          <Activity className="w-3 h-3" />
                          <span>0.4s Load</span>
                      </m.div>
                  </div>
              </m.div>

          </div>

          {/* Footer Action */}
          <div className="py-5 border-t border-white/5 bg-black/40 flex items-center justify-center relative z-30">
               <CTAButton variant="bracket" size="sm" theme="dark">
                 SEE FULL CASE STUDY
               </CTAButton>
          </div>

        </m.div>

        {/* --- THE EVIDENCE MODAL --- */}
        {isModalOpen && createPortal(
          <AnimatePresence mode="wait">
            <div key="modal" className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-8">
              
              <m.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              <m.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl bg-cream overflow-hidden shadow-2xl rounded-sm max-h-[90vh] flex flex-col z-10"
              >
                 
                 {/* MODAL HEADER */}
                 <div className="flex justify-between items-center p-6 border-b border-black/10 bg-white shrink-0">
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl text-dark leading-tight tracking-tight">
                         Group 7 Security
                      </h3>
                      <p className="type-eyebrow text-dark/70 mt-1">
                         Website rebuild
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      aria-label="Close modal"
                      className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-dark" />
                    </button>
                 </div>

                 <div className="flex-grow overflow-y-auto p-0">
                    <EvidenceVisual_Compare 
                      beforeLabel="BEFORE: Old .com Site"
                      afterLabel="AFTER: New .com.au Site"
                    />

                    <div className="p-8 md:p-12 bg-white border-t border-black/10">
                      <p className="font-sans text-base md:text-lg text-dark/70 leading-relaxed max-w-3xl">
                        We added local Sydney tags, removed slow code, and rebuilt from scratch. Load time dropped from 4.2 seconds to 0.4 seconds. A 10x faster site means more leads stay on the page.
                      </p>
                    </div>
                 </div>

              </m.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};

export default Feature_Group7;
