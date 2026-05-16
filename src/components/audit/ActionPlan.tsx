import type { ActionPlanItem } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditCardLift } from './auditCardStyles';

export interface ActionPlanProps {
  action_plan: ActionPlanItem[];
}

function formatLinkedSection(raw: string): string {
  const s = raw.trim().toLowerCase();
  if (s === 'find') return 'FIND';
  if (s === 'perceive') return 'PERCEIVE';
  if (s === 'review') return 'REVIEW';
  if (s === 'appendix') return 'APPENDIX';
  return raw.trim().toUpperCase() || '';
}

export default function ActionPlan({ action_plan }: ActionPlanProps) {
  const sorted = [...action_plan].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const display = sorted.slice(0, 5);
  if (display.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 font-sans text-sm text-white/75">
        No action plan rows were returned. We could not list prioritised moves for this pass.
      </div>
    );
  }

  return (
    <ol className="flex flex-col gap-6 pt-6 md:gap-7 md:pt-8">
      {display.map((item, idx) => {
        const rank = item.rank > 0 ? item.rank : idx + 1;
        const titleMissing = isMissingSignal(item.title) || !item.title.trim();
        const tag = formatLinkedSection(item.linked_to_section);
        return (
          <li
            key={`${rank}-${item.title}`}
            className={`flex gap-5 rounded-xl border p-5 md:gap-6 md:p-6 ${auditCardLift} ${
              titleMissing
                ? 'border-dashed border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.06] motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.68)]'
                : 'border-gold-on-dark/25 bg-gold-on-dark/5 hover:border-gold-on-dark/55 hover:bg-gold-on-dark/[0.12] motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(212,168,75,0.2)]'
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-on-dark/50 bg-black/30 font-mono text-sm font-medium text-gold-on-dark">
              {String(rank).padStart(2, '0')}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className={`type-h4 font-serif ${titleMissing ? 'text-white/75' : 'text-white'}`}>
                  {item.title.trim() || 'Not found'}
                </h4>
                {tag ? (
                  <span className="rounded border border-gold-on-dark/50 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
                    {tag}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/85 md:text-base">
                {item.rationale.trim() || 'Not found'}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
