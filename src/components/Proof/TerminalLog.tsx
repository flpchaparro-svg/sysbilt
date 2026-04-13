import React, { useState, useEffect } from 'react';

interface Props {
  lines?: string[];
}

export default function TerminalLog({ lines = [] }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  // Fallback lines just in case Sanity data isn't passed properly
  const defaultLines = [
    "> System diagnostic initiated...",
    "> Awaiting data payload..."
  ];

  const displayLines = lines && lines.length > 0 ? lines : defaultLines;

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => (prev < displayLines.length ? prev + 1 : prev));
    }, 400); // Speed of the terminal typing effect
    return () => clearInterval(timer);
  }, [displayLines.length]);

  return (
    <div className="bg-zinc-950 p-6 md:p-8 rounded-sm font-mono text-xs md:text-sm text-green-500 shadow-2xl border border-white/10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-50" />
      <div className="space-y-2">
        {displayLines.map((line, i) => (
          <div key={i} className={`transition-opacity duration-100 ${i < visibleLines ? 'opacity-100' : 'opacity-0'}`}>
            {line}
          </div>
        ))}
        {visibleLines >= displayLines.length && (
          <div className="animate-pulse mt-2">_</div>
        )}
      </div>
    </div>
  );
}
