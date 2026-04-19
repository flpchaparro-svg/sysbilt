import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, useScroll, useMotionValueEvent, LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter'; // Standard Import (Stable)
import Modal from './components/Modal';
import { ServiceDetail } from './types';
import NotFoundPage from './pages/NotFoundPage';

// PERFORMANCE: Keep HomePage Lazy
const HomePage = lazy(() => import('./pages/HomePage'));
const ArchitectPage = lazy(() => import('./pages/ArchitectPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const ProofPage = lazy(() => import('./pages/ProofPage'));
const EvidenceVaultPage = lazy(() => import('./pages/EvidenceVaultPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const GuidesPage = lazy(() => import('./pages/GuidesHubPage'));
const GuideDocumentPage = lazy(() => import('./pages/GuideDocumentPage'));

const SystemPage = lazy(() => import('./pages/System/SystemPage'));
const Pillar1 = lazy(() => import('./pages/System/Pillar1'));
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

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
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

  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <div className="bg-cream font-sans selection:bg-dark selection:text-cream min-h-screen flex flex-col relative">
          
          {location.pathname !== '/contact' && (
            <GlobalHeader
              currentView={getCurrentView()}
              onNavigate={handleGlobalNavigate}
              scrolled={scrolled}
              solidBackground={/^\/blog\/[^/]+$/.test(location.pathname)}
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
                    <Route path="/blog" element={<BlogPage onNavigate={handleGlobalNavigate} />} />
                    <Route path="/blog/:slug" element={<BlogPostPage onNavigate={handleGlobalNavigate} />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/guides/:slug" element={<GuideDocumentPage />} />
                    <Route path="/guides" element={<GuidesPage />} />
                    
                    <Route path="/pillar1" element={<Pillar1 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar2" element={<Pillar2 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar3" element={<Pillar3 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar4" element={<Pillar4 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar5" element={<Pillar5 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar6" element={<Pillar6 onNavigate={handleGlobalNavigate} />} />
                    <Route path="/pillar7" element={<Pillar7 onNavigate={handleGlobalNavigate} />} />
                    
                    <Route path="*" element={<NotFoundPage onNavigate={handleGlobalNavigate} />} />
                  </Routes>
                </div>
              </AnimatePresence>
            </Suspense>
          </main>

          {location.pathname !== '/system' && location.pathname !== '/contact' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
          <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(id) => handleGlobalNavigate(id)} />
        </div>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;