import React, { useRef, useMemo } from 'react';
import { useAnimationFrame } from 'framer-motion';
import { colors } from '../../constants/theme';

const FL = 800; // Focal Length
const LAYER_COUNT = 10;
const POINTS_PER_LAYER = 16;

const PillarVisual_Catchment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for dropping particles
  const drops = useRef<{ t: number, thetaOffset: number, speed: number }[]>([]);

  // Generate Funnel Geometry (Static Mesh Structure)
  const mesh = useMemo(() => {
    const pts = [];
    for (let l = 0; l < LAYER_COUNT; l++) {
        // Reduced Height Range: -110 to 110 (was -140 to 140) to fit better
        const progress = l / (LAYER_COUNT - 1); 
        const y = progress * 220 - 110; 
        
        // Reduced Radius: Max ~130px (was ~190px) to prevent corner clipping
        const radius = 110 * (1 - Math.pow(progress, 0.7)) + 20; 
        
        for (let i = 0; i < POINTS_PER_LAYER; i++) {
            const theta = (i / POINTS_PER_LAYER) * Math.PI * 2 + (l * 0.2); // Twist the mesh slightly
            pts.push({
                x: Math.cos(theta) * radius,
                y: y,
                z: Math.sin(theta) * radius,
                layer: l,
                index: i,
                radius: radius, // Store for logic
                theta: theta
            });
        }
    }
    return pts;
  }, []);

  useAnimationFrame((t) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handling
    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    ctx.clearRect(0, 0, width, height);

    const time = t * 0.0002;
    const rotateY = time;
    const tiltX = 0.25; // Tilt to see into the funnel

    // --- 1. RENDER MESH ---
    
    // Project function
    const project = (x: number, y: number, z: number) => {
        // Rotate Y (Spin)
        let rx = x * Math.cos(rotateY) - z * Math.sin(rotateY);
        let rz = z * Math.cos(rotateY) + x * Math.sin(rotateY);
        
        // Rotate X (Tilt)
        let ry = y * Math.cos(tiltX) - rz * Math.sin(tiltX);
        let rz2 = rz * Math.cos(tiltX) + y * Math.sin(tiltX);

        const scale = FL / (FL + rz2);
        return {
            x: cx + rx * scale,
            y: cy + ry * scale,
            scale,
            z: rz2
        };
    };

    // Calculate all projected points first
    const projPoints = mesh.map(p => ({...p, ...project(p.x, p.y, p.z)}));

    // Draw Lines
    ctx.lineWidth = 1;
    
    // Vertical connections (Flow lines)
    ctx.strokeStyle = 'rgba(26, 26, 26, 0.1)';
    for (let i = 0; i < mesh.length; i++) {
        const p1 = projPoints[i];
        // Connect to next layer same index
        const nextLayerIdx = i + POINTS_PER_LAYER;
        if (nextLayerIdx < mesh.length) {
            const p2 = projPoints[nextLayerIdx];
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
    }

    // Horizontal rings
    for (let l = 0; l < LAYER_COUNT; l++) {
        const startIdx = l * POINTS_PER_LAYER;
        
        // Style: Top rings faint, bottom rings darker/gold (Concentration)
        const progress = l / (LAYER_COUNT - 1);
        if (progress > 0.7) ctx.strokeStyle = `rgba(197, 160, 89, ${0.2 + progress * 0.3})`;
        else ctx.strokeStyle = `rgba(26, 26, 26, ${0.1 + progress * 0.1})`;

        ctx.beginPath();
        for (let i = 0; i < POINTS_PER_LAYER; i++) {
            const p1 = projPoints[startIdx + i];
            const nextI = (i + 1) % POINTS_PER_LAYER;
            const p2 = projPoints[startIdx + nextI];
            if (i === 0) ctx.moveTo(p1.x, p1.y);
            else ctx.lineTo(p1.x, p1.y);
            
            // Close loop
            if (i === POINTS_PER_LAYER - 1) ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();
    }

    // --- 2. ACTIVE DATA DROPS ---
    
    // Spawn drops
    if (Math.random() > 0.96) {
        drops.current.push({ 
            t: 0, 
            thetaOffset: Math.random() * Math.PI * 2, 
            speed: 0.005 + Math.random() * 0.005 
        });
    }

    // Update & Draw Drops
    for (let i = drops.current.length - 1; i >= 0; i--) {
        const d = drops.current[i];
        d.t += d.speed;
        
        if (d.t >= 1) {
            drops.current.splice(i, 1);
            continue;
        }

        // Calculate position based on funnel math (Updated sizing)
        const progress = d.t;
        const y = progress * 220 - 110;
        const radius = 110 * (1 - Math.pow(progress, 0.7)) + 20;
        // Spiral motion as it drops
        const spiralTheta = d.thetaOffset + (progress * Math.PI * 4); 

        const wx = Math.cos(spiralTheta) * radius;
        const wz = Math.sin(spiralTheta) * radius;

        const p = project(wx, y, wz);

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = colors.gold;
        ctx.fill();
        
        // Trail
        if (progress > 0.05) {
             const prevProgress = progress - 0.05;
             const prevY = prevProgress * 220 - 110;
             const prevR = 110 * (1 - Math.pow(prevProgress, 0.7)) + 20;
             const prevTheta = d.thetaOffset + (prevProgress * Math.PI * 4);
             const prevP = project(Math.cos(prevTheta) * prevR, prevY, Math.sin(prevTheta) * prevR);
             
             ctx.beginPath();
             ctx.moveTo(p.x, p.y);
             ctx.lineTo(prevP.x, prevP.y);
             ctx.strokeStyle = `rgba(197, 160, 89, ${0.5 * p.scale})`;
             ctx.stroke();
        }
    }

    // --- 3. CORE (The Conversion Point) ---
    const bottomP = project(0, 120, 0); // Adjusted for new scale
    
    // Core Glow
    const pulse = 1 + Math.sin(t * 0.008) * 0.15;
    const grad = ctx.createRadialGradient(bottomP.x, bottomP.y, 5 * bottomP.scale, bottomP.x, bottomP.y, 40 * bottomP.scale * pulse);
    grad.addColorStop(0, 'rgba(197, 160, 89, 0.6)');
    grad.addColorStop(1, 'rgba(197, 160, 89, 0)');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(bottomP.x, bottomP.y, 40 * bottomP.scale * pulse, 0, Math.PI * 2);
    ctx.fill();
    
    // Core Solid
    ctx.fillStyle = colors.gold;
    ctx.beginPath();
    ctx.arc(bottomP.x, bottomP.y, 4 * bottomP.scale, 0, Math.PI * 2);
    ctx.fill();

  });

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Removed Text Overlay as requested */}
    </div>
  );
};

export default PillarVisual_Catchment;
