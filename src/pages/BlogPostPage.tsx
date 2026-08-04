import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../sanityClient';
import { SITE_ORIGIN } from '../constants/seoMeta';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, ArrowUpRight, Quote, Copy, Check, Info, AlertTriangle } from 'lucide-react';
import PostEndCTA from '../components/PostEndCTA';
import ShareButton from '../components/ShareButton';
import { PageMeta } from '../components/PageMeta';
import { brandTitle, stripSysbiltBrand } from '../utils/brandTitle';

// Helper function to extract YouTube ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Parser to allow **bold** and !!red!! in Sanity Table cells
const renderCellText = (text: string, theme: any) => {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(/(\*\*.*?\*\*|!!.*?!!)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={theme.isBw ? "bg-white text-dark px-1.5 py-0.5 mx-0.5 font-black inline-block leading-none uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]" : "font-bold text-white"}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('!!') && part.endsWith('!!')) {
      return <span key={i} className={`${theme.textMain} font-bold`}>{part.slice(2, -2)}</span>;
    }
    return <span key={i}>{part}</span>;
  });
};

// ---------------------------------------------------------
// THEME ENGINE
// ---------------------------------------------------------
const THEMES: Record<string, any> = {
  red: {
    textMain: 'text-red-solid',
    bgMain: 'bg-red-solid',
    borderMain: 'border-red-solid',
    textInverse: 'text-dark',
    bgHover: 'group-hover:bg-red-solid',
    textHover: 'group-hover:text-red-solid hover:text-red-solid',
    borderHover: 'group-hover:border-red-solid hover:border-red-solid',
    linkHover: 'hover:text-red-solid hover:decoration-red-solid',
    borderFocus: 'focus:border-red-solid',
    bgSubtle: 'bg-red-solid/5',
    borderSubtle: 'border-red-solid/20',
    bgMedium: 'bg-red-solid/30',
    textMuted20: 'text-red-solid/20',
    textMuted50: 'text-red-solid/50',
    textMuted80: 'text-red-solid/80',
    btnPrimary: 'bg-red-solid text-white border-red-solid hover:bg-transparent hover:text-red-solid',
    btnInlineCta: 'border-white bg-white text-dark hover:bg-red-solid hover:text-white hover:border-red-solid',
    ytShadow: 'shadow-[0_0_0_0_rgba(226,30,63,0.4)] group-hover:shadow-[0_0_0_20px_rgba(226,30,63,0)]',
    playIcon: 'border-l-white',
    pulse: 'bg-red-solid animate-pulse',
    isBw: false
  },
  gold: {
    textMain: 'text-gold-on-dark',
    bgMain: 'bg-gold-on-dark',
    borderMain: 'border-gold-on-dark',
    textInverse: 'text-dark',
    bgHover: 'group-hover:bg-gold-on-dark',
    textHover: 'group-hover:text-gold-on-dark hover:text-gold-on-dark',
    borderHover: 'group-hover:border-gold-on-dark hover:border-gold-on-dark',
    linkHover: 'hover:text-gold-on-dark hover:decoration-gold-on-dark',
    borderFocus: 'focus:border-gold-on-dark',
    bgSubtle: 'bg-gold-on-dark/5',
    borderSubtle: 'border-gold-on-dark/20',
    bgMedium: 'bg-gold-on-dark/30',
    textMuted20: 'text-gold-on-dark/20',
    textMuted50: 'text-gold-on-dark/50',
    textMuted80: 'text-gold-on-dark/80',
    btnPrimary: 'bg-gold-on-dark text-dark border-gold-on-dark hover:bg-transparent hover:text-gold-on-dark',
    btnInlineCta: 'border-white bg-white text-dark hover:bg-gold-on-dark hover:text-dark hover:border-gold-on-dark',
    ytShadow: 'shadow-[0_0_0_0_rgba(212,168,75,0.4)] group-hover:shadow-[0_0_0_20px_rgba(212,168,75,0)]',
    playIcon: 'border-l-dark',
    pulse: 'bg-gold-on-dark animate-pulse',
    isBw: false
  },
  bw: {
    textMain: 'text-white',
    bgMain: 'bg-white',
    borderMain: 'border-white',
    textInverse: 'text-dark',
    bgHover: 'group-hover:bg-white',
    textHover: 'group-hover:text-white hover:text-white',
    borderHover: 'group-hover:border-white hover:border-white',
    linkHover: 'hover:bg-white hover:text-dark px-1 hover:no-underline transition-colors',
    borderFocus: 'focus:border-white',
    bgSubtle: 'bg-white/5',
    borderSubtle: 'border-white/20',
    bgMedium: 'bg-white/30',
    textMuted20: 'text-white/20',
    textMuted50: 'text-white/50',
    textMuted80: 'text-white/80',
    btnPrimary: 'bg-white text-dark border-white hover:bg-dark hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all',
    btnInlineCta: 'border-white bg-white text-dark hover:bg-dark hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all',
    ytShadow: 'shadow-[0_0_0_0_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_0_20px_rgba(255,255,255,0)]',
    playIcon: 'border-l-dark',
    pulse: 'bg-white animate-pulse',
    isBw: true
  }
};

