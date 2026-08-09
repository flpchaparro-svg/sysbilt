import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BTW_META } from '../../built-to-work/types';
import { BTS_META } from '../../built-to-sell/types';
import { BTC_META } from '../../built-to-close/types';
import { BTR_META } from '../../built-to-run/types';
import { BTT_META } from '../../built-to-think/types';
import { BTM_META } from '../../built-to-multiply/types';
import { BTE_META } from '../../built-to-teach/types';
import { BSE_META } from '../../built-to-see/types';

const guides = [
  { meta: BTW_META, service: 'Websites' },
  { meta: BTS_META, service: 'E-commerce' },
  { meta: BTC_META, service: 'CRM and lead tracking' },
  { meta: BTR_META, service: 'Automation' },
  { meta: BTT_META, service: 'AI assistants' },
  { meta: BTM_META, service: 'Content systems' },
  { meta: BTE_META, service: 'Team training' },
  { meta: BSE_META, service: 'Dashboards and reporting' },
] as const;

const GuideLibrarySection: React.FC = () => (
  <section
    aria-labelledby="field-guides-heading"
    className="relative z-30 border-y border-black/5 bg-cream px-6 py-20 md:px-12 md:py-28"
  >
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-10 max-w-3xl md:mb-14">
        <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gold-on-cream">
          / FIELD GUIDES
        </p>
        <h2 id="field-guides-heading" className="mb-5 font-serif text-4xl tracking-tight text-dark md:text-6xl">
          Learn how each system should work
        </h2>
        <p className="max-w-2xl font-sans text-base font-light leading-relaxed text-dark/65 md:text-lg">
          Eight field guides for the systems behind a growing business. Read every chapter free.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map(({ meta, service }) => (
          <Link
            key={meta.slug}
            to={`/guides/${meta.slug}`}
            className="group flex min-h-40 flex-col justify-between rounded-2xl border border-white/50 bg-cream p-6 shadow-neu transition-all duration-300 hover:-translate-y-1"
          >
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-dark/45">
              {service}
            </span>
            <span className="mt-8 flex items-end justify-between gap-4">
              <span className="font-serif text-2xl leading-tight text-dark transition-colors group-hover:text-red-text">
                {meta.title}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-gold-on-cream transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default GuideLibrarySection;
