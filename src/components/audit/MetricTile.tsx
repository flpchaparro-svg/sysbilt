import type { MetricRating } from '@/types/deepAuditReport';
import type { LucideIcon } from 'lucide-react';
import {
  Clock,
  Eye,
  LayoutTemplate,
  MapPin,
  MessageSquareQuote,
  MousePointerClick,
  Palette,
  Search,
  Share2,
  Star,
  Target,
  Type,
} from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { auditCardLift, auditEase, auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';
import { isMetricValueEmpty, isMetricValueUnknown, metricHelperForLabel } from './metricHelpers';

const ratingAccent: Record<MetricRating, string> = {
  low: 'from-red-on-dark via-red-on-dark/70 to-red-on-dark/20',
  medium: 'from-gold-on-dark via-gold-on-dark/70 to-gold-on-dark/15',
  high: 'from-teal via-teal/70 to-teal/20',
};

const ratingBadge: Record<MetricRating, string> = {
  low: 'border-red-on-dark/50 bg-red-on-dark/10 text-red-on-dark',
  medium: 'border-gold-on-dark/50 bg-gold-on-dark/10 text-gold-on-dark',
  high: 'border-teal/50 bg-teal/10 text-teal',
};

const ratingIconBg: Record<MetricRating, string> = {
  low: 'border-red-on-dark/35 bg-red-on-dark/10 text-red-on-dark',
  medium: 'border-gold-on-dark/35 bg-gold-on-dark/10 text-gold-on-dark',
  high: 'border-teal/35 bg-teal/10 text-teal',
};

const ratingGlow: Record<MetricRating, string> = {
  low: 'hover:border-red-on-dark/50 hover:shadow-[0_28px_64px_-28px_rgba(248,113,113,0.28)]',
  medium: 'hover:border-gold-on-dark/45 hover:shadow-[0_28px_64px_-28px_rgba(212,168,75,0.28)]',
  high: 'hover:border-teal/45 hover:shadow-[0_28px_64px_-28px_rgba(45,212,191,0.22)]',
};

const LABEL_ICONS: { match: RegExp; Icon: LucideIcon }[] = [
  { match: /ranking|search term/i, Icon: Search },
  { match: /knowledge panel/i, Icon: LayoutTemplate },
  { match: /local pack/i, Icon: MapPin },
  { match: /value proposition/i, Icon: Target },
  { match: /call to action|cta/i, Icon: MousePointerClick },
  { match: /brand consistency/i, Icon: Palette },
  { match: /readability|copy/i, Icon: Type },
  { match: /review rating/i, Icon: Star },
  { match: /rating$/i, Icon: Star },
  { match: /social/i, Icon: Share2 },
  { match: /search-visible reviews/i, Icon: Eye },
  { match: /review volume/i, Icon: MessageSquareQuote },
  { match: /recency/i, Icon: Clock },
  { match: /review/i, Icon: MessageSquareQuote },
];

function iconForLabel(label: string): LucideIcon {
  const hit = LABEL_ICONS.find((row) => row.match.test(label));
  return hit?.Icon ?? Search;
}

const entrances = [
  { x: -36, y: 12, rotate: -1.5 },
  { x: 0, y: 40, rotate: 0 },
  { x: 36, y: 12, rotate: 1.5 },
  { x: 0, y: 28, scale: 0.94 },
] as const;

export interface MetricTileProps {
  label: string;
  value: string;
  rating: MetricRating;
  index?: number;
}

export default function MetricTile({ label, value, rating, index = 0 }: MetricTileProps) {
  const unknown = isMetricValueUnknown(value);
  const absenceEmpty = isMetricValueEmpty(value);
  const weakTile = unknown || absenceEmpty;
  const helper = metricHelperForLabel(label);
  const reduce = useReducedMotion();
  const Icon = iconForLabel(label);
  const entrance = entrances[index % entrances.length];

  return (
    <m.div
      className={`flex h-full flex-col p-4 md:p-5 ${auditGlass} ${auditCardLift} ${
        weakTile
          ? 'border-dashed border-white/20 hover:border-white/35'
          : `border-white/10 ${ratingGlow[rating]}`
      }`}
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              x: 'x' in entrance ? entrance.x : 0,
              y: 'y' in entrance ? entrance.y : 0,
              rotate: 'rotate' in entrance ? entrance.rotate : 0,
              scale: 'scale' in entrance ? entrance.scale : 1,
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: auditEase }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            unknown ? 'border-white/15 bg-white/5 text-white/50' : ratingIconBg[rating]
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </div>
        {unknown ? (
          <span className="inline-flex w-fit rounded-full border border-white/15 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-white/40">
            unknown
          </span>
        ) : (
          <span
            className={`inline-flex w-fit self-start rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] ${ratingBadge[rating]}`}
          >
            {rating}
          </span>
        )}
      </div>

      <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
        <m.div
          className={`h-full rounded-full bg-gradient-to-r ${
            unknown ? 'from-white/30 to-white/10' : ratingAccent[rating]
          }`}
          initial={reduce ? { width: '100%' } : { width: '0%' }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: auditEase, delay: 0.2 + index * 0.08 }}
        />
      </div>

      <span className={`${auditEyebrow} mt-4 text-white/45`}>{label.trim() || 'Metric'}</span>

      <p
        className={`mt-2.5 font-serif text-lg leading-snug tracking-tight md:text-xl ${
          weakTile ? 'text-white/65' : 'text-cream'
        }`}
      >
        {value.trim() || 'Not found'}
      </p>

      {helper ? (
        <p
          className={`mt-3 font-sans text-xs leading-relaxed md:text-[13px] ${
            weakTile ? 'text-white/70' : 'text-white/50'
          }`}
        >
          {helper}
        </p>
      ) : null}
    </m.div>
  );
}

export function MetricEmptyState() {
  return <div className={`${auditEmpty} col-span-full`}>No metric tiles were returned for this section.</div>;
}

/** Adapts columns to count so 3 tiles do not leave a blank fourth slot. */
export function MetricGrid({ count, children }: { count: number; children: ReactNode }) {
  const cols =
    count <= 1
      ? 'grid-cols-1 max-w-md'
      : count === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : count === 3
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return <div className={`grid gap-4 lg:gap-5 ${cols}`}>{children}</div>;
}
