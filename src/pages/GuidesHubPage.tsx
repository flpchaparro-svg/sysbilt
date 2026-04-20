import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PageMeta } from '../components/PageMeta';
import { SITE_ORIGIN } from '../constants/seoMeta';
import ShareButton from '../components/ShareButton';
import { ArrowRight, BookOpen, FileText, Rss, ChevronDown, ChevronUp } from 'lucide-react';
import { client } from '../sanityClient';

type HubGuide = {
  title: string;
  subtitle?: string;
  slug?: { current: string };
  servicePillar?: string[]; // Now explicitly an array from Sanity
};

// Phase Constants for strict mapping
const PHASE_1_SERVICES = ['Website & E-commerce', 'CRM & Lead Tracking', 'Automation'];
const PHASE_2_SERVICES = ['AI Assistants', 'Content Systems', 'Team Training'];
const PHASE_3_SERVICES = ['Dashboards & Reporting'];

const GUIDES_HUB_URL = `${SITE_ORIGIN}/guides`;

const guidesHubCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Business System Guides | SYSBILT',
  description:
    'Deep guides on how to build business systems that actually work. Websites, CRM, automation, AI, content, training, and dashboards.',
  url: GUIDES_HUB_URL,
  publisher: {
    '@type': 'Organization',
    name: 'SYSBILT',
    url: SITE_ORIGIN,
  },
};

const guidesHubBreadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: GUIDES_HUB_URL },
  ],
};

// Helper to determine the primary badge label based on the array of selected pillars
const getPrimaryBadge = (pillars: string[] | undefined): string => {
  const safe = pillars || [];
  if (safe.length === 0) return 'Uncategorized';
  if (safe.includes('The System')) return 'The System';

  const p1Count = safe.filter(p => PHASE_1_SERVICES.includes(p)).length;
  const p2Count = safe.filter(p => PHASE_2_SERVICES.includes(p)).length;
  const p3Count = safe.filter(p => PHASE_3_SERVICES.includes(p)).length;

  if (safe.includes('Get Clients') || p1Count > 1) return 'Get Clients';
  if (safe.includes('Scale Faster') || p2Count > 1) return 'Scale Faster';
  if (safe.includes('See Clearly') || p3Count > 1) return 'See Clearly';

  return safe[0]; // Fallback to the first selected item
};

// Strict logic for Hub Filters based on the arrays
const matchesFilter = (pillars: string[] | undefined, filter: string) => {
  if (filter === 'All Guides') return true;
  const safePillars = pillars || [];

  // Direct exact match (e.g. they clicked "Website & E-commerce" and it's in the array)
  if (safePillars.includes(filter)) return true;

  // Umbrella matches for the main phases
  if (filter === 'Get Clients') {
    return safePillars.some(p => PHASE_1_SERVICES.includes(p) || p === 'Get Clients');
  }
  if (filter === 'Scale Faster') {
    return safePillars.some(p => PHASE_2_SERVICES.includes(p) || p === 'Scale Faster');
  }
  if (filter === 'See Clearly') {
    return safePillars.some(p => PHASE_3_SERVICES.includes(p) || p === 'See Clearly');
  }
  
  return false;
};

