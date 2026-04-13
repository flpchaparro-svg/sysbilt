import React, { useState, useRef } from 'react';
import { m, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { colors } from '../../constants/theme';

const PHI = (1 + Math.sqrt(5)) / 2;

const getVertices = (): number[][] => {
  const v: number[][] = [];
  v.push([-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0]);
  v.push([0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI]);
  v.push([PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]);
  return v;
};

const faces = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
];

const ProtocolVisual_Geodesic: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);

  useAnimationFrame((t) => {
    // Smooth, slow rotation
    setRotation({ x: t * 0.00005, y: t * 0.0001 });
  });

  const project = (p: number[], rX: number, rY: number) => {
    let [x, y, z] = p;
    
    // Rotation Y
    const cosY = Math.cos(rY);
    const sinY = Math.sin(rY);
    let x2 = x * cosY - z * sinY;
    let z2 = z * cosY + x * sinY;
    
    // Rotation X
    const cosX = Math.cos(rX);
    const sinX = Math.sin(rX);
    let y2 = y * cosX - z2 * sinX;
    let z3 = z2 * cosX + y * sinX;
    
    // Perspective
    const scale = 250 / (5 + z3); 
    return { x: x2 * scale, y: y2 * scale, z: z3 };
  };

  const vertices = getVertices();

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] flex items-center justify-center relative overflow-hidden cursor-crosshair"
    >
      <svg viewBox="-150 -150 300 300" className="w-full h-full pointer-events-none">
        <g>
          {faces.map((face, i) => {
            const p1 = project(vertices[face[0]], rotation.x, rotation.y);
            const p2 = project(vertices[face[1]], rotation.x, rotation.y);
            const p3 = project(vertices[face[2]], rotation.x, rotation.y);
            
            // Calculate Centroid
            const cx = (p1.x + p2.x + p3.x) / 3;
            const cy = (p1.y + p2.y + p3.y) / 3;
            
            // Depth for opacity fading
            const zDepth = (p1.z + p2.z + p3.z) / 3;
            
            const isHovered = hoveredFace === i;
            
            // VISUAL STYLES
            // Hover: Red, active. Passive: Dark, subtle.
            // Occasional Gold faces for texture.
            const strokeColor = isHovered ? colors.redSolid : colors.dark;
            const strokeWidth = isHovered ? 1.2 : 0.4;
            const strokeOpacity = isHovered ? 1 : (zDepth > 0.5 ? 0.1 : 0.3);
            
            const fillColor = isHovered ? colors.redSolid : (i % 5 === 0 ? colors.gold : 'transparent');
            const fillOpacity = isHovered ? 0.1 : (i % 5 === 0 ? 0.05 : 0);

            const pathData = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} Z`;

            return (
              <React.Fragment key={i}>
                <m.path
                  d={pathData}
                  initial={false}
                  animate={{ 
                    fill: fillColor, 
                    fillOpacity: fillOpacity,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeOpacity: strokeOpacity
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  pointerEvents="auto"
                  onMouseEnter={() => setHoveredFace(i)}
                  onMouseLeave={() => setHoveredFace(null)}
                  style={{ cursor: 'none' }} // Hide default cursor to emphasize the custom UI
                />
                
                {/* SOPHISTICATED TARGET LOCK UI */}
                <AnimatePresence>
                  {isHovered && (
                    <m.g
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      pointerEvents="none"
                    >
                      {/* Center Target */}
                      <circle cx={cx} cy={cy} r="1.5" fill={colors.redSolid} />
                      <circle cx={cx} cy={cy} r="4" stroke={colors.redSolid} strokeWidth="0.5" fill="none" opacity="0.6" />
                      
                      {/* Triangulation Lines (Connecting center to vertices) */}
                      <m.line x1={cx} y1={cy} x2={p1.x} y2={p1.y} stroke={colors.redSolid} strokeWidth="0.5" opacity="0.4" />
                      <m.line x1={cx} y1={cy} x2={p2.x} y2={p2.y} stroke={colors.redSolid} strokeWidth="0.5" opacity="0.4" />
                      <m.line x1={cx} y1={cy} x2={p3.x} y2={p3.y} stroke={colors.redSolid} strokeWidth="0.5" opacity="0.4" />
                      
                      {/* Vertex Markers */}
                      <circle cx={p1.x} cy={p1.y} r="1" fill={colors.redSolid} opacity="0.5" />
                      <circle cx={p2.x} cy={p2.y} r="1" fill={colors.redSolid} opacity="0.5" />
                      <circle cx={p3.x} cy={p3.y} r="1" fill={colors.redSolid} opacity="0.5" />
                    </m.g>
                  )}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </g>
      </svg>
      
    </div>
  );
};
export default ProtocolVisual_Geodesic;
