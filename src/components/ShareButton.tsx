import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Share2, Linkedin, Mail, Link2, Check } from 'lucide-react';

export type Mode = 'dock' | 'inline' | 'card';
export type Variant = 'dark' | 'brutalist' | 'neumorphic';

export interface ShareButtonProps {
  url: string;
  title: string;
  mode: Mode;
  variant?: Variant;
  themeClass?: { textMain?: string; textHover?: string };
  className?: string;
}

function buildUrls(url: string, title: string) {
  return {
    linkedIn:
      'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url),
    x:
      'https://twitter.com/intent/tweet?url=' +
      encodeURIComponent(url) +
      '&text=' +
      encodeURIComponent(title),
    mail:
      'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url),
  };
}

function stop(e: React.MouseEvent) {
  e.stopPropagation();
}

function XBrandIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2H21l-6.79 7.757L22 22h-6.117l-4.79-6.26L5.618 22H2.86l7.264-8.302L2 2h6.273l4.33 5.71L18.244 2Zm-.968 18h1.527L7.445 3.895H5.806L17.276 20Z"
      />
    </svg>
  );
}

export default function ShareButton({
  url,
  title,
  mode,
  variant = 'brutalist',
  themeClass,
  className = '',
}: ShareButtonProps) {
  const [expanded, setExpanded] = useState(mode === 'inline');
  const [isCopied, setIsCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { linkedIn, x, mail } = buildUrls(url, title);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (mode === 'inline') return;
    if (!expanded) return;
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [expanded, mode]);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      stop(e);
      void (async () => {
        try {
          await navigator.clipboard.writeText(url);
          setIsCopied(true);
          if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
          copyTimerRef.current = setTimeout(() => setIsCopied(false), 2000);
        } catch {
          /* ignore */
        }
      })();
    },
    [url]
  );

  const toggleDock = (e: React.MouseEvent) => {
    stop(e);
    setExpanded((v) => !v);
  };

  const iconSize = 'w-4 h-4 shrink-0';

  const darkBtn =
    'inline-flex items-center justify-center w-9 h-9 text-white/50 transition-colors duration-200 hover:text-white';
  const darkBtnThemed = [darkBtn, themeClass?.textHover].filter(Boolean).join(' ');

  const brutalInlineBtn =
    'w-9 h-9 flex items-center justify-center border-2 border-dark bg-transparent text-dark hover:bg-dark hover:text-cream transition-colors';

  const brutalDockCollapsed =
    'w-11 h-11 bg-cream border-2 border-dark text-dark flex items-center justify-center hover:bg-dark hover:text-cream transition-colors shadow-[4px_4px_0px_0px_#1a1a1a]';
  const brutalDockExpandedWrap =
    'flex flex-col gap-2 p-2 bg-cream border-2 border-dark shadow-[6px_6px_0px_0px_#1a1a1a]';
  const brutalDockInnerBtn =
    'w-10 h-10 flex items-center justify-center bg-transparent border-2 border-dark text-dark hover:bg-dark hover:text-cream transition-colors';

  const brutalCardCollapsed =
    'w-9 h-9 bg-cream/90 backdrop-blur-sm border border-dark/20 text-dark flex items-center justify-center hover:bg-dark hover:text-cream transition-colors';
  const brutalCardPopover =
    'flex items-center gap-1 p-1 bg-cream border-2 border-dark shadow-[4px_4px_0px_0px_#1a1a1a]';
  const brutalCardPopoverBtn =
    'w-8 h-8 flex items-center justify-center bg-transparent text-dark hover:bg-dark hover:text-cream transition-colors';

  const neuInlineBtn =
    'w-10 h-10 rounded-full bg-[#FFF2EC] shadow-neu-sm border border-black/5 text-[#1a1a1a]/60 hover:text-[#9A1730] hover:bg-white transition-colors flex items-center justify-center';

  function btnClassFor(
    kind: 'linkedin' | 'x' | 'mail' | 'copy',
    ctx: 'dock-inner' | 'inline' | 'card-pop' | 'dark'
  ): string {
    if (variant === 'dark' || ctx === 'dark') {
      const base = themeClass?.textMain ? `${darkBtn} ${themeClass.textMain}` : darkBtnThemed;
      if (kind === 'copy' && isCopied) return `${base} !text-green-500 hover:!text-green-500`;
      return base;
    }
    if (variant === 'neumorphic') {
      const base = neuInlineBtn;
      if (kind === 'copy' && isCopied) return `${base} !text-green-500`;
      return base;
    }
    const brutalBase =
      ctx === 'dock-inner'
        ? brutalDockInnerBtn
        : ctx === 'card-pop'
          ? brutalCardPopoverBtn
          : brutalInlineBtn;
    if (kind === 'copy' && isCopied) return `${brutalBase} text-green-500 border-dark`;
    return brutalBase;
  }

  const copyLabel = isCopied ? 'Link copied to clipboard' : 'Copy link';

  const platformNodes = (ctx: 'dock-inner' | 'inline' | 'card-pop' | 'dark') => (
    <>
      <a
        href={linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClassFor('linkedin', ctx)}
        aria-label="Share on LinkedIn"
        onClick={stop}
      >
        <Linkedin className={iconSize} aria-hidden />
        <span className="sr-only">Share on LinkedIn</span>
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClassFor('x', ctx)}
        aria-label="Share on X"
        onClick={stop}
      >
        <XBrandIcon className={iconSize} />
        <span className="sr-only">Share on X</span>
      </a>
      <a
        href={mail}
        className={btnClassFor('mail', ctx)}
        aria-label="Share by email"
        onClick={stop}
      >
        <Mail className={iconSize} aria-hidden />
        <span className="sr-only">Share by email</span>
      </a>
      <button
        type="button"
        className={btnClassFor('copy', ctx)}
        aria-label={copyLabel}
        onClick={handleCopy}
      >
        {isCopied ? (
          <Check className={`${iconSize} text-green-500`} aria-hidden />
        ) : (
          <Link2 className={iconSize} aria-hidden />
        )}
        <span className="sr-only">{copyLabel}</span>
      </button>
    </>
  );

  const platformCol = (ctx: 'dock-inner') => (
    <div className="flex flex-col gap-2">{platformNodes(ctx)}</div>
  );

  if (mode === 'inline') {
    const row = 'flex items-center gap-3';
    const ctx = variant === 'dark' ? 'dark' : 'inline';
    return (
      <div ref={containerRef} className={[row, className].filter(Boolean).join(' ')}>
        {platformNodes(ctx)}
      </div>
    );
  }

  if (mode === 'card') {
    return (
      <div
        ref={containerRef}
        className={['relative flex items-start justify-end gap-1', className].filter(Boolean).join(' ')}
      >
        {expanded && (
          <div
            className={['absolute right-full top-0 mr-2', brutalCardPopover].join(' ')}
            onMouseDown={stop}
          >
            <div className="flex items-center gap-1">{platformNodes('card-pop')}</div>
          </div>
        )}
        <button
          type="button"
          className={brutalCardCollapsed}
          aria-label={expanded ? 'Close share options' : 'Open share options'}
          onClick={(e) => {
            stop(e);
            setExpanded((v) => !v);
          }}
        >
          <Share2 className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} aria-hidden />
          <span className="sr-only">{expanded ? 'Close share options' : 'Open share options'}</span>
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={['flex flex-col items-start gap-2', className].filter(Boolean).join(' ')}>
      {!expanded ? (
        <button
          type="button"
          className={brutalDockCollapsed}
          aria-label="Open share options"
          onClick={toggleDock}
        >
          <Share2 className="w-5 h-5" aria-hidden />
          <span className="sr-only">Open share options</span>
        </button>
      ) : (
        <div className={brutalDockExpandedWrap} onMouseDown={stop}>
          <button
            type="button"
            className={brutalDockInnerBtn}
            aria-label="Close share options"
            onClick={toggleDock}
          >
            <Share2 className="w-5 h-5 rotate-90 transition-transform" aria-hidden />
            <span className="sr-only">Close share options</span>
          </button>
          {platformCol('dock-inner')}
        </div>
      )}
    </div>
  );
}
