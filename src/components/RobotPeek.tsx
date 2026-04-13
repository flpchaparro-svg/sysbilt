import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RobotPeek() {
  const { scrollYProgress } = useScroll();

  // The scroll logic: He hides, peeks out at 20% scroll, watches you read, and hides at 80%.
  const xPos = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.7, 0.8, 1],
    ["100%", "100%", "0%", "0%", "100%", "100%"]
  );

  return (
    <motion.div
      style={{ x: xPos }}
      className="fixed top-[18%] lg:top-[5%] right-0 z-[100] pointer-events-none drop-shadow-2xl flex items-center"
    >
      {/* The Live System Watcher SVG */}
      <svg
        width="140"
        height="160"
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-mr-6"
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
          style={{ originX: "50%", originY: "100%" }}
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {/* Pulsing Gold Antenna Bulb */}
        <motion.circle
          cx="70"
          cy="15"
          r="7"
          fill="#D4AF37"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
          style={{ originY: "50%" }}
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
          style={{ originY: "50%" }}
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
