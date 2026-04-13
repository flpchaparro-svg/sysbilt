import React, { useRef, useEffect } from 'react';
import { colors } from '../../constants/theme';

const COLORS = {
  bg: colors.cream,
  ink: colors.dark,
  accent: colors.redSolid,
  accentDim: 'rgba(226, 30, 63, 0.1)',
  inkDim: 'rgba(26, 26, 26, 0.05)',
  white: colors.white,
  grid: colors.gray200
};

const STATES = [
  { id: 'FACE' },
  { id: 'BRAIN' },
  { id: 'MUSCLE' }
];

const TRANSITION_DURATION = 1500; // ms for laser sweep
const HOLD_DURATION = 2500;       // ms to stay on a state

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

const drawFace = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  const pad = 40;
  const contentY = 80;
  
  // Hero Section
  ctx.fillStyle = COLORS.white;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2;
  const heroH = h * 0.35;
  ctx.fillRect(pad, contentY, w - pad * 2, heroH);
  ctx.strokeRect(pad, contentY, w - pad * 2, heroH);

  // Hero Content
  ctx.fillStyle = COLORS.ink;
  ctx.font = 'bold 32px Lora, serif';
  ctx.fillText("Elevate Your Style.", pad + 30, contentY + 60);
  
  // Button
  ctx.fillStyle = COLORS.accent;
  const btnW = 120;
  const btnH = 40;
  const btnX = pad + 30;
  const btnY = contentY + 90;
  // Boxy button
  ctx.fillRect(btnX, btnY, btnW, btnH);
  ctx.fillStyle = COLORS.white;
  ctx.font = 'bold 12px Inter, sans-serif';
  ctx.fillText("SHOP NOW", btnX + 25, btnY + 25);

  // Product Grid
  const gridY = contentY + heroH + 20;
  const cardGap = 15;
  const cardW = (w - pad * 2 - cardGap * 2) / 3;
  const cardH = 120;

  for (let i = 0; i < 3; i++) {
    const cx = pad + i * (cardW + cardGap);
    // Card Image Placeholder
    ctx.fillStyle = COLORS.white;
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 1;
    ctx.fillRect(cx, gridY, cardW, cardH);
    ctx.strokeRect(cx, gridY, cardW, cardH);
    
    // Inner graphic
    ctx.fillStyle = colors.gray50;
    ctx.fillRect(cx + 10, gridY + 10, cardW - 20, cardH - 40);

    // Price Line
    ctx.fillStyle = COLORS.ink;
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText("$129.00", cx, gridY + cardH + 20);
    ctx.fillStyle = colors.gray500;
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText("Essential Tee", cx, gridY + cardH + 35);
  }
};

