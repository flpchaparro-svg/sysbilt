import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { PageMeta } from '../components/PageMeta';
import { ArrowRight, BookOpen } from 'lucide-react';
import { client } from '../sanityClient';

export default function GuidesHubPage() {
  const [guides, setGuides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // GROQ Query: Fetch all published guides, ordered by newest first
    const query = `*[_type == "guide"] | order(publishedAt desc) {
      title,
      subtitle,
      slug,
      servicePillar
    }`;

    client.fetch(query)
      .then((data) => {
        setGuides(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching guides:", error);
        setIsLoading(false);
      });
  }, []);

  // Framer Motion variants for the staggered grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } // Using your 'luxury' easing
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-dark selection:text-cream flex flex-col">
      <PageMeta 
        title="System Guides | SYSBILT" 
        description="Deep, actionable guides on how to build business systems that capture leads, automate workflows, and scale your operations." 
      />
      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        
        {/* Subtle Background Noise / Texture (Optional, matches A4 guide feel) */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* HERO SECTION */}
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20 md:mb-32 relative z-10 flex flex-col items-center text-center">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative w-20 h-20 bg-cream rounded-full shadow-neu flex items-center justify-center mb-8">
              <div className="relative w-12 h-12 bg-cream rounded-full shadow-neu-inner flex items-center justify-center">
                <BookOpen size={20} className="text-red-text drop-shadow-neu" strokeWidth={2} />
              </div>
            </div>
            
            <span className="type-eyebrow text-red-text mb-6 block">
              Resources & Documentation
            </span>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-dark leading-[0.95] tracking-tighter mb-8">
              System <span className="italic font-serif text-gold-on-cream drop-shadow-neu">Guides</span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto text-on-cream-secondary">
              Deep, actionable guides on how to build business systems that capture leads, automate workflows, and scale your operations.
            </p>
          </m.div>
        </section>

        {/* GUIDES GRID */}
        <section className="px-6 md:px-12 max-w-5xl mx-auto relative z-10">
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-dark/10 border-t-red-text animate-spin"></div>
            </div>
          ) : guides.length === 0 ? (
            <div className="py-20 flex justify-center">
              <div className="bg-cream rounded-3xl shadow-neu-inner px-10 py-12 text-center max-w-md">
                <span className="type-eyebrow text-on-cream-muted">Status</span>
                <p className="mt-4 text-on-cream-secondary">No guides published yet. Check Sanity Studio.</p>
              </div>
            </div>
          ) : (
            <m.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14"
            >
              {guides.map((guide, index) => (
                <m.div key={index} variants={cardVariants}>
                  <Link 
                    to={`/guides/${guide.slug?.current}`}
                    className="group block h-full bg-cream rounded-[32px] p-8 md:p-10 shadow-neu transition-all duration-500 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-red-text focus:ring-offset-4 focus:ring-offset-cream"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-6 inline-flex border border-gold-on-cream/20 px-3 py-1.5 rounded-sm type-eyebrow text-gold-on-cream bg-cream shadow-neu-inner w-fit">
                        {guide.servicePillar}
                      </div>
                      
                      <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4 transition-colors duration-300 group-hover:text-red-text leading-tight">
                        {guide.title}
                      </h2>
                      
                      <p className="text-on-cream-secondary font-light leading-relaxed mb-10 line-clamp-3 flex-grow">
                        {guide.subtitle}
                      </p>
                      
                      <div className="flex items-center text-sm font-bold tracking-[0.15em] uppercase text-dark group-hover:text-red-text transition-colors duration-300 mt-auto">
                        Read Guide 
                        <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={2} />
                      </div>
                    </div>
                  </Link>
                </m.div>
              ))}
            </m.div>
          )}
        </section>
      </main>
    </div>
  );
}