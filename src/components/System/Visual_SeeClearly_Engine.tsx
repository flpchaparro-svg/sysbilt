import React, { useRef, useEffect } from 'react';
import { colors } from '../../constants/theme';

const COLORS = {
  bg: colors.cream,
  ink: colors.dark,
  accent: colors.dark,
  accentDim: 'rgba(26, 26, 26, 0.1)',
  inkDim: 'rgba(26, 26, 26, 0.05)',
  white: colors.white,
  grid: colors.gray200
};

const STATES = [
  { id: 'GRAPH' },
  { id: 'PIE' },
  { id: 'BARS' }
];

const TRANSITION_DURATION = 1500;
const HOLD_DURATION = 3500;

// Virtual resolution for 16:9 logic
const VIRTUAL_WIDTH = 960;
const VIRTUAL_HEIGHT = 540;

// --- Helper Drawing Functions ---

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  w: number, 
  h: number, 
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const drawBrowserFrame = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  // Frame Border
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, w, h);

  // Header Bar
  ctx.fillStyle = COLORS.white;
  ctx.fillRect(2, 2, w - 4, 40);
  ctx.beginPath();
  ctx.moveTo(0, 44);
  ctx.lineTo(w, 44);
  ctx.lineWidth = 2;
  ctx.stroke();

  // Traffic Lights
  ctx.fillStyle = COLORS.ink;
  ctx.beginPath(); ctx.arc(24, 22, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(42, 22, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(60, 22, 4, 0, Math.PI * 2); ctx.fill();

  // URL Bar placeholder
  ctx.fillStyle = colors.gray50;
  ctx.fillRect(90, 12, w - 110, 20);
};

// --- Specific Scene Drawers ---

// 1. GROWTH TREND (Line Graph)
const drawGraph = (ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) => {
  const padding = 120;
  const graphW = w - padding * 2;
  const graphH = h - padding * 2;
  const startX = padding;
  const startY = h - padding;

  // Data Points (Normalized 0-1)
  const data = [0.1, 0.25, 0.2, 0.4, 0.35, 0.6, 0.55, 0.8, 0.75, 0.9];
  const stepX = graphW / (data.length - 1);

  // Background Grid (Subtle)
  ctx.beginPath();
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = startY - (graphH * (i / 4));
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + graphW, y);
  }
  ctx.stroke();

  if (progress <= 0) return;

  // Draw Line
  ctx.beginPath();
  
  // Calculate total path length for drawing logic
  // Simple approximation: we draw segments based on progress
  const totalSegments = data.length - 1;
  const currentSegmentFloat = progress * totalSegments;
  const currentSegmentIndex = Math.floor(currentSegmentFloat);
  const segmentProgress = currentSegmentFloat - currentSegmentIndex;

  let lastX = startX;
  let lastY = startY - data[0] * graphH;
  
  ctx.moveTo(lastX, lastY);

  let endX = lastX;
  let endY = lastY;

  for (let i = 0; i < totalSegments; i++) {
    if (i > currentSegmentIndex) break;

    const nextValue = data[i + 1];
    const nextX = startX + (i + 1) * stepX;
    const nextY = startY - nextValue * graphH;

    if (i === currentSegmentIndex) {
      // Partial draw
      endX = lastX + (nextX - lastX) * segmentProgress;
      endY = lastY + (nextY - lastY) * segmentProgress;
      ctx.lineTo(endX, endY);
    } else {
      // Full draw
      ctx.lineTo(nextX, nextY);
      lastX = nextX;
      lastY = nextY;
      endX = nextX;
      endY = nextY;
    }
  }

  // Stroke
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 4;
  ctx.strokeStyle = COLORS.ink;
  ctx.stroke();

  // Gradient Fill
  ctx.save();
  ctx.lineTo(endX, startY); // drop to bottom
  ctx.lineTo(startX, startY); // go to start
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, startY - graphH, 0, startY);
  grad.addColorStop(0, COLORS.accentDim);
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  // Tooltip Circle
  ctx.beginPath();
  ctx.arc(endX, endY, 6, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.white;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = COLORS.ink;
  ctx.stroke();
};

