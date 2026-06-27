import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export type RobotPeekProps = {
  /**
   * `page` — blog-style: position fixed, driven by main document scroll.
   * `chat` — `position:fixed` using viewport coords from `chatPanelRect` (never absolute % inside flex).
   */
  attachment?: 'page' | 'chat';
  /** When `attachment="chat"`, true shows the peek; false hides it off to the side. */
  isActive?: boolean;
  /** `getBoundingClientRect()` of the chat shell — required for chat mode so the robot stays glued to the panel. */
  chatPanelRect?: { left: number; top: number; height: number } | null;
  /** Extra classes on the motion wrapper (chat mode defaults are applied first). */
  className?: string;
};

export default function RobotPeek({
  attachment = 'page',
  isActive = false,
  chatPanelRect = null,
  className = '',
}: RobotPeekProps) {
  const { scrollYProgress } = useScroll();

  /* Side nav is 54px — subtle left nudge so both eyes show without spilling into content. */
  const PAGE_PEEK_X = '-28px';
  const ROBOT_W = 136;
  const ROBOT_H = 142;

  const xFromScroll = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.7, 0.8, 1],
    ['100%', '100%', PAGE_PEEK_X, PAGE_PEEK_X, '100%', '100%']
  );

  const isChat = attachment === 'chat';

  /* lg+ only: anchors to the scroll side nav (top 18vh, right 0), sits behind z-[300] menu. */
  const pageWrapperClass =
    'hidden lg:flex fixed top-[18vh] right-0 z-[250] pointer-events-none drop-shadow-2xl items-center justify-end';

  /* Chat: viewport-fixed strip; left edge meets panel; z-[8] < chat card. */
  const chatFixedBase =
    `hidden md:flex fixed z-[8] items-center justify-end pointer-events-none drop-shadow-2xl`;

  if (isChat && !chatPanelRect) {
    return null;
  }

  const chatStyle =
    isChat && chatPanelRect
      ? {
          left: chatPanelRect.left - ROBOT_W,
          top: chatPanelRect.top + chatPanelRect.height * 0.26,
          width: ROBOT_W,
          height: ROBOT_H,
        }
      : undefined;

  return (
    <motion.div
      {...(isChat
        ? {
            initial: false,
            style: chatStyle,
            animate: {
              /* In: visible peek from panel edge; out: tucked behind the panel (not left on the page). */
              x: isActive ? 26 : ROBOT_W + 30,
            },
            transition: { type: 'spring', stiffness: 280, damping: 26 },
          }
        : { style: { x: xFromScroll, transformOrigin: 'right center' } })}
      className={`${isChat ? chatFixedBase : pageWrapperClass} ${className}`.trim()}
    >
      {/* The Live System Watcher SVG */}
      <svg
        width={ROBOT_W}
        height={ROBOT_H}
        viewBox="0 0 140 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Wiggling Antenna */}
        <motion.line
          x1="70"
          y1="40"
          x2="70"
          y2="15"
          stroke="#E4E4E7"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ originX: '50%', originY: '100%' }}
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />

        {/* Pulsing Gold Antenna Bulb */}
        <motion.circle
          cx="70"
          cy="15"
          r="7"
          fill="#D4AF37"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
        {/* Brutalist Head Structure */}
        <rect
          x="25"
          y="40"
          width="100"
          height="90"
          rx="12"
          fill="#09090b"
          stroke="#E4E4E7"
          strokeWidth="4"
        />

        {/* Left Ear/Hinge */}
        <rect
          x="15"
          y="70"
          width="10"
          height="30"
          rx="4"
          fill="#27272a"
          stroke="#E4E4E7"
          strokeWidth="3"
        />
        {/* Blinking Left Eye */}
        <motion.rect
          x="45"
          y="70"
          width="14"
          height="20"
          rx="7"
          fill="#D4AF37"
          style={{ originY: '50%' }}
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            times: [0, 0.9, 0.93, 0.96, 1],
          }}
        />

        {/* Blinking Right Eye */}
        <motion.rect
          x="85"
          y="70"
          width="14"
          height="20"
          rx="7"
          fill="#D4AF37"
          style={{ originY: '50%' }}
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            times: [0, 0.9, 0.93, 0.96, 1],
          }}
        />
        {/* Speaker/Voice Box */}
        <line
          x1="50"
          y1="110"
          x2="94"
          y2="110"
          stroke="#E4E4E7"
          strokeWidth="4"
          strokeDasharray="8 6"
        />
      </svg>
    </motion.div>
  );
}
