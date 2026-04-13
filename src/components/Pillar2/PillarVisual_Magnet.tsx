import React, { useEffect, useRef } from 'react';
import { colors } from '../../constants/theme';

const PillarVisual_Magnet: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 500;
    let height = canvas.height = canvas.parentElement?.clientHeight || 450;

    // --- RESPONSIVE SCALING ---
    // Base design assumes ~500x450 area. We calculate a ratio for smaller screens.
    // We limit max scale to 1 so it doesn't get huge on desktop.
    let scale = Math.min(width / 500, height / 400, 1); 

    // --- CONFIG (SCALED) ---
    const BASE_CARD_W = 220;
    const BASE_CARD_H = 300;
    let CARD_W = BASE_CARD_W * scale;
    let CARD_H = BASE_CARD_H * scale;
    
    let CENTER_X = width / 2;
    let CENTER_Y = height / 2;
    
    // State Variables
    let cardOpacity = 0;    
    let contentOpacity = 0; 
    let fillLevel = 0;      
    
    // Lifecycle State
    type AnimState = 'INIT' | 'IDLE_EMPTY' | 'BUILDING' | 'COMPLETE' | 'CLEARING';
    let currentState: AnimState = 'INIT';
    
    let timer = 0;
    let cardId = 1001; 
    
    interface Particle {
        x: number; y: number;
        tx: number; ty: number; 
        speed: number;
        color: string;
        size: number;
        dead: boolean;
    }
    
    let particles: Particle[] = [];

    // Helper to spawn data particles
    const spawnParticle = () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(width, height) * 0.7; 
        
        // Target specific zones (SCALED OFFSETS)
        const zone = Math.random();
        let tx = 0, ty = 0;
        
        if(zone < 0.2) { // Photo Area
            const r = Math.random() * 30 * scale;
            const a = Math.random() * Math.PI * 2;
            tx = Math.cos(a) * r;
            ty = Math.sin(a) * r - (70 * scale);
        } else if (zone < 0.6) { // Text lines
            tx = (Math.random() - 0.5) * 160 * scale;
            ty = Math.random() * 80 * scale;
        } else { // Score/Badge
            tx = 80 * scale;
            ty = -120 * scale;
        }

        particles.push({
            x: CENTER_X + Math.cos(angle) * dist,
            y: CENTER_Y + Math.sin(angle) * dist,
            tx: tx,
            ty: ty,
            speed: 0.084 + Math.random() * 0.056, // 30% slower (0.7x original)
            color: Math.random() > 0.7 ? 'rgba(197, 160, 89, 0.3)' : 'rgba(26, 26, 26, 0.2)',
            size: (1.5 + Math.random() * 1.5) * scale,
            dead: false
        });
    };

    const drawCard = (frameAlpha: number, dataAlpha: number, progress: number) => {
        const x = CENTER_X - CARD_W / 2;
        const y = CENTER_Y - CARD_H / 2;
        
        ctx.save();
        
        // --- 1. CARD FRAME ---
        ctx.globalAlpha = frameAlpha;
        
        // Shadow
        ctx.shadowColor = 'rgba(197, 160, 89, 0.1)';
        ctx.shadowBlur = 30 * scale;
        ctx.shadowOffsetY = 15 * scale;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; 
        ctx.beginPath();
        ctx.roundRect(x, y, CARD_W, CARD_H, 6 * scale);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Border
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.15)';
        ctx.lineWidth = 1; // Keep thin lines
        ctx.stroke();

        // Corner Accents
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.3)';
        const cornerSize = 12 * scale;
        ctx.beginPath(); 
        ctx.moveTo(x, y+cornerSize); ctx.lineTo(x, y); ctx.lineTo(x+cornerSize, y); // TL
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x+CARD_W-cornerSize, y); ctx.lineTo(x+CARD_W, y); ctx.lineTo(x+CARD_W, y+cornerSize); // TR
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y+CARD_H-cornerSize); ctx.lineTo(x, y+CARD_H); ctx.lineTo(x+cornerSize, y+CARD_H); // BL
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x+CARD_W-cornerSize, y+CARD_H); ctx.lineTo(x+CARD_W, y+CARD_H); ctx.lineTo(x+CARD_W, y+CARD_H-cornerSize); // BR
        ctx.stroke();

        // --- 2. STATIC PLACEHOLDERS ---
        const photoCX = x + CARD_W/2;
        const photoCY = y + (70 * scale);
        const startY = y + (130 * scale);
        const photoRad = 35 * scale;

        // Photo Ring
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.05)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(photoCX, photoCY, photoRad, 0, Math.PI*2);
        ctx.stroke();

        // Text Lines
        ctx.fillStyle = 'rgba(26, 26, 26, 0.03)';
        ctx.fillRect(x + (40 * scale), startY + (4 * scale), CARD_W - (80 * scale), 8 * scale); 
        
        for(let i=0; i<3; i++) {
            const ly = startY + (60 * scale) + (i * 25 * scale);
            ctx.fillRect(x + (50 * scale), ly + (4 * scale), CARD_W - (90 * scale), 8 * scale); 
            ctx.strokeStyle = 'rgba(26, 26, 26, 0.05)';
            ctx.strokeRect(x + (25 * scale), ly, 16 * scale, 16 * scale); 
        }

        // --- 3. DYNAMIC DATA ---
        const activeAlpha = frameAlpha * dataAlpha;
        
        if (activeAlpha > 0.01) {
            ctx.globalAlpha = activeAlpha;

            // A. Profile Photo
            if (progress > 0) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(photoCX, photoCY, photoRad, 0, Math.PI*2);
                ctx.clip();
                
                const fillH = (70 * scale) * progress;
                ctx.fillStyle = 'rgba(26, 26, 26, 0.1)';
                ctx.fillRect(photoCX - photoRad, photoCY + photoRad - fillH, photoRad * 2, fillH);
                
                if (progress > 0.6) {
                    ctx.fillStyle = colors.dark;
                    // Head
                    ctx.beginPath(); ctx.arc(photoCX, photoCY - (5*scale), 12*scale, 0, Math.PI*2); ctx.fill();
                    // Body
                    ctx.beginPath(); ctx.arc(photoCX, photoCY + (35*scale), 25*scale, Math.PI, 0); ctx.fill();
                }
                ctx.restore();
                
                ctx.strokeStyle = colors.gold;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(photoCX, photoCY, photoRad, -Math.PI/2, (-Math.PI/2) + (Math.PI*2 * progress));
                ctx.stroke();
            }

            // B. Text Lines
            if (progress > 0.2) {
                ctx.fillStyle = colors.dark;
                ctx.fillRect(x + (40 * scale), startY, (CARD_W - 80 * scale) * Math.min(1, (progress - 0.2)*3), 2 * scale);
            }
            if (progress > 0.3) {
                ctx.fillStyle = colors.gold;
                ctx.fillRect(x + (70 * scale), startY + (24 * scale), (CARD_W - 140 * scale) * Math.min(1, (progress - 0.3)*3), 2 * scale);
            }

            // C. Data Rows
            for(let i=0; i<3; i++) {
                const ly = startY + (60 * scale) + (i * 25 * scale);
                const threshold = 0.4 + (i * 0.15);
                
                if (progress > threshold) {
                    ctx.fillStyle = colors.gold;
                    ctx.fillRect(x + (27 * scale), ly + (2 * scale), 12 * scale, 12 * scale);
                    
                    ctx.fillStyle = colors.dark;
                    const barProg = Math.min(1, (progress - threshold) * 5);
                    ctx.fillRect(x + (50 * scale), ly + (6 * scale), (CARD_W - 90 * scale) * barProg, 4 * scale);
                }
            }

            // D. Verified Stamp
            if (progress >= 0.9) {
                ctx.save();
                ctx.translate(CENTER_X, CENTER_Y);
                ctx.rotate(-0.15);
                
                ctx.strokeStyle = colors.gold;
                ctx.lineWidth = 2;
                const sw = 140 * scale; 
                const sh = 40 * scale;
                
                ctx.beginPath();
                ctx.moveTo(-sw/2 + 10, -sh/2); ctx.lineTo(-sw/2, -sh/2); ctx.lineTo(-sw/2, sh/2); ctx.lineTo(-sw/2 + 10, sh/2);
                ctx.moveTo(sw/2 - 10, -sh/2); ctx.lineTo(sw/2, -sh/2); ctx.lineTo(sw/2, sh/2); ctx.lineTo(sw/2 - 10, sh/2);
                ctx.stroke();
                
                ctx.fillStyle = colors.gold;
                ctx.font = `bold ${12 * scale}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`PROFILE_ID [${cardId}]`, 0, 0);
                
                ctx.restore();
            }

            // E. HOT Badge
            if (progress > 0.7) {
                const badgeAlpha = Math.min(1, (progress - 0.7) * 4);
                ctx.globalAlpha = activeAlpha * badgeAlpha;
                
                const badgeX = x + CARD_W - (25 * scale);
                const badgeY = y + (25 * scale);
                const badgeR = 14 * scale;
                
                ctx.beginPath();
                ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI*2);
                ctx.fillStyle = 'rgba(226, 30, 63, 0.1)';
                ctx.fill();
                
                ctx.strokeStyle = colors.redSolid;
                ctx.lineWidth = 1;
                ctx.stroke();
                
                ctx.fillStyle = colors.redSolid;
                ctx.font = `bold ${8 * scale}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText("HOT", badgeX, badgeY);
            }
        }

        ctx.restore();
    };

    const animate = () => {
        if (canvas.parentElement) {
             const pWidth = canvas.parentElement.clientWidth;
             const pHeight = canvas.parentElement.clientHeight;
             if(canvas.width !== pWidth || canvas.height !== pHeight){
                 width = canvas.width = pWidth;
                 height = canvas.height = pHeight;
                 
                 // Recalculate scale on resize
                 scale = Math.min(width / 500, height / 400, 1);
                 CARD_W = BASE_CARD_W * scale;
                 CARD_H = BASE_CARD_H * scale;
                 CENTER_X = width / 2;
                 CENTER_Y = height / 2;
             }
        }

        ctx.clearRect(0, 0, width, height);

        // --- STATE MACHINE (TUNED - 30% SLOWER) ---
        switch (currentState) {
            case 'INIT':
                cardOpacity += 0.091; // 30% slower (0.7x original 0.13)
                if (cardOpacity >= 1) { cardOpacity = 1; currentState = 'IDLE_EMPTY'; timer = 0; }
                break;
            case 'IDLE_EMPTY':
                timer++;
                if (timer > 9) { currentState = 'BUILDING'; contentOpacity = 1; } // 30% slower (6 / 0.7 ≈ 9)
                break;
            case 'BUILDING':
                if (fillLevel < 1) {
                    fillLevel += 0.00672; // 30% slower (0.7x original 0.0096)
                    if (Math.random() > 0.45) spawnParticle(); 
                } else {
                    fillLevel = 1; currentState = 'COMPLETE'; timer = 0;
                }
                break;
            case 'COMPLETE':
                timer++;
                if (timer > 36) { currentState = 'CLEARING'; } // 30% slower (25 / 0.7 ≈ 36)
                break;
            case 'CLEARING':
                contentOpacity -= 0.0672; // 30% slower (0.7x original 0.096)
                if (contentOpacity <= 0) {
                    contentOpacity = 0; fillLevel = 0; cardId++; currentState = 'IDLE_EMPTY'; timer = 0;
                }
                break;
        }

        drawCard(cardOpacity, contentOpacity, fillLevel);

        // --- PARTICLE PHYSICS ---
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const dx = (CENTER_X + p.tx) - p.x;
            const dy = (CENTER_Y + p.ty) - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (!p.dead) {
                p.x += dx * p.speed;
                p.y += dy * p.speed;
                if (dist < 10) p.dead = true;
                
                let pAlpha = 1;
                if (currentState === 'CLEARING') pAlpha = contentOpacity;
                
                if (pAlpha > 0.01) {
                    ctx.save();
                    ctx.globalAlpha = pAlpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                    // Trail
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - dx*0.2, p.y - dy*0.2);
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = p.size * 0.5;
                    ctx.stroke();
                    ctx.restore();
                }
            } else {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default PillarVisual_Magnet;
