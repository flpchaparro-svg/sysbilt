import type { ActionPlanItem } from '@/types/deepAuditReport';
import { sanitizeActionPlanForDisplay } from '@/lib/auditProductMap';
import ActionPlan from './ActionPlan';
import SectionHeader from './SectionHeader';

export interface WhereToFocusSectionProps {
  action_plan: ActionPlanItem[];
  rebuildMode?: boolean;
  businessName?: string;
  /** When AI only returned rebuild rows, show this diagnosis-led move instead. */
  fallbackMove?: { title: string; rationale?: string; linked_to_section?: string };
}

export default function WhereToFocusSection({
  action_plan,
  rebuildMode = false,
  businessName = '',
  fallbackMove,
}: WhereToFocusSectionProps) {
  const displayPlan = sanitizeActionPlanForDisplay(action_plan, rebuildMode, fallbackMove);

  return (
    <section className="flex flex-col gap-10 md:gap-12" aria-labelledby="where-to-focus-heading">
      <SectionHeader
        id="where-to-focus-heading"
        eyebrow="02 · First moves"
        preamble={
          rebuildMode
            ? 'If we picked up the work today, we would replace the base rather than keep patching a site that cannot carry the load. Start here.'
            : 'If we picked up the work today, this is the order. Each move points at the detail section it belongs to.'
        }
        staticTitle="First moves"
        align="center"
      />
      <ActionPlan
        action_plan={displayPlan}
        rebuildMode={rebuildMode}
        businessName={businessName}
      />
    </section>
  );
}
