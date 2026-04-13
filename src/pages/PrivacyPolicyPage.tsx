import React from 'react';
import { m } from 'framer-motion';
import BackButton from '../components/BackButton';
import GlobalFooter from '../components/GlobalFooter';
import { PageMeta } from '../components/PageMeta';
import { SEO_META } from '../constants/seoMeta';

interface PrivacyPolicyPageProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack, onNavigate }) => {
  return (
    <m.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream text-dark font-sans selection:bg-gold/30"
    >
      <PageMeta
        title={SEO_META.privacy.title}
        description={SEO_META.privacy.description}
        canonical={SEO_META.privacy.canonical}
        robots="noindex"
      />
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-32">
        
        {/* NAV BACK */}
        <div className="mb-16">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HEADER */}
        <div className="mb-24 border-b border-dark/10 pb-12">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-muted mb-4 block">
              / LEGAL
           </span>
           <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter text-dark">
             Privacy <span className="italic font-serif text-gold-on-cream">Policy</span>
           </h1>
           <p className="mt-8 font-sans text-lg text-dark/80 max-w-2xl">
             I don't sell your data. I use it to build your system. Here is the plain English explanation of how we handle information.
           </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-16 max-w-3xl">
          
          <section>
            <h3 className="font-serif text-2xl mb-4">1. The Basics</h3>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              We collect information you provide directly to us, such as when you fill out a form, request an audit, or communicate with us. This typically includes your name, email, phone number, and details about your business systems.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl mb-4">2. How We Use Data</h3>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              We use this data to:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 font-sans text-base text-dark/70">
              <li>Assess your current technical architecture.</li>
              <li>Communicate with you about your project.</li>
              <li>Send you the audit results you requested.</li>
              <li>We <strong>do not</strong> sell your data to third-party lead brokers.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-serif text-2xl mb-4">3. Tools & Infrastructure</h3>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              Our own system runs on enterprise-grade infrastructure including Vercel, HubSpot, and Google Cloud. Your data is processed securely within these environments.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl mb-4">4. Contact</h3>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              If you want your data deleted from our CRM, just email help@felipechaparro.com and we will wipe it. No questions asked.
            </p>
          </section>

        </div>
      </div>
    </m.div>
  );
};

export default PrivacyPolicyPage;
