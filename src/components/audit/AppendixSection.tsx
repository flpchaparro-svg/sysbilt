import type { ReactNode } from 'react';
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

function MeaningBox({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gold-on-dark/35 bg-gold-on-dark/[0.07] px-6 py-7 md:px-8 md:py-8 ${auditGlass}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-on-dark/70 to-transparent"
        aria-hidden
      />
      <p className={`${auditEyebrow} text-gold-on-dark`}>{eyebrow}</p>
      <div className="mt-4 space-y-4 font-sans text-sm leading-relaxed text-cream/90 md:text-[15px] md:leading-[1.7]">
        {children}
      </div>
    </div>
  );
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
        preamble="The stack and page basics that decide whether warm traffic becomes a booked job. Read the meaning, not only Present or Missing."
        staticTitle="Technical checklist"
        align="center"
      />

      <MeaningBox eyebrow="What this means for your business">
        <p>
          This section is where many reports go quiet. We will not. These checks answer three owner questions:
          can someone book without friction, can you see and follow the lead, and can Google and AI systems
          read the page the way a competitor&apos;s site already does.
        </p>
        <p>
          Amber usually means we could not confirm it, or it is weak next to what winning local sites carry.
          That alone can be why ads and pack clicks never turn into diary bookings.
        </p>
      </MeaningBox>

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
          description="Booking, chat, CRM, and tracking signals on the public site. Missing here often means missed follow-up."
          Icon={Wrench}
        />
        <MeaningBox eyebrow="Why tools matter">
          <p>
            Live chat, a clear booking path, and a CRM or form handoff are how strong local sites catch the
            enquiry while the person is still interested. If those are missing or broken, you pay for attention
            and then lose it to whoever answers first.
          </p>
        </MeaningBox>
        <div className="mt-6">
          <ToolDetectionList tools_detected={tools_detected} />
        </div>
      </div>

      <div className="border-t border-white/[0.08] pt-10 md:pt-12">
        <BlockTitle
          title="Page health"
          description="On-page basics: the search snippet, structured data, cookies, image text, and headings."
          Icon={Activity}
        />
        <MeaningBox eyebrow="Why page health matters">
          <p>
            These are not vanity tech scores. They shape how your link looks in Google, how machines label your
            business, and whether the page is easy to trust and scan. Weak here usually means weaker discovery
            next to clinics that already cleaned this up.
          </p>
        </MeaningBox>
        <div className="mt-6">
          <PageHealthGrid page_health={page_health} />
        </div>
      </div>

      <MeaningBox eyebrow="Bottom line on this checklist">
        <p>
          Treat Present as table stakes and Missing as a sales leak until proven otherwise. Compared with
          competitors who already book online, answer in chat, and keep clean page basics, every gap here is a
          reason a warm lead never reaches your chair.
        </p>
      </MeaningBox>
    </section>
  );
}
