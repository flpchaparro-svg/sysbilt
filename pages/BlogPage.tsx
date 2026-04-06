import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor, getCaseStudies } from '../src/sanityClient';
import { SanityCaseStudy } from '../types';
import { getAllPillars } from '../constants/systemPillars';
import HeroVisualBrutalist from '../components/Blog/HeroVisualBrutalist';
import RobotPeek from '../components/RobotPeek'; 
import NewsletterForm from '../components/NewsletterForm';
import { PageMeta } from '../components/PageMeta';
import { SEO_META } from '../constants/seoMeta';

const RED_PILLARS = ['Websites & E-commerce', 'CRM & Lead Tracking', 'Automation'];
const GOLD_PILLARS = ['AI Assistants', 'Content Systems', 'Team Training'];
const BW_PILLARS = ['Dashboards & Reporting'];

const FILTER_OPTIONS = ['ALL', ...getAllPillars().map((p) => p.subtitle)];

function getPillarBadgeClass(servicePillar: string | null | undefined): string {
  if (!servicePillar) return 'border-dark/20 bg-dark/5 text-dark/70';
  if (RED_PILLARS.includes(servicePillar)) return 'border-red-solid/20 bg-red-solid/10 text-red-text';
  if (GOLD_PILLARS.includes(servicePillar)) return 'border-gold/20 bg-gold/10 text-gold-on-cream';
  if (BW_PILLARS.includes(servicePillar)) return 'border-dark/20 bg-dark text-cream';
  return 'border-dark/20 bg-dark/5 text-dark/70';
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'DRAFT';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
}

// --- FEATURED CARDS (CLEAN, SCALABLE, NO OVERLAYS) ---
const FeaturedCardLead: React.FC<{ post: any }> = ({ post }) => {
  const slug = post.slug?.current ?? '';
  const href = `/blog/${slug}`;
  const titleLen = post.title?.length || 0;

  // Dynamically scale text down for massive titles so the card doesn't look flooded
  const titleClass = titleLen > 70 
    ? 'text-2xl lg:text-4xl' 
    : titleLen > 40 
    ? 'text-3xl lg:text-5xl' 
    : 'text-4xl lg:text-6xl';

  return (
    <Link to={href} className="col-span-1 lg:col-span-12 border-2 border-dark bg-cream flex flex-col lg:flex-row group cursor-pointer hover:shadow-[8px_8px_0px_0px_#1a1a1a] transition-all duration-300 hover:-translate-y-1 overflow-hidden relative lg:h-[70vh] lg:min-h-[500px] lg:max-h-[700px]">
      <div className="relative w-full lg:w-2/3 h-64 sm:h-80 lg:h-full border-b-2 lg:border-b-0 lg:border-r-2 border-dark overflow-hidden bg-dark shrink-0">
        <div className="absolute top-4 left-4 z-20 bg-red-solid text-white px-3 py-1 type-eyebrow border-2 border-dark shadow-[4px_4px_0px_0px_#1a1a1a]">
          FEATURED
        </div>
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.title}
            className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="w-full lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center bg-white transition-colors duration-300 min-w-0">
        <div className="flex justify-between items-center mb-6">
          <span className="type-eyebrow text-red-text border-b-2 border-red-solid/20 pb-1 shrink-0">
            // {post.servicePillar || 'GENERAL'}
          </span>
          <span className="type-eyebrow text-dark/50 shrink-0 ml-4">{formatDate(post.publishedAt)}</span>
        </div>
        
        <h3 className={`font-sans font-black tracking-tighter text-dark uppercase leading-[0.95] mb-6 group-hover:text-gold-on-cream transition-colors duration-300 break-words text-balance ${titleClass}`}>
          {post.title}
        </h3>
        
        <p className="type-body text-dark/70 border-l-4 border-gold pl-4 line-clamp-3 mb-8 break-words text-pretty">
          {post.seoDescription || "Read how we fixed this exact problem, step by step"}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t-2 border-dark pt-4">
          <span className="type-eyebrow text-dark group-hover:text-gold-on-cream transition-colors">READ ARTICLE →</span>
          <ArrowRight className="w-6 h-6 text-dark group-hover:translate-x-2 transition-transform duration-300 shrink-0" />
        </div>
      </div>
    </Link>
  );
};