// 2. REVENUE SPLIT (Pie Chart)
const drawPie = (ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) => {
  if (progress <= 0) return;
  
  const cx = w / 2;
  const cy = h / 2 + 20;
  const radius = 140;

  const slices = [
    { percent: 0.40, color: COLORS.ink, style: 'fill' },
    { percent: 0.35, color: colors.gray400, style: 'fill' },
    { percent: 0.25, color: COLORS.ink, style: 'stroke' }
  ];

  let startAngle = -Math.PI / 2; // Start at top
  const totalSweep = Math.PI * 2 * progress; // Fan out 0 to 360

  slices.forEach((slice) => {
    const sliceAngle = slice.percent * (Math.PI * 2);
    // Determine how much of this slice we can draw based on totalSweep
    // This slice occupies [currentStart, currentStart + sliceAngle] in full circle
    // We map totalSweep to this.
    // Simpler: Just accumulate the full circle and clip drawing? 
    // Or scale angles. Let's scale angles so it "fans out" maintaining proportions.
    
    const drawAngle = sliceAngle * progress;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, startAngle + drawAngle);
    ctx.closePath();

    if (slice.style === 'fill') {
      ctx.fillStyle = slice.color;
      ctx.fill();
      // FIX: Stroke with the same color to prevent anti-aliasing gaps (white lines) between slices
      ctx.lineWidth = 1;
      ctx.strokeStyle = slice.color;
      ctx.stroke();
    } else {
      // FIX: Use background color for fill instead of white to match the theme
      ctx.fillStyle = COLORS.bg;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = slice.color;
      ctx.stroke();
    }

    // Detail: Connecting lines (Only if fully grown or close to it)
    if (progress > 0.8) {
        const midAngle = startAngle + drawAngle / 2;
        const textRadius = radius + 30;
        const tx = cx + Math.cos(midAngle) * textRadius;
        const ty = cy + Math.sin(midAngle) * textRadius;
        
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(midAngle) * radius, cy + Math.sin(midAngle) * radius);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = COLORS.ink;
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = tx > cx ? 'left' : 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round(slice.percent * 100)}%`, tx + (tx > cx ? 5 : -5), ty);
    }

    startAngle += drawAngle;
  });
};

// 3. PERFORMANCE BARS (Bar Chart)
const drawBars = (ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) => {
  const paddingX = 180;
  const paddingY = 140;
  const graphW = w - paddingX * 2;
  const graphH = h - paddingY * 2;
  const startX = paddingX;
  const startY = h - paddingY;

  const data = [0.4, 0.55, 0.3, 0.65, 0.45, 0.9];
  const barWidth = 60;
  const gap = (graphW - (data.length * barWidth)) / (data.length - 1);

  // Grid
  ctx.beginPath();
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = startY - (graphH * (i / 5));
    ctx.moveTo(startX - 20, y);
    ctx.lineTo(startX + graphW + 20, y);
  }
  ctx.stroke();

  if (progress <= 0) return;

  data.forEach((value, i) => {
    const x = startX + i * (barWidth + gap);
    // Animate height
    const targetH = value * graphH;
    const currentH = targetH * progress; 
    const y = startY - currentH;

    const isLast = i === data.length - 1;
    
    ctx.fillStyle = isLast ? COLORS.ink : colors.gray400;
    
    // Draw Bar
    ctx.fillRect(x, y, barWidth, currentH);
  });
};


// --- Main Component ---

const Visual_SeeClearly_Engine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const currentStateIdx = useRef(0);
  const nextStateIdx = useRef(1);
  const startTimeRef = useRef<number>(0);
  const isTransitioningRef = useRef(false);
  const transitionStartTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = (timestamp: number) => {
      if (startTimeRef.current === 0) startTimeRef.current = timestamp;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const scaleX = (rect.width * dpr) / VIRTUAL_WIDTH;
      const scaleY = (rect.height * dpr) / VIRTUAL_HEIGHT;
      ctx.scale(scaleX, scaleY);
      
      const w = VIRTUAL_WIDTH;
      const h = VIRTUAL_HEIGHT;

      const elapsed = timestamp - startTimeRef.current;
      
      if (!isTransitioningRef.current) {
        if (elapsed > HOLD_DURATION) {
          isTransitioningRef.current = true;
          transitionStartTimeRef.current = timestamp;
        }
      }

      let transitionProgress = 0;

      if (isTransitioningRef.current) {
        const tElapsed = timestamp - transitionStartTimeRef.current;
        transitionProgress = Math.min(tElapsed / TRANSITION_DURATION, 1);
        
        if (transitionProgress >= 1) {
          isTransitioningRef.current = false;
          startTimeRef.current = timestamp;
          currentStateIdx.current = nextStateIdx.current;
          nextStateIdx.current = (currentStateIdx.current + 1) % STATES.length;
          transitionProgress = 0;
        }
      }

      // --- DRAWING ---
      
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      // Transition Logic: Circular Reveal
      const maxRadius = Math.sqrt(w * w + h * h) / 1.5;
      const ease = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const radius = isTransitioningRef.current ? ease(transitionProgress) * maxRadius : 0;

      // 1. Draw OLD State (Background)
      const drawCurrent = [drawGraph, drawPie, drawBars][currentStateIdx.current];
      // Pass 1.0 as progress so the background state is fully drawn/static
      drawCurrent(ctx, w, h, 1.0); 

      // 2. Draw NEW State (Inside Circle)
      if (isTransitioningRef.current) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(w/2, h/2, radius, 0, Math.PI * 2);
        ctx.clip();
        
        // Clear background inside circle
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, w, h);

        const drawNext = [drawGraph, drawPie, drawBars][nextStateIdx.current];
        // Pass the transition progress (eased slightly for snap) to animate entrance
        const entranceProgress = Math.pow(transitionProgress, 0.8); 
        drawNext(ctx, w, h, entranceProgress);
        ctx.restore();
        
        // Draw Border of Circle
        ctx.beginPath();
        ctx.arc(w/2, h/2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS.accent;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      drawBrowserFrame(ctx, w, h);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
      style={{ 
        cursor: 'default',
        background: COLORS.bg 
      }}
    />
  );
};

export default Visual_SeeClearly_Engine;