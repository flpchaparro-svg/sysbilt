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
  /** mode="card": `tr` popover opens left (default). `bl` bottom-left trigger, popover opens right. */
  cardAnchor?: 'tr' | 'bl';
  /**
   * mode="card": collapsed trigger only. `minimal` = icon-only, no bordered tile (footer / news drawer).
   * Expanded actions and popover surface stay the same.
   */
  cardCollapsedStyle?: 'default' | 'minimal';
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
  cardAnchor = 'tr',
  cardCollapsedStyle = 'default',
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

  /** Blog post meta row: one clear share control, expands to same actions as inline dark row */
  const darkCardCollapsed =
    'w-11 h-11 rounded-md border border-white/25 bg-white/[0.08] text-white/70 flex items-center justify-center hover:bg-white/12 hover:text-white hover:border-white/40 transition-colors duration-200';
  const darkCardPopover =
    'flex items-center gap-1.5 p-1.5 rounded-lg border border-white/20 bg-dark/95 backdrop-blur-md shadow-xl';
  /** Footer: same behaviour as boxed card, no visible frame on the trigger */
  const darkCardCollapsedMinimal =
    'inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35';

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
  const brutalCardCollapsedMinimal =
    'inline-flex min-h-9 min-w-9 items-center justify-center text-dark/70 transition-colors hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark/30';
  const brutalCardPopover =
    'flex items-center gap-1 p-1 bg-cream border-2 border-dark shadow-[4px_4px_0px_0px_#1a1a1a]';
  const brutalCardPopoverBtn =
    'w-8 h-8 flex items-center justify-center bg-transparent text-dark hover:bg-dark hover:text-cream transition-colors';

  /** Guides hub cards: matches pillar badge (shadow-neu-inner, gold-tint border, cream) */
  const neuCardCollapsed =
    'w-9 h-9 rounded-md bg-cream shadow-neu-inner border border-gold-on-cream/25 text-[#1a1a1a]/55 hover:text-[#9A1730] hover:bg-[#FFF8F5] hover:border-gold-on-cream/35 hover:shadow-neu transition-all duration-300 flex items-center justify-center';
  const neuCardPopover =
    'flex items-center gap-1 p-1.5 rounded-xl bg-[#FFF8F5] shadow-neu border border-white/50';
  const neuCardPopoverBtn =
    'w-8 h-8 rounded-md bg-cream shadow-neu-inner border border-white/60 text-[#1a1a1a]/50 hover:text-[#9A1730] hover:bg-[#FFF8F5] hover:shadow-neu hover:border-white/80 transition-all duration-300 flex items-center justify-center';

  /** Guide document modal + soft UI: inset paper */
  const neuInlineBtn =
    'w-10 h-10 rounded-xl bg-[#FFF8F5] shadow-neu-inner border border-white/70 text-[#1a1a1a]/50 hover:text-[#9A1730] hover:bg-[#FFF2EC] hover:shadow-neu hover:border-white/90 active:shadow-neu-inner transition-all duration-300 flex items-center justify-center';

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
      if (ctx === 'card-pop') {
        const base = neuCardPopoverBtn;
        if (kind === 'copy' && isCopied) return `${base} !text-green-600`;
        return base;
      }
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
    const isBl = cardAnchor === 'bl';
    const isDark = variant === 'dark';
    const isNeu = variant === 'neumorphic';
    const useMinimalCollapsed = cardCollapsedStyle === 'minimal';
    const cardCollapsed = isDark
      ? useMinimalCollapsed
        ? [darkCardCollapsedMinimal, themeClass?.textMain, themeClass?.textHover].filter(Boolean).join(' ')
        : darkCardCollapsed
      : isNeu
        ? neuCardCollapsed
        : useMinimalCollapsed
          ? brutalCardCollapsedMinimal
          : brutalCardCollapsed;
    const cardPopoverSurface = isDark ? darkCardPopover : isNeu ? neuCardPopover : brutalCardPopover;
    const popCtx: 'dock-inner' | 'inline' | 'card-pop' | 'dark' = isDark ? 'dark' : 'card-pop';
    const cardRoot = isBl
      ? 'relative inline-flex items-end justify-start gap-1'
      : 'relative inline-flex items-start justify-end gap-1';
    /** `bl`: open upward so parent `overflow-hidden` on images does not clip a sideways strip */
    const popoverPos = isBl
      ? ['absolute bottom-full left-0 mb-2', cardPopoverSurface].join(' ')
      : ['absolute right-full top-0 mr-2', cardPopoverSurface].join(' ');
    const shareIconClass =
      useMinimalCollapsed && isDark ? 'w-4 h-4 shrink-0' : isDark ? 'w-5 h-5 shrink-0' : 'w-4 h-4 shrink-0';
    return (
      <div
        ref={containerRef}
        className={[cardRoot, className].filter(Boolean).join(' ')}
      >
        {expanded && (
          <div className={popoverPos} onMouseDown={stop}>
            <div className="flex items-center gap-1">{platformNodes(popCtx)}</div>
          </div>
        )}
        <button
          type="button"
          className={cardCollapsed}
          aria-label={expanded ? 'Close share options' : 'Open share options'}
          onClick={(e) => {
            stop(e);
            setExpanded((v) => !v);
          }}
        >
          <Share2 className={`${shareIconClass} transition-transform ${expanded ? 'rotate-90' : ''}`} aria-hidden />
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