// Custom Facade YouTube Player
const CustomYouTube = ({ value, theme }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const id = value?.url ? getYouTubeId(value.url) : null;
  if (!id) return null;

  if (!isPlaying) {
    return (
      <div 
        className="my-16 relative aspect-video w-full max-w-4xl mx-auto border border-white/10 bg-dark overflow-hidden cursor-pointer group flex items-center justify-center shadow-2xl"
        onClick={() => setIsPlaying(true)}
      >
        <img 
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} 
          alt="Video thumbnail" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 scale-100 group-hover:scale-105" 
          loading="lazy"
          decoding="async"
        />
        <div className={`relative z-10 w-16 md:w-20 h-16 md:h-20 ${theme.bgMain} flex items-center justify-center rounded-full ${theme.ytShadow} transition-shadow duration-700`}>
          <div className={`w-0 h-0 border-y-[8px] md:border-y-[10px] border-y-transparent border-l-[12px] md:border-l-[16px] ${theme.playIcon} ml-1 md:ml-1.5`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-16 relative aspect-video w-full max-w-4xl mx-auto border border-white/20 bg-dark overflow-hidden shadow-2xl">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0&modestbranding=1`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

// Custom Interactive Code Block Component
const CodeBlock = ({ value, theme }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (value?.code) {
      navigator.clipboard.writeText(value.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#18181b] rounded-lg p-4 md:p-5 border border-white/5 font-mono text-sm relative group my-12 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${theme.bgMedium}`}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
        </div>
        {value.language && <span className="text-[10px] text-white/30 uppercase tracking-widest">{value.language}</span>}
      </div>
      <pre className="overflow-x-auto text-white/80 leading-relaxed text-sm scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2">
        <code>{value.code}</code>
      </pre>
      <button 
        onClick={handleCopy}
        className="absolute top-4 right-4 text-white/30 hover:text-white opacity-0 group-hover:opacity-100 transition-all p-2 rounded-md hover:bg-white/5"
        title="Copy code"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default function BlogPostPage({ onNavigate }: { onNavigate: (path: string, sectionId?: string) => void }) {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeToc, setActiveToc] = useState<string>('');
  
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    client
      .fetch(
        `{
          "post": *[_type == "post" && slug.current == $slug][0] {
            title,
            mainImage,
            ogImage,
            publishedAt,
            _updatedAt,
            body,
            servicePillar,
            seoTitle,
            seoDescription,
            focusKeyword,
            businessPhase,
            targetPersona,
            internalLinkDestination,
            tags,
            customCTA,
            "relatedPosts": relatedPosts[]->{
              title, slug, mainImage, servicePillar, publishedAt
            },
            "author": author->{
              name,
              image,
              bio
            }
          },
          "allOtherPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc) {
            title,
            slug,
            mainImage,
            servicePillar,
            publishedAt
          }
        }`,
        { slug }
      )
      .then((data) => {
        setPost(data.post);
        
        let related = [];
        
        if (data.post?.relatedPosts && data.post.relatedPosts.length > 0) {
            related = data.post.relatedPosts;
        } else {
            related = data.allOtherPosts.filter((p: any) => p.servicePillar === data.post?.servicePillar);
            if (related.length < 3) {
              const others = data.allOtherPosts.filter((p: any) => p.servicePillar !== data.post?.servicePillar);
              related = [...related, ...others].slice(0, 3);
            } else {
              related = related.slice(0, 3);
            }
        }
        
        setRelatedPosts(related);
        setLoading(false);
      })
      .catch(() => {
        // Fetch failed (network/API error) — NOT a confirmed absence.
        setLoadError(true);
        setLoading(false);
      });
  }, [slug]);

  const activeThemeKey = useMemo(() => {
    if (!post?.servicePillar) return 'red';
    const p = post.servicePillar.toLowerCase();
    
    if (['ai', 'content', 'training'].some(word => p.includes(word))) return 'gold';
    if (['dashboard'].some(word => p.includes(word))) return 'bw';
    return 'red';
  }, [post?.servicePillar]);

  const theme = THEMES[activeThemeKey];

  const toc = useMemo(() => {
    if (!post?.body) return [];
    return post.body
      .filter((block: any) => block.style === 'h2')
      .map((block: any) => {
        const rawText = block.children?.map((c: any) => c.text).join('') || '';
        const id = rawText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        
        const numMatch = rawText.match(/^0?(\d+)[\.\-\/]\s*(.*)/);
        const slashMatch = rawText.match(/^\/\/\s*(.*)/);
        
        let text = rawText;
        let num = null;

        if (numMatch) {
          num = numMatch[1].padStart(2, '0');
          text = numMatch[2];
        } else if (slashMatch) {
          text = slashMatch[1];
        }

        return { text, id, num };
      });
  }, [post?.body]);

  // Dynamic Read Time Calculation
  const readTime = useMemo(() => {
    if (!post?.body) return 1;
    const textString = JSON.stringify(post.body);
    const wordCount = textString.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }, [post?.body]);

  useEffect(() => {
    const handleScroll = () => {
      if (!toc.length) return;
      
      const headingElements = toc.map((t: any) => document.getElementById(t.id)).filter(Boolean);
      let currentActiveId = toc[0]?.id;
      
      for (const el of headingElements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.3) {
          currentActiveId = el.id;
        }
      }
      
      if (currentActiveId !== activeToc) {
        setActiveToc(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc, activeToc]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setEmail('');
    }, 1500);
  };

  if (loading) return <div className="min-h-screen bg-dark text-white pt-32 px-6 text-center font-sans text-sm md:text-base animate-pulse">Loading...</div>;

  if (!post && loadError) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <h1 className="font-sans font-black text-2xl uppercase tracking-tight text-white">Couldn&apos;t load this article</h1>
        <p className="max-w-md text-white/60 text-sm md:text-base">
          Something went wrong loading this page. Please refresh to try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white border-b-2 border-white hover:text-red-solid hover:border-red-solid transition-colors"
        >
          Reload
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <PageMeta
          title="Article not found | SYSBILT"
          description="This article does not exist or is unpublished."
          robots="noindex, follow"
        />
        <h1 className="font-sans font-black text-2xl uppercase tracking-tight text-red-solid">Article not found</h1>
        <Link
          to="/blog"
          className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
        >
          Back to Insights
        </Link>
      </div>
    );
  }

  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        const altText =
          (typeof value.alt === 'string' && value.alt.trim()) ||
          (typeof value.caption === 'string' && value.caption.trim()) ||
          'Article image';
        return (
          <figure className={`relative my-16 group cursor-pointer border-l-4 ${theme.borderMain} pl-6`}>
            <div className={`absolute -inset-2 ${theme.bgSubtle} opacity-0 group-hover:opacity-100 transition-opacity transform -skew-x-6`}></div>
            <img 
              src={urlFor(value).width(1200).url()} 
              alt={altText} 
              className={`w-full h-auto object-cover relative z-10 border border-white/10 opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-[1.02]`}
              loading="lazy"
              decoding="async"
            />
            {value.caption && (
              <figcaption className={`font-sans text-sm mt-4 text-right opacity-70 relative z-10 ${theme.textMain}`}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      youtube: (props: any) => <CustomYouTube {...props} theme={theme} />,
      code: (props: any) => <CodeBlock {...props} theme={theme} />,
      divider: () => (
        <div className="flex items-center justify-center gap-4 py-12 md:py-16">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          <div className={`w-1.5 h-1.5 rounded-full ${theme.bgMain}`}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        </div>
      ),
      callout: ({ value }: any) => {
        if (value.type === 'warning') {
          return (
            <div className={`my-12 bg-white p-5 flex gap-5 items-start shadow-xl max-w-3xl ${theme.isBw ? 'border-[3px] border-white' : 'border border-white/10'} rounded-sm`}>
              <div className={`${theme.bgMain} ${theme.textInverse} p-2 shrink-0 mt-0.5`}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className={`${theme.isBw ? 'bg-dark text-white inline-block px-2 py-0.5 font-black uppercase tracking-widest text-xs' : 'text-black font-bold uppercase tracking-wider text-xs'} mb-1`}>
                  {value.title || 'Warning'}
                </h4>
                <p className="text-zinc-800 text-sm font-medium leading-relaxed">
                  {value.text}
                </p>
              </div>
            </div>
          );
        }
        
        return (
          <div className={`my-12 ${theme.bgSubtle} border ${theme.borderSubtle} rounded-lg p-5 flex gap-4 items-start max-w-3xl`}>
            <Info className={`${theme.textMuted80} shrink-0 mt-0.5`} size={20} />
            <div>
              <h4 className={`${theme.isBw ? 'bg-white text-dark inline-block px-2 py-0.5 font-bold uppercase tracking-widest text-xs shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]' : theme.textMain + ' font-medium text-sm tracking-wide'} mb-1.5`}>
                {value.title || 'Important note'}
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {value.text}
              </p>
            </div>
          </div>
        );
      },
      cta: ({ value }: any) => {
        const isPrimary = value.variant === 'primary';
        return (
          <div className="my-12 flex">
            <a 
              href={value.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`font-mono text-xs md:text-sm font-bold uppercase tracking-widest px-8 py-4 transition-all duration-300 inline-flex items-center gap-3 border group ${
                isPrimary 
                  ? theme.btnPrimary 
                  : 'bg-transparent text-white border-white/30 hover:border-white hover:bg-white/5'
              }`}
            >
              {value.text} 
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        );
      },
      table: ({ value }: any) => {
        if (!value?.rows?.length) return null;
        const [head, ...body] = value.rows;
        return (
          <div className="my-12 overflow-x-auto max-w-3xl mx-auto">
            <table className="w-full text-left border-collapse font-mono text-sm md:text-base">
              <thead className={theme.isBw ? "bg-white text-dark uppercase tracking-wider" : "border-b-2 border-white text-white uppercase tracking-wider"}>
                <tr>
                  {head.cells?.map((cell: any, cIndex: number) => (
                    <th key={cIndex} className={`py-4 px-4 font-bold ${cIndex === head.cells.length - 1 ? (theme.isBw ? 'text-dark' : theme.textMain) : ''}`}>
                      {renderCellText(cell, theme)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {body.map((row: any, rIndex: number) => (
                  <tr key={row._key} className="group hover:bg-white/5 transition-colors">
                    {row.cells?.map((cell: any, cIndex: number) => {
                      let baseClass = "py-4 px-4 text-white/80";
                      if (cIndex === 0) baseClass = "py-4 px-4 font-bold text-white";
                      if (cIndex === 1) baseClass = "py-4 px-4 text-white/50";
                      
                      return (
                        <td key={cIndex} className={baseClass}>
                          {renderCellText(cell, theme)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
    },
    block: {
      normal: ({ children }: any) => {
        // Prevent empty paragraphs from rendering weird symbols or breaking layout spacing
        const isEmpty = !children || children.length === 0 || (children.length === 1 && children[0] === '');
        if (isEmpty) return <div className="h-6"></div>;
        return <p className="font-sans text-lg md:text-xl text-white/70 leading-relaxed mb-8 font-light">{children}</p>;
      },
      
      h2: ({ children, value }: any) => {
        const rawText = value.children?.map((c: any) => c.text).join('') || '';
        const id = rawText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

        const numMatch = rawText.match(/^0?(\d+)[\.\-\/]\s*(.*)/);
        const slashMatch = rawText.match(/^\/\/\s*(.*)/);

        if (numMatch) {
           const num = numMatch[1].padStart(2, '0');
           const cleanText = numMatch[2];
           const beforeBg = theme.bgMain.replace(/^bg-/, 'before:bg-');
           const beforeText = theme.textInverse.replace(/^text-/, 'before:text-');
           return (
             <h2
               id={id}
               data-decorative-num={num}
               className={`font-sans font-bold text-2xl md:text-3xl uppercase mt-20 mb-10 flex items-center gap-4 scroll-mt-32
                 before:content-[attr(data-decorative-num)]
                 before:inline-flex before:items-center before:px-3 before:py-1 before:leading-none before:font-black before:text-xl before:md:text-2xl
                 before:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] before:shrink-0
                 ${beforeBg} ${beforeText}`}
             >
                <span className="flex-1 text-white">{cleanText}</span>
             </h2>
           );
        }

        if (slashMatch) {
           const beforeAccent = theme.textMain.replace(/^text-/, 'before:text-');
           return (
             <h2 id={id} className="font-sans font-bold text-2xl md:text-3xl uppercase mt-20 mb-10 flex items-center gap-4 scroll-mt-32">
                <span
                  className={`flex-1 text-white before:content-['//'] before:mr-4 before:opacity-70 before:font-black before:text-xl before:md:text-2xl before:inline-block ${beforeAccent}`}
                >
                  {slashMatch[1]}
                </span>
             </h2>
           );
        }

        return (
          <h2 id={id} className="font-sans font-bold text-2xl md:text-3xl uppercase mt-20 mb-10 flex items-center gap-4 scroll-mt-32">
             <span className="flex-1 text-white">{rawText}</span>
          </h2>
        );
      },

      h3: ({ children, value }: any) => {
        const rawText = value.children?.map((c: any) => c.text).join('') || '';
        const numMatch = rawText.match(/^0?(\d+)[\.\-\/]\s*(.*)/);
        const slashMatch = rawText.match(/^\/\/\s*(.*)/);

        if (numMatch) {
           return (
             <h3 className="font-sans font-bold text-xl md:text-2xl text-white/90 mt-16 mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className={`${theme.bgMain} ${theme.textInverse} px-2 py-0.5 leading-none font-black text-lg`}>
                  {numMatch[1].padStart(2, '0')}
                </span>
                {numMatch[2]}
             </h3>
           );
        }

        if (slashMatch) {
           return (
             <h3 className="font-sans font-bold text-xl md:text-2xl text-white/90 mt-16 mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className={`${theme.textMain} opacity-70`}>//</span>
                {slashMatch[1]}
             </h3>
           );
        }

        return (
          <h3 className="font-sans font-bold text-xl md:text-2xl text-white/90 mt-16 mb-6 uppercase tracking-tight">
            {rawText}
          </h3>
        );
      },

      h4: ({ children }: any) => <h4 className="font-sans font-bold text-lg md:text-xl text-white/80 mt-12 mb-4 uppercase tracking-widest">{children}</h4>,
      
      blockquote: ({ value }: any) => {
        const rawText = value.children?.map((c: any) => c.text).join('') || '';
        const lastDashIndex = Math.max(rawText.lastIndexOf(' - '), rawText.lastIndexOf('\n-'));
        
        let quoteText = rawText;
        let author = null;

        if (lastDashIndex !== -1) {
          quoteText = rawText.substring(0, lastDashIndex).trim();
          author = rawText.substring(lastDashIndex).replace(/^[\s\n-]+/, '').trim();
        }

        return (
          <div className="relative pt-8 my-16 max-w-4xl group">
            <Quote className={`absolute top-0 left-0 w-12 h-12 ${theme.textMuted20} fill-current transform -scale-x-100`} />
            <blockquote className="relative z-10 pl-6 md:pl-10">
              <p className="text-xl md:text-2xl font-serif text-white leading-relaxed mb-6">
                {quoteText}
              </p>
              {author && (
                <div className="flex items-center gap-3">
                  <div className={`h-px w-8 ${theme.bgMain}`}></div>
                  <footer className={`text-xs font-bold uppercase tracking-widest ${theme.textMain}`}>
                    {author}
                  </footer>
                </div>
              )}
            </blockquote>
          </div>
        );
      },
    },
    list: {
      bullet: ({ children, value }: any) => {
        const level = value?.level || 1;
        if (level > 1) {
          return <ul className="font-sans text-base md:text-lg text-white/60 leading-relaxed list-none pl-6 mt-4 mb-2 space-y-3">{children}</ul>;
        }
        return <ul className="font-sans text-lg md:text-xl text-white/70 leading-relaxed list-none pl-0 mb-12 space-y-4 font-light">{children}</ul>;
      },
      number: ({ children, value }: any) => {
        const level = value?.level || 1;
        if (level === 2) {
          return <ol className="list-[lower-alpha] text-white/60 text-base md:text-lg pl-8 mt-6 mb-2 space-y-3">{children}</ol>;
        }
        if (level >= 3) {
          return <ol className="list-[lower-roman] text-white/50 text-sm md:text-base pl-8 mt-4 mb-2 space-y-2">{children}</ol>;
        }
        return <ol className="font-mono text-sm md:text-base space-y-4 my-12 list-none pl-0">{children}</ol>;
      },
    },
    listItem: {
      bullet: ({ children, value }: any) => {
        const level = value?.level || 1;
        if (level > 1) {
          return <li className="relative pl-6 before:content-['○'] before:absolute before:left-0 before:text-white/30">{children}</li>;
        }
        return (
          <li className="relative pl-8 group">
            <span className={`absolute left-2 top-[10px] w-2 h-2 bg-white/20 ${theme.bgHover} transition-colors duration-300`} />
            <span className="font-sans">{children}</span>
          </li>
        );
      },
      number: ({ children, index, value }: any) => {
        const level = value?.level || 1;
        if (level > 1) {
          return <li className="pl-2 font-sans">{children}</li>;
        }
        return (
          <li className="flex items-baseline gap-4 group">
            <span className={`${theme.textMain} font-bold shrink-0`}>
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <span className={`text-white/60 border-b border-white/10 pb-1 w-full group-hover:text-white ${theme.borderHover} transition-all cursor-default font-sans leading-relaxed`}>
              {children}
            </span>
          </li>
        );
      }
    },
    marks: {
      strong: ({ children }: any) => {
        if (theme.isBw) {
          return (
            <strong className="bg-white text-dark px-1.5 py-0.5 mx-0.5 font-black inline-block leading-none uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
              {children}
            </strong>
          );
        }
        return <strong className="font-semibold text-white">{children}</strong>;
      },
      link: ({ children, value }: any) => (
        <a href={value.href} className={`text-white underline decoration-white/30 ${theme.linkHover} underline-offset-4 transition-colors`} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };

  // Animation Variants for Tags
  const tagContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.6 }
    }
  };
  const tagItemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  // Setup SEO Variables
  const FALLBACK_DESCRIPTION =
    'We build the systems that help Australian businesses stop doing everything manually';
  const resolvedArticleTitle = stripSysbiltBrand(post?.seoTitle || post?.title || '');
  const pageDescription = post?.seoDescription || FALLBACK_DESCRIPTION;
  const brandedTitle = brandTitle(resolvedArticleTitle || null);
  const canonicalUrl = slug ? `${SITE_ORIGIN}/blog/${slug}` : '';
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const shareImage = post?.ogImage ? urlFor(post.ogImage).width(1200).height(630).url() : (post?.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : '');

  return (
    <main className="min-h-screen bg-dark text-white font-sans pb-14 border-t border-white/10 relative">
      <Helmet>
        <title>{brandedTitle}</title>
        <meta name="description" content={pageDescription} />
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
        {post?.focusKeyword && <meta name="keywords" content={post.focusKeyword} />}
        
        {/* Open Graph Tags (LinkedIn, Facebook, iMessage) */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={brandedTitle} />
        <meta property="og:description" content={pageDescription} />
        {shareImage && <meta property="og:image" content={shareImage} />}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={brandedTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {shareImage && <meta name="twitter:image" content={shareImage} />}
        {/* JSON-LD (BlogPosting + BreadcrumbList) is stamped into static HTML at build time. */}
      </Helmet>
      
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        
        <nav className="mb-8 relative z-20">
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> All articles
          </Link>
        </nav>

        {/* --- 1. HERO SECTION --- */}
        <div className="relative mb-12 md:mb-16 overflow-hidden lg:overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col justify-center z-20">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                className={`font-sans font-black break-words text-balance ${
                  post?.title?.length < 20 ? 'text-[clamp(3rem,9vw,8.5rem)] leading-[0.9]' :
                  post?.title?.length < 40 ? 'text-[clamp(2.5rem,6vw,6rem)] leading-[1]' :
                  'text-[clamp(2rem,4vw,4.5rem)] leading-[1.1]'
                } uppercase tracking-tighter text-white mb-6`}
              >
                {post?.title}
              </motion.h1>

              <motion.div 
                variants={tagContainerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-3 font-mono text-[10px] md:text-xs uppercase tracking-widest"
              >
                <motion.span variants={tagItemVariants} className="border border-white/20 px-3 py-1.5 hover:bg-white hover:text-dark transition-colors cursor-pointer bg-white/5">
                  #{post?.servicePillar?.replace(/\s+/g, '') || 'SYSTEM'}
                </motion.span>
                {post?.tags?.map((tag: string, idx: number) => (
                  <motion.span key={idx} variants={tagItemVariants} className="border border-white/20 px-3 py-1.5 hover:bg-white hover:text-dark transition-colors cursor-pointer bg-white/5">
                    #{tag.replace(/\s+/g, '')}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative z-10 w-full max-w-[450px] mx-auto lg:mx-0 lg:ml-auto">
              {post?.mainImage && (
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  className="relative aspect-square w-full border border-white/10 overflow-hidden bg-dark"
                >
                  <img 
                    src={urlFor(post.mainImage).width(1000).height(1000).url()} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-in-out"
                    loading="eager"
                    decoding="async"
                  />
                </motion.div>
              )}
            </div>

          </div>
        </div>

        {/* --- 2. ARTICLE META GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/20 mb-16 md:mb-24 bg-white/5 relative z-20">
          <div className="p-4 md:p-6 type-eyebrow text-white border-b border-r border-white/20">
            <span className="block opacity-40 mb-2">AUTHOR</span>
            {post?.author?.name || 'SYSBILT TEAM'}
          </div>
          <div className="p-4 md:p-6 type-eyebrow text-white border-b border-r border-white/20">
            <span className="block opacity-40 mb-2">DATE</span>
            {post?.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase() : 'DRAFT'}
          </div>
          <div className="p-4 md:p-6 type-eyebrow text-white border-b border-r border-white/20">
            <span className="block opacity-40 mb-2">READ TIME</span>
            {readTime} MIN
          </div>
          <div className="p-4 md:p-6 flex items-center justify-center border-b border-r border-white/20">
            <ShareButton
              url={currentUrl}
              title={resolvedArticleTitle || post?.title || 'SYSBILT'}
              mode="card"
              variant="dark"
              themeClass={{ textMain: theme.textMain, textHover: theme.textHover }}
            />
          </div>
        </div>

        {/* --- 3. CONTENT BODY --- */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <aside className="lg:col-span-3 hidden lg:block relative">
            <div className="sticky top-32 h-fit pb-12">
              <p className={`type-eyebrow ${theme.textMain} tracking-widest mb-8 flex items-center gap-2 normal-case`}>
                <span className={`w-1.5 h-1.5 ${theme.pulse}`}></span>
                {theme.isBw ? (
                  <span className="bg-white text-dark px-1.5 py-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] uppercase tracking-widest text-[10px] font-bold">
                    IN THIS ARTICLE
                  </span>
                ) : (
                  'In this article'
                )}
              </p>
              
              <nav className="relative pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10"></div>
                
                <ul className="space-y-4 relative">
                  {toc.length > 0 ? (
                    toc.map((item: any) => {
                      const isActive = activeToc === item.id;
                      return (
                        <li key={item.id} className="relative">
                          {isActive && (
                            <motion.div 
                              layoutId="active-toc-line"
                              className={`absolute -left-4 top-0 bottom-0 w-[2px] ${theme.bgMain}`}
                              initial={false}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          <a 
                            href={`#${item.id}`} 
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`block text-sm transition-all duration-300 ${
                              isActive 
                                ? (theme.isBw ? 'bg-white text-dark font-bold px-2 py-1 -ml-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]' : 'text-white font-medium pl-2') 
                                : 'text-white/50 hover:text-white pl-0'
                            }`}
                          >
                            {item.num ? <span className="mr-1 opacity-70 font-bold">{item.num}.</span> : ''}
                            {item.text}
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <span className="opacity-30 text-xs font-mono normal-case">No sections found</span>
                  )}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5 prose-sysbilt">
            {post?.seoDescription && (
              <p className={`font-sans font-light text-2xl md:text-3xl leading-tight mb-16 text-white border-l-2 ${theme.borderMain} pl-6 py-1 break-words text-pretty`}>
                {post.seoDescription}
              </p>
            )}

            {toc.length > 0 && (
              <div className="block lg:hidden mb-16 border border-white/10 bg-white/5 p-6 rounded-sm">
                <p className={`type-eyebrow ${theme.textMain} tracking-widest mb-6 flex items-center gap-2 normal-case`}>
                  <span className={`w-1.5 h-1.5 ${theme.pulse}`}></span>
                  {theme.isBw ? (
                    <span className="bg-white text-dark px-1.5 py-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] uppercase tracking-widest text-[10px] font-bold">
                      IN THIS ARTICLE
                    </span>
                  ) : (
                    'In this article'
                  )}
                </p>
                <ul className="space-y-4 font-mono text-sm">
                  {toc.map((item: any) => {
                    const isActive = activeToc === item.id;
                    return (
                      <li key={`mobile-${item.id}`}>
                        <a 
                          href={`#${item.id}`} 
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          }} 
                          className={`flex items-start gap-3 transition-colors ${isActive ? (theme.isBw ? 'bg-white text-dark font-bold p-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]' : 'text-white') : 'text-white/60 hover:text-white'}`}
                        >
                          {item.num ? <span className="shrink-0 opacity-70 font-bold">{item.num}.</span> : <span className="shrink-0 opacity-70">//</span>}
                          <span>{item.text}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="relative z-10 w-full overflow-hidden">
              <PortableText value={post?.body} components={components} />
            </div>

            {/* --- CONVERSION CTA BLOCK --- */}
            {post?.internalLinkDestination ? (
              <div className={`mt-20 border ${theme.borderSubtle} ${theme.bgSubtle} p-8 md:p-12 relative overflow-hidden group ${theme.isBw ? 'shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]' : ''}`}>
                <div className={`absolute top-0 left-0 w-full h-1 ${theme.bgMain} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out`} />
                
                <h3 className="font-sans font-black text-3xl md:text-4xl text-white tracking-tight mb-4 flex flex-wrap gap-2 items-center normal-case">
                  {theme.isBw ? (
                    <span className="bg-white text-dark px-3 py-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] uppercase">
                      SEE HOW WE FIX THIS
                    </span>
                  ) : (
                    'See how we fix this'
                  )}
                </h3>
                <p className="font-sans text-white/70 font-light mb-8 max-w-md">
                  See the exact system we build to fix this
                </p>
                
                <button 
                  onClick={() => onNavigate(post.internalLinkDestination.replace('/', ''))}
                  className={`font-mono text-xs font-bold uppercase transition-all duration-300 ${theme.btnInlineCta} px-8 py-4 inline-flex items-center gap-3`}
                >
                  {post?.customCTA || 'SEE THE SYSTEM'} <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className={`mt-20 border ${theme.borderSubtle} ${theme.bgSubtle} p-8 md:p-12 relative overflow-hidden group ${theme.isBw ? 'shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]' : ''}`}>
                <div className={`absolute top-0 left-0 w-full h-1 ${theme.bgMain} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out`} />
                
                <h3 className="font-sans font-black text-3xl md:text-4xl text-white tracking-tight mb-4 flex flex-wrap gap-2 items-center normal-case">
                  {theme.isBw ? (
                    <span className="bg-white text-dark px-3 py-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] uppercase">
                      SYSTEMS ADVICE, NOT SPAM
                    </span>
                  ) : (
                    <>
                      Systems advice, <span className={theme.textMain}>not spam</span>
                    </>
                  )}
                </h3>
                <p className="font-sans text-white/70 font-light mb-8 max-w-md">
                  Tell us where you're stuck and we'll send you the articles and case studies that actually apply to your situation
                </p>
                
                {formStatus === 'success' ? (
                  <div className="font-sans text-white text-sm border border-white/20 p-4 bg-white/10 text-center leading-relaxed">
                     You're on the list, check your inbox
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formStatus === 'loading'}
                      placeholder="Enter your email address"
                      className={`flex-1 bg-dark border border-white/20 text-white px-4 py-4 font-sans text-sm focus:outline-none ${theme.borderFocus} placeholder:text-white/40 transition-all`}
                      required
                    />
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className={`font-mono text-xs font-bold uppercase transition-all duration-300 ${theme.btnInlineCta} px-8 py-4`}
                    >
                      {formStatus === 'loading' ? 'Processing...' : (post?.customCTA || 'Send me the good stuff')}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* --- AUTHOR BIO BLOCK --- */}
            {post?.author && (
              <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
                {post.author.image ? (
                  <div className="shrink-0 relative">
                    <div className={`absolute -inset-1 ${theme.bgSubtle} rounded-full`}></div>
                    <img 
                      src={urlFor(post.author.image).width(200).height(200).url()} 
                      alt={post.author.name} 
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 ${theme.borderSubtle} opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-[1.02]`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full ${theme.bgSubtle} border-2 ${theme.borderSubtle} flex items-center justify-center`}>
                    <span className={`font-mono text-2xl ${theme.textMain}`}>{post.author.name?.charAt(0) || 'S'}</span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="type-eyebrow text-white/40 mb-2">WRITTEN BY</p>
                  <h4 className={`font-sans font-bold text-xl md:text-2xl text-white uppercase tracking-widest mb-4`}>
                    {post.author.name}
                  </h4>
                  <div className="font-sans text-white/60 font-light leading-relaxed max-w-2xl text-base md:text-lg">
                    {post.author.bio ? (
                      <PortableText 
                        value={post.author.bio} 
                        components={{ block: { normal: ({children}:any) => <p className="mb-4">{children}</p> } }} 
                      />
                    ) : (
                      <p>The team behind SYSBILT builds business systems for growing Australian companies</p>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </article>

        {/* --- 4. RECOMMENDED READING GRID --- */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 border-t border-white/20 pt-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h3 className={`type-eyebrow ${theme.textMain} flex items-center gap-3 normal-case`}>
                <div className={`w-2 h-2 ${theme.pulse}`} />
                {theme.isBw ? (
                  <span className="bg-white text-dark px-2 py-0.5 font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] uppercase tracking-widest text-[10px]">
                    RELATED ARTICLES
                  </span>
                ) : (
                  'RELATED ARTICLES'
                )}
              </h3>
              <Link to="/blog" className={`type-eyebrow text-white ${theme.textHover} transition-colors`}>
                View all →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug?.current || Math.random()} 
                  to={`/blog/${relatedPost.slug?.current}`} 
                  className="group flex flex-col h-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  {relatedPost.mainImage && (
                    <div className="aspect-[16/9] border-b border-white/10 overflow-hidden relative shrink-0">
                      <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={urlFor(relatedPost.mainImage).width(600).url()} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1 min-w-0">
                    <span className={`type-eyebrow ${theme.textMain} mb-4`}>
                      // {relatedPost.servicePillar || 'GENERAL'}
                    </span>
                    <h4 className={`font-sans font-black text-xl text-white uppercase leading-tight mb-4 ${theme.textHover} transition-colors line-clamp-3 break-words text-balance`}>
                      {relatedPost.title}
                    </h4>
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between type-eyebrow text-white/50">
                      <span>{relatedPost.publishedAt ? new Date(relatedPost.publishedAt).toLocaleDateString('en-AU', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') : 'DRAFT'}</span>
                      <ArrowUpRight className={`w-4 h-4 ${theme.textHover} transition-colors shrink-0`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <PostEndCTA onCtaClick={() => onNavigate('contact')} />

      </div>
    </main>
  );
}