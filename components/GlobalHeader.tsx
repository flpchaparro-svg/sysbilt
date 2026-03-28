import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Target, TrendingUp, BarChart3 } from 'lucide-react';
import CTAButton from './CTAButton';
import { SysbiltLogo } from './SysbiltLogo'; 

interface GlobalHeaderProps {
  currentView: string;
  onNavigate: (view: string, sectionId?: string) => void;
  scrolled: boolean;
  /** When true, use solid cream background (e.g. on dark pages like blog post) */
  solidBackground?: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ currentView, onNavigate, scrolled, solidBackground = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchHovered, setIsArchHovered] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobileSystemOpen, setIsMobileSystemOpen] = useState(false);

  // --- NEW: Identify if we are in the Editorial/Blog section
  const isBlogView = currentView.startsWith('blog');

  // --- DATA ---
  const navItems = [
    { id: 'architect', label: 'ABOUT', fullLabel: 'THE ARCHITECT' },
    { id: 'system', label: 'SYSTEM', fullLabel: 'THE SYSTEM', hasDropdown: true },
    { id: 'process', label: 'PROCESS', fullLabel: 'THE PROCESS' },
    { id: 'proof', label: 'PROOF', fullLabel: 'THE PROOF' },
  ];

  const archPillars = [
    { 
      system: 'GET CLIENTS', 
      icon: Target, 
      color: 'text-red-text', 
      hoverClass: 'hover:text-red-text',
      items: [
        { id: 'pillar1', name: '01 / Websites & E-commerce' },
        { id: 'pillar2', name: '02 / CRM & Lead Tracking' },
        { id: 'pillar3', name: '03 / Automation' }
      ]
    },
    { 
      system: 'SCALE FASTER', 
      icon: TrendingUp, 
      color: 'text-gold-on-cream', 
      hoverClass: 'hover:text-gold-on-cream',
      items: [
        { id: 'pillar4', name: '04 / AI Assistants' },
        { id: 'pillar5', name: '05 / Content Systems' },
        { id: 'pillar6', name: '06 / Team Training' }
      ]
    },
    { 
      system: 'SEE CLEARLY', 
      icon: BarChart3, 
      color: 'text-dark', 
      hoverClass: 'hover:text-black',
      items: [
        { id: 'pillar7', name: '07 / Dashboards & Reporting' }
      ]
    }
  ];

  return (
    <>
      {/* =======================
          1. TOP NAVIGATION
      ======================== */}
      <AnimatePresence>
        {/* FIX: If it's a Blog View, keep the top nav visible even when scrolled */}
        {(!scrolled || isBlogView) && (
          <m.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 w-full z-[300] px-6 md:px-12 transition-all duration-300 flex justify-between items-center pointer-events-none md:pointer-events-auto ${
              isBlogView && scrolled 
                ? 'h-16 md:h-20 bg-cream/95 backdrop-blur-md shadow-sm border-b border-dark/10' // Contrast Background when scrolling on Blog
                : `h-20 md:h-24 ${solidBackground ? 'bg-cream' : 'bg-transparent'}` // Default Background
            }`}
            onMouseLeave={() => { setIsArchHovered(false); setHoveredNav(null); }}
          >
            {/* SYSBILT LOGO */}
            <button 
              onClick={() => onNavigate('homepage')} 
              aria-label="Go to Homepage"
              className="group z-[310] pointer-events-auto flex items-center"
            >
              <SysbiltLogo />
            </button>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-4 lg:gap-8 pointer-events-auto">
               {navItems.map((item) => {
                 const isActive = currentView === item.id;
                 const isHovered = hoveredNav === item.id;

                 return (
                   <div 
                     key={item.id}
                     className="relative px-4 py-2"
                     onMouseEnter={() => {
                       setHoveredNav(item.id);
                       if (item.hasDropdown) setIsArchHovered(true);
                       else setIsArchHovered(false);
                     }}
                     onMouseLeave={() => {
                       if (!item.hasDropdown) setHoveredNav(null);
                     }}
                     onFocus={() => {
                       setHoveredNav(item.id);
                       if (item.hasDropdown) setIsArchHovered(true);
                       else setIsArchHovered(false);
                     }}
                     onBlur={(e) => {
                       if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                         setHoveredNav(null);
                         setIsArchHovered(false);
                       }
                     }}
                   >
                     {isHovered && (
                       <m.div 
                         layoutId="nav-bg"
                         className="absolute inset-0 bg-dark/5 rounded-sm z-0"
                         transition={{ type: "spring", bounce: 0.1, duration: 0.25 }}
                       />
                     )}

                     <button 
                       onClick={() => onNavigate(item.id)}
                       className="relative z-10 flex items-center gap-3 type-eyebrow text-dark whitespace-nowrap"
                     >
                       <span className={`w-1.5 h-1.5 rounded-full bg-gold transition-all duration-snap ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                       {item.fullLabel}
                       {item.hasDropdown && (
                         <ChevronDown className={`w-3 h-3 transition-transform duration-snap ${isArchHovered ? 'rotate-180' : ''}`} />
                       )}
                     </button>

                     {/* MEGA MENU */}
                     {item.hasDropdown && (
                        <AnimatePresence>
                          {isArchHovered && (
                            <m.div 
                              initial={{ opacity: 0, y: 10, clipPath: 'inset(0% 0% 100% 0%)' }}
                              animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                              exit={{ opacity: 0, y: 10, clipPath: 'inset(0% 0% 100% 0%)' }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-white border border-dark/10 shadow-2xl p-8 grid grid-cols-3 gap-8 cursor-default z-[400]"
                            >
                              {archPillars.map((group) => (
                                <div key={group.system} className="space-y-4">
                                  <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] ${group.color} border-b border-black/5 pb-2`}>
                                     <group.icon className="w-3 h-3" /> {group.system}
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    {group.items.map((subItem) => (
                                      <button 
                                        key={subItem.id} 
                                        onClick={(e) => { e.stopPropagation(); onNavigate(subItem.id); setIsArchHovered(false); }}
                                        className={`text-left font-serif text-lg text-dark/80 hover:pl-2 transition-all duration-200 ${group.hoverClass}`}
                                      >
                                        {subItem.name}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </m.div>
                          )}
                        </AnimatePresence>
                     )}
                   </div>
                 );
               })}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center pointer-events-auto">
               <CTAButton 
                 theme="light" 
                 onClick={() => onNavigate('contact')}
                 className="py-3 px-6 whitespace-nowrap"
               >
                 TALK
               </CTAButton>
            </div>
          </m.nav>
        )}
      </AnimatePresence>

      {/* =======================
          2. SIDE DOCK (Desktop Scroll)
      ======================== */}
      <AnimatePresence>
        {/* FIX: Prevent the Side Dock from appearing on the Blog */}
        {scrolled && !isBlogView && (
          <m.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-[20vh] z-[300] hidden lg:flex flex-col bg-dark border-l border-y border-white/10 rounded-l-lg shadow-2xl overflow-hidden w-[54px]"
            style={{ maxHeight: 'calc(100vh - 20vh - 4rem)' }}
          >
             <button 
               onClick={() => onNavigate('homepage')} 
               aria-label="Go to Homepage"
               className={`p-4 transition-all duration-snap border-b border-white/10 ${
                 currentView === 'homepage' 
                   ? 'bg-gold text-dark' 
                   : 'text-cream hover:bg-white/5'
               }`}
             >
                <span className="font-mono text-[10px] font-bold whitespace-nowrap">[SYS]</span>
             </button>

             <div className="flex flex-col">
                {navItems.map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`group relative h-24 w-full flex items-center justify-center transition-all duration-snap border-b border-white/5 ${
                        isActive 
                          ? 'bg-white/10 text-gold-on-cream' 
                          : 'text-cream/60 hover:text-cream hover:bg-white/5'
                      }`}
                    >
                       {isActive && <div className="absolute left-1 w-1 h-1 rounded-full bg-gold" />}
                       <span className="block -rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                         {item.label}
                       </span>
                    </button>
                  );
                })}
             </div>

             <button 
               onClick={() => onNavigate('contact')}
               className="h-32 w-full bg-gold flex items-center justify-center hover:bg-white hover:text-dark transition-colors duration-snap group"
             >
                <span className="block -rotate-90 whitespace-nowrap type-eyebrow text-dark">
                   TALK
                </span>
             </button>
          </m.div>
        )}
      </AnimatePresence>

      {/* =======================
          3. MOBILE NAVIGATION
      ======================== */}
      <div className={`lg:hidden fixed top-0 w-full z-[310] h-20 flex items-center justify-end px-6 pointer-events-none transition-opacity duration-snap ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
         <div className="flex items-center gap-3 pointer-events-auto">
            <button 
              onClick={() => onNavigate('contact')}
              className={`px-3 py-2 type-eyebrow border border-dark bg-dark text-cream whitespace-nowrap ${scrolled ? 'shadow-lg' : ''}`}
            >
              TALK
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)} 
              aria-label="Open main menu"
              className={`p-2 bg-white/80 backdrop-blur-md border border-dark/10 rounded-full text-dark ${scrolled ? 'shadow-lg' : ''}`}
            >
              <Menu className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: '0%' }} 
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{ willChange: "transform" }}
            className="fixed inset-0 bg-cream z-[400] flex flex-col px-8 overflow-y-auto"
          >
             <div className="h-20 w-full flex items-center justify-between shrink-0">
               <button onClick={() => { setIsMenuOpen(false); onNavigate('homepage'); }} aria-label="Go to Homepage">
                  <div className="font-mono text-[10px] font-bold border border-dark px-1.5 py-0.5 bg-dark text-cream whitespace-nowrap">
                    [SYS]
                  </div>
               </button>
               <button 
                 onClick={() => setIsMenuOpen(false)} 
                 aria-label="Close menu"
                 className="p-2 text-dark bg-white rounded-full border border-dark/10"
               >
                 <X className="w-6 h-6" />
               </button>
             </div>

             <div className="flex flex-col gap-8 flex-grow pt-12">
               {navItems.map((item) => (
                 <div key={item.id} className="flex flex-col">
                   <div className="flex items-center justify-between w-full group">
                     <button 
                       onClick={() => { 
                         onNavigate(item.id); 
                         setIsMenuOpen(false); 
                       }} 
                       className="flex items-center gap-4 text-4xl font-serif text-dark text-left hover:text-gold-on-cream transition-colors"
                     >
                       {currentView === item.id && <div className="w-2 h-2 rounded-full bg-gold" />}
                       {item.fullLabel}
                     </button>

                     {item.hasDropdown && (
                       <button 
                         onClick={() => setIsMobileSystemOpen(!isMobileSystemOpen)}
                         aria-label="Toggle system menu"
                         aria-expanded={isMobileSystemOpen}
                         className="p-2 -mr-2 text-dark/60 hover:text-dark transition-colors"
                       >
                         <ChevronDown className={`w-8 h-8 transition-transform duration-snap ${isMobileSystemOpen ? 'rotate-180' : ''}`} />
                       </button>
                     )}
                   </div>

                   {item.hasDropdown && (
                     <AnimatePresence>
                       {isMobileSystemOpen && (
                         <m.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                           <div className="pt-6 pb-2 pl-6 space-y-6 border-l border-dark/10 ml-2 mt-2">
                             {archPillars.map((group) => (
                               <div key={group.system}>
                                 <span className={`font-mono text-[9px] uppercase tracking-widest font-bold mb-3 block ${group.color}`}>
                                   {group.system}
                                 </span>
                                 <div className="flex flex-col gap-3">
                                   {group.items.map((sub) => (
                                     <button
                                       key={sub.id}
                                       onClick={() => { onNavigate(sub.id); setIsMenuOpen(false); }}
                                       className="text-left font-serif text-lg text-dark/70 hover:text-dark active:text-gold-on-cream transition-colors"
                                     >
                                       {sub.name}
                                     </button>
                                   ))}
                                 </div>
                               </div>
                             ))}
                           </div>
                         </m.div>
                       )}
                     </AnimatePresence>
                   )}
                 </div>
               ))}
               
               <div className="mt-auto w-full flex justify-center pb-8 pt-12">
                 <CTAButton 
                   theme="light" 
                   onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }}
                   className="w-full whitespace-nowrap"
                 >
                   LET'S TALK
                 </CTAButton>
               </div>
             </div>
             
             <div className="mb-8 border-t border-dark/10 pt-4 shrink-0">
               <div className="flex justify-between items-center">
                 <span className="font-mono text-[10px] uppercase tracking-widest text-dark/60">Response Time</span>
                 <div className="flex items-center gap-2 text-gold-on-cream font-mono text-xs uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                   &lt; 24 HRS
                 </div>
               </div>
             </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalHeader;