import type { ActionPlanItem } from '@/types/deepAuditReport';
import ActionPlan from './ActionPlan';
import SectionHeader from './SectionHeader';

export interface WhereToFocusSectionProps {
  action_plan: ActionPlanItem[];
}

export default function WhereToFocusSection({ action_plan }: WhereToFocusSectionProps) {
  return (
    <section className="space-y-8" aria-labelledby="where-to-focus-heading">
      <SectionHeader
        id="where-to-focus-heading"
        eyebrow="WHERE TO FOCUS"
        preamble="These are the highest-leverage moves we would make if we picked up the work today, in priority order."
        staticTitle="Where to focus"
      />
      <ActionPlan action_plan={action_plan} />
    </section>
  );
}
