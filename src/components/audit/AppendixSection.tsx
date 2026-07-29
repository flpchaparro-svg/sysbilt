import type { AppendixBlock } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { Activity, Building2, Wrench } from 'lucide-react';
import BlockTitle from './BlockTitle';
import PageHealthGrid from './PageHealthGrid';
import SectionContext from './SectionContext';
import SectionHeader from './SectionHeader';
import ToolDetectionList from './ToolDetectionList';
import {
  buildPageHealthResultMeaning,
  buildToolsResultMeaning,
} from './technicalChecklistMeaning';
import { auditCardLift, auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';

export interface AppendixSectionProps {
  appendix: AppendixBlock;
}

export default function AppendixSection({ appendix }: AppendixSectionProps) {
  const { registry, tools_detected, page_health, tools_context, page_health_context } = appendix;

  const toolsMeaning = (tools_context || '').trim() || buildToolsResultMeaning(tools_detected);
  const pageHealthMeaning =
    (page_health_context || '').trim() || buildPageHealthResultMeaning(page_health);

  return (
    <section
      className="flex flex-col gap-12 border-t border-white/10 pt-16 md:gap-14 md:pt-20"
      aria-labelledby="appendix-heading"
    >
      <SectionHeader
        id="appendix-heading"
        eyebrow="06 · Technical checklist"
        preamble="Can someone book without friction, can you see and follow the lead, and can Google and AI systems read the page the way a strong competitor already does. Amber usually means unconfirmed or weak. That alone can be why warm clicks never become diary bookings."
        staticTitle="Technical checklist"
        align="center"
      />

      <div>
        <BlockTitle
          title="Business registry"
          description="Public company details we could confirm. Check these against your own records before you rely on them."
          Icon={Building2}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <div className={`${auditGlass} ${auditCardLift} p-6 md:p-7`}>
            <dl className="space-y-5 text-sm">
              <div>
                <dt className={`${auditEyebrow} text-white/40`}>ABN status</dt>
                <dd
                  className={`mt-2 font-sans ${
                    isMissingSignal(registry.abn_status) || !registry.abn_status.trim()
                      ? 'text-white/60'
                      : 'text-white/90'
                  }`}
                >
                  {registry.abn_status.trim() || 'Not found'}
                </dd>
              </div>
              <div>
                <dt className={`${auditEyebrow} text-white/40`}>Entity type</dt>
                <dd
                  className={`mt-2 font-sans ${
                    isMissingSignal(registry.entity_type) || !registry.entity_type.trim()
                      ? 'text-white/60'
                      : 'text-white/90'
                  }`}
                >
                  {registry.entity_type.trim() || 'Not found'}
                </dd>
              </div>
            </dl>
          </div>
          <div className={`${auditEmpty} ${auditCardLift}`}>
            This checklist is compiled from public signals and registry lookups. It is not legal advice, and it
            should be checked against your own records before you rely on it in a transaction.
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08] pt-10 md:pt-12">
        <BlockTitle
          title="Tools detected"
          description="Live chat, a clear booking path, and a CRM or form handoff are how strong local sites catch the enquiry while interest is still hot. Tracking tools show whether you can measure the traffic you pay for. Missing or unconfirmed rows below usually mean missed follow-up."
          Icon={Wrench}
        />
        <ToolDetectionList tools_detected={tools_detected} />
        <SectionContext text={toolsMeaning} label="What this means" />
      </div>

      <div className="border-t border-white/[0.08] pt-10 md:pt-12">
        <BlockTitle
          title="Page health"
          description="These are not vanity scores. Meta, schema, cookies, alt text, and headings shape how your link looks in Google, how machines label your business, and whether the page is easy to trust and scan."
          Icon={Activity}
        />
        <PageHealthGrid page_health={page_health} />
        <SectionContext text={pageHealthMeaning} label="What this means" />
      </div>
    </section>
  );
}
