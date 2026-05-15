import type { DeepAuditReportPayload } from '@/types/deepAuditReport';
import { Loader2, ShieldAlert } from 'lucide-react';
import ActionPlan from './ActionPlan';
import CompareCard from './CompareCard';
import CompetitorStrip from './CompetitorStrip';
import DiagnosisCard from './DiagnosisCard';
import KeywordGrid from './KeywordGrid';
import MetricTile from './MetricTile';
import PageHealthGrid from './PageHealthGrid';
import ReviewSourceList from './ReviewSourceList';
import SectionContext from './SectionContext';
import SectionHeader from './SectionHeader';
import SentimentBar from './SentimentBar';
import SwotPanel from './SwotPanel';
import ToolDetectionList from './ToolDetectionList';
import TransparencyNote from './TransparencyNote';
import { isMissingSignal } from '@/types/deepAuditReport';

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-zinc-100">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-2xl" aria-hidden />
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            <Loader2 className="h-9 w-9 animate-spin text-gold-on-dark" strokeWidth={1.25} aria-hidden />
            <div>
              <p className="font-serif text-xl tracking-tight text-white md:text-2xl">Loading audit</p>
              <p className="mt-2 text-sm text-zinc-500">Fetching your report from secure storage.</p>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">Sysbilt Deep Audit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvalidReportScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 selection:bg-gold/30 selection:text-white">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950/90 p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md md:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-on-dark/25 bg-red-on-dark/10">
            <ShieldAlert className="h-7 w-7 text-red-on-dark" strokeWidth={1.25} aria-hidden />
          </div>
          <h1 className="mt-8 font-serif text-3xl tracking-tight text-white md:text-[2rem]">Report expired or invalid</h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-[15px]">
            This secure link is no longer available. It may have expired, been revoked, or the address was mistyped. If you believe this is an error, contact your Sysbilt advisor for a fresh link.
          </p>
          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
          <p className="mt-8 text-xs uppercase tracking-[0.26em] text-zinc-600">Confidential, client audit</p>
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

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-zinc-100 selection:bg-gold/25 selection:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(197,160,89,0.12),transparent)]" aria-hidden />

      <header className="relative border-b border-white/[0.06] bg-[#050505]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
          <h1 className="max-w-4xl font-serif text-3xl font-normal tracking-tight text-white md:text-4xl lg:text-[2.85rem] lg:leading-[1.08]">
            {company_name}
          </h1>
          <p className="mt-5 text-sm text-zinc-400 md:text-base">
            Prepared for <span className="text-zinc-200">{contact_email}</span>
          </p>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-600">Sysbilt Deep Audit</p>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl space-y-16 px-5 py-12 md:space-y-20 md:px-8 md:py-16">
        <section aria-labelledby="diagnosis-heading" className="space-y-5">
          <h2 id="diagnosis-heading" className="sr-only">
            Diagnosis
          </h2>
          <DiagnosisCard variant="critical" {...audit.diagnosis.critical} />
          {audit.diagnosis.secondary.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-zinc-500">
              No secondary diagnosis cards were returned for this pass.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {audit.diagnosis.secondary.map((card, i) => (
                <div key={i} className="min-w-0">
                  <DiagnosisCard variant="secondary" {...card} />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-8">
          <SectionHeader headline={find.headline} sectionLabel="How they find you" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {find.metrics.length === 0 ? (
              <div className="col-span-full rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-zinc-500">
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
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Search terms</h3>
            <KeywordGrid keyword_grid={find.keyword_grid} />
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Competitor strip</h3>
            <CompetitorStrip competitors={find.competitors} />
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">SWOT</h3>
            <SwotPanel swot={find.swot} />
          </div>
          <SectionContext text={find.context} />
        </section>

        <section className="space-y-8">
          <SectionHeader headline={perceive.headline} sectionLabel="How they perceive you" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {perceive.metrics.length === 0 ? (
              <div className="col-span-full rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-zinc-500">
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
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Positioning checks</h3>
            {perceive.compare.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-zinc-500">
                No comparison rows were returned.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {perceive.compare.map((pair, i) => (
                  <div key={i} className="min-w-0">
                    <CompareCard pair={pair} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <SectionContext text={perceive.context} />
        </section>

        <section className="space-y-8">
          <SectionHeader headline={say.headline} sectionLabel="What people say" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {say.metrics.length === 0 ? (
              <div className="col-span-full rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-zinc-500">
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
          <SentimentBar sentiment={say.sentiment} />
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Review sources</h3>
            <ReviewSourceList review_sources={say.review_sources} />
          </div>
          <SectionContext text={say.context} />
        </section>

        <section className="space-y-10 border-t border-white/[0.06] pt-12 md:pt-16">
          <h2 className="font-serif text-2xl tracking-tight text-white md:text-3xl">Appendix</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.07] bg-zinc-950/60 p-5 md:p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Registry</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-zinc-500">ABN status</dt>
                  <dd
                    className={`mt-1 ${isMissingSignal(appendix.registry.abn_status) || !appendix.registry.abn_status.trim() ? 'text-zinc-500' : 'text-zinc-200'}`}
                  >
                    {appendix.registry.abn_status.trim() || 'Not found'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-zinc-500">Entity type</dt>
                  <dd
                    className={`mt-1 ${isMissingSignal(appendix.registry.entity_type) || !appendix.registry.entity_type.trim() ? 'text-zinc-500' : 'text-zinc-200'}`}
                  >
                    {appendix.registry.entity_type.trim() || 'Not found'}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm text-zinc-500 md:p-6">
              This appendix is compiled from public signals and registry lookups. It is not legal advice, and it should be checked against your own records before you rely on it in a transaction.
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Tools detected</h3>
            <ToolDetectionList tools_detected={appendix.tools_detected} />
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Page health</h3>
            <PageHealthGrid page_health={appendix.page_health} />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Action plan</h3>
            <ActionPlan action_plan={appendix.action_plan} />
          </div>

          <TransparencyNote text={appendix.transparency_note} />
        </section>

        <footer className="border-t border-white/[0.06] pt-10 text-center text-[11px] uppercase tracking-[0.24em] text-zinc-600">
          Confidential, Sysbilt Deep Audit, do not distribute
        </footer>
      </main>
    </div>
  );
}
