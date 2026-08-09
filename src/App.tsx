import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter'; // Standard Import (Stable)
import Modal from './components/Modal';
import CookieBanner from './components/CookieBanner';
import HelpDock from './components/HelpDock';
import { ServiceDetail } from './types';
import NotFoundPage from './pages/NotFoundPage';
import { ClientOnly } from './site/ClientOnly';

// Wave B required-body routes: EAGER (not lazy) so the SSR renderer can
// produce a real body synchronously, with no Suspense boundary to resolve.
import BlogPostPage from './pages/BlogPostPage';
import BtwChapterArticlePage from './pages/BtwChapterArticlePage';
import Pillar1 from './pages/System/Pillar1';
import GuidesPage from './pages/GuidesHubPage';
import BuiltToWorkHubPage from './pages/BuiltToWorkHubPage';
import BuiltToSellHubPage from './pages/BuiltToSellHubPage';
import BuiltToCloseHubPage from './pages/BuiltToCloseHubPage';
import BuiltToRunHubPage from './pages/BuiltToRunHubPage';
import BuiltToThinkHubPage from './pages/BuiltToThinkHubPage';
import BuiltToMultiplyHubPage from './pages/BuiltToMultiplyHubPage';
import BuiltToTeachHubPage from './pages/BuiltToTeachHubPage';
import BuiltToSeeHubPage from './pages/BuiltToSeeHubPage';

