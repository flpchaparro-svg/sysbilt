import type { AppendixBlock } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { Activity, Building2, Wrench } from 'lucide-react';
import BlockTitle from './BlockTitle';
import PageHealthGrid from './PageHealthGrid';
import SectionHeader from './SectionHeader';
import ToolDetectionList from './ToolDetectionList';
import { auditCardLift, auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';

export interface AppendixSectionProps {
  appendix: AppendixBlock;
}

export default function AppendixSection({ appendix }: AppendixSectionProps) {
  const { registry, tools_detected, page_health } = appendix;

  return (
    <section
      className="flex flex-col gap-12 border-t border-white/10 pt-16 md:gap-14 md:pt-20"
      aria-labelledby="appendix-heading"
    >
      <SectionHeader
        id="appendix-heading"
        eyebrow="06 · Technical checklist"
        preamble="Registry lookups, tools we detected, and page-health checks. Use this as a short technical pass, not the main story."
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
          description="Tracking and stack signals we found on the public site. Useful as a checklist, not a full tech audit."
          Icon={Wrench}
        />
        <ToolDetectionList tools_detected={tools_detected} />
      </div>

      <div className="border-t border-white/[0.08] pt-10 md:pt-12">
        <BlockTitle
          title="Page health"
          description="Basic on-page checks: meta, schema, cookies, alt text, and heading structure."
          Icon={Activity}
        />
        <PageHealthGrid page_health={page_health} />
      </div>
    </section>
  );
}
