import React, { useRef, useEffect } from 'react';
import { colors } from '../../constants/theme';

const COLORS = {
  bg: colors.cream,
  ink: colors.dark,
  accent: colors.gold,
  accentDim: 'rgba(197, 160, 89, 0.1)',
  inkDim: 'rgba(26, 26, 26, 0.05)',
  white: colors.white,
  grid: colors.gray200
};

const STATES = [
  { id: 'VOICE', title: 'THE VOICE', sub: 'AI Assistants' },
  { id: 'PRESENCE', title: 'THE PRESENCE', sub: 'Content Systems' },
  { id: 'SOUL', title: 'THE SOUL', sub: 'Team Training' }
];

const TRANSITION_DURATION = 1500;
const HOLD_DURATION = 3500;

// Virtual resolution (Same as Get Clients)
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

// --- Specific Scene Drawers (FIXED RELATIVE SIZING) ---

const drawVoice = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  const availableH = h - 44;
  const contentCenterY = 44 + availableH / 2;
  
  // FIX: Scale content relative to virtual width/height so it fits
  const chartW = Math.min(w * 0.6, 420);
  const chartH = Math.min(availableH * 0.6, 200);
  const chartX = (w - chartW) / 2;
  const chartY = contentCenterY - (chartH / 2);
  
  // 1. Background Chart
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 3;
  
  ctx.beginPath();
  ctx.moveTo(chartX, chartY); 
  ctx.lineTo(chartX, chartY + chartH); 
  ctx.lineTo(chartX + chartW, chartY + chartH); 
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(chartX, chartY + chartH);
  ctx.bezierCurveTo(
    chartX + chartW * 0.3, chartY + chartH,
    chartX + chartW * 0.4, chartY + chartH * 0.5,
    chartX + chartW, chartY
  );
  ctx.stroke();
  ctx.restore();

  // 2. Main Chat Widget Card
  const cardW = Math.min(w * 0.5, 340);
  const cardH = Math.min(availableH * 0.6, 220); // Relative height prevents cutting
  const cardX = (w - cardW) / 2;
  const cardY = contentCenterY - (cardH / 2);

  // Shadow & Box
  ctx.fillStyle = COLORS.white;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,0,0,0.1)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 12);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.stroke();

  // Header Area
  const headerH = 44;
  ctx.beginPath();
  ctx.moveTo(cardX, cardY + headerH);
  ctx.lineTo(cardX + cardW, cardY + headerH);
  ctx.lineWidth = 1;
  ctx.strokeStyle = colors.gray200;
  ctx.stroke();

  ctx.fillStyle = COLORS.ink;
  ctx.font = 'bold 14px Inter, sans-serif';
  ctx.fillText("AI Assistant", cardX + 20, cardY + 28);

  const isTyping = (time % 3000) < 1500;
  
  ctx.fillStyle = colors.gold; // Typing indicator (gold)
  ctx.beginPath();
  ctx.arc(cardX + cardW - 30, cardY + 24, 3, 0, Math.PI*2);
  ctx.fill();

  // Content Area
  const chatY = cardY + headerH + 20;
  
  // User Message
  const userIconX = cardX + 20;
  ctx.fillStyle = colors.gray200;
  ctx.beginPath(); ctx.arc(userIconX + 12, chatY + 12, 12, 0, Math.PI*2); ctx.fill();
  
  const bubbleH = 35;
  const bubbleW = cardW * 0.55;

  ctx.fillStyle = colors.gray50;
  drawRoundedRect(ctx, userIconX + 35, chatY - 8, bubbleW, bubbleH, 8);
  ctx.fill();
  
  // Fake Text Lines (User)
  ctx.fillStyle = colors.gray400;
  ctx.fillRect(userIconX + 45, chatY, bubbleW * 0.6, 4);
  ctx.fillRect(userIconX + 45, chatY + 8, bubbleW * 0.4, 4);

  // AI Message
  const aiY = chatY + 50;
  const aiIconX = cardX + cardW - 44;
  
  ctx.fillStyle = COLORS.accent;
  ctx.beginPath(); ctx.arc(aiIconX + 12, aiY + 12, 12, 0, Math.PI*2); ctx.fill();
  
  const aiBubbleX = aiIconX - bubbleW - 10;
  ctx.fillStyle = COLORS.accent;
  drawRoundedRect(ctx, aiBubbleX, aiY - 8, bubbleW, bubbleH, 8);
  ctx.fill();

  if (isTyping) {
     ctx.fillStyle = COLORS.white;
     const dotStart = aiBubbleX + bubbleW/2 - 14;
     for(let i=0; i<3; i++) {
        const dy = aiY + 12 + Math.sin((time * 0.01) + i) * 2;
        ctx.beginPath(); ctx.arc(dotStart + (i * 14), dy, 2.5, 0, Math.PI*2); ctx.fill();
     }
  } else {
     ctx.fillStyle = 'rgba(255,255,255,0.8)';
     ctx.fillRect(aiBubbleX + 15, aiY, bubbleW * 0.7, 4);
     ctx.fillRect(aiBubbleX + 15, aiY + 8, bubbleW * 0.5, 4);
  }
};

