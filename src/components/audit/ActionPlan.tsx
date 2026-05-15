import type { ActionPlanItem } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

export interface ActionPlanProps {
  action_plan: ActionPlanItem[];
}

export default function ActionPlan({ action_plan }: ActionPlanProps) {
  const sorted = [...action_plan].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const display = sorted.slice(0, 5);
  if (display.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-zinc-500">
        No action plan rows were returned. We could not list prioritised moves for this pass.
      </div>
    );
  }

  return (
    <ol className="space-y-4">
      {display.map((item, idx) => {
        const rank = item.rank > 0 ? item.rank : idx + 1;
        const titleMissing = isMissingSignal(item.title) || !item.title.trim();
        return (
          <li
            key={`${rank}-${item.title}`}
            className={`flex gap-4 rounded-xl border p-4 md:gap-5 md:p-5 ${
              titleMissing ? 'border-dashed border-white/12 bg-white/[0.02]' : 'border-gold/20 bg-gradient-to-br from-zinc-900/50 to-zinc-950/90'
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 font-mono text-sm text-gold-on-dark">
              {String(rank).padStart(2, '0')}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className={`font-serif text-lg tracking-tight md:text-xl ${titleMissing ? 'text-zinc-500' : 'text-white'}`}>
                  {item.title.trim() || 'Not found'}
                </h4>
                {item.linked_to_section.trim() ? (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                    {item.linked_to_section}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.rationale.trim() || 'Not found'}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