const drawBrain = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  const pad = 40;
  const contentY = 80;
  const sideW = 70;
  
  // Sidebar (Dark, Technical)
  ctx.fillStyle = COLORS.ink;
  ctx.fillRect(0, 44, sideW, h - 44);
  
  // Sidebar Icons
  for(let i=0; i<5; i++) {
    ctx.fillStyle = i === 1 ? COLORS.white : colors.gray600;
    ctx.fillRect(20, contentY + 20 + (i*50), 30, 30);
  }

  // Main Data Table Area
  const tableX = sideW + 40;
  const tableW = w - tableX - 40;
  
  // Header Stats
  ctx.lineWidth = 1;
  const statGap = 20;
  const statW = (tableW - (statGap * 2)) / 3;
  
  const stats = [
    { label: "TOTAL LEADS", val: "1,248" },
    { label: "CONVERSION", val: "4.8%" },
    { label: "REVENUE", val: "$92,400" }
  ];

  for(let i=0; i<3; i++) {
    const sx = tableX + i * (statW + statGap);
    
    ctx.strokeStyle = COLORS.ink;
    ctx.strokeRect(sx, contentY, statW, 70);
    
    ctx.fillStyle = colors.gray500;
    ctx.font = '600 10px Inter, sans-serif';
    ctx.fillText(stats[i].label, sx + 12, contentY + 25);
    
    ctx.fillStyle = COLORS.ink;
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText(stats[i].val, sx + 12, contentY + 55);
  }

  // Table
  const tableY = contentY + 110;
  const rowH = 45;
  
  // Responsive Columns
  // Distribute based on available table width
  const col1 = tableX + 20; // Name
  const col2 = tableX + tableW * 0.35; // Status
  const col3 = tableX + tableW * 0.65; // Value
  const col4 = tableX + tableW * 0.85; // Date

  // Headers
  ctx.fillStyle = colors.gray400;
  ctx.font = '600 10px Inter, sans-serif';

  ctx.fillText("NAME", col1, tableY);
  ctx.fillText("STATUS", col2, tableY);
  ctx.fillText("VALUE", col3, tableY);
  ctx.fillText("DATE", col4, tableY);

  ctx.beginPath();
  ctx.moveTo(tableX, tableY + 15);
  ctx.lineTo(tableX + tableW, tableY + 15);
  ctx.strokeStyle = COLORS.ink;
  ctx.stroke();

  // Rows
  const rowData = [
    { n: "Alice Freeman", s: "New", v: "$400", d: "Oct 24" },
    { n: "Marcus Chen", s: "Active", v: "$1,200", d: "Oct 23", active: true },
    { n: "Sarah Jones", s: "Closed", v: "$850", d: "Oct 22" },
    { n: "David W.", s: "Nurture", v: "$0", d: "Oct 21" },
  ];

  rowData.forEach((row, i) => {
    const ry = tableY + 30 + (i * rowH);
    
    if (row.active) {
      // Highlighted Row
      ctx.fillStyle = COLORS.ink;
      ctx.fillRect(tableX, ry - 28, tableW, rowH);
      ctx.fillStyle = COLORS.white; 
    } else {
      ctx.fillStyle = COLORS.ink;
    }

    ctx.font = '500 14px Inter, sans-serif';
    ctx.fillText(row.n, col1, ry);
    ctx.fillText(row.v, col3, ry);
    ctx.fillText(row.d, col4, ry);

    // Status Pill (Centered on col2)
    const pillW = 70;
    const pillH = 20;
    const pillX = col2; // Align left of pill to col2? Or center? 
    // Header was drawn at col2 (left align default). Let's keep left align for text.
    // So pill starts at col2.
    const pillY = ry - 14;

    if (row.active) {
      ctx.fillStyle = COLORS.accent;
    } else {
      ctx.fillStyle = colors.gray300;
    }
    
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 10);
    ctx.fill();

    ctx.fillStyle = COLORS.white;
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(row.s.toUpperCase(), pillX + pillW/2, pillY + 13);
    ctx.textAlign = 'left';
  });
};

