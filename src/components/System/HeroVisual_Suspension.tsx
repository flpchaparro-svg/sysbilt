import React, { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

const CUBE_SIZE = 60;
const STACK_GAP = 65; 
const FL = 850; 
const CUBE_COUNT = 7;

// --- MATH HELPERS ---
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

const rotateZ = (x: number, y: number, z: number, angle: number) => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c - y * s, y: x * s + y * c, z };
};

const project = (x: number, y: number, z: number) => {
  // Prevent division by zero or negative scale if z gets too close to -FL
  const safeZ = Math.max(z, -FL + 10); 
  const scale = FL / (FL + safeZ);
  return { x: x * scale, y: y * scale, scale };
};

const HeroVisual_Suspension: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  // FIX: Initialize array with nulls to prevent index errors on first frame
  const cubeRefs = useRef<(SVGPathElement | null)[]>(new Array(CUBE_COUNT).fill(null));
  const coreRef = useRef<SVGPathElement>(null);

  // Physics State
  const state = useRef({
    mouseX: 0,
    currentSway: 0,
    rotation: 0,
    coreRotation: 0
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // FIX: Prevent Divide by Zero (NaN propagation)
    if (rect.width === 0) return;
    
    const centerX = rect.width / 2;
    // Normalize -1 to 1
    state.current.mouseX = (e.clientX - rect.left - centerX) / centerX;
  };

  const handleMouseLeave = () => {
    state.current.mouseX = 0;
  };

  // --- RENDER LOOP ---
  useAnimationFrame((t) => {
    // 1. Update Physics (Smooth Lerp)
    const targetSway = state.current.mouseX * 0.2; // Max sway angle
    state.current.currentSway += (targetSway - state.current.currentSway) * 0.05; // Ease factor
    state.current.rotation = t * 0.0005; // Constant spin for stack (Clockwise)
    state.current.coreRotation = t * -0.0008; // Counter-spin for core (Negative)

    const { currentSway, rotation, coreRotation } = state.current;
    
    // 2. Render Structure (7 Cubes forming a "7")
    const pivotIndex = 2; // The Diamond/Core remains at the center of the stem

    for (let i = 0; i < CUBE_COUNT; i++) {
        const r = CUBE_SIZE / 2;
        // Base Vertices (Cube)
        const verts = [
            { x: -r, y: -r, z: -r }, { x: r, y: -r, z: -r }, { x: r, y: r, z: -r }, { x: -r, y: r, z: -r }, // Front
            { x: -r, y: -r, z: r }, { x: r, y: -r, z: r }, { x: r, y: r, z: r }, { x: -r, y: r, z: r }      // Back
        ];

        // Edges
        const edges = [
            [0,1], [1,2], [2,3], [3,0],
            [4,5], [5,6], [6,7], [7,4],
            [0,4], [1,5], [2,6], [3,7]
        ];

        // --- CALCULATE POSITION ---
        let cx = 0;
        let cy = 0;

        if (i <= 4) {
            // STEM (Indices 0, 1, 2, 3, 4)
            // Diagonal Slant: Top Right (0) to Bottom Left (4)
            const slant = 25; 
            cy = (i - pivotIndex) * STACK_GAP; // 2 is center (0)
            cx = (pivotIndex - i) * slant;     // 0 moves right (+), 4 moves left (-)
        } else {
            // TOP BAR (Indices 5, 6)
            // Attaches to Top of Stem (Index 0) and extends LEFT
            const c0y = (0 - pivotIndex) * STACK_GAP; // Y of Cube 0
            const c0x = (pivotIndex - 0) * 25;        // X of Cube 0
            
            const barOffset = i - 4; // 1 for Cube 5, 2 for Cube 6
            cy = c0y;
            cx = c0x - (barOffset * STACK_GAP);
        }

        // Transform Cube
        const projected = verts.map(v => {
            let px = v.x + cx;
            let py = v.y + cy;
            let pz = v.z;

            // Rigid Sway (Rotate whole structure around (0,0) pivot)
            const swayed = rotateZ(px, py, pz, -currentSway); 
            px = swayed.x; py = swayed.y; pz = swayed.z;

            // Global Spin (Y axis)
            const spun = rotateY(px, py, pz, rotation);
            
            return project(spun.x, spun.y, spun.z);
        });

        // Draw Cube Wireframe
        // FIX: Ensure ref exists before accessing
        const cubePath = cubeRefs.current[i];
        if (cubePath) {
            let d = "";
            edges.forEach(edge => {
               d += `M ${projected[edge[0]].x} ${projected[edge[0]].y} L ${projected[edge[1]].x} ${projected[edge[1]].y} `;
            });
            cubePath.setAttribute('d', d);
            // Dynamic opacity based on sway intensity
            cubePath.setAttribute('stroke-opacity', String(0.3 + Math.abs(currentSway)));
        }

        // --- RENDER CORE (Wireframe Gold Octahedron/Diamond inside Index 2) ---
        if (i === pivotIndex && coreRef.current) {
            const cr = CUBE_SIZE * 0.35; // Size: 35% of the box
            
            // Octahedron Vertices (Diamond Shape)
            const coreVerts = [
                { x: 0, y: -cr, z: 0 },  // Top
                { x: 0, y: cr, z: 0 },   // Bottom
                { x: -cr, y: 0, z: 0 },  // Mid Left
                { x: cr, y: 0, z: 0 },   // Mid Right
                { x: 0, y: 0, z: -cr },  // Mid Front
                { x: 0, y: 0, z: cr }    // Mid Back
            ];
            
            // Connect Top to Equator, Bottom to Equator, and Equator Ring
            const coreEdges = [
                [0,2], [0,3], [0,4], [0,5], // Top Pyramid
                [1,2], [1,3], [1,4], [1,5], // Bottom Pyramid
                [2,4], [4,3], [3,5], [5,2]  // Equator Ring
            ];

            const projectedCore = coreVerts.map(v => {
               // 1. Position in stack (0 for index 2 because cx,cy are 0)
               let px = v.x + cx;
               let py = v.y + cy;
               let pz = v.z;

               // 2. Apply Sway (Stays locked inside the swaying box)
               const swayed = rotateZ(px, py, pz, -currentSway);
               
               // 3. Apply Independent Spin (Counter-Rotation)
               const spun = rotateY(swayed.x, swayed.y, swayed.z, coreRotation);
               
               return project(spun.x, spun.y, spun.z);
            });

            let coreD = "";
            coreEdges.forEach(edge => {
               coreD += `M ${projectedCore[edge[0]].x} ${projectedCore[edge[0]].y} L ${projectedCore[edge[1]].x} ${projectedCore[edge[1]].y} `;
            });
            coreRef.current.setAttribute('d', coreD);
        }
    }

    // Shadow Logic
    if (shadowRef.current) {
        // Shadow moves opposite to sway to simulate ground plane perspective
        const sx = currentSway * 100; 
        shadowRef.current.setAttribute('transform', `translate(${sx}, 0)`);
    }
  });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center overflow-visible cursor-crosshair"
    >
      <svg viewBox="-300 -300 600 600" className="w-full h-full overflow-visible pointer-events-none">
        <g transform="translate(0, 50)">
           {/* SHADOW */}
           <ellipse 
             ref={shadowRef}
             cx="0" cy="280" rx="60" ry="10" 
             fill="var(--dark)" opacity="0.1" 
             style={{ filter: 'blur(8px)', transition: 'transform 0.1s linear' }} 
           />

           {/* WIREFRAME CUBES (Black) - 7 Cubes */}
           {[0, 1, 2, 3, 4, 5, 6].map(i => (
             <path 
               key={i}
               ref={(el) => { cubeRefs.current[i] = el; }}
               fill="none"
               stroke="var(--dark)"
               strokeWidth="1.2"
               strokeLinecap="round"
               strokeLinejoin="round"
             />
           ))}

           {/* WIREFRAME GOLD DIAMOND (Transparent) */}
           <path 
             ref={coreRef}
             fill="none"
             stroke="var(--gold)"
             strokeWidth="1.5"
             strokeLinecap="round"
             strokeLinejoin="round"
             style={{ filter: 'drop-shadow(0 0 5px rgba(197, 160, 89, 0.4))' }}
           />
        </g>
      </svg>
    </div>
  );
};

export default HeroVisual_Suspension;