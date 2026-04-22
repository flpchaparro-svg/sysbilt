import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  OPEN_BANNER_EVENT,
  getConsent,
  setConsent,
  isBotOrPrerender,
  ConsentState,
} from '../utils/consent';
import { loadHubSpotTracker } from '../utils/hubspot';

type BannerView = 'hidden' | 'main' | 'pill' | 'personalise';

const AUTO_SHRINK_MS = 7000;
const ENTRANCE_DELAY_MS = 800;

const CookieBanner: React.FC = () => {
  const [view, setView] = useState<BannerView>('hidden');
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isBotOrPrerender()) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const existing = getConsent();
    if (existing) {
      if (existing.analytics || existing.marketing) loadHubSpotTracker();
      return;
    }
    const timer = setTimeout(() => setView('main'), ENTRANCE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [mounted]);

  // Auto-shrink main view to pill after 7s of inactivity
  useEffect(() => {
    if (view !== 'main') return;
    const timer = setTimeout(() => setView('pill'), AUTO_SHRINK_MS);
    return () => clearTimeout(timer);
  }, [view]);

  // Footer "Cookie Settings" link trigger
  useEffect(() => {
    if (!mounted) return;
    const handler = () => {
      const existing = getConsent();
      setPrefs({
        analytics: existing?.analytics ?? false,
        marketing: existing?.marketing ?? false,
      });
      setView('personalise');
    };
    window.addEventListener(OPEN_BANNER_EVENT, handler);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, handler);
  }, [mounted]);

  const commit = useCallback((input: { analytics: boolean; marketing: boolean }) => {
    const saved: ConsentState = setConsent(input);
    if (saved.analytics || saved.marketing) loadHubSpotTracker();
    setView('hidden');
  }, []);

  const handleAcceptAll = () => commit({ analytics: true, marketing: true });
  const handleDeclineAll = () => commit({ analytics: false, marketing: false });
  const handleSavePrefs = () => commit(prefs);
  const handleOpenPersonalise = () => {
    const existing = getConsent();
    setPrefs({
      analytics: existing?.analytics ?? false,
      marketing: existing?.marketing ?? false,
    });
    setView('personalise');
  };

  if (!mounted || view === 'hidden') return null;

  return (
    <AnimatePresence mode="wait">
      {view === 'pill' && (
        <motion.div
          key="pill"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-4 left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none"
        >
          <button
            type="button"
            onClick={() => setView('main')}
            aria-label="Open cookie settings"
            className="pointer-events-auto bg-dark text-cream border border-white/10 px-4 py-2 shadow-xl font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-gold-on-dark transition-colors"
          >
            / Cookies
          </button>
        </motion.div>
      )}

      {view === 'main' && (
        <motion.div
          key="main"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-0 right-0 z-[9999] flex justify-center px-4"
        >
          <div className="bg-dark border border-white/10 p-[19px] shadow-2xl w-full max-w-xl">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gold-on-dark block mb-[11px]">
              / Cookies
            </span>
            <p className="font-sans text-cream text-[12px] leading-relaxed mb-[19px]">
              Some cookies keep the site running. Others help us measure what works and remember you next visit. You choose what stays on. Full detail on our{' '}
              <a href="/privacy" className="underline hover:text-gold-on-dark transition-colors">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-[7px]">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-gold-on-dark text-dark font-mono text-[10px] font-bold uppercase tracking-widest py-[9px] hover:bg-cream transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleDeclineAll}
                className="flex-1 bg-cream text-dark font-mono text-[10px] font-bold uppercase tracking-widest py-[9px] hover:bg-white transition-colors"
              >
                Decline All
              </button>
              <button
                onClick={handleOpenPersonalise}
                className="flex-1 border border-cream/30 text-cream font-mono text-[10px] uppercase tracking-widest py-[9px] hover:border-cream/70 transition-colors"
              >
                Personalise
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {view === 'personalise' && (
        <motion.div
          key="personalise"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="region"
          aria-label="Cookie settings"
          className="fixed bottom-4 left-0 right-0 z-[9999] flex justify-center px-4"
        >
          <div className="bg-dark border border-white/10 p-5 shadow-2xl w-full max-w-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-gold-on-dark text-xl">Cookie Settings</h3>
              <button
                onClick={() => setView('main')}
                aria-label="Close settings"
                className="text-cream/70 hover:text-cream transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5 mb-6">
              <CategoryRow
                title="Essential"
                badge="Always on"
                body="Required for the site to function. No personal tracking happens here."
                checked
                disabled
              />
              <CategoryRow
                title="Analytics"
                body="Lets us see which pages get read and which buttons get clicked so we can fix what is broken. Loads the HubSpot tracker."
                checked={prefs.analytics}
                onToggle={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
              />
              <CategoryRow
                title="Marketing"
                body="Remembers you across visits so we can show relevant content and measure campaign performance. Also HubSpot."
                checked={prefs.marketing}
                onToggle={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleSavePrefs}
                className="flex-1 bg-gold-on-dark text-dark font-mono text-[11px] font-bold uppercase tracking-widest py-2.5 hover:bg-cream transition-colors"
              >
                Save Settings
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 border border-cream/30 text-cream font-mono text-[11px] uppercase tracking-widest py-2.5 hover:border-cream/70 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleDeclineAll}
                className="flex-1 border border-cream/30 text-cream font-mono text-[11px] uppercase tracking-widest py-2.5 hover:border-cream/70 transition-colors"
              >
                Decline All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface CategoryRowProps {
  title: string;
  body: string;
  badge?: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ title, body, badge, checked, disabled, onToggle }) => {
  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-cream font-mono text-[11px] uppercase font-bold tracking-widest">{title}</h4>
          {badge && (
            <span className="text-gold-on-dark/70 text-[9px] font-mono uppercase tracking-widest">
              ({badge})
            </span>
          )}
        </div>
        <p className="text-cream/70 text-[11px] leading-relaxed">{body}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${title}`}
        disabled={disabled}
        onClick={onToggle}
        className={`shrink-0 w-10 h-5 relative transition-colors focus:outline-none focus:ring-2 focus:ring-gold-on-dark focus:ring-offset-2 focus:ring-offset-dark ${
          disabled ? 'bg-gold-on-dark/40 cursor-not-allowed' : checked ? 'bg-gold-on-dark' : 'bg-white/20'
        }`}
      >
        <motion.div
          layout
          className="absolute top-1 bottom-1 w-3 bg-dark"
          animate={{ left: checked ? 'calc(100% - 16px)' : '4px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
};

export default CookieBanner;
