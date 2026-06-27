import { Loader2, Pause } from 'lucide-react';

type SpeakerWaveIconProps = {
  state: 'idle' | 'playing' | 'loading';
  size?: number;
};

export function SpeakerWaveIcon({ state, size = 14 }: SpeakerWaveIconProps) {
  if (state === 'loading') {
    return <Loader2 size={size} className="animate-spin" aria-hidden />;
  }

  if (state === 'playing') {
    return <Pause size={size} fill="currentColor" aria-hidden />;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="speaker-wave-icon"
    >
      <path
        d="M11 5L6 9H3v6h3l5 4V5z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <path
        className="speaker-wave-arc-1"
        d="M15.5 8.5a4.5 4.5 0 010 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="speaker-wave-arc-2"
        d="M18.5 5.5a8.5 8.5 0 010 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
