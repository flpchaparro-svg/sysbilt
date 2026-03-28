import React, { useEffect, useRef, useState } from 'react';

import { colors } from '../../constants/theme';
const GOLD_COLOR = colors.gold;
const INK_COLOR = colors.dark;
const DESKTOP_COUNT = 100;
const DESKTOP_DIST = 0.55;
const MOBILE_COUNT = 60; 
const MOBILE_DIST = 0.85;

interface Point3D {
  x: number;
  y: number;
  z: number;
  id: number;
  color: string;
  baseSize: number;
  startX: number;
  startY: number;
  startZ: number;
}
interface Connection { p1: number; p2: number }

const generateGeometry = (isMobile: boolean) => {
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
  const connectionDist = isMobile ? MOBILE_DIST : DESKTOP_DIST;
  const verts: Point3D[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); 

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; 
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const isGold = Math.random() > (isMobile ? 0.7 : 0.8);
    
    verts.push({ 
      x, y, z, 
      id: i,
      color: isGold ? GOLD_COLOR : INK_COLOR,
      baseSize: isGold ? 4.5 : 2.5,
      startX: (Math.random() - 0.5) * 5,
      startY: (Math.random() - 0.5) * 5,
      startZ: (Math.random() - 0.5) * 5,
    });
  }

  const connections: Connection[] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d = Math.sqrt(
        Math.pow(verts[i].x - verts[j].x, 2) +
        Math.pow(verts[i].y - verts[j].y, 2) +
        Math.pow(verts[i].z - verts[j].z, 2)
      );
      if (d < connectionDist) connections.push({ p1: i, p2: j }); 
    }
  }
  return { verts, connections };
};

const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<{verts: Point3D[], connections: Connection[]} | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    // OPTIMIZATION: Use requestIdleCallback to defer heavy math until the main thread is free
    // This ensures the Text (LCP) paints first.
    const scheduleGeometry = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          setGeometry(generateGeometry(isMobile));
        }, { timeout: 1000 });
      } else {
        setTimeout(() => {
          setGeometry(generateGeometry(isMobile));
        }, 200);
      }
    };
    
    scheduleGeometry();
  }, []);

  useEffect(() => {
    if (!geometry) return;
    const { verts, connections } = geometry;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let startTime = performance.now();
    let animationFrameId: number | null = null;
    let isIntersecting = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); 
    let mouseX = 0;
    let mouseY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    
    // Cache dimensions to avoid forced reflow in render loop
    let cachedWidth = 0;
    let cachedHeight = 0;
    let cachedIsMobile = false;
    let cachedIsMobileOrTablet = false;
    let cachedWindowWidth = window.innerWidth;
    let cachedWindowHeight = window.innerHeight;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      cachedWidth = rect.width; 
      cachedHeight = rect.height;
      cachedIsMobile = cachedWidth < 768;
      cachedIsMobileOrTablet = cachedWidth < 1024;
      cachedWindowWidth = window.innerWidth;
      cachedWindowHeight = window.innerHeight;
      canvas.width = cachedWidth * dpr;
      canvas.height = cachedHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${cachedWidth}px`;
      canvas.style.height = `${cachedHeight}px`;
    };

    const onMouseMove = (e: MouseEvent) => {
      // Use cached window dimensions instead of reading live
      mouseX = (e.clientX / cachedWindowWidth - 0.5) * 1.5;
      mouseY = (e.clientY / cachedWindowHeight - 0.5) * 1.5;
    };

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      let progress = Math.min(1, elapsed / 1.5);
      progress = 1 - Math.pow(1 - progress, 3); 
      
      const targetX = mouseY * 0.5;
      const targetY = mouseX * 0.5;
      currentRotX += (targetX - currentRotX) * 0.05;
      currentRotY += (targetY - currentRotY) * 0.05;
      const rotX = currentRotX + (elapsed * 0.05); 
      const rotY = currentRotY + (elapsed * 0.08);

      // Use cached dimensions instead of getBoundingClientRect() every frame
      const w = cachedWidth;
      const h = cachedHeight;
      const isMobile = cachedIsMobile;
      const isMobileOrTablet = cachedIsMobileOrTablet; 
      
      const cx = w / 2;
      // Center vertically so sphere + shadow fit with room top and bottom
      const cy = isMobile ? h * 0.42 : h * 0.5;
      const minDimension = Math.min(w, h);
      // Slightly smaller so sphere and shadow both fit in canvas without clipping
      const adaptiveScale = minDimension * (isMobile ? 0.40 : 0.30); 
      
      ctx.clearRect(0, 0, w, h);

      const projected = verts.map(p => {
        let x = p.startX + (p.x - p.startX) * progress;
        let y = p.startY + (p.y - p.startY) * progress;
        let z = p.startZ + (p.z - p.startZ) * progress;
        let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        let z1 = z * Math.cos(rotY) + x * Math.sin(rotY);
        let y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);
        return {
          x: cx + x1 * adaptiveScale,
          y: cy + y1 * adaptiveScale,
          z: z2,
          color: p.color,
          baseSize: p.baseSize
        };
      });

      if (progress > 0.1) {
        ctx.save();
        const maxOpacity = isMobile ? 0.15 : 0.2;
        const shadowOp = Math.min(maxOpacity, progress * maxOpacity);
        ctx.globalAlpha = shadowOp;
        const shadowRadius = adaptiveScale * 0.7;
        const shadowHeight = adaptiveScale * 0.1;
        const shadowY = cy + adaptiveScale * 1.3;
        const grad = ctx.createRadialGradient(cx, shadowY, 0, cx, shadowY, shadowRadius);
        grad.addColorStop(0, 'rgba(26,26,26, 0.8)');
        grad.addColorStop(1, 'rgba(26,26,26, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, shadowY, shadowRadius * progress, shadowHeight * progress, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const lineOp = Math.max(0, (progress - 0.2) * 1.5); 
      if (lineOp > 0.01) {
        ctx.strokeStyle = GOLD_COLOR;
        ctx.lineWidth = isMobile ? 0.8 : 1; 
        ctx.beginPath();
        for (let i = 0; i < connections.length; i++) {
          const p1 = projected[connections[i].p1];
          const p2 = projected[connections[i].p2];
          const depth = (p1.z + p2.z) / 2;
          if (depth < -2.5) continue; 
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.globalAlpha = lineOp * (isMobileOrTablet ? 0.177 : 0.15); 
        ctx.stroke();
      }

      projected.sort((a, b) => a.z - b.z); 
      const baseOpacity = isMobileOrTablet ? 0.28 : 0.414; 
      const opacityRange = isMobileOrTablet ? 0.19 : 0.279; 
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const scale = 1 + (p.z * 0.3);
        const r = Math.max(0, p.baseSize * scale * progress);
        if (r < 0.5) continue;
        ctx.globalAlpha = Math.min(1, baseOpacity + p.z * opacityRange); 
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (p.color === GOLD_COLOR && p.z > 0.2) {
            ctx.shadowColor = 'rgba(197, 160, 89, 0.4)';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }
      if (isIntersecting) animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0].isIntersecting;
        if (isIntersecting && !animationFrameId) {
           startTime = performance.now() - (performance.now() - startTime); 
           render(performance.now());
        } else if (!isIntersecting && animationFrameId) {
           cancelAnimationFrame(animationFrameId);
           animationFrameId = null;
        }
      }, { threshold: 0 }
    );

    observer.observe(container);
    resize();
    render(performance.now());
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [geometry]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-visible">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default HeroVisual;