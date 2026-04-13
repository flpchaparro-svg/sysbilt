import React, { useEffect, useRef } from 'react';
import { colors } from '../../constants/theme';

const PillarVisual_MediaGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = 600;

    // --- CONFIG ---
    const COLUMNS = 5;
    const TILE_HEIGHT = 100;
    const GAP = 15;
    const SPEED_BASE = 0.5;
    
    // Social Media / Brand Palette (Deep, premium versions)
    const BRAND_COLORS = [
        '#C13584', // Instagram Deep Magenta
        '#0077B5', // LinkedIn Blue
        '#D00000', // YouTube Deep Red
        colors.gold  // System Gold
    ];

    // Generate Column Data (Speed & Offset)
    const columns = Array.from({ length: COLUMNS }, (_, i) => ({
      x: (width / COLUMNS) * i + (width / COLUMNS) / 2,
      width: (width / COLUMNS) - GAP,
      speed: SPEED_BASE + Math.random() * 0.5,
      offset: Math.random() * height,
    }));

    // Generate Tile Content
    const tiles: any[] = [];
    for(let c=0; c<COLUMNS; c++) {
        for(let r=0; r<10; r++) { // Enough to fill screen + buffer
            
            // 40% Chance of being a "Social Brand" tile, otherwise Standard Ink
            const isBranded = Math.random() < 0.4;
            const color = isBranded 
                ? BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)] 
                : colors.dark;

            tiles.push({
                col: c,
                yOffset: r * (TILE_HEIGHT + GAP),
                type: Math.floor(Math.random() * 4), // 0: Text, 1: Image, 2: Graph, 3: Blank
                color: color,
                isBranded: isBranded
            });
        }
    }

    const animate = () => {
      // Clear with Cream Background
      ctx.fillStyle = colors.cream; 
      ctx.fillRect(0, 0, width, height);

      const time = Date.now() * 0.001;
      
      // Calculate Perspective Tilt based on Mouse
      const tiltX = mouseRef.current.x * 0.5; // -0.5 to 0.5
      
      ctx.save();
      // Center origin for transform
      ctx.translate(width/2, height/2);
      ctx.translate(-width/2, -height/2);

      // Draw Columns
      columns.forEach((col, cIdx) => {
         // Update Scroll
         col.offset -= col.speed;
         if (col.offset < -TILE_HEIGHT) col.offset += TILE_HEIGHT;

         // Get tiles for this column
         const colTiles = tiles.filter(t => t.col === cIdx);
         
         colTiles.forEach((tile) => {
             // Calculate Y
             let y = (tile.yOffset + col.offset) % (height + TILE_HEIGHT * 2);
             if (y < -TILE_HEIGHT) y += (height + TILE_HEIGHT * 2);
             
             // --- DRAW TILE ---
             // Calculate fake 3D position
             const centerDist = (cIdx - (COLUMNS-1)/2); // -2, -1, 0, 1, 2
             const depthScale = 1 - Math.abs(centerDist) * 0.05; // Center larger
             
             const drawW = col.width * depthScale;
             const drawH = TILE_HEIGHT * depthScale;
             
             // X Position with parallax tilt
             const drawX = col.x - (drawW/2) + (centerDist * tiltX * 40);
             
             // Opacity based on edges (Vignette)
             const distY = Math.abs(y - height/2);
             const alpha = Math.max(0, 1 - (distY / (height * 0.6)));

             ctx.globalAlpha = alpha;
             
             // Tile Body
             ctx.fillStyle = tile.color;
             
             // Dynamic "Active" state (Flash)
             const isActive = Math.sin(time * 3 + cIdx + y*0.01) > 0.95;
             if (isActive && !tile.isBranded) {
                 // Only flash the black tiles gold
                 ctx.fillStyle = colors.gray700; 
                 ctx.shadowBlur = 15;
                 ctx.shadowColor = 'rgba(197, 160, 89, 0.4)';
             } else {
                 ctx.shadowBlur = 0;
             }

             // Draw Rounded Rect (Manual)
             const r = 4;
             ctx.beginPath();
             ctx.roundRect(drawX, y, drawW, drawH, r);
             ctx.fill();
             
             // Draw "Content" (UI Lines inside the tile)
             // If colored tile -> White lines
             // If dark tile -> Dark Grey lines
             ctx.fillStyle = tile.isBranded ? 'rgba(255,255,255,0.4)' : colors.gray700;
             
             if (tile.type === 0) { // Text lines
                 ctx.fillRect(drawX + 10, y + 20, drawW - 40, 4);
                 ctx.fillRect(drawX + 10, y + 35, drawW - 60, 4);
                 ctx.fillRect(drawX + 10, y + 50, drawW - 20, 4);
             } else if (tile.type === 1) { // Image placeholder
                 ctx.fillRect(drawX + 10, y + 10, drawW - 20, drawH - 20);
                 // Inner box
                 ctx.fillStyle = tile.isBranded ? 'rgba(255,255,255,0.2)' : colors.gray800;
                 ctx.fillRect(drawX + 15, y + 15, drawW - 30, drawH - 30);
             } else if (tile.type === 2) { // Play Button / Video
                 ctx.beginPath();
                 ctx.arc(drawX + drawW/2, y + drawH/2, 12, 0, Math.PI*2);
                 ctx.fill();
             }

             // Reset Shadow
             ctx.shadowBlur = 0;
         });
      });

      ctx.restore();
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    // Interaction
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 800;
        height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-cream relative overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,242,236,0)_50%,rgba(0,0,0,0.02)_50%)] z-10 bg-[length:100%_2px]" />
    </div>
  );
};

export default PillarVisual_MediaGrid;

