import React, { useEffect, useRef } from 'react';
import { colors } from '../../constants/theme';

const PillarVisual_Helix: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 500;

    // --- CONFIG ---
    const STRAND_RADIUS = 70;
    const STRAND_HEIGHT = 380;
    const PAIRS = 30; // Number of rungs
    const TURNS = 2; // How many twists
    const SPEED = 0.015;

    let time = 0;

    // Helper: 3D Projection
    const fl = 1000;
    const project = (x: number, y: number, z: number) => {
        const scale = fl / (fl + z);
        return {
            x: width / 2 + x * scale,
            y: height / 2 + y * scale,
            scale,
            z
        };
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        time += SPEED;

        const points: {a: any, b: any, index: number}[] = [];

        // Interaction Tilt
        const tiltX = mouseRef.current.y * 0.5; // Tilt forward/back
        const tiltZ = mouseRef.current.x * 0.5; // Tilt side-to-side

        // Generate Helix Points
        for(let i=0; i<PAIRS; i++) {
            const progress = i / (PAIRS - 1); // 0 to 1
            const yBase = (progress - 0.5) * STRAND_HEIGHT;
            const theta = progress * Math.PI * 2 * TURNS + time;

            // Strand A (The Lead)
            let x1 = Math.cos(theta) * STRAND_RADIUS;
            let z1 = Math.sin(theta) * STRAND_RADIUS;
            let y1 = yBase;

            // Strand B (The Follow)
            let x2 = Math.cos(theta + Math.PI) * STRAND_RADIUS;
            let z2 = Math.sin(theta + Math.PI) * STRAND_RADIUS;
            let y2 = yBase;

            // Apply 3D Tilt Rotation
            // Rotate around X
            const rotX = (y: number, z: number) => ({
                y: y * Math.cos(tiltX) - z * Math.sin(tiltX),
                z: y * Math.sin(tiltX) + z * Math.cos(tiltX)
            });
            
            // Rotate around Z (optional, adds dynamic feel)
            const rotZ = (x: number, y: number) => ({
                x: x * Math.cos(tiltZ * 0.2) - y * Math.sin(tiltZ * 0.2),
                y: x * Math.sin(tiltZ * 0.2) + y * Math.cos(tiltZ * 0.2)
            });

            let r1 = rotX(y1, z1);
            y1 = r1.y; z1 = r1.z;
            
            let r2 = rotX(y2, z2);
            y2 = r2.y; z2 = r2.z;

            // Store World Coordinates
            points.push({
                a: { x: x1, y: y1, z: z1 },
                b: { x: x2, y: y2, z: z2 },
                index: i
            });
        }

        // Sort by Z depth (Midpoint of the rung)
        points.sort((pair1, pair2) => {
            const z1 = (pair1.a.z + pair1.b.z) / 2;
            const z2 = (pair2.a.z + pair2.b.z) / 2;
            return z2 - z1; // Draw far first
        });

        // Draw Structure
        points.forEach(pair => {
            const aProj = project(pair.a.x, pair.a.y, pair.a.z);
            const bProj = project(pair.b.x, pair.b.y, pair.b.z);

            // Opacity based on depth
            const alphaA = Math.max(0.1, (aProj.scale - 0.6) * 2.5);
            const alphaB = Math.max(0.1, (bProj.scale - 0.6) * 2.5);
            const midAlpha = (alphaA + alphaB) / 2;

            // Connector (The Protocol / Rung)
            ctx.beginPath();
            ctx.moveTo(aProj.x, aProj.y);
            ctx.lineTo(bProj.x, bProj.y);
            // Gold connector
            ctx.strokeStyle = colors.gold; 
            ctx.lineWidth = 1.5 * midAlpha;
            ctx.globalAlpha = midAlpha * 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Nodes (The People / Staff)
            // Node A
            ctx.beginPath();
            ctx.arc(aProj.x, aProj.y, 3 * aProj.scale, 0, Math.PI * 2);
            ctx.fillStyle = colors.dark;
            ctx.globalAlpha = alphaA;
            ctx.fill();

            // Node B
            ctx.beginPath();
            ctx.arc(bProj.x, bProj.y, 3 * bProj.scale, 0, Math.PI * 2);
            ctx.fillStyle = colors.dark;
            ctx.globalAlpha = alphaB;
            ctx.fill();
            
            ctx.globalAlpha = 1;
        });

        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    // Interaction
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        // Normalize -1 to 1
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 600;
        height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-cream flex items-center justify-center cursor-move">
        <canvas ref={canvasRef} className="block" />
        
    </div>
  );
};

export default PillarVisual_Helix;
