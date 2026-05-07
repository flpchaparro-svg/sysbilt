import React, { useState } from 'react';

export interface AgreementSignBlockProps {
  token: string;
  signedBySYSBILTDate: string | null;
  onSigned: (data: { signedDate: string; signedByName: string; signedByPosition: string }) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function AgreementSignBlock({ token, signedBySYSBILTDate, onSigned }: AgreementSignBlockProps) {
  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    accepted && name.trim().length >= 2 && position.trim().length >= 2 && !submitting;

  const providerDateLabel = signedBySYSBILTDate ? formatDate(signedBySYSBILTDate) : '-';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/agreement/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          name: name.trim(),
          position: position.trim(),
          accepted: true,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof json.error === 'string' ? json.error : 'Something went wrong');
        return;
      }
      onSigned({
        signedDate: json.signedDate as string,
        signedByName: json.signedByName as string,
        signedByPosition: json.signedByPosition as string,
      });
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="clause-sign" className="mb-20 mt-24">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ Signatures</p>
      <h2 className="mb-12 font-serif text-3xl font-black uppercase tracking-tight text-dark md:text-4xl">
        Signatures
      </h2>

      <div className="mb-8 border-2 border-dark bg-cream-warm p-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-text">
          / Signed by the provider
        </p>
        <p className="font-serif text-2xl italic text-dark">Felipe Chaparro</p>
        <div className="mt-4 space-y-1 font-sans text-sm text-dark/70">
          <p>Position: Sole Trader, SYSBILT</p>
          <p>ABN: 56 115 228 020</p>
          <p>Date: {providerDateLabel}</p>
        </div>
        <p className="mt-6 font-mono text-xs text-gold-on-cream">
          Signed electronically via sysbilt.com
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="proposal-accept border-2 border-dark bg-cream-warm p-8 print:hidden"
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-text">/ Sign as client</p>
        <label className="flex cursor-pointer items-start gap-4">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 border-2 border-dark bg-cream-light text-red-text accent-red-text"
          />
          <span className="font-serif text-lg text-dark">
            I have read and agree to this Master Service Agreement, including Schedule A.
          </span>
        </label>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-red-text">
              / Full name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full border-2 border-dark bg-cream-light px-4 py-3 font-sans text-base text-dark transition-colors focus:bg-white focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-red-text">
              / Position
            </span>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              autoComplete="organization-title"
              className="w-full border-2 border-dark bg-cream-light px-4 py-3 font-sans text-base text-dark transition-colors focus:bg-white focus:outline-none"
            />
          </label>
        </div>

        {error && <p className="mt-6 text-sm text-red-text">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-10 border-2 border-dark bg-dark px-10 py-5 font-mono text-sm uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:border-red-text hover:bg-red-text disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-dark disabled:hover:bg-dark"
        >
          Sign agreement <span aria-hidden>›</span>
        </button>
      </form>
    </section>
  );
}
