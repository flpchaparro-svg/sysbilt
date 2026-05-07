import React from 'react';
import CTAButton from '../CTAButton';

export interface ConfirmationScreenProps {
  acceptedByName: string;
  acceptedDate: string;
  /** Full proposal print layer (cover plus body), hidden on screen, visible when printing */
  printProposal: React.ReactNode;
}

function formatAcceptedDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ConfirmationScreen({
  acceptedByName,
  acceptedDate,
  printProposal,
}: ConfirmationScreenProps) {
  return (
    <div className="min-h-screen bg-cream font-sans text-dark">
      <div className="hidden print:block">{printProposal}</div>

      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16 print:hidden">
        <div className="w-full border border-dark/10 bg-cream-light p-10 md:p-12">
          <p className="font-serif text-5xl leading-none text-red-text md:text-6xl" aria-hidden>
            ✓
          </p>
          <h1 className="type-h2 mt-8 text-dark">Proposal accepted</h1>
          <p className="type-body-lg mt-6 font-light text-dark/70">
            Thank you, {acceptedByName}. We have recorded your acceptance on{' '}
            {formatAcceptedDate(acceptedDate)}.
          </p>

          <div className="mt-10">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text">
              / What happens next
            </span>
            <ol className="type-body mt-4 list-decimal space-y-4 pl-6 text-dark/70 marker:font-semibold marker:text-red-text">
              <li>
                We will send the Master Service Agreement and the first invoice for 50% of the project fee
                within one business day.
              </li>
              <li>Once the Agreement is signed and the first invoice is paid, we schedule project kickoff.</li>
              <li>
                If you have questions in the meantime, reply to the email this link came from or write to
                hello@sysbilt.com.
              </li>
            </ol>
          </div>

          <div className="proposal-actions mt-12 flex w-full min-w-0 flex-col items-start gap-6">
            <div className="flex w-full min-w-0 max-w-full flex-col items-start gap-2">
              <CTAButton
                theme="light"
                type="button"
                className="w-fit max-w-full shrink-0"
                onClick={() => window.print()}
              >
                Save as PDF
              </CTAButton>
              <p className="max-w-full font-mono text-xs uppercase tracking-widest text-dark/40 sm:max-w-md">
                Opens your browser print dialog. Choose &apos;Save as PDF&apos; as the destination.
              </p>
            </div>
            <a
              href="https://sysbilt.com"
              className="group relative inline-flex w-fit max-w-full shrink-0 items-center justify-center gap-[2px] self-start whitespace-nowrap px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:text-gold-on-cream"
            >
              <span className="transition-transform duration-[250ms] group-hover:translate-x-[2px]">[</span>
              <span className="mx-1">RETURN TO SYSBILT</span>
              <span className="transition-transform duration-[250ms] group-hover:-translate-x-[2px]">]</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
