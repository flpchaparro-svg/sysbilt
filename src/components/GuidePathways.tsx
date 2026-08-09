import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GuidePathwaysProps {
  legacyPath: string;
  bookPath: string;
  bookTitle: string;
}

const GuidePathways: React.FC<GuidePathwaysProps> = ({ legacyPath, bookPath, bookTitle }) => (
  <div className="flex flex-col items-center justify-center gap-5">
    <Link
      to={legacyPath}
      className="inline-block rounded-full border border-dark/20 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-dark/40"
    >
      [ READ THE GUIDE ]
    </Link>
    <Link
      to={bookPath}
      className="group inline-flex items-center gap-2 font-sans text-sm text-dark/55 transition-colors hover:text-dark"
    >
      Go deeper with {bookTitle}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  </div>
);

export default GuidePathways;
