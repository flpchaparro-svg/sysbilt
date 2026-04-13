import React, { useEffect, useRef } from 'react';
import { colors } from '../../constants/theme';

const PillarVisual_Dashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 450;

    // --- CONFIG (LIGHT THEME) ---
    const COLOR_BG = colors.cream;
    const COLOR_RED = colors.redSolid;
    const COLOR_GOLD = colors.gold;
    const COLOR_INK = colors.dark;
    const COLOR_TEXT_DIM = 'rgba(26, 26, 26, 0.4)';

    // --- DATA SIMULATION ---
    // Line Graph Data
    const maxPoints = 100;
    const dataPoints: number[] = Array(maxPoints).fill(height/2);
    let tick = 0;

    // Logs
    const logs = [
        "SYSTEM_INIT...",
        "CONNECTING_SOURCE_01...",
        "REVENUE_STREAM_ACTIVE",
        "MARGIN_CALC: 42%",
        "LEAKAGE_DETECTED: 0%",
        "FORECAST_MODEL: +12% MoM",
        "CASHFLOW_VELOCITY: OPTIMAL",
        "SYNC_COMPLETE"
    ];
    let logOffset = 0;

    const animate = () => {
        tick++;
        
        // 1. Setup Canvas
        ctx.fillStyle = COLOR_BG;
        ctx.fillRect(0, 0, width, height);

        // 2. Draw Grid - REMOVED PER REQUEST
        // The grid lines drawing loop has been deleted to match the clean design requirement.

        // 3. Update Line Graph (The Heartbeat)
        const prevVal = dataPoints[dataPoints.length - 1];
        const noise = (Math.random() - 0.5) * 10;
        const trend = Math.sin(tick * 0.015) * 2; 
        let newVal = prevVal + noise + trend;
        
        // Bounds check
        if (newVal < height * 0.3) newVal += 2;
        if (newVal > height * 0.7) newVal -= 2;
        
        dataPoints.push(newVal);
        if (dataPoints.length > width / 5) dataPoints.shift(); 

        // Draw Area Under Curve
        ctx.beginPath();
        ctx.moveTo(0, height);
        dataPoints.forEach((val, i) => {
            ctx.lineTo(i * 5, val);
        });
        ctx.lineTo((dataPoints.length - 1) * 5, height);
        ctx.fillStyle = 'rgba(197, 160, 89, 0.1)'; // Subtle Gold wash
        ctx.fill();

        // Draw Line
        ctx.beginPath();
        dataPoints.forEach((val, i) => {
            if (i === 0) ctx.moveTo(0, val);
            else ctx.lineTo(i * 5, val);
        });
        ctx.strokeStyle = COLOR_GOLD;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Head Dot
        const lastX = (dataPoints.length - 1) * 5;
        const lastY = dataPoints[dataPoints.length - 1];
        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI*2);
        ctx.fillStyle = COLOR_RED;
        ctx.fill();
        // Pulse ring
        const pulseSize = 4 + Math.sin(tick * 0.05) * 4;
        ctx.beginPath();
        ctx.arc(lastX, lastY, pulseSize, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(226, 30, 63, ${0.5 - pulseSize/20})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // 5. Draw Log Console (Bottom Left)
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(20, height - 120, 220, 100);
        ctx.strokeStyle = COLOR_INK;
        ctx.lineWidth = 1;
        ctx.strokeRect(20, height - 120, 220, 100);
        
        // Header bar for console
        ctx.fillStyle = COLOR_INK;
        ctx.fillRect(20, height - 120, 220, 20);
        ctx.fillStyle = colors.white;
        ctx.font = 'bold 9px monospace';
        ctx.fillText("LIVE_TELEMETRY // STREAM_01", 30, height - 108);
        
        ctx.fillStyle = COLOR_TEXT_DIM;
        ctx.font = '9px monospace';
        // Scroll logs
        if (tick % 200 === 0) {
            logOffset = (logOffset + 1) % logs.length;
        }
        
        for(let i=0; i<5; i++) {
            const index = (logOffset + i) % logs.length;
            // Highlight specific keywords
            const txt = logs[index];
            ctx.fillStyle = txt.includes('DETECTED') || txt.includes('ALERT') ? COLOR_RED : COLOR_INK;
            ctx.fillText(`> ${txt}`, 30, height - 85 + (i * 15));
        }

        // 6. Alert Box (Top Center - Occasional Flash)
        if (Math.sin(tick * 0.015) > 0.9) {
            ctx.fillStyle = 'rgba(226, 30, 63, 0.1)';
            ctx.fillRect(width/2 - 60, 20, 120, 30);
            ctx.strokeStyle = COLOR_RED;
            ctx.strokeRect(width/2 - 60, 20, 120, 30);
            ctx.fillStyle = COLOR_RED;
            ctx.textAlign = 'center';
            ctx.font = 'bold 10px monospace';
            ctx.fillText("ANOMALY_CHECK", width/2, 38);
            ctx.textAlign = 'left';
        }

        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 600;
        height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-cream relative overflow-hidden border border-dark/10 shadow-lg">
        <canvas ref={canvasRef} className="block w-full h-full" />
        {/* Subtle Scanline Overlay (Darkened for Light Mode) */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.05)_50%)] z-10 bg-[length:100%_2px]" />
    </div>
  );
};

export default PillarVisual_Dashboard;

