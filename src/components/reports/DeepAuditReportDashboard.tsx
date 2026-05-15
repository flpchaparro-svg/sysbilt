import { useEffect, useMemo, useState } from 'react';
import { Check, Loader2, ShieldAlert } from 'lucide-react';

export interface DeepAuditTechnicalAppendix {
  abn_status: string;
  entity_type: string;
  observed_software_stack: string[];
  immediate_action_items: string[];
}

export interface DeepAuditReportPayload {
  contact_email: string;
  company_name: string;
  audit_data: {
    executive_summary: string;
    revenue_and_structure: string;
    digital_maturity: string;
    technical_appendix: DeepAuditTechnicalAppendix;
  };
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

function normalizePayload(raw: unknown): DeepAuditReportPayload | null {
  if (raw == null || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>;
  const contact = typeof o.contact_email === 'string' ? o.contact_email.trim() : '';
  const company = typeof o.company_name === 'string' ? o.company_name.trim() : '';
  const audit = o.audit_data;
  if (!contact || !company || audit == null || typeof audit !== 'object' || Array.isArray(audit)) return null;
  const a = audit as Record<string, unknown>;
  const exec = typeof a.executive_summary === 'string' ? a.executive_summary : '';
  const rev = typeof a.revenue_and_structure === 'string' ? a.revenue_and_structure : '';
  const dig = typeof a.digital_maturity === 'string' ? a.digital_maturity : '';
  const appendixRaw = a.technical_appendix;
  if (appendixRaw == null || typeof appendixRaw !== 'object' || Array.isArray(appendixRaw)) return null;
  const t = appendixRaw as Record<string, unknown>;
  const abn = typeof t.abn_status === 'string' ? t.abn_status : '';
  const entity = typeof t.entity_type === 'string' ? t.entity_type : '';
  const stack = isStringArray(t.observed_software_stack) ? t.observed_software_stack : [];
  const actions = isStringArray(t.immediate_action_items) ? t.immediate_action_items : [];

  return {
    contact_email: contact,
    company_name: company,
    audit_data: {
      executive_summary: exec,
      revenue_and_structure: rev,
      digital_maturity: dig,
      technical_appendix: {
        abn_status: abn,
        entity_type: entity,
        observed_software_stack: stack,
        immediate_action_items: actions,
      },
    },
  };
}

function ProseBlocks({ text, className = '' }: { text: string; className?: string }) {
  const blocks = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return [];
    return trimmed.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  }, [text]);

  return (
    <div className={`space-y-4 text-sm leading-relaxed text-zinc-300 md:text-[15px] md:leading-[1.7] ${className}`}>
      {blocks.map((para, i) => (
        <p key={i} className="text-pretty">
          {para}
        </p>
      ))}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-zinc-100">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-2xl" aria-hidden />
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            <Loader2 className="h-9 w-9 animate-spin text-gold-on-dark" strokeWidth={1.25} aria-hidden />
            <div>
              <p className="font-serif text-xl tracking-tight text-white md:text-2xl">Preparing your audit</p>
              <p className="mt-2 text-sm text-zinc-500">Decrypting and assembling the report. One moment.</p>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">Sysbilt · Deep Audit</p>
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
          <p className="mt-8 text-xs uppercase tracking-[0.26em] text-zinc-600">Confidential · Client audit</p>
        </div>
      </div>
    </div>
  );
}

export interface DeepAuditReportDashboardProps {
  token: string;
}

