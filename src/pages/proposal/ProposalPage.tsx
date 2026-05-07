import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CoverPage from '../../components/proposal/CoverPage';
import ProgressRail from '../../components/proposal/ProgressRail';
import type { ProposalRailChapter } from '../../components/proposal/ProgressRail';
import { useProposalRenderer } from '../../components/proposal/ProposalRenderer';
import AcceptanceBlock from '../../components/proposal/AcceptanceBlock';
import ConfirmationScreen from '../../components/proposal/ConfirmationScreen';
import '../../styles/proposal-print.css';

interface ProposalProperties {
  title: string;
  clientBusinessName: string;
  pillars: string[];
  totalFeeAUD: number | null;
  status: string;
  sentDate: string | null;
  validUntil: string | null;
}

interface ProposalData {
  deal: { id: string; dealname: string };
  contact: { firstname: string; lastname: string; email: string } | null;
  company: { name: string } | null;
  proposal: {
    properties: ProposalProperties;
    blocks: any[];
  };
}

export default function ProposalPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<ProposalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState<{ acceptedDate: string; acceptedByName: string } | null>(null);
  const [activeChapter, setActiveChapter] = useState<ProposalRailChapter>('context');

  useEffect(() => {
    if (!token) {
      setError('No token provided in the URL');
      setLoading(false);
      return;
    }

    fetch(`/api/proposal/get?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error || `Server returned ${res.status}`);
        return json;
      })
      .then((json) => setData(json as ProposalData))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const blocks = data?.proposal.blocks ?? [];
  const { rendered, chapters } = useProposalRenderer(blocks);

  useEffect(() => {
    if (chapters.length > 0) {
      setActiveChapter(chapters[0]);
    }
  }, [chapters]);

  useEffect(() => {
    if (!data || accepted) return;

    const map: Record<string, ProposalRailChapter> = {
      'chapter-context': 'context',
      'chapter-scope': 'scope',
      'chapter-investment': 'investment',
      'chapter-sign': 'sign',
      'chapter-sign-acceptance': 'sign',
    };

    let observer: IntersectionObserver | undefined;
    let cancelled = false;

    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      const roots: HTMLElement[] = [];
      for (const id of Object.keys(map)) {
        const el = document.getElementById(id);
        if (el) roots.push(el);
      }
      if (roots.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length === 0) return;
          visible.sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
          const id = visible[0].target.id;
          const ch = map[id];
          if (ch) setActiveChapter(ch);
        },
        { root: null, rootMargin: '-18% 0px -18% 0px', threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] },
      );

      roots.forEach((el) => observer!.observe(el));
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [data, accepted, chapters]);

  const handleJump = useCallback((chapter: string) => {
    const ch = chapter as ProposalRailChapter;
    let el: HTMLElement | null = null;
    if (ch === 'sign') {
      el = document.getElementById('chapter-sign') ?? document.getElementById('chapter-sign-acceptance');
    } else {
      el = document.getElementById(`chapter-${ch}`);
    }
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const robotsMeta = (
    <Helmet>
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="googlebot" content="noindex, nofollow" />
      <title>Proposal — SYSBILT</title>
    </Helmet>
  );

  if (loading) {
    return (
      <>
        {robotsMeta}
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <p className="type-eyebrow text-dark/60">Loading proposal</p>
        </div>
      </>
    );
  }

  if (error || !data || !token) {
    return (
      <>
        {robotsMeta}
        <div className="flex min-h-screen items-center justify-center bg-cream p-8">
          <div className="w-full max-w-2xl border border-dark/10 bg-white p-8 md:p-12">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text">
              / Proposal unavailable
            </span>
            <h1 className="type-h3 text-dark">We could not load this proposal</h1>
            <p className="type-body mt-4 text-dark/70">{error ?? 'No data returned'}</p>
            <p className="mt-4 text-sm text-dark/70">
              If you believe this link should work, contact us at hello@sysbilt.com.
            </p>
          </div>
        </div>
      </>
    );
  }

  const props = data.proposal.properties;
  const clientName = props.clientBusinessName || data.company?.name || data.deal.dealname;

  const coverProps = {
    clientName,
    pillars: props.pillars,
    totalFeeAUD: props.totalFeeAUD,
    validUntil: props.validUntil,
    sentDate: props.sentDate,
  };

  if (accepted) {
    return (
      <>
        {robotsMeta}
        <ConfirmationScreen
          acceptedByName={accepted.acceptedByName}
          acceptedDate={accepted.acceptedDate}
          printProposal={
            <>
              <CoverPage {...coverProps} />
              {rendered}
            </>
          }
        />
      </>
    );
  }

  return (
    <>
      {robotsMeta}
      <div className="min-h-screen bg-cream font-sans text-dark selection:bg-dark selection:text-cream">
        <ProgressRail activeChapter={activeChapter} onJump={handleJump} />
        <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
          <CoverPage {...coverProps} />
          <div>{rendered}</div>
          <AcceptanceBlock token={token} onAccepted={(d) => setAccepted(d)} />
          <footer className="type-body mt-32 border-t border-dark/10 pt-8 text-sm text-dark/60 print:mt-16">
            <p>SYSBILT | ABN 56 115 228 020 | Sydney, Australia</p>
            <p className="mt-1">hello@sysbilt.com | sysbilt.com</p>
          </footer>
        </main>
      </div>
    </>
  );
}
