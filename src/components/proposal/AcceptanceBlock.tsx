import React, { useState } from 'react';

export interface AcceptanceBlockProps {
  token: string;
  onAccepted: (data: { acceptedDate: string; acceptedByName: string }) => void;
}

export default function AcceptanceBlock({ token, onAccepted }: AcceptanceBlockProps) {
  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    accepted && name.trim().length >= 2 && position.trim().length >= 2 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/proposal/accept', {
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
      onAccepted({
        acceptedDate: json.acceptedDate as string,
        acceptedByName: json.acceptedByName as string,
      });
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="chapter-sign-acceptance" className="proposal-accept print:hidden">
      <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text">
        / Acceptance
      </span>
      <h2 className="type-h3 text-dark">Acceptance</h2>
      <p className="type-body mt-6 text-dark/70">
        By accepting below, you agree to the Scope of Services in this proposal under the SYSBILT Master
        Service Agreement, attached separately.
      </p>

      <form onSubmit={handleSubmit} className="mb-12 mt-8 w-full border-2 border-dark bg-cream-warm p-10 md:p-12">
        <label className="flex cursor-pointer items-start gap-4">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 border-2 border-dark bg-cream-light text-red-text accent-red-text"
          />
          <span className="font-serif text-lg text-dark">I accept this proposal.</span>
        </label>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-red-text">
              / FULL NAME
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
              / POSITION OR TITLE
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
          className="mt-10 bg-dark px-10 py-5 font-mono text-sm uppercase tracking-[0.2em] text-cream border-2 border-dark transition-colors duration-200 hover:border-red-text hover:bg-red-text disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-dark disabled:hover:bg-dark"
        >
          Accept proposal <span aria-hidden>›</span>
        </button>
      </form>
    </section>
  );
}