export default function DeepAuditReportDashboard({ token }: DeepAuditReportDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<DeepAuditReportPayload | null>(null);

  useEffect(() => {
    if (!token.trim()) {
      setError(true);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);
    setData(null);

    fetch(`/api/reports/get?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const json: unknown = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error('bad');
        const normalized = normalizePayload(json);
        if (!normalized) throw new Error('bad');
        return normalized;
      })
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <InvalidReportScreen />;

  const { audit_data: audit, company_name, contact_email } = data;
  const appendix = audit.technical_appendix;

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-zinc-100 selection:bg-gold/25 selection:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(197,160,89,0.12),transparent)]" aria-hidden />

      <header className="relative border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8 md:py-12">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-on-dark/90">Sysbilt Deep Audit</p>
            <h1 className="mt-3 max-w-3xl font-serif text-3xl font-normal tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {company_name}
            </h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Prepared for</p>
            <p className="mt-1 text-sm text-zinc-300 md:text-base">{contact_email}</p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-8 md:pb-28 md:pt-12">
        <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {/* Executive summary — wide bento tile */}
          <section className="md:col-span-12 lg:col-span-8 rounded-2xl border border-white/[0.07] bg-zinc-950/40 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] md:p-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-on-dark/80" aria-hidden />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Executive summary</h2>
            </div>
            <div className="mt-6">
              <ProseBlocks text={audit.executive_summary} />
            </div>
          </section>

          {/* Sidebar stack — metadata + appendix teaser on large screens */}
          <section className="md:col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-5">
            <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 p-6 md:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Registry snapshot</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-zinc-500">ABN status</dt>
                  <dd className="mt-1 text-zinc-200">{appendix.abn_status || '—'}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-zinc-500">Entity type</dt>
                  <dd className="mt-1 text-zinc-200">{appendix.entity_type || '—'}</dd>
                </div>
              </dl>
            </div>

            <div className="flex-1 rounded-2xl border border-white/[0.07] bg-zinc-950/50 p-6 md:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Observed stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {appendix.observed_software_stack.length === 0 ? (
                  <li className="text-sm text-zinc-500">No public signals captured.</li>
                ) : (
                  appendix.observed_software_stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-zinc-200"
                    >
                      {item}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </section>

          <section className="md:col-span-6 rounded-2xl border border-white/[0.07] bg-zinc-950/40 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-on-dark/80" aria-hidden />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Revenue &amp; structure</h2>
            </div>
            <div className="mt-6">
              <ProseBlocks text={audit.revenue_and_structure} />
            </div>
          </section>

          <section className="md:col-span-6 rounded-2xl border border-white/[0.07] bg-zinc-950/40 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-on-dark/80" aria-hidden />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Digital maturity</h2>
            </div>
            <div className="mt-6">
              <ProseBlocks text={audit.digital_maturity} />
            </div>
          </section>

          {/* Action items — full width premium checklist */}
          <section className="md:col-span-12 overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-zinc-900/60 via-[#0a0a0a] to-zinc-950/90 p-6 md:p-10">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-serif text-2xl text-white md:text-[1.65rem]">Immediate action items</h2>
                <p className="mt-1 text-sm text-zinc-500">Prioritised moves from the technical pass.</p>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-on-dark/90">Priority lane</span>
            </div>
            <ol className="mt-8 space-y-0 divide-y divide-white/[0.06]">
              {appendix.immediate_action_items.length === 0 ? (
                <li className="py-6 text-sm text-zinc-500">No discrete action items were recorded for this pass.</li>
              ) : (
                appendix.immediate_action_items.map((item, index) => (
                  <li key={`${index}-${item.slice(0, 24)}`} className="group flex gap-4 py-5 first:pt-0 md:gap-5 md:py-6">
                    <div className="flex shrink-0 flex-col items-center pt-0.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] font-mono text-xs text-gold-on-dark md:h-10 md:w-10">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="mt-2 hidden h-full w-px grow bg-gradient-to-b from-gold-on-dark/40 to-transparent md:block" aria-hidden />
                    </div>
                    <div className="flex min-w-0 flex-1 items-start gap-3 pt-1">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold-on-dark">
                        <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                      </span>
                      <p className="text-sm leading-relaxed text-zinc-200 md:text-[15px] md:leading-[1.65]">{item}</p>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </section>
        </div>

        <footer className="mt-16 border-t border-white/[0.06] pt-8 text-center text-[11px] uppercase tracking-[0.24em] text-zinc-600">
          Confidential · Sysbilt Deep Audit · Do not distribute
        </footer>
      </main>
    </div>
  );
}