const drawPresence = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  const availableH = h - 44;
  const contentCenterY = 44 + availableH / 2;
  
  // FIX: Make view height proportional to available space
  const viewH = Math.min(availableH * 0.7, 260); 
  const clipTop = contentCenterY - (viewH / 2);
  
  // FIX: Scale card size relative to width to fit
  const cardSize = Math.min(w * 0.12, 100);
  const gap = 15;
  const rowH = cardSize + gap;
  
  const totalContentW = (cardSize * 2) + gap;
  const startX = (w - totalContentW) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(startX - 10, clipTop, totalContentW + 20, viewH);
  ctx.clip();

  const loopHeight = 2 * rowH; 
  const scrollSpeed = 0.08;
  const loopOffset = (time * scrollSpeed) % loopHeight; 
  
  const startRowIndex = Math.floor((loopOffset - cardSize) / rowH);
  const endRowIndex = Math.ceil((loopOffset + viewH) / rowH);

  for (let i = startRowIndex; i <= endRowIndex; i++) {
    const y = clipTop + (i * rowH) - loopOffset;
    const patternIdx = Math.abs(i) % 2; 

    const x1 = startX;
    const x2 = startX + cardSize + gap;

    [x1, x2].forEach((x, colIdx) => {
        const isViral = (patternIdx === 0 && colIdx === 1);
        
        ctx.fillStyle = isViral ? COLORS.accent : COLORS.white;
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 1;
        
        ctx.fillRect(x, y, cardSize, cardSize);
        ctx.strokeRect(x, y, cardSize, cardSize);
        
        ctx.fillStyle = isViral ? COLORS.white : colors.gray200;
        ctx.fillRect(x + 10, y + 10, cardSize - 20, cardSize - 40);
        
        ctx.fillStyle = isViral ? COLORS.white : COLORS.ink;
        ctx.beginPath(); ctx.arc(x + 15, y + cardSize - 15, 4, 0, Math.PI*2); ctx.fill();
        ctx.fillRect(x + 25, y + cardSize - 18, 40, 6);
    });
  }

  ctx.restore();
};

const drawSoul = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  const availableH = h - 44;
  const contentCenterY = 44 + availableH / 2;

  // FIX: Constrain height properly to avoid clipping
  const cardW = Math.min(w * 0.4, 280);
  const cardH = Math.min(availableH * 0.75, 300);
  const x = (w - cardW) / 2;
  const y = contentCenterY - (cardH / 2);

  ctx.fillStyle = COLORS.white;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,0,0,0.1)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;
  drawRoundedRect(ctx, x, y, cardW, cardH, 8);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.stroke();

  // Profile Header
  const profileRad = Math.min(cardW * 0.08, 20);
  ctx.fillStyle = COLORS.ink;
  ctx.beginPath();
  ctx.arc(x + 40, y + 40, profileRad, 0, Math.PI*2);
  ctx.fill();
  
  ctx.fillStyle = COLORS.ink;
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.fillText("SOP Check", x + 70, y + 45);

  // Task List - Distribute dynamically based on card height
  const listStartY = y + 80;
  const availListH = cardH - 110; 
  const rowH = availListH / 4; 
  
  const tasks = ["Guidelines", "Setup", "Shadow Call", "Deploy"];
  const cycleDur = 4000;
  const localTime = time % cycleDur;
  const progress = Math.min(localTime / 3000, 1);
  const completedCount = Math.floor(progress * 4.5);

  tasks.forEach((task, i) => {
    const taskY = listStartY + (i * rowH);
    const isDone = i < completedCount;

    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 30, taskY, 14, 14);
    
    if (isDone) {
        ctx.fillStyle = COLORS.accent;
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillText("✓", x + 32, taskY + 12);
    }

    ctx.fillStyle = isDone ? COLORS.ink : colors.gray400;
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(task, x + 60, taskY + 12);
  });

  // Progress Bar
  const barW = cardW - 60;
  const barH = 6;
  const barX = x + 30;
  const barY = y + cardH - 20;

  ctx.fillStyle = colors.gray200;
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(barX, barY, barW * progress, barH);
};


// --- Main Component ---

const Visual_ScaleFaster_Engine: React.FC = () => {
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

      // --- SCALING LOGIC (Same as GetClients) ---
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

      const ease = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const slideOffset = isTransitioningRef.current ? ease(transitionProgress) * h : 0;

      // 1. Draw CURRENT State
      ctx.save();
      ctx.translate(0, -slideOffset);
      const drawCurrent = [drawVoice, drawPresence, drawSoul][currentStateIdx.current];
      drawCurrent(ctx, w, h, timestamp);
      ctx.restore();

      // 2. Draw NEXT State
      if (isTransitioningRef.current) {
        ctx.save();
        ctx.translate(0, h - slideOffset);
        
        // Separator Line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, 0);
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 2;
        ctx.stroke();

        const drawNext = [drawVoice, drawPresence, drawSoul][nextStateIdx.current];
        drawNext(ctx, w, h, timestamp);
        ctx.restore();
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

export default Visual_ScaleFaster_Engine;