import type { DeepAuditReportPayload } from '@/types/deepAuditReport';
import { Loader2, ShieldAlert } from 'lucide-react';
import AuditHeroHeader from './AuditHeroHeader';
import AuditScrollReveal from './AuditScrollReveal';
import AppendixSection from './AppendixSection';
import CompareCard from './CompareCard';
import CompetitorStrip from './CompetitorStrip';
import CTABlock from './CTABlock';
import DiagnosisCard from './DiagnosisCard';
import FooterBlock from './FooterBlock';
import IntroParagraph, { firstNameFromEmail } from './IntroParagraph';
import KeywordGrid from './KeywordGrid';
import MetricTile from './MetricTile';
import ReviewSourceList from './ReviewSourceList';
import SectionContext from './SectionContext';
import SectionHeader from './SectionHeader';
import SentimentBar from './SentimentBar';
import SwotPanel from './SwotPanel';
import WhereToFocusSection from './WhereToFocusSection';

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-6 text-white">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-on-dark/15 via-transparent to-transparent blur-2xl" aria-hidden />
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-10 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            <Loader2 className="h-9 w-9 animate-spin text-gold-on-dark" strokeWidth={1.25} aria-hidden />
            <div>
              <p className="type-h4 font-serif text-white">Loading audit</p>
              <p className="mt-2 font-sans text-sm text-white/70">Fetching your report from secure storage.</p>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
            <span className="type-eyebrow text-white/70">/ SYSBILT DEEP AUDIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvalidReportScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-6 selection:bg-gold-on-dark/30 selection:text-dark">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-10 backdrop-blur-md md:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-on-dark/40 bg-red-on-dark/10">
            <ShieldAlert className="h-7 w-7 text-red-on-dark" strokeWidth={1.25} aria-hidden />
          </div>
          <h1 className="type-h3 mt-8 font-serif text-white">Report expired or invalid</h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-white/75 md:text-[15px]">
            This secure link is no longer available. It may have expired, been revoked, or the address was mistyped. If
            you believe this is an error, contact your Sysbilt advisor for a fresh link.
          </p>
          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
          <span className="type-eyebrow mt-8 block text-center text-white/70">/ SYSBILT DEEP AUDIT</span>
        </div>
      </div>
    </div>
  );
}

export interface DeepAuditReportDashboardProps {
  loading: boolean;
  error: boolean;
  data: DeepAuditReportPayload | null;
}

