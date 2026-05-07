import React from 'react';

export type ProposalRailChapter = 'context' | 'scope' | 'investment' | 'sign';

const CHAPTERS: { id: ProposalRailChapter; label: string }[] = [
  { id: 'context', label: 'CONTEXT' },
  { id: 'scope', label: 'SCOPE' },
  { id: 'investment', label: 'INVESTMENT' },
  { id: 'sign', label: 'SIGN' },
];

export interface ProgressRailProps {
  activeChapter: ProposalRailChapter;
  onJump: (chapter: string) => void;
}

export default function ProgressRail({ activeChapter, onJump }: ProgressRailProps) {
  return (
    <nav
      className="proposal-rail fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-6 md:flex print:hidden"
      aria-label="Proposal sections"
    >
      {CHAPTERS.map((ch) => {
        const isActive = activeChapter === ch.id;
        return (
          <button
            key={ch.id}
            type="button"
            onClick={() => onJump(ch.id)}
            className={`flex items-center gap-2 text-left font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
              isActive ? 'text-red-text' : 'text-dark/40 hover:text-dark/70'
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 ${isActive ? 'bg-red-text' : 'border border-dark/30 bg-transparent'}`}
              aria-hidden
            />
            {ch.label}
          </button>
        );
      })}
    </nav>
  );
}
