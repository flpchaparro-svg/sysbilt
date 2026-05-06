import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProposalRenderer from '../../components/proposal/ProposalRenderer';

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

function formatAUD(amount: number | null): string {
  if (amount === null) return '';
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(amount);
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ProposalPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<ProposalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Hide every proposal page from search engines and AI crawlers
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
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
          <p className="text-stone-900 font-mono uppercase tracking-widest font-bold">Loading proposal</p>
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        {robotsMeta}
        <div className="min-h-screen bg-[#FDFBF7] p-8 flex items-center justify-center">
          <div className="max-w-2xl w-full border-4 border-red-600 p-8 bg-white">
            <h1 className="text-red-600 font-black text-2xl uppercase mb-4 tracking-wider">Proposal unavailable</h1>
            <p className="text-stone-900 font-medium">{error ?? 'No data returned'}</p>
            <p className="text-stone-600 mt-4 text-sm">If you believe this link should work, contact us at hello@sysbilt.com.</p>
          </div>
        </div>
      </>
    );
  }

  const props = data.proposal.properties;

  return (
    <>
      {robotsMeta}
      <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-red-600 selection:text-white">
        <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">

          {/* Cover */}
          <header className="mb-24 border-b-8 border-stone-900 pb-12">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-red-600 mb-4">SYSBILT Proposal</p>
            <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter mb-6 uppercase leading-none">
              {props.clientBusinessName || data.company?.name || data.deal.dealname}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-sm">
              {props.pillars.length > 0 && (
                <div>
                  <p className="font-mono uppercase tracking-widest text-stone-500 mb-2">Scope</p>
                  <p className="font-bold text-stone-900">{props.pillars.join(', ')}</p>
                </div>
              )}
              {props.totalFeeAUD !== null && (
                <div>
                  <p className="font-mono uppercase tracking-widest text-stone-500 mb-2">Investment</p>
                  <p className="font-bold text-stone-900">{formatAUD(props.totalFeeAUD)}</p>
                </div>
              )}
              {props.validUntil && (
                <div>
                  <p className="font-mono uppercase tracking-widest text-stone-500 mb-2">Valid until</p>
                  <p className="font-bold text-stone-900">{formatDate(props.validUntil)}</p>
                </div>
              )}
            </div>
          </header>

          {/* Body */}
          <ProposalRenderer blocks={data.proposal.blocks} />

          {/* Footer */}
          <footer className="mt-32 pt-8 border-t-2 border-stone-300 text-sm text-stone-600">
            <p>SYSBILT  |  ABN 56 115 228 020  |  Sydney, Australia</p>
            <p className="mt-1">hello@sysbilt.com  |  sysbilt.com</p>
          </footer>

        </main>
      </div>
    </>
  );
}
