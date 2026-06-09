import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterForm from '../components/NewsletterForm';
import { PageMeta } from '../components/PageMeta';
import { SEO_META, SITE_ORIGIN } from '../constants/seoMeta';
import ShareButton from '../components/ShareButton';

// Interfaces
interface NewsItem {
  _id: string;
  title: string;
  publishedAt: string;
  revenuePhase: 'horizon' | 'phase1' | 'phase2' | 'phase3';
  body: any[];
  mainImage?: any;
  sourceUrl?: string;
  servicePillar?: string; 
  targetPersonas?: { title: string; hubspotListId: string }[];
}

const CTA_BODY = "Book a call and we'll walk you through what this means for your business";

const pillarCTAMap: Record<string, { headline: string; pillarPath: string }> = {
  'Websites & E-commerce': { headline: 'Want to fix your website', pillarPath: '/pillar1' },
  'CRM & Lead Tracking': { headline: 'Want to fix your lead tracking', pillarPath: '/pillar2' },
  'Automation': { headline: 'Want to automate this', pillarPath: '/pillar3' },
  'AI Assistants': { headline: 'Want AI to handle this', pillarPath: '/pillar4' },
  'Content Systems': { headline: 'Want to fix your content', pillarPath: '/pillar5' },
  'Team Training': { headline: 'Want your team to actually use this', pillarPath: '/pillar6' },
  'Dashboards & Reporting': { headline: 'Want to see your real numbers', pillarPath: '/pillar7' },
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'phase1' | 'phase2' | 'phase3'>('all');
  
  // Track the expanded article for the drawer
  const [expandedItem, setExpandedItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const query = `*[_type == "newsItem"] | order(publishedAt desc) {
        _id, 
        title, 
        publishedAt, 
        revenuePhase, 
        body, 
        mainImage, 
        sourceUrl, 
        servicePillar,
        "targetPersonas": targetPersonas[]->{
          title,
          hubspotListId
        }
      }`;
      try {
        const data = await client.fetch(query);
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Lock background scrolling when the drawer is open
  useEffect(() => {
    if (expandedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [expandedItem]);

  const horizonNews = news.find((n) => n.revenuePhase === 'horizon');
  const phase1News = news.filter((n) => n.revenuePhase === 'phase1').slice(0, 12);
  const phase2News = news.filter((n) => n.revenuePhase === 'phase2').slice(0, 12);
  const phase3News = news.filter((n) => n.revenuePhase === 'phase3').slice(0, 12);

  const sectionContent: Record<string, { label: string; title: string; description: string }> = {
    all: { label: 'View All', title: '', description: '' },
    phase1: {
      label: 'Getting More Clients',
      title: 'Getting more clients',
      description: 'News and updates about websites, CRM, and lead generation',
    },
    phase2: {
      label: 'Building Your Business',
      title: 'Scaling your operations',
      description: 'News and updates about AI, content, and team training',
    },
    phase3: {
      label: 'Managing Your Business',
      title: 'Seeing your numbers clearly',
      description: 'News and updates about dashboards, reporting, and data',
    },
  };

  const HotspotTags = ({ pillar }: { pillar?: string }) => {
    if (!pillar?.trim()) return null;
    const tag = `#${pillar.replace(/\s+/g, '')}`;
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="font-mono text-[9px] uppercase tracking-wider bg-off-white px-2 py-0.5 border border-dark/10 text-dark/70">
          {tag}
        </span>
      </div>
    );
  };

  const CTA = ({ item }: { item: NewsItem }) => {
    const mapped = item.servicePillar ? pillarCTAMap[item.servicePillar] : undefined;
    const headline = mapped?.headline ?? 'Want to talk about this';
    const pillarPath = mapped?.pillarPath ?? '/system';
    const primaryLabel = item.servicePillar?.trim()
      ? `See ${item.servicePillar}`
      : 'See how we help';

    return (
      <div className="bg-off-white p-6 sm:p-8 md:p-12 border border-dark/10 relative group font-sans mt-12">
        <ArrowDownLeft className="absolute top-6 right-6 w-5 h-5 text-dark/40 group-hover:text-red-solid transition-colors hidden sm:block" />
        <h3 className="font-serif text-2xl md:text-3xl text-dark leading-tight mb-3 font-black pr-8 normal-case">{headline}</h3>
        <p className="type-body text-dark/80 mb-6 max-w-lg leading-relaxed">{CTA_BODY}</p>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
          <Link
            onClick={() => setExpandedItem(null)}
            to={pillarPath}
            className="font-mono text-xs uppercase tracking-wider bg-dark text-white px-6 py-3 border border-dark hover:bg-gold hover:text-dark hover:border-dark transition-colors text-center"
          >
            {primaryLabel}
          </Link>
          <Link
            onClick={() => setExpandedItem(null)}
            to="/contact"
            className="font-mono text-xs uppercase tracking-wider text-dark/80 hover:text-dark transition-colors inline-flex items-center justify-center sm:justify-start gap-2 pt-2 sm:pt-0"
          >
            Let&apos;s talk ↓
          </Link>
        </div>
      </div>
    );
  };

  const ArticleContent = ({ item }: { item: NewsItem }) => (
    <div className="bg-white min-h-full flex flex-col relative">
      
      <button onClick={() => setExpandedItem(null)} className="absolute top-4 left-4 md:top-6 md:left-6 z-20 bg-red-solid text-white p-2 hover:bg-dark transition-colors shadow-md">
        <X className="w-6 h-6" />
      </button>

      {item.mainImage && (
        <div className="w-full aspect-video md:aspect-[21/9] relative border-b border-dark/10 bg-cream">
           <img
             src={urlFor(item.mainImage).width(1200).url()}
             alt={item.title}
             className="w-full h-full object-cover"
             loading="lazy"
             decoding="async"
           />
        </div>
      )}

      <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex-grow flex flex-col max-w-3xl mx-auto w-full">
        <HotspotTags pillar={item.servicePillar} />
        
        <div className="flex items-center gap-3 mb-6">
          <time className="font-mono text-[10px] text-dark/50 uppercase tracking-widest">
            {new Date(item.publishedAt).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })}
          </time>
        </div>

        <h2 className="text-3xl md:text-4xl font-normal uppercase font-serif leading-tight tracking-tight text-dark mb-10 break-words">
          {item.title}
        </h2>

        <div className="text-left prose prose-lg prose-dark/80 max-w-none hover:prose-a:text-dark prose-a:text-gold prose-p:mb-8 pr-0 md:pr-4 overflow-hidden">
          <PortableText value={item.body} />
        </div>

        <CTA item={item} />

        <div className="mt-10 pt-8 border-t border-dark/10">
          <ShareButton
            url={`${SITE_ORIGIN}/news?item=${item._id}`}
            title={item.title}
            mode="card"
            variant="brutalist"
            cardAnchor="bl"
            cardCollapsedStyle="minimal"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-12 pt-8 border-t border-dark/10 gap-6 sm:gap-0">
          {item.sourceUrl ? (
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-wider text-dark hover:text-gold transition-colors inline-flex items-center gap-2 font-bold break-all normal-case">
              View original source <span>↗</span>
            </a>
          ) : <div></div>}
          
          <button onClick={() => setExpandedItem(null)} className="font-mono text-[11px] font-bold text-red-solid tracking-widest transition-all duration-300 inline-flex items-center gap-2 text-left sm:text-right hover:text-dark normal-case">
            Close article <span>↑</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full relative font-sans pb-32 bg-cream min-h-screen flex flex-col overflow-x-hidden">
      <PageMeta
        title={SEO_META.news.title}
        description={SEO_META.news.description}
        canonical={SEO_META.news.canonical}
        robots="noindex, nofollow"
      />

      {loading ? (
        <main className="flex-grow flex items-center justify-center pt-48 pb-24">
          <p className="text-dark font-sans text-base md:text-lg animate-pulse">Loading articles...</p>
        </main>
      ) : (
        <main className="flex-grow pt-32 relative">
          
          <header className="pb-12 px-4 md:px-8 max-w-[1400px] mx-auto border-b-4 border-dark mb-8 relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-dark tracking-tighter mb-6 mt-12 break-words normal-case font-medium">
              Industry news and updates
            </h1>
            <p className="type-body-lg text-dark/70 max-w-2xl border-l-4 border-gold pl-6 font-sans leading-relaxed">
              What&apos;s changing in tech and business, and what it means for you
            </p>
          </header>

          <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-16">
            <NewsletterForm />
          </div>

          <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col gap-12 relative">
            
            {horizonNews && (
              <section className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-4 h-4 bg-gold border border-dark"></span>
                  <h2 className="font-mono text-sm text-dark font-bold tracking-widest m-0 normal-case">This month&apos;s forecast</h2>
                </div>
                
                <div 
                  onClick={() => setExpandedItem(horizonNews)}
                  className="w-full text-left flex flex-col bg-transparent border-y-2 border-dark/10 relative group font-serif transition-all duration-500 hover:bg-cream/60 hover:backdrop-blur-md shadow-none hover:shadow-2xl hover:-translate-y-1 py-8 md:py-12 px-4 md:px-12 cursor-pointer"
                >
                  <div
                    className="absolute top-6 right-4 md:right-12 z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShareButton
                      url={`${SITE_ORIGIN}/news?item=${horizonNews._id}`}
                      title={horizonNews.title}
                      mode="card"
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    
                    {horizonNews.mainImage && (
                      <div className="w-full lg:w-1/2 mb-2 aspect-video relative z-10 border border-dark/10 overflow-hidden bg-cream">
                         <img
                           src={urlFor(horizonNews.mainImage).width(1200).url()}
                           alt={horizonNews.title}
                           className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                           loading="lazy"
                           decoding="async"
                         />
                      </div>
                    )}

                    <div className="flex-1 z-10 flex flex-col justify-center w-full">
                      <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 block">FORECAST</span>
                      <h2 className="text-3xl md:text-5xl font-normal uppercase font-serif leading-tight tracking-tight text-dark mb-6 break-words">
                        {horizonNews.title}
                      </h2>
                      
                      {horizonNews.body && horizonNews.body.length > 0 && (
                        <div className="type-body prose prose-lg line-clamp-3 text-dark/70 mb-8 overflow-hidden">
                            <PortableText value={[horizonNews.body[0]]} />
                        </div>
                      )}

                      <span className="font-mono text-[11px] font-bold text-dark uppercase tracking-widest mt-auto inline-flex items-center gap-2 group-hover:text-gold transition-all duration-300 text-left w-fit group-hover:translate-x-2">
                        Read more <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <div className="flex flex-wrap gap-3 sm:gap-4 border-y border-dark/20 py-4 sticky top-0 bg-cream/95 backdrop-blur-md z-30 transition-all duration-300 -mx-4 md:-mx-8 px-4 md:px-8 shadow-sm">
              {['all', 'phase1', 'phase2', 'phase3'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest px-4 sm:px-6 py-2 sm:py-3 border transition-colors ${
                    activeFilter === filter ? 'bg-dark text-white border-dark' : 'bg-transparent text-dark border-dark/20 hover:border-dark hover:bg-white/50'
                  }`}
                >
                  {sectionContent[filter].label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-16 md:gap-24 mt-8">
              {([ 'phase1', 'phase2', 'phase3' ]).map(filter => {
                  const items = filter === 'phase1' ? phase1News : filter === 'phase2' ? phase2News : phase3News;
                  const { title, description } = sectionContent[filter];
                  const phaseColor = filter === 'phase1' ? 'border-red-solid' : filter === 'phase2' ? 'border-gold' : 'border-dark';

                  if (activeFilter === 'all' || activeFilter === filter) {
                    return (
                      <section key={filter}>
                        <div className={`flex flex-col gap-3 mb-8 md:mb-10 border-b-2 ${phaseColor} pb-6 md:pb-8`}>
                          <h2 className="type-h3 text-dark m-0 font-serif break-words normal-case font-semibold">{title}</h2>
                          <p className="font-mono text-sm text-dark/60 normal-case">{description}</p>
                        </div>

                        {items.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
                            {items.map((item) => (
                              <div
                                key={item._id}
                                onClick={() => setExpandedItem(item)}
                                className="border-b-2 border-dark/10 bg-transparent p-4 sm:p-6 relative group flex flex-col h-full transition-all duration-500 hover:bg-cream/60 hover:backdrop-blur-md shadow-none hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                              >
                                <div
                                  className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ShareButton
                                    url={`${SITE_ORIGIN}/news?item=${item._id}`}
                                    title={item.title}
                                    mode="card"
                                  />
                                </div>
                                <div className="flex flex-col gap-6 p-0 h-full w-full overflow-hidden">
                                  {item.mainImage && (
                                    <div className="w-full mb-2 aspect-video overflow-hidden bg-cream border border-dark/10 shadow-inner">
                                      <img
                                        src={urlFor(item.mainImage).width(800).url()}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                      />
                                    </div>
                                  )}

                                  <div className="flex flex-col flex-grow justify-start w-full">
                                    <div className="flex items-center gap-3 mb-4">
                                      <time className="font-mono text-[10px] text-dark/50 uppercase tracking-widest">
                                        {new Date(item.publishedAt).toLocaleDateString('en-AU', { day: '2-digit', month: 'short' })}
                                      </time>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-normal uppercase font-serif leading-snug tracking-tight text-dark mb-4 group-hover:text-gold transition-colors min-h-[6.5rem] break-words">
                                      {item.title}
                                    </h3>

                                    {item.body && item.body.length > 0 && (
                                      <div className="type-body prose prose-sm line-clamp-3 text-dark/70 mb-6 overflow-hidden">
                                        <PortableText value={[item.body[0]]} />
                                      </div>
                                    )}

                                    <span className="font-mono text-[11px] font-bold text-dark uppercase tracking-widest mt-auto group-hover:text-gold transition-all duration-300 inline-flex items-center gap-2 text-left w-fit pt-2 group-hover:translate-x-2">
                                      Read more <span>→</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="font-mono text-sm text-dark/50 normal-case">No articles in this section yet</p>
                        )}
                      </section>
                    );
                  }
                  return null;
              })}
            </div>
          </div>
        </main>
      )}

      <AnimatePresence>
        {expandedItem && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setExpandedItem(null)}
              className="absolute inset-0 bg-dark/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative w-[95vw] md:w-[70vw] lg:max-w-3xl bg-white h-full overflow-y-auto overflow-x-hidden shadow-2xl z-[70]"
            >
               <ArticleContent item={expandedItem} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}