const FeaturedCardTall: React.FC<{ post: any }> = ({ post }) => {
  const slug = post.slug?.current ?? '';
  const href = `/blog/${slug}`;

  return (
    <Link to={href} className="col-span-1 lg:col-span-4 border-2 border-dark bg-cream flex flex-col group cursor-pointer hover:shadow-[8px_8px_0px_0px_#1a1a1a] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative w-full aspect-[4/3] border-b-2 border-dark overflow-hidden bg-dark shrink-0">
        {post.mainImage && (
           <img
             src={urlFor(post.mainImage).width(600).url()}
             alt={post.title}
             className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
             loading="lazy"
             decoding="async"
           />
        )}
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1 bg-white min-w-0">
        <span className="type-eyebrow text-dark/50 mb-3 block">{formatDate(post.publishedAt)}</span>
        <h3 className="font-sans font-black tracking-tight text-2xl text-dark uppercase leading-snug mb-4 group-hover:text-gold-on-cream transition-colors duration-300 line-clamp-3 break-words text-balance">
          {post.title}
        </h3>
        <p className="type-body text-dark/70 line-clamp-2 mb-6 break-words text-pretty">
          {post.seoDescription || "Read the full breakdown"}
        </p>
        <div className="mt-auto pt-4 border-t-2 border-dark/10 flex justify-between items-center">
           <span className="type-eyebrow text-red-text">READ →</span>
        </div>
      </div>
    </Link>
  );
};

const FeaturedCardHalf: React.FC<{ post: any }> = ({ post }) => {
  const slug = post.slug?.current ?? '';
  const href = `/blog/${slug}`;

  return (
    <Link to={href} className="col-span-1 lg:col-span-6 border-2 border-dark bg-cream flex flex-col sm:flex-row group cursor-pointer hover:shadow-[8px_8px_0px_0px_#1a1a1a] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto border-b-2 sm:border-b-0 sm:border-r-2 border-dark overflow-hidden bg-dark shrink-0">
        {post.mainImage && (
           <img
             src={urlFor(post.mainImage).width(600).url()}
             alt={post.title}
             className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
             loading="lazy"
             decoding="async"
           />
        )}
      </div>
      <div className="w-full sm:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white min-w-0">
        <span className="type-eyebrow text-dark/50 mb-3 block">{formatDate(post.publishedAt)}</span>
        <h3 className="font-sans font-black tracking-tight text-2xl md:text-3xl text-dark uppercase leading-snug mb-4 group-hover:text-gold-on-cream transition-colors duration-300 line-clamp-3 break-words text-balance">
          {post.title}
        </h3>
        <div className="mt-auto pt-4 border-t-2 border-dark/10">
           <span className="type-eyebrow text-dark group-hover:text-red-text transition-colors">READ →</span>
        </div>
      </div>
    </Link>
  );
};

