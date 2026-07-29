import type { ActionPlanItem } from '@/types/deepAuditReport';
import ActionPlan from './ActionPlan';
import SectionHeader from './SectionHeader';

export interface WhereToFocusSectionProps {
  action_plan: ActionPlanItem[];
  rebuildMode?: boolean;
  businessName?: string;
}

export default function WhereToFocusSection({
  action_plan,
  rebuildMode = false,
  businessName = '',
}: WhereToFocusSectionProps) {
  return (
    <section className="flex flex-col gap-10 md:gap-12" aria-labelledby="where-to-focus-heading">
      <SectionHeader
        id="where-to-focus-heading"
        eyebrow="02 · First moves"
        preamble={
          rebuildMode
            ? 'If we picked up the work today, we would not patch this site piece by piece. The base is the constraint.'
            : 'If we picked up the work today, this is the order we would work in. Each step points at the section of the report it belongs to.'
        }
        staticTitle="First moves"
        align="center"
      />
      <ActionPlan
        action_plan={action_plan}
        rebuildMode={rebuildMode}
        businessName={businessName}
      />
    </section>
  );
}
