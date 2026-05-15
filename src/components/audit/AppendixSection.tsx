import type { AppendixBlock } from '@/types/deepAuditReport';
import PageHealthGrid from './PageHealthGrid';
import SectionHeader from './SectionHeader';
import ToolDetectionList from './ToolDetectionList';
import { isMissingSignal } from '@/types/deepAuditReport';

export interface AppendixSectionProps {
  appendix: AppendixBlock;
}

export default function AppendixSection({ appendix }: AppendixSectionProps) {
  const { registry, tools_detected, page_health } = appendix;

  return (
    <section className="space-y-10 border-t border-white/10 pt-12 md:space-y-12 md:pt-16" aria-labelledby="appendix-heading">
      <SectionHeader
        id="appendix-heading"
        eyebrow="APPENDIX"
        preamble="The technical pass we ran across your front-of-house systems. Use this as a checklist."
        staticTitle="Appendix"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 font-sans md:p-6">
          <span className="type-eyebrow text-gold-on-dark">/ REGISTRY</span>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="type-eyebrow text-white/50">/ ABN STATUS</dt>
              <dd
                className={`mt-2 font-sans ${
                  isMissingSignal(registry.abn_status) || !registry.abn_status.trim() ? 'text-white/40' : 'text-white/90'
                }`}
              >
                {registry.abn_status.trim() || 'Not found'}
              </dd>
            </div>
            <div>
              <dt className="type-eyebrow text-white/50">/ ENTITY TYPE</dt>
              <dd
                className={`mt-2 font-sans ${
                  isMissingSignal(registry.entity_type) || !registry.entity_type.trim() ? 'text-white/40' : 'text-white/90'
                }`}
              >
                {registry.entity_type.trim() || 'Not found'}
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 font-sans text-sm leading-relaxed text-white/70 md:p-6">
          This appendix is compiled from public signals and registry lookups. It is not legal advice, and it should be
          checked against your own records before you rely on it in a transaction.
        </div>
      </div>

      <div className="space-y-4">
        <span className="type-eyebrow text-gold-on-dark">/ TOOLS DETECTED</span>
        <ToolDetectionList tools_detected={tools_detected} />
      </div>

      <div className="space-y-4">
        <span className="type-eyebrow text-gold-on-dark">/ PAGE HEALTH</span>
        <PageHealthGrid page_health={page_health} />
      </div>
    </section>
  );
}