// --- SYSTEM LEDGER ROW WITH HOVER IMAGE CURSOR ---
const LedgerRow: React.FC<{ post: any }> = ({ post }) => {
  const slug = post.slug?.current ?? '';
  const href = `/blog/${slug}`;
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 15);
    y.set(e.clientY + 15);
  };

  return (
    <Link 
      to={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative grid grid-cols-12 gap-4 py-6 border-b-2 border-dark transition-colors duration-300 hover:bg-dark hover:text-cream items-center px-4 -mx-4 cursor-pointer"
    >
      <div className="col-span-3 md:col-span-2 type-eyebrow text-dark/70 group-hover:text-cream/70">
        {formatDate(post.publishedAt)}
      </div>
      
      <div className="col-span-3 md:col-span-2 hidden md:block">
         <span className={`inline-block px-2 py-1 border text-[10px] font-mono uppercase tracking-wider ${getPillarBadgeClass(post.servicePillar)} group-hover:border-cream/20 group-hover:bg-cream/5 group-hover:text-cream/70 whitespace-nowrap overflow-hidden text-ellipsis max-w-full`}>
          {post.servicePillar || 'GENERAL'}
         </span>
      </div>
      
      <div className="col-span-6 md:col-span-6 font-sans font-black tracking-tight text-lg md:text-2xl uppercase leading-none group-hover:text-gold-on-dark transition-colors duration-300 line-clamp-2 break-words text-balance pr-4">
        {post.title}
      </div>
      
      <div className="col-span-3 md:col-span-2 flex justify-end shrink-0">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 type-eyebrow border-2 border-cream px-4 py-2">
          <span>READ →</span>
        </div>
      </div>

      {post.mainImage && (
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: springX,
            y: springY,
            pointerEvents: 'none', 
            zIndex: 9999,
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.5,
            rotate: isHovered ? 0 : -10 
          }}
          transition={{ duration: 0.2 }}
          className="hidden md:block w-36 h-36 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-dark shadow-2xl"
        >
          <img
            src={urlFor(post.mainImage).width(400).url()}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      )}
    </Link>
  );
};

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [latestCaseStudy, setLatestCaseStudy] = useState<SanityCaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  const [visibleCount, setVisibleCount] = useState(10);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const SEARCH_PHRASES = useMemo(() => [
    "Stop chasing leads manually",
    "Automate client onboarding",
    "Fix your CRM pipeline",
    "AI that answers your phone",
    "Track your real margins",
  ], []);

  useEffect(() => {
    document.title = "Insights | SYSBILT";
    setIsLoading(true); 
    
    Promise.all([
      client.fetch(`*[_type == "post"] | order(publishedAt desc) { 
        title, slug, mainImage, publishedAt, "authorName": author->name, 
        servicePillar, isFeatured, featuredOrder, seoDescription 
      }`),
      getCaseStudies()
    ])
    .then(([postsData, caseStudiesData]) => {
      setPosts(postsData || []);
      if (caseStudiesData && caseStudiesData.length > 0) {
        setLatestCaseStudy(caseStudiesData[0]); 
      }
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    })
    .finally(() => {
      setIsLoading(false); 
    });
  }, []);

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 60;
    const currentPhrase = SEARCH_PHRASES[currentPhraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2500); 
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % SEARCH_PHRASES.length);
      } else {
        const nextText = isDeleting
          ? currentPhrase.substring(0, currentText.length - 1)
          : currentPhrase.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, SEARCH_PHRASES]);

  useEffect(() => {
    setVisibleCount(10);
  }, [activeFilter, searchQuery]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesFilter = activeFilter === 'ALL' || post.servicePillar === activeFilter;
      const matchesSearch = !searchQuery.trim() || (post.title ?? '').toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [posts, activeFilter, searchQuery]);

  // Sort featured posts strictly by the CMS featuredOrder field (default to 99 if missing to push to back)
  const featuredPosts = filteredPosts
    .filter(p => p.isFeatured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 7);
  
  // All posts stay in the ledger.
  const regularPosts = filteredPosts;
  const visibleRegularPosts = regularPosts.slice(0, visibleCount);
  const hasMorePosts = visibleRegularPosts.length < regularPosts.length;

  // SMART GRID LOGIC: Ensures rows always sum to 12 columns perfectly. Absolutely no dangling cards.
  const renderFeaturedGridItem = (post: any, index: number, total: number) => {
    // 1st Item is ALWAYS the big Lead Card (12 Cols)
    if (index === 0) {
      return <FeaturedCardLead key={post.slug?.current ?? index} post={post} />;
    }

    // Mathematical groupings to fill 12 columns perfectly based on total count
    if (total === 7) {
      // 1 Lead (12), 3 Talls (4x3=12), 3 Talls (4x3=12)
      return <FeaturedCardTall key={post.slug?.current ?? index} post={post} />;
    }
    if (total === 6) {
      // 1 Lead (12), 2 Halfs (6x2=12), 3 Talls (4x3=12)
      if (index <= 2) return <FeaturedCardHalf key={post.slug?.current ?? index} post={post} />;
      return <FeaturedCardTall key={post.slug?.current ?? index} post={post} />;
    }
    if (total === 5) {
      // 1 Lead (12), 2 Halfs (6x2=12), 2 Halfs (6x2=12)
      return <FeaturedCardHalf key={post.slug?.current ?? index} post={post} />;
    }
    if (total === 4) {
      // 1 Lead (12), 3 Talls (4x3=12)
      return <FeaturedCardTall key={post.slug?.current ?? index} post={post} />;
    }
    if (total === 3) {
      // 1 Lead (12), 2 Halfs (6x2=12)
      return <FeaturedCardHalf key={post.slug?.current ?? index} post={post} />;
    }
    if (total === 2) {
      // 1 Lead (12), 1 Lead (12)
      return <FeaturedCardLead key={post.slug?.current ?? index} post={post} />;
    }

    return null;
  };

  return (
    <section className="w-full bg-cream relative z-10 flex flex-col font-sans text-dark min-h-screen">
      <PageMeta
        title={SEO_META.blogIndex.title}
        description={SEO_META.blogIndex.description}
        canonical={SEO_META.blogIndex.canonical}
      />

      <RobotPeek />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 md:pt-48 pb-16 flex-1 w-full relative z-20 flex flex-col">
        
        <header className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-start justify-between gap-12 border-b-4 border-dark pb-12 md:pb-16 relative w-full">
          <div className="max-w-3xl flex-1 relative z-30 pt-8 md:pt-0">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark mb-4 block">
              / INSIGHTS
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 md:mb-10 text-dark leading-[1.08] break-words text-balance">
              Practical advice for businesses that want to grow without the grind
            </h1>

            <div className="w-full max-w-2xl">
              <div className="flex items-stretch shadow-[8px_8px_0px_0px_#1a1a1a] transition-shadow hover:shadow-[12px_12px_0px_0px_#1a1a1a]">
                <div className="relative flex-1 flex min-w-0 bg-white border-2 border-r-0 border-dark overflow-hidden">
                  <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-label="Search articles"
                    className="w-full px-4 py-4 md:px-6 md:py-6 text-base md:text-lg font-sans text-dark focus:outline-none focus:bg-cream transition-colors relative z-10 bg-transparent" 
                  />

                  {!searchQuery && !isFocused && (
                    <div className="absolute inset-0 flex items-center pl-4 md:pl-6 pr-4 pointer-events-none z-20 overflow-hidden whitespace-nowrap">
                      <span className="text-base md:text-lg font-sans text-dark/55 truncate">
                        {currentText}
                        <span className="text-red-solid animate-pulse ml-0.5 inline-block translate-y-[-1px]">|</span>
                      </span>
                    </div>
                  )}
                </div>

                <button className="bg-dark text-cream border-2 border-dark px-6 md:px-12 hover:bg-red-solid hover:border-red-solid hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21L16.65 16.65" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex shrink-0 pointer-events-none z-10 w-80 lg:w-[420px] justify-end">
            <div className="w-80 h-80 lg:w-[420px] lg:h-[420px] relative opacity-90 mt-8 md:mt-0">
              <HeroVisualBrutalist />
            </div>
          </div>
        </header>

        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setActiveFilter(option)}
                className={`type-eyebrow px-3 py-2 md:px-4 md:py-2 transition-all hover:-translate-y-1 border-2 border-dark hover:shadow-[4px_4px_0px_0px_#1a1a1a] ${
                  activeFilter === option
                    ? 'bg-dark text-cream'
                    : 'bg-white text-dark'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="type-eyebrow text-dark border-2 border-dark p-6 inline-block bg-white tracking-widest animate-pulse">
            Loading articles...
          </div>
        ) : (
          <div className="w-full relative z-30 pb-20"> 
            
            {/* FEATURED SECTION */}
            {featuredPosts.length > 0 && (
              <div className="mb-20 md:mb-32">
                <div className="mb-10 border-b-4 border-dark pb-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark">/ FEATURED</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {featuredPosts.map((post, index) => renderFeaturedGridItem(post, index, featuredPosts.length))}
                </div>
              </div>
            )}

            {/* --- PROOF BRIDGE (LATEST EVIDENCE) --- */}
            {latestCaseStudy && (
              <div className="mb-20 md:mb-32">
                <Link to="/proof" className="group block border-2 border-dark bg-dark text-white p-8 md:p-12 shadow-[8px_8px_0px_0px_#1a1a1a] hover:shadow-[12px_12px_0px_0px_#E21E3F] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  {/* Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-red-solid scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-solid mb-4 block">
                        / REAL RESULTS
                      </span>
                      <h3 className="font-serif text-4xl md:text-5xl text-white mb-4 group-hover:text-gold-on-dark transition-colors duration-300">
                        {latestCaseStudy.clientName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] md:text-xs text-white/70 uppercase tracking-widest">
                        <span className="border border-white/20 px-3 py-1.5 bg-white/5">{latestCaseStudy.clientIndustry}</span>
                        <span className="text-red-solid">/</span>
                        <span className="border border-white/20 px-3 py-1.5 bg-white/5">{latestCaseStudy.pillarFocus}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-4 bg-white text-dark px-6 py-4 border-2 border-dark group-hover:bg-cream transition-colors font-mono text-sm font-bold uppercase tracking-widest">
                      See the numbers
                      <ArrowRight className="w-4 h-4 text-red-solid group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* --- LEDGER SECTION --- */}
            <div className="mb-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b-4 border-dark pb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark">/ ALL ARTICLES</span>
                <span className="type-eyebrow text-dark/50 normal-case">{regularPosts.length} articles found</span>
              </div>

              {regularPosts.length === 0 ? (
                <div className="type-eyebrow text-dark/70 border-2 border-dark p-6 inline-block bg-white normal-case">
                  No articles match this search
                </div>
              ) : (
                <div className="border-t-2 border-dark">
                  <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-dark font-mono text-[10px] uppercase tracking-widest text-dark/50 px-4 -mx-4">
                    <div className="col-span-3 md:col-span-2">Date</div>
                    <div className="col-span-3 md:col-span-2 hidden md:block">Pillar</div>
                    <div className="col-span-6 md:col-span-6">Title</div>
                    <div className="col-span-3 md:col-span-2 text-right">Action</div>
                  </div>
                  
                  {visibleRegularPosts.map((post: any) => (
                    <LedgerRow key={post.slug?.current ?? post.title} post={post} />
                  ))}
                </div>
              )}

              {hasMorePosts && (
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 10)}
                    className="type-eyebrow border-2 border-dark bg-white text-dark px-8 py-4 hover:bg-dark hover:text-cream hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1a1a1a] transition-all duration-300"
                  >
                    Load more articles ↓
                  </button>
                </div>
              )}

            </div>

            {/* --- REFINED LEAD CAPTURE - BOXED MODULE --- */}
            <NewsletterForm />

          </div>
        )}
      </div>
    </section>
  );
}