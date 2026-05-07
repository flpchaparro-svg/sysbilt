import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgreementCover from '../../components/agreement/AgreementCover';
import ClauseRail from '../../components/agreement/ClauseRail';
import AgreementRenderer from '../../components/agreement/AgreementRenderer';
import AgreementSignBlock from '../../components/agreement/AgreementSignBlock';
import AgreementConfirmation from '../../components/agreement/AgreementConfirmation';
import '../../styles/proposal-print.css';

export default function AgreementPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState<{
    signedDate: string;
    signedByName: string;
    signedByPosition: string;
  } | null>(null);
  const [activeClause, setActiveClause] = useState<string>('clause-1');

  useEffect(() => {
    if (!token) {
      setError('No token');
      setLoading(false);
      return;
    }
    fetch(`/api/agreement/get?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error || `Server returned ${res.status}`);
        return json;
      })
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (!data) return;
    const sections = document.querySelectorAll('[id^="clause-"]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveClause(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [data]);

  const handleJump = (clauseId: string) => {
    const el = document.getElementById(clauseId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const robotsMeta = (
    <Helmet>
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="googlebot" content="noindex, nofollow" />
      <title>Agreement - SYSBILT</title>
    </Helmet>
  );

  if (loading) {
    return (
      <>
        {robotsMeta}
        <div className="flex min-h-screen items-center justify-center bg-cream-light">
          <p className="font-mono font-bold uppercase tracking-widest text-dark">Loading agreement</p>
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        {robotsMeta}
        <div className="flex min-h-screen items-center justify-center bg-cream-light p-8">
          <div className="w-full max-w-2xl border-4 border-red-text bg-white p-8">
            <h1 className="mb-4 text-2xl font-black uppercase tracking-wider text-red-text">
              / Agreement unavailable
            </h1>
            <p className="font-medium text-dark">{error ?? 'No data returned'}</p>
            <p className="mt-4 text-sm text-dark/60">
              If you believe this link should work, contact us at hello@sysbilt.com.
            </p>
          </div>
        </div>
      </>
    );
  }

  if (signed) {
    return (
      <>
        {robotsMeta}
        <AgreementConfirmation
          signedByName={signed.signedByName}
          signedDate={signed.signedDate}
          signedByPosition={signed.signedByPosition}
          agreement={data.agreement}
        />
      </>
    );
  }

  const props = data.agreement.properties;

  return (
    <>
      {robotsMeta}
      <div className="min-h-screen bg-cream-light font-sans text-dark selection:bg-red-text selection:text-cream">
        <ClauseRail activeClause={activeClause} onJump={handleJump} />
        <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
          <AgreementCover
            clientBusinessName={props.clientBusinessName}
            clientABN={props.clientABN}
            clientAddress={props.clientAddress}
            clientPrimaryContact={props.clientPrimaryContact}
            clientContactEmail={props.clientContactEmail}
            totalFeeAUD={props.totalFeeAUD}
            signedBySYSBILTDate={props.signedBySYSBILTDate}
            linkedProposal={props.linkedProposal}
          />
          <AgreementRenderer blocks={data.agreement.blocks} />
          <AgreementSignBlock
            token={token!}
            signedBySYSBILTDate={props.signedBySYSBILTDate}
            onSigned={(d) => setSigned(d)}
          />
          <footer className="mt-32 border-t border-dark/20 pt-8 font-mono text-sm text-dark/60 print:mt-16">
            <p>SYSBILT | ABN 56 115 228 020 | Sydney, Australia</p>
            <p className="mt-1">hello@sysbilt.com | sysbilt.com</p>
          </footer>
        </main>
      </div>
    </>
  );
}
