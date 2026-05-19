import React from 'react';
import { m } from 'framer-motion';
import BackButton from '../components/BackButton';
import { PageMeta } from '../components/PageMeta';
import { SEO_META } from '../constants/seoMeta';

interface PrivacyPolicyPageProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
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
      />
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-32">
        <div className="mb-16">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        <div className="mb-24 border-b border-dark/10 pb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-muted mb-4 block">
            / LEGAL
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter text-dark">
            Privacy{' '}
            <span className="italic font-serif text-gold-on-cream">Policy.</span>
          </h1>
          <p className="mt-8 font-sans text-lg text-dark/80 max-w-2xl">
            We do not sell your data. We use it to build your system. Here is the plain English explanation of how we handle information on sysbilt.com.
          </p>
          <p className="mt-4 font-mono text-xs text-dark/50 uppercase tracking-widest">Last updated: 19 May 2026</p>
        </div>

        <div className="space-y-16 max-w-3xl">
          <section>
            <h2 className="font-serif text-2xl mb-4">1. What we collect</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              We collect information you provide directly to us, such as when you fill out our contact form, request a call, or email us. This typically includes your name, email, phone number, company name, and a description of what you need help with.
            </p>
            <p className="font-sans text-base text-dark/70 leading-relaxed mt-4">
              We also collect limited technical information automatically, such as the pages you visit, the device you use, and your approximate location. This only happens if you consent to analytics cookies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">2. How we use it</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">We use your data to:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2 font-sans text-base text-dark/70">
              <li>Respond to your enquiry and book a discovery call.</li>
              <li>Understand your current business systems so we can prepare a useful conversation.</li>
              <li>Send you follow-up materials you have asked for, such as an audit or a guide.</li>
              <li>Measure which parts of our site are useful, so we can improve it.</li>
              <li>
                Power Sybil, our AI chat assistant. Conversation transcripts are sent to Google Gemini (the AI model) and
                stored on our HubSpot CRM when you submit your details through the chat form.
              </li>
            </ul>
            <p className="font-sans text-base text-dark/70 leading-relaxed mt-4">
              We do not sell your data to third-party lead brokers, and we do not share it with anyone who is not directly involved in delivering the work you asked for.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">3. Tools we use</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              Our system runs on a small stack of trusted providers. Sybil, our AI chat assistant, runs on Google Gemini
              for the conversation and HubSpot for storing submitted enquiries.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 font-sans text-base text-dark/70">
              <li>
                <strong>Vercel</strong> hosts the website and processes server logs.
              </li>
              <li>
                <strong>Cloudflare</strong> manages DNS for sysbilt.com.
              </li>
              <li>
                <strong>Sanity</strong> stores our blog and guide content.
              </li>
              <li>
                <strong>HubSpot</strong> handles contact form submissions and, if you consent, visitor analytics.
              </li>
              <li>
                <strong>n8n</strong> runs our internal automations when you download a guide and leave feedback.
              </li>
              <li>
                <strong>Google Workspace</strong> handles our email.
              </li>
            </ul>
            <p className="font-sans text-base text-dark/70 leading-relaxed mt-4">
              Each of these providers has its own privacy and security documentation. Your data is processed inside their secure environments and is not shared beyond what is required to deliver our work.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">4. Cookies</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              A cookie is a small file saved in your browser that helps a site remember you. We only use three categories, and you can choose which ones run.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 font-sans text-base text-dark/70">
              <li>
                <strong>Essential cookies.</strong> Keep the site functional and secure. These are always on and do not track you.
              </li>
              <li>
                <strong>Analytics cookies.</strong> Let us see which pages get read and which buttons get clicked. These are HubSpot&apos;s tracking cookies and only run if you opt in.
              </li>
              <li>
                <strong>Marketing cookies.</strong> Remember you across visits so we can show relevant content and measure the results of our campaigns. Also HubSpot&apos;s cookies and only run if you opt in.
              </li>
            </ul>
            <p className="font-sans text-base text-dark/70 leading-relaxed mt-4">
              You can change your choice any time via the Cookie Settings link in the footer.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">5. Your rights</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              Under Australian privacy law and, where relevant, GDPR, you have the right to:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 font-sans text-base text-dark/70">
              <li>Ask us what data we hold on you.</li>
              <li>Ask us to correct information that is wrong.</li>
              <li>Ask us to delete your data.</li>
              <li>Withdraw consent for analytics and marketing at any time.</li>
            </ul>
            <p className="font-sans text-base text-dark/70 leading-relaxed mt-4">
              Email help@sysbilt.com and we will action your request within 14 days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">6. Changes</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              If we update this policy, we will change the date at the top of the page. Material changes will be flagged via our regular communications.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">7. Contact</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              Questions about privacy or data handling go to help@sysbilt.com. We read every email.
            </p>
          </section>
        </div>
      </div>
    </m.div>
  );
};

export default PrivacyPolicyPage;
