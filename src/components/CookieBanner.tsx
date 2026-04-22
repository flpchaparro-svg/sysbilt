import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  OPEN_BANNER_EVENT,
  getConsent,
  setConsent,
  isBotOrPrerender,
  ConsentState,
} from '../utils/consent';
import { loadHubSpotTracker, unloadHubSpotTracker } from '../utils/hubspot';

type BannerView = 'hidden' | 'main' | 'personalise';

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
    const timer = setTimeout(() => setView('main'), 800);
    return () => clearTimeout(timer);
  }, [mounted]);

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
    if (saved.analytics || saved.marketing) {
      loadHubSpotTracker();
    } else {
      unloadHubSpotTracker();
    }
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
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-0 right-0 z-[9999] flex justify-center pointer-events-none px-4"
    >
      <AnimatePresence mode="wait">
        {view === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto bg-dark border border-white/10 p-6 shadow-2xl w-full max-w-2xl"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
                / Cookies
              </span>
            </div>
            <p className="font-sans text-cream text-sm leading-relaxed mb-6">
              Some cookies keep the site running. Others help us measure what works and remember you next visit. You choose what stays on. Full detail lives on our{' '}
              <Link to="/privacy" className="underline hover:text-gold-on-dark transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 bg-gold-on-dark text-dark font-mono text-xs font-bold uppercase tracking-widest py-3 hover:bg-cream transition-colors"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleDeclineAll}
                className="flex-1 bg-cream text-dark font-mono text-xs font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors"
              >
                Decline All
              </button>
              <button
                type="button"
                onClick={handleOpenPersonalise}
                className="flex-1 border border-cream/30 text-cream font-mono text-xs uppercase tracking-widest py-3 hover:border-cream/70 transition-colors"
              >
                Personalise
              </button>
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
            className="pointer-events-auto bg-dark border border-white/10 p-6 shadow-2xl w-full max-w-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-gold-on-dark text-2xl">Cookie Settings</h3>
              <button
                type="button"
                onClick={() => setView('main')}
                aria-label="Close settings"
                className="text-cream/70 hover:text-cream transition-colors"
              >
                <X className="w-5 h-5" aria-hidden />
              </button>
            </div>

            <div className="space-y-6 mb-8">
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

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleSavePrefs}
                className="flex-1 bg-gold-on-dark text-dark font-mono text-xs font-bold uppercase tracking-widest py-3 hover:bg-cream transition-colors"
              >
                Save Settings
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 border border-cream/30 text-cream font-mono text-xs uppercase tracking-widest py-3 hover:border-cream/70 transition-colors"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleDeclineAll}
                className="flex-1 border border-cream/30 text-cream font-mono text-xs uppercase tracking-widest py-3 hover:border-cream/70 transition-colors"
              >
                Decline All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h4 className="text-cream font-mono text-xs uppercase font-bold tracking-widest">{title}</h4>
          {badge && (
            <span className="text-gold-on-dark/70 text-[9px] font-mono uppercase tracking-widest">({badge})</span>
          )}
        </div>
        <p className="text-cream/70 text-xs leading-relaxed">{body}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${title}`}
        disabled={disabled}
        onClick={disabled ? undefined : onToggle}
        className={`shrink-0 w-10 h-5 relative rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${
          disabled ? 'bg-gold-on-dark/40 cursor-not-allowed' : checked ? 'bg-gold-on-dark' : 'bg-white/20'
        }`}
      >
        <motion.div
          layout
          className="absolute top-1 bottom-1 w-3 bg-dark rounded-sm"
          animate={{ left: checked ? 'calc(100% - 16px)' : '4px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
};

export default CookieBanner;
