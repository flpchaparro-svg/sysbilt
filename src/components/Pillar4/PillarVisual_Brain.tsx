import React, { useEffect, useRef } from 'react';
import { colors } from '../../constants/theme';

// --- CONFIGURATION ---
const FL = 1000; // Focal Length (Depth perception)
const PARTICLE_COUNT = 500; // Density of the brain
const CONNECTION_DIST = 45; // Max distance to form a synapse
const ROTATION_SPEED = 0.002; // Idle spin speed

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  connections: number[]; // Indices of connected points
}

interface Pulse {
  path: [number, number]; // [startIndex, endIndex]
  progress: number; // 0 to 1
  speed: number;
}

// --- 3D UTILS ---
const rotateX = (x: number, y: number, z: number, angle: number) => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x, y: y * c - z * s, z: y * s + z * c };
};

const rotateY = (x: number, y: number, z: number, angle: number) => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c + z * s, y, z: -x * s + z * c };
};

const project = (x: number, y: number, z: number, width: number, height: number) => {
  const scale = FL / (FL + z);
  return {
    x: width / 2 + x * scale,
    y: height / 2 + y * scale,
    scale,
    z
  };
};

const PillarVisual_Brain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State refs for animation loop
  const pointsRef = useRef<Point3D[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. GENERATE GEOMETRY (Two Hemispheres)
    const pts: Point3D[] = [];
    const scale = 140; // Size of the brain

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Hemisphere (-1 for left, 1 for right)
      const hemi = Math.random() > 0.5 ? 1 : -1;
      
      // Random point in sphere
      // We use rejection sampling or uniform sphere distribution, then deform
      let u = Math.random();
      let v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.sin(phi) * Math.sin(theta);
      let z = Math.cos(phi);

      // --- DEFORMATION TO BRAIN SHAPE ---
      // 1. Flatten the side facing the center (separation of hemispheres)
      x = Math.abs(x) * hemi; 
      
      // 2. Separate hemispheres
      x += (hemi * 0.15); 

      // 3. Elongate (Front to Back)
      z *= 1.3; 

      // 4. Flatten Top/Bottom slightly
      y *= 0.9;

      // 5. Curve slightly (Temporal Lobes)
      // y += Math.sin(z) * 0.2; 

      const px = x * scale;
      const py = y * scale;
      const pz = z * scale;

      pts.push({
        x: px, y: py, z: pz,
        baseX: px, baseY: py, baseZ: pz,
        connections: []
      });
    }

    // 2. BUILD NETWORK (Connect neighbors)
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dz = pts[i].z - pts[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        // Connect if close enough (Synapses)
        if (dist < CONNECTION_DIST) {
          pts[i].connections.push(j);
          // Don't push back to j to keep directed or just render once? 
          // For visuals, we just need to know they are connected.
        }
      }
    }
    pointsRef.current = pts;

    // --- INTERACTION ---
    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize -1 to 1
        const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        mouseRef.current = { x: mx, y: my };
    };
    window.addEventListener('mousemove', handleMouseMove);


    // --- ANIMATION LOOP ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;

    const render = () => {
      // Resize
      if (canvas.width !== canvas.parentElement?.clientWidth || canvas.height !== canvas.parentElement?.clientHeight) {
         canvas.width = canvas.parentElement?.clientWidth || 600;
         canvas.height = canvas.parentElement?.clientHeight || 600;
      }
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Smooth Rotation Logic
      // Target is influenced by mouse
      targetRotationRef.current.y += ROTATION_SPEED; // Constant Spin
      targetRotationRef.current.x = mouseRef.current.y * 0.5; // Tilt with mouse Y
      
      // Add mouse X to Y rotation for interaction
      const targetY = targetRotationRef.current.y + (mouseRef.current.x * 0.5);

      // Lerp current to target
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.1;
      currentRotationRef.current.y += (targetY - currentRotationRef.current.y) * 0.1;

      const rX = currentRotationRef.current.x;
      const rY = currentRotationRef.current.y;

      // Project Points
      const projected = pointsRef.current.map(p => {
         let { x, y, z } = rotateY(p.baseX, p.baseY, p.baseZ, rY);
         ({ x, y, z } = rotateX(x, y, z, rX));
         const proj = project(x, y, z, width, height);
         return { ...proj, connections: p.connections };
      });

      // --- DRAW CONNECTIONS (The Lattice) ---
      ctx.lineWidth = 0.5;
      
      // We iterate points and their connections
      for (let i = 0; i < projected.length; i++) {
         const p1 = projected[i];
         // Opacity based on depth (fog)
         const alpha = Math.max(0.05, (p1.scale - 0.5)); // Fades out back
         
         ctx.strokeStyle = `rgba(197, 160, 89, ${alpha * 0.3})`; // Subtle Gold wireframe

         for (const neighborIdx of p1.connections) {
            const p2 = projected[neighborIdx];
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
         }
      }

      // --- SPAWN PULSES (Thoughts) ---
      if (Math.random() > 0.92) { // Frequency of thoughts
         // Pick random point
         const startIdx = Math.floor(Math.random() * projected.length);
         const p = pointsRef.current[startIdx];
         // Pick random connection
         if (p.connections.length > 0) {
            const endIdx = p.connections[Math.floor(Math.random() * p.connections.length)];
            pulsesRef.current.push({
               path: [startIdx, endIdx],
               progress: 0,
               speed: 0.05 + Math.random() * 0.05
            });
         }
      }

      // --- DRAW PULSES ---
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
         const pulse = pulsesRef.current[i];
         pulse.progress += pulse.speed;
         
         if (pulse.progress >= 1) {
            // Trigger chain reaction? Maybe later.
            pulsesRef.current.splice(i, 1);
            continue;
         }

         const p1 = projected[pulse.path[0]];
         const p2 = projected[pulse.path[1]];

         const cx = p1.x + (p2.x - p1.x) * pulse.progress;
         const cy = p1.y + (p2.y - p1.y) * pulse.progress;
         
         // Pulse Size depends on depth
         const size = 3 * p1.scale; 

         // Draw Glow
         ctx.fillStyle = colors.gold;
         ctx.shadowBlur = 10;
         ctx.shadowColor = colors.gold;
         ctx.beginPath();
         ctx.arc(cx, cy, size, 0, Math.PI*2);
         ctx.fill();
         ctx.shadowBlur = 0;
      }

      // --- DRAW NODES (Neurons) ---
      for (let i = 0; i < projected.length; i++) {
         const p = projected[i];
         const size = 1.2 * p.scale;
         const alpha = Math.max(0.1, (p.scale - 0.4));

         ctx.fillStyle = `rgba(26, 26, 26, ${alpha})`; // Ink nodes
         ctx.beginPath();
         ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
         ctx.fill();
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative overflow-hidden bg-cream cursor-move">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
    </div>
  );
};

export default PillarVisual_Brain;