const drawMuscle = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  // Clean cream background (no grid)
  
  // Layout Dimensions
  const nodeW = 120;
  const nodeH = 60;
  const gapX = 60;  // Horizontal gap between columns
  const gapY = 60;  // Vertical gap between branches

  // Center calculation
  const centerX = w / 2;
  const centerY = 44 + (h - 44) / 2; // Center of the content area (below header)

  // Determine start X to center the entire structure horizontally
  // Structure: [Lead] -> [Filter] -> [Email/SMS]
  // Width = nodeW + gapX + nodeW + gapX + nodeW = 3*nodeW + 2*gapX
  const totalStructW = (nodeW * 3) + (gapX * 2);
  const startX = centerX - (totalStructW / 2);

  // Nodes
  // Row 1 (Trigger & Filter) are centered on centerY
  // Row 2 (Branches) are offset by gapY + nodeH? No, let's span them out.
  
  // Coordinates
  const col1X = startX;
  const col2X = startX + nodeW + gapX;
  const col3X = startX + (nodeW + gapX) * 2;
  
  const rowMidY = centerY - (nodeH / 2);
  const rowTopY = rowMidY - nodeH - gapY;
  const rowBotY = rowMidY + nodeH + gapY;

  const nodes = [
    { x: col1X, y: rowMidY, w: nodeW, h: nodeH, label: "New Lead", type: "trigger" },
    { x: col2X, y: rowMidY, w: nodeW, h: nodeH, label: "Filter", type: "logic" },
    { x: col3X, y: rowTopY + 40, w: nodeW, h: nodeH, label: "Email Seq.", type: "action" }, // +40 to bring it slightly closer to center
    { x: col3X, y: rowBotY - 40, w: nodeW, h: nodeH, label: "SMS Alert", type: "action" },  // -40 to bring it slightly closer to center
  ];

  // Connections
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2;
  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2, type: 'up' },
    { from: 1, to: 3, type: 'down' },
  ];

  connections.forEach(conn => {
    const n1 = nodes[conn.from];
    const n2 = nodes[conn.to];
    const startX = n1.x + n1.w;
    const startY = n1.y + n1.h / 2;
    const endX = n2.x;
    const endY = n2.y + n2.h / 2;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    if (!conn.type) {
        ctx.lineTo(endX, endY);
    } else {
        const midX = startX + (endX - startX) / 2;
        ctx.lineTo(midX, startY);
        ctx.lineTo(midX, endY);
        ctx.lineTo(endX, endY);
    }
    ctx.stroke();

    // Traveling Dots
    const speed = 0.0015;
    const offset = (time * speed) % 1;
    
    ctx.fillStyle = COLORS.accent;
    let dotX, dotY;
    
    if (!conn.type) {
        dotX = startX + (endX - startX) * offset;
        dotY = startY;
    } else {
        const midX = startX + (endX - startX) / 2;
        const seg1 = Math.abs(midX - startX);
        const seg2 = Math.abs(endY - startY);
        const seg3 = Math.abs(endX - midX);
        const total = seg1 + seg2 + seg3;
        const currentDist = total * offset;

        if (currentDist < seg1) {
            dotX = startX + currentDist;
            dotY = startY;
        } else if (currentDist < seg1 + seg2) {
            dotX = midX;
            dotY = startY + (endY > startY ? 1 : -1) * (currentDist - seg1);
        } else {
            dotX = midX + (currentDist - seg1 - seg2);
            dotY = endY;
        }
    }
    
    ctx.beginPath();
    ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw Nodes
  nodes.forEach(node => {
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(node.x + 4, node.y + 4, node.w, node.h);

    // Box
    ctx.fillStyle = COLORS.white;
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 2;
    ctx.fillRect(node.x, node.y, node.w, node.h);
    ctx.strokeRect(node.x, node.y, node.w, node.h);
    
    // Node Text
    ctx.fillStyle = COLORS.ink;
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(node.label, node.x + node.w / 2, node.y + node.h / 2 + 5);
    ctx.textAlign = 'left';
    
    // Connector dots
    ctx.fillStyle = COLORS.white;
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(node.x, node.y + node.h/2, 3, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(node.x + node.w, node.y + node.h/2, 3, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  });
};

// --- Main Component ---

const VisualGetClientsEngine: React.FC = () => {
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
      
      // Set physical canvas size
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Reset transform before applying new scale
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Compute scale to map VIRTUAL_WIDTH/HEIGHT to physical pixels
      // We prioritize fitting the width for 16:9
      const scaleX = (rect.width * dpr) / VIRTUAL_WIDTH;
      const scaleY = (rect.height * dpr) / VIRTUAL_HEIGHT;
      
      // Use the computed scale. Since aspect-video is enforced, scaleX approx scaleY.
      ctx.scale(scaleX, scaleY);
      
      // Drawing logical width/height
      const w = VIRTUAL_WIDTH;
      const h = VIRTUAL_HEIGHT;

      const elapsed = timestamp - startTimeRef.current;
      
      if (!isTransitioningRef.current) {
        if (elapsed > HOLD_DURATION) {
          isTransitioningRef.current = true;
          transitionStartTimeRef.current = timestamp;
        }
      }

      let laserX = -1;
      let transitionProgress = 0;

      if (isTransitioningRef.current) {
        const tElapsed = timestamp - transitionStartTimeRef.current;
        transitionProgress = Math.min(tElapsed / TRANSITION_DURATION, 1);
        
        const ease = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        laserX = ease(transitionProgress) * w;

        if (transitionProgress >= 1) {
          isTransitioningRef.current = false;
          startTimeRef.current = timestamp;
          currentStateIdx.current = nextStateIdx.current;
          nextStateIdx.current = (currentStateIdx.current + 1) % STATES.length;
          laserX = -1;
        }
      }

      // --- DRAWING ---
      
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      // OLD State
      ctx.save();
      if (laserX >= 0) {
        ctx.beginPath();
        ctx.rect(laserX, 0, w - laserX, h);
        ctx.clip();
      }
      const drawCurrent = [drawFace, drawBrain, drawMuscle][currentStateIdx.current];
      drawCurrent(ctx, w, h, timestamp);
      ctx.restore();

      // NEW State
      if (laserX >= 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, laserX, h);
        ctx.clip();
        const drawNext = [drawFace, drawBrain, drawMuscle][nextStateIdx.current];
        drawNext(ctx, w, h, timestamp);
        ctx.restore();

        // Laser
        ctx.beginPath();
        ctx.moveTo(laserX, 0);
        ctx.lineTo(laserX, h);
        ctx.strokeStyle = COLORS.accent;
        ctx.lineWidth = 3;
        ctx.shadowColor = COLORS.accent;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;
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

export default VisualGetClientsEngine;