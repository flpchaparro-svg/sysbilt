import type { DeepAuditReportPayload } from '@/types/deepAuditReport';
import { Loader2, MessagesSquare, Search, ShieldAlert, Swords, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import AuditHeroHeader from './AuditHeroHeader';
import AuditScrollReveal from './AuditScrollReveal';
import AppendixSection from './AppendixSection';
import BlockTitle from './BlockTitle';
import CompareCard from './CompareCard';
import CompetitorStrip from './CompetitorStrip';
import CTABlock from './CTABlock';
import DiagnosisCard from './DiagnosisCard';
import FooterBlock from './FooterBlock';
import IntroParagraph, { firstNameFromEmail } from './IntroParagraph';
import AiSiteRead from './AiSiteRead';
import KeywordGrid from './KeywordGrid';
import MetricTile, { MetricEmptyState, MetricGrid } from './MetricTile';
import ReviewSourceList from './ReviewSourceList';
import SectionContext from './SectionContext';
import SectionHeader from './SectionHeader';
import SentimentBar from './SentimentBar';
import SwotPanel from './SwotPanel';
import WhereToFocusSection from './WhereToFocusSection';
import { auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';
import { primaryOfferFromAudit } from '@/lib/auditProductMap';
import { isMetricValueEmpty } from './metricHelpers';

/** Soft in-section label where the card already repeats the title. */
function SoftLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <span className={`${auditEyebrow} text-gold-on-dark`}>{children}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" aria-hidden />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-6 text-white">
      <div className="relative w-full max-w-md">
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-on-dark/20 via-transparent to-transparent blur-2xl"
          aria-hidden
        />
        <div className={`relative ${auditGlass} p-10 text-center`}>
          <Loader2 className="mx-auto h-9 w-9 animate-spin text-gold-on-dark" strokeWidth={1.25} aria-hidden />
          <p className="mt-6 font-serif text-2xl text-cream">Loading audit</p>
          <p className="mt-2 font-sans text-sm text-white/60">Fetching your report from secure storage.</p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
          <span className={`${auditEyebrow} mt-6 block text-white/35`}>SYSBILT Deep Audit</span>
        </div>
      </div>
    </div>
  );
}

function InvalidReportScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-6 selection:bg-gold-on-dark/30 selection:text-dark">
      <div className={`w-full max-w-lg ${auditGlass} p-10 md:p-12`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-on-dark/40 bg-red-on-dark/10">
          <ShieldAlert className="h-7 w-7 text-red-on-dark" strokeWidth={1.25} aria-hidden />
        </div>
        <h1 className="mt-8 text-center font-serif text-3xl text-cream">Report unavailable</h1>
        <p className="mt-4 text-center font-sans text-sm leading-relaxed text-white/65 md:text-[15px]">
          This secure link could not load a complete audit. The report may be incomplete, expired, or
          mistyped. Ask your SYSBILT contact for a fresh link.
        </p>
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
        <span className={`${auditEyebrow} mt-8 block text-center text-white/35`}>SYSBILT Deep Audit</span>
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
  const firstName = data.contact_first_name?.trim() || firstNameFromEmail(contact_email);
  const { offer, findingLabel, rebuild } = primaryOfferFromAudit(audit, company_name, {
    offerProduct: data.offer_product,
    lhMobile: data.lh_mobile,
  });
  const findMetrics = find.metrics.filter((m) => !isMetricValueEmpty(m.value));
  const perceiveMetrics = perceive.metrics.filter((m) => !isMetricValueEmpty(m.value));
  const sayMetrics = say.metrics.filter((m) => !isMetricValueEmpty(m.value));

  return (
    <div className="min-h-screen bg-dark font-sans text-white selection:bg-gold-on-dark/30 selection:text-dark">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(212,168,75,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_40%,rgba(255,107,107,0.04),transparent_50%)]"
        aria-hidden
      />

      <AuditHeroHeader company_name={company_name} contact_email={contact_email} />

      <main className="relative mx-auto max-w-[1120px] space-y-28 px-6 py-16 md:space-y-36 md:px-10 md:py-20 lg:space-y-40 lg:px-12 lg:py-24">
        <AuditScrollReveal>
          <IntroParagraph
            firstName={firstName}
            companyName={company_name}
            giftIntro={audit.gift_intro}
          />
        </AuditScrollReveal>

        {audit.ai_site_read?.trim() ? (
          <AuditScrollReveal>
            <AiSiteRead text={audit.ai_site_read} companyName={company_name} />
          </AuditScrollReveal>
        ) : null}

        <section aria-labelledby="diagnosis-heading">
          <AuditScrollReveal className="flex flex-col gap-8 md:gap-10">
            <SectionHeader
              id="diagnosis-heading"
              eyebrow="01 · What we found first"
              preamble="The three things costing you the most enquiries and trust. Read these before the detail."
              staticTitle="The costly problems"
              align="center"
            />
            <DiagnosisCard variant="critical" {...audit.diagnosis.critical} />
            {audit.diagnosis.secondary.length === 0 ? (
              <div className={auditEmpty}>No secondary diagnosis cards were returned for this pass.</div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
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
          <WhereToFocusSection
            action_plan={appendix.action_plan}
            rebuildMode={rebuild}
            businessName={company_name}
            fallbackMove={{
              title: findingLabel || audit.diagnosis.critical.title,
              rationale: audit.diagnosis.critical.consequence,
              linked_to_section: 'find',
            }}
          />
        </AuditScrollReveal>

        <section>
          <AuditScrollReveal className="flex flex-col gap-12 md:gap-16">
            <SectionHeader
              eyebrow="03 · How people find you"
              preamble="Can a stranger in your suburb find you before they find a competitor."
              headline={find.headline}
            />
            <div>
              {findMetrics.length === 0 ? (
                <MetricEmptyState />
              ) : (
                <MetricGrid count={findMetrics.length}>
                  {findMetrics.map((m, i) => (
                    <div key={`${m.label}-${i}`} className="min-w-0">
                      <MetricTile label={m.label} value={m.value} rating={m.rating} index={i} />
                    </div>
                  ))}
                </MetricGrid>
              )}
            </div>
            <div className="space-y-14 border-t border-white/[0.08] pt-12 md:space-y-16 md:pt-16">
              <div>
                <BlockTitle
                  title="Search terms"
                  description="Where you show up when people type the jobs and places that should bring you enquiries."
                  Icon={Search}
                />
                <KeywordGrid keyword_grid={find.keyword_grid} />
              </div>
              <div>
                <BlockTitle
                  title="Competitors"
                  description="Who is winning the clicks around you, and what they are doing better in public."
                  Icon={Users}
                />
                <CompetitorStrip competitors={find.competitors} />
              </div>
              <div>
                <BlockTitle
                  title="SWOT snapshot"
                  description="A plain four-box read: Strengths, Weaknesses, Opportunities, Threats. What helps you, what hurts you, what you could take, and what could take from you."
                  Icon={Swords}
                />
                <SwotPanel swot={find.swot} />
              </div>
            </div>
            <SectionContext text={find.context} />
          </AuditScrollReveal>
        </section>

        <section>
          <AuditScrollReveal className="flex flex-col gap-12 md:gap-16">
            <SectionHeader
              eyebrow="04 · What your website says"
              preamble="What the site communicates in the first few seconds, and whether someone knows what to do next."
              headline={perceive.headline}
            />
            <div>
              {perceiveMetrics.length === 0 ? (
                <MetricEmptyState />
              ) : (
                <MetricGrid count={perceiveMetrics.length}>
                  {perceiveMetrics.map((m, i) => (
                    <div key={`${m.label}-${i}`} className="min-w-0">
                      <MetricTile label={m.label} value={m.value} rating={m.rating} index={i} />
                    </div>
                  ))}
                </MetricGrid>
              )}
            </div>
            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <SoftLabel>They say · We see</SoftLabel>
              {perceive.compare.length === 0 ? (
                <div className={auditEmpty}>No comparison rows were returned.</div>
              ) : (
                <div
                  className={`grid grid-cols-1 gap-5 lg:gap-6 ${
                    perceive.compare.length === 1 ? 'mx-auto max-w-3xl' : 'lg:grid-cols-2'
                  }`}
                >
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
          <AuditScrollReveal className="flex flex-col gap-12 md:gap-16">
            <SectionHeader
              eyebrow="05 · What people say about you"
              preamble="Google star ratings drive the sentiment split. Recent themes come from the latest review text we could read, not every review on the listing."
              headline={say.headline}
            />
            <div>
              {sayMetrics.length === 0 ? (
                <MetricEmptyState />
              ) : (
                <MetricGrid count={sayMetrics.length}>
                  {sayMetrics.map((m, i) => (
                    <div key={`${m.label}-${i}`} className="min-w-0">
                      <MetricTile label={m.label} value={m.value} rating={m.rating} index={i} />
                    </div>
                  ))}
                </MetricGrid>
              )}
            </div>
            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <SentimentBar
                sentiment={say.sentiment}
                reviewCount={
                  say.review_sources.find((s) => /google/i.test(s.platform))?.count || undefined
                }
              />
            </div>
            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <BlockTitle
                title="Review sources"
                description="Public platforms with a clear rating or count. Google rating and volume are the main numbers. Recent theme is from the latest review text we read."
                Icon={MessagesSquare}
              />
              <ReviewSourceList review_sources={say.review_sources} />
            </div>
            <SectionContext text={say.context} />
          </AuditScrollReveal>
        </section>

        <AuditScrollReveal>
          <AppendixSection appendix={appendix} />
        </AuditScrollReveal>

        <AuditScrollReveal>
          <CTABlock findingLabel={findingLabel} offer={offer} />
        </AuditScrollReveal>

        <AuditScrollReveal>
          <FooterBlock transparency_note={appendix.transparency_note} />
        </AuditScrollReveal>
      </main>
    </div>
  );
}
