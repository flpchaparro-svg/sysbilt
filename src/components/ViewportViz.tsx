import React, { useEffect, useRef } from 'react';
import { timer, line, curveBasis } from 'd3';
import { useInView } from 'framer-motion';
import { colors } from '../constants/theme';

interface ViewportVizProps {
  type: string;
  color?: string;
  lineWidthScale?: number;
}

const ViewportViz: React.FC<ViewportVizProps> = ({ type, color = colors.gold, lineWidthScale = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Type as any to avoid complex d3 typing issues during build
  const timerRef = useRef<any>(null);
  
  const isInView = useInView(containerRef, { margin: "0px 0px 100px 0px" });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (timerRef.current) {
      timerRef.current.stop();
      timerRef.current = null;
    }
    
    if (!isInView) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const width = rect.width;
    const height = rect.height;
    
    // 1. GEOMETRIC
    const renderGeometric = () => {
      const cx = width / 2;
      const cy = height / 2;
      const count = 5;
      const lineGen = line().context(ctx); // Use named import

      timerRef.current = timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);
        const t = elapsed * 0.0003;

        for (let i = 0; i < count; i++) {
          const r = 60 + i * 40;
          const angle = (i % 2 === 0 ? t : -t) * (1 + i * 0.1);
          const sides = 3 + i;
          
          const points: [number, number][] = [];
          for (let j = 0; j <= sides; j++) {
            const theta = angle + (j / sides) * Math.PI * 2;
            points.push([
              cx + Math.cos(theta) * r,
              cy + Math.sin(theta) * r
            ]);
          }

          ctx.beginPath();
          lineGen(points);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.0 * lineWidthScale; 
          ctx.globalAlpha = 0.3 - (i * 0.05);
          ctx.stroke();

          ctx.fillStyle = color;
          ctx.globalAlpha = 0.8;
          points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p[0], p[1], 3 * lineWidthScale, 0, 2 * Math.PI);
            ctx.fill();
          });
        }
      });
    };

    // 2. NETWORK
    const renderNetwork = () => {
      const cx = width / 2;
      const cy = height / 2;
      const satelliteCount = 8;

      timerRef.current = timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);
        const t = elapsed * 0.0002;

        ctx.beginPath();
        ctx.arc(cx, cy, 6 * lineWidthScale, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.9;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, 16, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2 * lineWidthScale;
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        [100, 180].forEach(r => {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, 2 * Math.PI);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.0 * lineWidthScale;
          ctx.setLineDash([3 * lineWidthScale, 5 * lineWidthScale]);
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.setLineDash([]);
        });

        for (let i = 0; i < satelliteCount; i++) {
          const r = 100 + (i % 2) * 80;
          const speed = (i % 2 === 0 ? 1 : -0.7);
          const angle = i * (Math.PI * 2 / satelliteCount) + t * speed;
          
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(x, y);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.0 * lineWidthScale;
          ctx.globalAlpha = 0.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y, 4 * lineWidthScale, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.9;
          ctx.fill();
        }
      });
    };

    // 3. FLOW
    const renderFlow = () => {
      const gridSize = 40;
      const paths: [number, number][][] = [];
      const lineGen = line().context(ctx); // Use named import

      for (let i = 0; i < 8; i++) {
        let cx = width / 2;
        let cy = height / 2;
        const path: [number, number][] = [[cx, cy]];
        for (let j = 0; j < 6; j++) {
          if (Math.random() > 0.5) cx += (Math.random() > 0.5 ? gridSize : -gridSize);
          else cy += (Math.random() > 0.5 ? gridSize : -gridSize);
          path.push([cx, cy]);
        }
        paths.push(path);
      }

      timerRef.current = timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);

        paths.forEach((p, i) => {
          ctx.beginPath();
          lineGen(p);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.0 * lineWidthScale;
          ctx.globalAlpha = 0.1;
          ctx.setLineDash([]);
          ctx.stroke();

          const progress = (elapsed * 0.1 + (i * 100)) % 1000 / 1000;
          ctx.beginPath();
          lineGen(p);
          ctx.strokeStyle = color;
          ctx.lineWidth = 4 * lineWidthScale;
          ctx.globalAlpha = 1;
          ctx.setLineDash([30 * lineWidthScale, 1000]);
          ctx.lineDashOffset = -progress * 1000;
          ctx.stroke();
          ctx.setLineDash([]);
        });
      });
    };

    // 4. NEURAL
    const renderNeural = () => {
      const nodeCount = 45;
      const nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      }));

      timerRef.current = timer(() => {
        ctx.clearRect(0, 0, width, height);

        nodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        });

        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8 * lineWidthScale;
        for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.globalAlpha = (1 - d / 120) * 0.5;
              ctx.stroke();
            }
          }
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        nodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3 * lineWidthScale, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
    };

    // 5. SEQUENTIAL
    const renderSequential = () => {
      const bars = 24;
      const barW = width / bars;
      
      timerRef.current = timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.0 * lineWidthScale;
        ctx.globalAlpha = 0.4;

        for (let i = 0; i < bars; i++) {
          const h = 40 + Math.sin(i * 0.4 + elapsed * 0.003) * 30 + Math.sin(i * 0.1 - elapsed * 0.002) * 20;
          const x = i * barW;
          const centerY = height / 2;
          
          ctx.strokeRect(x + 2, centerY - h / 2, barW - 4, h);
        }
      });
    };

    // 6. WAVES
    const renderWaves = () => {
      const lineGen = line().curve(curveBasis).context(ctx); // Use named imports
      const layers = 6;

      timerRef.current = timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.0 * lineWidthScale;

        for (let i = 0; i < layers; i++) {
          const points: [number, number][] = [];
          for (let x = 0; x <= width + 50; x += 40) {
            const y = height / 2 + Math.sin(x * 0.015 + elapsed * 0.002 + (i * 0.5)) * (30 + i * 8);
            points.push([x, y]);
          }
          
          ctx.beginPath();
          lineGen(points);
          ctx.globalAlpha = 0.2 + (i * 0.05);
          ctx.stroke();
        }
      });
    };

    // 7. DASHBOARD
    const renderDashboard = () => {
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.35;

      timerRef.current = timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * lineWidthScale;
        ctx.globalAlpha = 0.3;
        [0.33, 0.66, 1].forEach(scale => {
          ctx.beginPath();
          ctx.arc(cx, cy, maxR * scale, 0, 2 * Math.PI);
          ctx.stroke();
        });

        ctx.lineWidth = 1.5 * lineWidthScale;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(cx - maxR, cy);
        ctx.lineTo(cx + maxR, cy);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(cx, cy - maxR);
        ctx.lineTo(cx, cy + maxR);
        ctx.stroke();

        const angle = elapsed * 0.0015;
        const lx = cx + Math.cos(angle) * maxR;
        const ly = cy + Math.sin(angle) * maxR;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(lx, ly);
        ctx.lineWidth = 3 * lineWidthScale;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
      });
    };

    switch (type) {
      case 'geometric': renderGeometric(); break;
      case 'network': renderNetwork(); break;
      case 'flow': renderFlow(); break;
      case 'neural': renderNeural(); break;
      case 'sequential': renderSequential(); break;
      case 'waves': renderWaves(); break;
      case 'dashboard': renderDashboard(); break;
      default: renderGeometric(); break;
    }

    const observer = new ResizeObserver(() => {
      if (timerRef.current) {
        timerRef.current.stop();
        timerRef.current = null;
      }
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      switch (type) {
        case 'geometric': renderGeometric(); break;
        case 'network': renderNetwork(); break;
        case 'flow': renderFlow(); break;
        case 'neural': renderNeural(); break;
        case 'sequential': renderSequential(); break;
        case 'waves': renderWaves(); break;
        case 'dashboard': renderDashboard(); break;
        default: renderGeometric(); break;
      }
    });
    observer.observe(container);

    return () => {
      if (timerRef.current) {
        timerRef.current.stop();
        timerRef.current = null;
      }
      observer.disconnect();
    };

  }, [type, color, isInView, lineWidthScale]);

  return (
    <div ref={containerRef} className="w-full h-full bg-transparent relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
            backgroundImage: `linear-gradient(${color}0D 1px, transparent 1px), linear-gradient(90deg, ${color}0D 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }} 
      />
    </div>
  );
};

export default ViewportViz;