// PERFORMANCE: Keep HomePage Lazy
const HomePage = lazy(() => import('./pages/HomePage'));
const ArchitectPage = lazy(() => import('./pages/ArchitectPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const ProofPage = lazy(() => import('./pages/ProofPage'));
const EvidenceVaultPage = lazy(() => import('./pages/EvidenceVaultPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const FunnelPage = lazy(() => import('./pages/funnel/FunnelPage'));
const FunnelHomePage = lazy(() => import('./pages/funnel/FunnelHomePage'));
const FunnelThanksPage = lazy(() => import('./pages/funnel/FunnelThanksPage'));
const FunnelAccessPage = lazy(() => import('./pages/funnel/FunnelAccessPage'));
const WebsiteWizardPage = lazy(() => import('./pages/funnel/WebsiteWizardPage'));
const WebsiteAgreementPage = lazy(() => import('./pages/funnel/WebsiteAgreementPage'));
const QuoteCaptureDemoPage = lazy(() => import('./pages/demo/quoteCapture/QuoteCaptureDemoPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const GuideDocumentPage = lazy(() => import('./pages/GuideDocumentPage'));
const BuiltToWorkBookPage = lazy(() => import('./pages/BuiltToWorkBookPage'));
const BuiltToSellBookPage = lazy(() => import('./pages/BuiltToSellBookPage'));
const BtsChapterArticlePage = lazy(() => import('./pages/BtsChapterArticlePage'));
const BuiltToCloseBookPage = lazy(() => import('./pages/BuiltToCloseBookPage'));
const BtcChapterArticlePage = lazy(() => import('./pages/BtcChapterArticlePage'));
const BuiltToRunBookPage = lazy(() => import('./pages/BuiltToRunBookPage'));
const BtrChapterArticlePage = lazy(() => import('./pages/BtrChapterArticlePage'));
const BuiltToThinkBookPage = lazy(() => import('./pages/BuiltToThinkBookPage'));
const BttChapterArticlePage = lazy(() => import('./pages/BttChapterArticlePage'));
const BuiltToMultiplyBookPage = lazy(() => import('./pages/BuiltToMultiplyBookPage'));
const BtmChapterArticlePage = lazy(() => import('./pages/BtmChapterArticlePage'));
const BuiltToTeachBookPage = lazy(() => import('./pages/BuiltToTeachBookPage'));
const BteChapterArticlePage = lazy(() => import('./pages/BteChapterArticlePage'));
const BuiltToSeeBookPage = lazy(() => import('./pages/BuiltToSeeBookPage'));
const BseChapterArticlePage = lazy(() => import('./pages/BseChapterArticlePage'));
const ToolkitPage = lazy(() => import('./pages/ToolkitPage'));
const ToolkitItemPage = lazy(() => import('./pages/ToolkitItemPage'));
const ProposalPage = lazy(() => import('./pages/proposal/ProposalPage'));
const AgreementPage = lazy(() => import('./pages/agreement/AgreementPage'));
const DeepAuditReportPage = lazy(() => import('./pages/DeepAuditReportPage'));

const SystemPage = lazy(() => import('./pages/System/SystemPage'));
const Pillar2 = lazy(() => import('./pages/System/Pillar2'));
const Pillar3 = lazy(() => import('./pages/System/Pillar3'));
const Pillar4 = lazy(() => import('./pages/System/Pillar4'));
const Pillar5 = lazy(() => import('./pages/System/Pillar5'));
const Pillar6 = lazy(() => import('./pages/System/Pillar6'));
const Pillar7 = lazy(() => import('./pages/System/Pillar7'));

declare global {
  interface Window {
    prerenderReady: boolean;
  }
}

/** Wide hysteresis: scroll must pass clearly down/up before swapping header modes (stops rubber-band flicker). */
const SCROLL_COMPACT_AFTER = 100;
const SCROLL_FULL_NAV_UNTIL = 16;

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled((prev) => {
        if (y >= SCROLL_COMPACT_AFTER) return true;
        if (y <= SCROLL_FULL_NAV_UNTIL) return false;
        return prev;
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    apply();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setScrolled(false);
    requestAnimationFrame(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.prerenderReady = true;
    }, 3000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleGlobalNavigate = (path: string, sectionId?: string) => {
    const routeMap: Record<string, string> = {
      'homepage': '/',
      'blog': '/blog',
      'news': '/news',
      'guides': '/guides',
      'toolkit': '/toolkit',
      'architect': '/architect',
      'system': '/system',
      'process': '/process',
      'proof': '/proof',
      'evidence-vault': '/evidence-vault',
      'contact': '/contact',
      'privacy': '/privacy',
      'pillar1': '/pillar1',
      'pillar2': '/pillar2',
      'pillar3': '/pillar3',
      'pillar4': '/pillar4',
      'pillar5': '/pillar5',
      'pillar6': '/pillar6',
      'pillar7': '/pillar7',
    };
    
    const route = routeMap[path] || '/';
    
    if (path === 'homepage' && sectionId) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(route);
      window.scrollTo(0, 0);
    }
  };

  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/') return 'homepage';
    return path.slice(1) as any;
  };

  const handleServiceClick = (service: ServiceDetail) => {
    if (window.innerWidth >= 1024) {
      setSelectedService(service);
      setIsModalOpen(true);
    } else {
      handleGlobalNavigate(service.id);
    }
  };

  const isFunnelRoute =
    location.pathname === '/go' ||
    location.pathname === '/go/thanks' ||
    location.pathname.startsWith('/go/');
  const isDemoRoute = location.pathname.startsWith('/demo/');
  const hideChrome =
    location.pathname === '/contact' ||
    location.pathname.startsWith('/proposal/') ||
    location.pathname.startsWith('/agreement/') ||
    location.pathname.startsWith('/reports/') ||
    isFunnelRoute ||
    isDemoRoute;

  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <div className="bg-cream font-sans selection:bg-dark selection:text-cream min-h-screen flex flex-col relative">
          
          {!hideChrome && (
            <GlobalHeader
              currentView={getCurrentView()}
              scrolled={scrolled}
              solidBackground={
                location.pathname === '/guides' ||
                location.pathname.startsWith('/guides/') ||
                location.pathname === '/toolkit' ||
                /^\/(blog|toolkit)\/[^/]+$/.test(location.pathname)
              }
            />
          )}

          <main className="relative min-h-screen w-full flex-1">
            <Suspense fallback={<div className="h-screen w-full bg-cream" />}>
              <AnimatePresence mode="wait">
                <div key={location.pathname} className="w-full">
                  <Routes location={location}>
                    <Route path="/" element={<HomePage onNavigate={handleGlobalNavigate} onServiceClick={handleServiceClick} />} />
                    <Route path="/architect" element={<ArchitectPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
                    <Route path="/system" element={<SystemPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
                    <Route path="/process" element={<ProcessPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
                    <Route path="/proof" element={<ProofPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
                    <Route path="/evidence-vault" element={<EvidenceVaultPage onBack={() => handleGlobalNavigate('homepage')} />} />
                    <Route path="/contact" element={<ContactPage onBack={() => handleGlobalNavigate('homepage')} />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
                    <Route path="/terms" element={<TermsOfServicePage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage onNavigate={handleGlobalNavigate} />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/guides/built-to-work/read" element={<BuiltToWorkBookPage />} />
                    <Route path="/guides/built-to-work/:chapterSlug" element={<BtwChapterArticlePage />} />
                    <Route path="/guides/built-to-work" element={<BuiltToWorkHubPage />} />
                    <Route path="/guides/built-to-sell/read" element={<BuiltToSellBookPage />} />
                    <Route path="/guides/built-to-sell/:chapterSlug" element={<BtsChapterArticlePage />} />
                    <Route path="/guides/built-to-sell" element={<BuiltToSellHubPage />} />
                    <Route path="/guides/built-to-close/read" element={<BuiltToCloseBookPage />} />
                    <Route path="/guides/built-to-close/:chapterSlug" element={<BtcChapterArticlePage />} />
                    <Route path="/guides/built-to-close" element={<BuiltToCloseHubPage />} />
                    <Route path="/guides/built-to-run/read" element={<BuiltToRunBookPage />} />
                    <Route path="/guides/built-to-run/:chapterSlug" element={<BtrChapterArticlePage />} />
                    <Route path="/guides/built-to-run" element={<BuiltToRunHubPage />} />
                    <Route path="/guides/built-to-think/read" element={<BuiltToThinkBookPage />} />
                    <Route path="/guides/built-to-think/:chapterSlug" element={<BttChapterArticlePage />} />
                    <Route path="/guides/built-to-think" element={<BuiltToThinkHubPage />} />
                    <Route path="/guides/built-to-multiply/read" element={<BuiltToMultiplyBookPage />} />
                    <Route path="/guides/built-to-multiply/:chapterSlug" element={<BtmChapterArticlePage />} />
                    <Route path="/guides/built-to-multiply" element={<BuiltToMultiplyHubPage />} />
                    <Route path="/guides/built-to-teach/read" element={<BuiltToTeachBookPage />} />
                    <Route path="/guides/built-to-teach/:chapterSlug" element={<BteChapterArticlePage />} />
                    <Route path="/guides/built-to-teach" element={<BuiltToTeachHubPage />} />
                    <Route path="/guides/built-to-see/read" element={<BuiltToSeeBookPage />} />
                    <Route path="/guides/built-to-see/:chapterSlug" element={<BseChapterArticlePage />} />
                    <Route path="/guides/built-to-see" element={<BuiltToSeeHubPage />} />
                    <Route path="/guides/:slug" element={<GuideDocumentPage />} />
                    <Route path="/guides" element={<GuidesPage />} />
                    <Route path="/toolkit/:slug" element={<ToolkitItemPage />} />
                    <Route path="/toolkit" element={<ToolkitPage />} />
                    
                    <Route path="/pillar1" element={<Pillar1 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar2" element={<Pillar2 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar3" element={<Pillar3 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar4" element={<Pillar4 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar5" element={<Pillar5 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar6" element={<Pillar6 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar7" element={<Pillar7 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/proposal/:token" element={<ProposalPage />} />
                    <Route path="/agreement/:token" element={<AgreementPage />} />
                    <Route path="/reports/:token" element={<DeepAuditReportPage />} />
                    <Route path="/go/thanks" element={<FunnelThanksPage />} />
                    <Route path="/go/access" element={<FunnelAccessPage />} />
                    <Route path="/go/website/agreement" element={<WebsiteAgreementPage />} />
                    <Route path="/go/website/wizard" element={<WebsiteWizardPage />} />
                    <Route path="/go" element={<FunnelHomePage />} />
                    <Route path="/go/:slug" element={<FunnelPage />} />
                    <Route path="/demo/quote-capture" element={<QuoteCaptureDemoPage />} />

                    <Route path="*" element={<NotFoundPage onNavigate={handleGlobalNavigate} />} />
                  </Routes>
                </div>
              </AnimatePresence>
            </Suspense>
          </main>

          {location.pathname !== '/system' && !hideChrome && (
            <GlobalFooter />
          )}
          <ClientOnly>
            <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <CookieBanner />
            {!isFunnelRoute && !isDemoRoute && <HelpDock />}
          </ClientOnly>
        </div>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;