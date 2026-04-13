import React, { useEffect, useRef } from 'react';
import { colors } from '../../constants/theme';

interface PillarVisual_TurbineProps {
  color?: string;
}

const PillarVisual_Turbine: React.FC<PillarVisual_TurbineProps> = ({ color = colors.gold }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 500;

    // --- CONFIGURATION ---
    const CUBE_SIZE = 40; 
    const SPEED = 1.2; 
    const SPACING = 100;
    const VIEW_ANGLE = 0.25; // Side-view schematic

    // State
    let time = 0;

    interface Cube {
        x: number; 
        offsetY: number; 
        rotX: number;
        rotY: number;
        rotZ: number;
        id: number;
    }

    // Initialize cubes
    const cubes: Cube[] = [];
    const totalCubes = 10;
    for(let i=0; i<totalCubes; i++) {
        cubes.push({
            x: (i * SPACING) - 400,
            offsetY: (Math.random() - 0.5) * 60,
            rotX: Math.random() * Math.PI,
            rotY: Math.random() * Math.PI,
            rotZ: Math.random() * Math.PI,
            id: i
        });
    }

    // --- PROJECTION HELPER ---
    const project = (x: number, y: number, z: number) => {
        const isoX = x + z * 0.5; 
        const isoY = y + z * VIEW_ANGLE; 

        return {
            x: width / 2 + isoX,
            y: height / 2 + isoY 
        };
    };

    // Draw a Cube
    const drawCube = (c: Cube, processed: boolean) => {
        const r = CUBE_SIZE / 2;
        const verts = [
            {x:-r, y:-r, z:-r}, {x:r, y:-r, z:-r}, {x:r, y:r, z:-r}, {x:-r, y:r, z:-r}, // Front
            {x:-r, y:-r, z:r}, {x:r, y:-r, z:r}, {x:r, y:r, z:r}, {x:-r, y:r, z:r}       // Back
        ];

        // Rotation Matrix
        const rotate = (p: {x:number, y:number, z:number}, rx:number, ry:number, rz:number) => {
            // X
            let y = p.y*Math.cos(rx) - p.z*Math.sin(rx);
            let z = p.y*Math.sin(rx) + p.z*Math.cos(rx);
            let x = p.x;
            // Y
            let x2 = x*Math.cos(ry) + z*Math.sin(ry);
            z = -x*Math.sin(ry) + z*Math.cos(ry);
            x = x2;
            // Z
            let x3 = x*Math.cos(rz) - y*Math.sin(rz);
            y = x*Math.sin(rz) + y*Math.cos(rz);
            x = x3;
            return {x, y, z};
        };

        const projectedVerts = verts.map(v => {
            const rot = rotate(v, c.rotX, c.rotY, c.rotZ);
            return project(c.x + rot.x, rot.y + c.offsetY, rot.z);
        });

        // Faces Definition (Indices of verts)
        const faces = [
            [0,1,2,3], [4,5,6,7], [0,1,5,4], [2,3,7,6], [0,3,7,4], [1,2,6,5]
        ];

        ctx.lineJoin = 'round';

        if (processed) {
            // --- PROCESSED: WIREFRAME (NO FILL) ---
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;

            faces.forEach(f => {
                ctx.beginPath();
                ctx.moveTo(projectedVerts[f[0]].x, projectedVerts[f[0]].y);
                ctx.lineTo(projectedVerts[f[1]].x, projectedVerts[f[1]].y);
                ctx.lineTo(projectedVerts[f[2]].x, projectedVerts[f[2]].y);
                ctx.lineTo(projectedVerts[f[3]].x, projectedVerts[f[3]].y);
                ctx.closePath();
                ctx.stroke();
            });
            
            // Add internal highlight (Core Dot)
            const center = project(c.x, c.offsetY, 0);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(center.x, center.y, 1.5, 0, Math.PI*2);
            ctx.fill();

        } else {
            // --- RAW: PURE INK WIREFRAME (NO FILL) ---
            ctx.strokeStyle = 'rgba(26, 26, 26, 0.4)';
            ctx.lineWidth = 1;

            faces.forEach(f => {
                ctx.beginPath();
                ctx.moveTo(projectedVerts[f[0]].x, projectedVerts[f[0]].y);
                ctx.lineTo(projectedVerts[f[1]].x, projectedVerts[f[1]].y);
                ctx.lineTo(projectedVerts[f[2]].x, projectedVerts[f[2]].y);
                ctx.lineTo(projectedVerts[f[3]].x, projectedVerts[f[3]].y);
                ctx.closePath();
                ctx.stroke();
            });
        }
    };

    const animate = () => {
        time += 0.01;
        ctx.clearRect(0, 0, width, height);

        // --- DRAW TRACK ---
        // A clean horizon line
        const start = project(-500, 20, 0);
        const end = project(500, 20, 0);
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // --- DRAW GATE (The Processor) ---
        // Vertical scanner
        const gateX = 0;
        const gh = 120; // Gate height
        
        const top = project(gateX, -gh/2, 0);
        const bot = project(gateX, gh/2, 0);

        // Gate Beam (Behind - Very subtle)
        // Keep beam slightly visible to define the transition point
        const colorStr: string = color ?? colors.gold;
        const rgb = colorStr === colors.redSolid ? '226, 30, 63' : '197, 160, 89';
        const grad = ctx.createLinearGradient(top.x, top.y, bot.x, bot.y);
        grad.addColorStop(0, `rgba(${rgb}, 0)`);
        grad.addColorStop(0.5, `rgba(${rgb}, 0.2)`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        
        ctx.fillStyle = grad;
        ctx.fillRect(top.x - 1, top.y, 2, bot.y - top.y);

        // --- UPDATE & DRAW CUBES ---
        cubes.forEach(c => {
            // Move
            c.x += SPEED;
            
            // Loop
            if (c.x > 400) {
                c.x = -400;
                c.offsetY = (Math.random() - 0.5) * 60;
                c.rotX = Math.random() * Math.PI;
                c.rotY = Math.random() * Math.PI;
                c.rotZ = Math.random() * Math.PI;
            }

            const isProcessed = c.x > 0;
            
            // Interpolate state
            if (c.x > -60 && c.x < 60) {
                const t = (c.x + 60) / 120;
                // Easing alignment
                c.rotX *= (1 - t) * 0.95;
                c.rotY *= (1 - t) * 0.95;
                c.rotZ *= (1 - t) * 0.95;
                c.offsetY *= 0.9;
            } else if (isProcessed) {
                // Lock perfectly
                c.rotX = 0; c.rotY = 0; c.rotZ = 0; c.offsetY = 0;
            } else {
                // Tumble
                c.rotX += 0.02; c.rotY += 0.01;
            }

            drawCube(c, isProcessed);
        });

        // Gate Scanner Overlay (Front)
        // Thin bright line
        ctx.fillStyle = color;
        ctx.fillRect(top.x, top.y, 1, bot.y - top.y);

        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-cream relative overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default PillarVisual_Turbine;