export default function GuidesHubPage() {
  const [guides, setGuides] = useState<HubGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Guides');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const query = `*[_type == "guide"] | order(publishedAt desc) {
      title,
      subtitle,
      slug,
      servicePillar
    }`;

    client.fetch(query).then((data) => {
      setGuides(data);
      setIsLoading(false);
    });
  }, []);

  const filterRows = [
    ['Website & E-commerce', 'CRM & Lead Tracking', 'Automation', 'Get Clients'],
    ['AI Assistants', 'Content Systems', 'Team Training', 'Scale Faster'],
    ['Dashboards & Reporting', 'See Clearly', 'The System', 'All Guides']
  ];

  const filteredGuides = useMemo(() => {
    return guides
      .filter(guide => matchesFilter(guide.servicePillar, activeFilter))
      .slice(0, 10);
  }, [guides, activeFilter]);

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-dark selection:text-cream flex flex-col">
      <PageMeta
        title="Business System Guides for Growing Companies | SYSBILT"
        description="Deep guides on building business systems. Websites, CRM, automation, AI assistants, content systems, team training, and dashboards. Free to read and download."
        canonical={GUIDES_HUB_URL}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(guidesHubCollectionJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(guidesHubBreadcrumbJsonLd)}</script>
      </Helmet>
      
      <main className="flex-grow pt-28 md:pt-32 pb-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* HERO */}
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-12 md:mb-16 relative z-10 text-center">
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-cream rounded-full shadow-neu mx-auto flex items-center justify-center mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-cream rounded-full shadow-neu-inner flex items-center justify-center">
                <BookOpen size={20} className="text-red-text" strokeWidth={2} />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-7xl text-dark tracking-tighter mb-6">
              System <span className="italic font-serif text-gold-on-cream">Guides</span>
            </h1>
            <p className="font-sans text-base md:text-xl font-light text-on-cream-secondary max-w-2xl mx-auto">
              Actionable blueprints for building systems that scale.
            </p>
          </m.div>
        </section>

        {/* FILTER SYSTEM */}
        <section className="max-w-[1000px] mx-auto mb-12 relative z-20 px-6">
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between bg-cream px-6 py-4 rounded-xl shadow-neu border border-white/50 text-[11px] font-bold uppercase tracking-widest text-red-text"
            >
              Filter: {activeFilter}
              {isMobileMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
              {isMobileMenuOpen && (
                <m.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-cream rounded-xl shadow-neu-inner border border-black/5 overflow-hidden"
                >
                  {filterRows.flat().map((item) => (
                    <button
                      key={item}
                      onClick={() => { setActiveFilter(item); setIsMobileMenuOpen(false); }}
                      className="w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-black/5 last:border-0 text-dark/70 active:text-red-text"
                    >
                      {item}
                    </button>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block space-y-4">
            {filterRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex w-full bg-cream rounded-xl shadow-neu border border-white/50 overflow-hidden">
                {row.map((item) => {
                  const isActive = activeFilter === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setActiveFilter(item)}
                      className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.18em] border-r border-black/5 last:border-0 transition-all duration-300 ${
                        isActive ? 'bg-[#FFF8F5] shadow-neu-inner text-red-text' : 'hover:bg-white text-dark/50 hover:text-dark'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        {/* GUIDES GRID */}
        <section className="px-6 md:px-12 max-w-5xl mx-auto relative z-10 min-h-[400px]">
          {isLoading ? (
            <div className="py-20 flex justify-center"><div className="w-10 h-10 rounded-full border-2 border-t-red-text animate-spin"></div></div>
          ) : (
            <m.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <AnimatePresence mode="popLayout">
                {filteredGuides.map((guide) => {
                  const slug = guide.slug?.current ?? '';
                  const guidePath = `/guides/${slug}`;
                  const shareUrl = `${SITE_ORIGIN}${guidePath}`;
                  return (
                  <m.div key={guide.slug?.current} variants={cardVariants} layout initial="hidden" animate="show" exit="exit" className="relative group">
                    <Link to={guidePath} className="absolute inset-0 z-[1] rounded-[28px]" aria-label={`Open guide: ${guide.title}`} />
                    <div className="relative z-[2] flex flex-col h-full bg-cream rounded-[28px] p-8 shadow-neu border border-white/40 transition-all duration-500 hover:-translate-y-1 pointer-events-none">
                      <div className="absolute top-6 right-6 z-[3] pointer-events-auto">
                        <ShareButton url={shareUrl} title={guide.title} mode="card" variant="neumorphic" />
                      </div>
                      <div className="mb-6 inline-flex border border-gold-on-cream/20 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest text-gold-on-cream bg-cream shadow-neu-inner w-fit">
                        {getPrimaryBadge(guide.servicePillar)}
                      </div>
                      <h2 className="font-serif text-2xl text-dark mb-4 group-hover:text-red-text transition-colors leading-tight pr-12">
                        {guide.title}
                      </h2>
                      <p className="text-on-cream-secondary font-light text-sm mb-10 line-clamp-3 flex-grow">
                        {guide.subtitle}
                      </p>
                      <div className="flex items-center text-[11px] font-bold uppercase tracking-widest text-dark group-hover:text-red-text pt-4 border-t border-black/5">
                        Open Guide <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </m.div>
                  );
                })}
              </AnimatePresence>
            </m.div>
          )}
        </section>

        {/* RESOURCES */}
        <section className="px-6 md:px-12 max-w-5xl mx-auto mt-24 relative z-10">
          <div className="border-t border-black/10 pt-16">
            <h3 className="font-serif text-2xl text-dark mb-8">Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/blog" className="group flex items-start gap-6 bg-cream rounded-2xl p-8 shadow-neu border border-white/50 hover:-translate-y-1 transition-all">
                <div className="shrink-0 w-12 h-12 rounded-full bg-cream shadow-neu-inner flex items-center justify-center">
                  <FileText className="w-5 h-5 text-dark/40 group-hover:text-red-text" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-dark group-hover:text-red-text mb-2">Blog</h4>
                  <p className="text-on-cream-secondary font-light text-sm leading-relaxed">System-thinking for modern businesses.</p>
                </div>
              </Link>
              <Link to="/news" className="group flex items-start gap-6 bg-cream rounded-2xl p-8 shadow-neu border border-white/50 hover:-translate-y-1 transition-all">
                <div className="shrink-0 w-12 h-12 rounded-full bg-cream shadow-neu-inner flex items-center justify-center">
                  <Rss className="w-5 h-5 text-dark/40 group-hover:text-red-text" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-dark group-hover:text-red-text mb-2">News</h4>
                  <p className="text-on-cream-secondary font-light text-sm leading-relaxed">Updates and announcements.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}