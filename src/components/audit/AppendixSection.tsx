import { type AppendixBlock, isMissingSignal } from '@/types/deepAuditReport';
import PageHealthGrid from './PageHealthGrid';
import SectionHeader from './SectionHeader';
import ToolDetectionList from './ToolDetectionList';
import { auditCardLift } from './auditCardStyles';

export interface AppendixSectionProps {
  appendix: AppendixBlock;
}

export default function AppendixSection({ appendix }: AppendixSectionProps) {
  const { registry, tools_detected, page_health } = appendix;

  return (
    <section className="flex flex-col gap-14 border-t border-white/10 pt-16 md:gap-16 md:pt-20" aria-labelledby="appendix-heading">
      <SectionHeader
        id="appendix-heading"
        eyebrow="06 · Technical checklist"
        preamble="Registry lookups, tools we detected, and page-health checks. Use this as a short technical pass, not the main story."
        staticTitle="Technical checklist"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <div
          className={`rounded-xl border border-white/10 bg-white/[0.03] p-5 font-sans md:p-6 ${auditCardLift} hover:border-gold-on-dark/35 hover:bg-white/[0.06] motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(212,168,75,0.12)]`}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
            Registry
          </span>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                ABN status
              </dt>
              <dd
                className={`mt-2 font-sans ${
                  isMissingSignal(registry.abn_status) || !registry.abn_status.trim() ? 'text-white/75' : 'text-white/90'
                }`}
              >
                {registry.abn_status.trim() || 'Not found'}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                Entity type
              </dt>
              <dd
                className={`mt-2 font-sans ${
                  isMissingSignal(registry.entity_type) || !registry.entity_type.trim() ? 'text-white/75' : 'text-white/90'
                }`}
              >
                {registry.entity_type.trim() || 'Not found'}
              </dd>
            </div>
          </dl>
        </div>
        <div
          className={`rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 font-sans text-sm leading-relaxed text-white/80 md:p-6 ${auditCardLift} hover:border-white/28 hover:bg-white/[0.05] motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.65)]`}
        >
          This checklist is compiled from public signals and registry lookups. It is not legal advice, and it should be
          checked against your own records before you rely on it in a transaction.
        </div>
      </div>

      <div className="flex flex-col gap-10 border-t border-white/[0.08] pt-10 md:gap-12 md:pt-12">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
          Tools detected
        </span>
        <ToolDetectionList tools_detected={tools_detected} />
      </div>

      <div className="flex flex-col gap-10 border-t border-white/[0.08] pt-10 md:gap-12 md:pt-12">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
          Page health
        </span>
        <PageHealthGrid page_health={page_health} />
      </div>
    </section>
  );
}