export default function DeepAuditReportDashboard({ loading, error, data }: DeepAuditReportDashboardProps) {
  if (loading) return <LoadingScreen />;
  if (error || !data) return <InvalidReportScreen />;

  const { company_name, contact_email, audit_data: audit } = data;
  const appendix = audit.appendix;
  const find = audit.how_they_find_you;
  const perceive = audit.how_they_perceive_you;
  const say = audit.what_people_say;
  const firstName = firstNameFromEmail(contact_email);

  return (
    <div className="min-h-screen bg-dark font-sans text-white selection:bg-gold-on-dark/30 selection:text-dark">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(212,168,75,0.05),transparent_50%)]" aria-hidden />

      <AuditHeroHeader company_name={company_name} contact_email={contact_email} />

      <main className="relative mx-auto max-w-[1400px] space-y-24 px-6 py-16 md:space-y-32 md:px-12 md:py-20 lg:space-y-36 lg:px-20 lg:py-24">
        <AuditScrollReveal>
          <IntroParagraph firstName={firstName} companyName={company_name} />
        </AuditScrollReveal>

        <section aria-labelledby="diagnosis-heading">
          <AuditScrollReveal className="flex flex-col gap-10 md:gap-12">
            <SectionHeader
              id="diagnosis-heading"
              eyebrow="DIAGNOSIS"
              preamble="We have put together a snapshot of what we believe is creating the most drag in your front-of-house systems. Three findings, prioritised by impact."
              staticTitle="Diagnosis"
            />
          <DiagnosisCard variant="critical" {...audit.diagnosis.critical} />
          {audit.diagnosis.secondary.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 font-sans text-sm text-white/75">
              No secondary diagnosis cards were returned for this pass.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {audit.diagnosis.secondary.map((card, i) => (
                <div key={i} className="min-w-0">
                  <DiagnosisCard variant="secondary" {...card} />
                </div>
              ))}
            </div>
          )}
          </AuditScrollReveal>
        </section>

        <AuditScrollReveal>
          <WhereToFocusSection action_plan={appendix.action_plan} />
        </AuditScrollReveal>

        <section>
          <AuditScrollReveal className="flex flex-col gap-12 md:gap-14">
            <SectionHeader
              eyebrow="HOW THEY FIND YOU"
              preamble="How prospects, search engines, and competitors see you in the discovery phase, before they ever land on your site."
              headline={find.headline}
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
              {find.metrics.length === 0 ? (
                <div className="col-span-full rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 font-sans text-sm text-white/75">
                  No metric tiles were returned for this section.
                </div>
              ) : (
                find.metrics.map((m, i) => (
                  <div key={`${m.label}-${i}`} className="min-w-0">
                    <MetricTile label={m.label} value={m.value} rating={m.rating} />
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-white/[0.08] pt-10 md:pt-14">
              <div className="flex flex-col gap-12 md:gap-14">
                <div className="space-y-5">
                  <span className="type-eyebrow text-gold-on-dark">/ SEARCH TERMS</span>
                  <KeywordGrid keyword_grid={find.keyword_grid} />
                </div>
                <div className="space-y-5">
                  <span className="type-eyebrow text-gold-on-dark">/ COMPETITOR STRIP</span>
                  <CompetitorStrip competitors={find.competitors} />
                </div>
                <div className="space-y-5">
                  <span className="type-eyebrow text-gold-on-dark">/ SWOT</span>
                  <SwotPanel swot={find.swot} />
                </div>
              </div>
            </div>
            <SectionContext text={find.context} />
          </AuditScrollReveal>
        </section>

        <section>
          <AuditScrollReveal className="flex flex-col gap-12 md:gap-14">
            <SectionHeader
              eyebrow="HOW THEY PERCEIVE YOU"
              preamble="What your website communicates the moment someone arrives, and how that compares to how you want to be seen."
              headline={perceive.headline}
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
              {perceive.metrics.length === 0 ? (
                <div className="col-span-full rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 font-sans text-sm text-white/75">
                  No metric tiles were returned for this section.
                </div>
              ) : (
                perceive.metrics.map((m, i) => (
                  <div key={`${m.label}-${i}`} className="min-w-0">
                    <MetricTile label={m.label} value={m.value} rating={m.rating} />
                  </div>
                ))
              )}
            </div>
            <div className="space-y-5 border-t border-white/[0.08] pt-10 md:pt-14">
              <span className="type-eyebrow text-gold-on-dark">/ POSITIONING CHECKS</span>
              {perceive.compare.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 font-sans text-sm text-white/75">
                  No comparison rows were returned.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {perceive.compare.map((pair, i) => (
                    <div key={i} className="min-w-0">
                      <CompareCard pair={pair} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <SectionContext text={perceive.context} />
          </AuditScrollReveal>
        </section>

        <section>
          <AuditScrollReveal className="flex flex-col gap-12 md:gap-14">
            <SectionHeader
              eyebrow="WHAT PEOPLE SAY"
              preamble="What the world is saying about you on review platforms, social media, and search."
              headline={say.headline}
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
              {say.metrics.length === 0 ? (
                <div className="col-span-full rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 font-sans text-sm text-white/75">
                  No metric tiles were returned for this section.
                </div>
              ) : (
                say.metrics.map((m, i) => (
                  <div key={`${m.label}-${i}`} className="min-w-0">
                    <MetricTile label={m.label} value={m.value} rating={m.rating} />
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-white/[0.08] pt-10 md:pt-14">
              <SentimentBar sentiment={say.sentiment} />
            </div>
            <div className="space-y-5 border-t border-white/[0.08] pt-10 md:pt-14">
              <span className="type-eyebrow text-gold-on-dark">/ REVIEW SOURCES</span>
              <ReviewSourceList review_sources={say.review_sources} />
            </div>
            <SectionContext text={say.context} />
          </AuditScrollReveal>
        </section>

        <AuditScrollReveal>
          <AppendixSection appendix={appendix} />
        </AuditScrollReveal>

        <AuditScrollReveal>
          <CTABlock />
        </AuditScrollReveal>

        <AuditScrollReveal>
          <FooterBlock transparency_note={appendix.transparency_note} />
        </AuditScrollReveal>
      </main>
    </div>
  );
}
