import React, { useState, useEffect } from 'react';

const ROLES = ["ARCHITECT", "NAVIGATOR", "ENGINEER"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const ScrambleTitle: React.FC = () => {
  const [text, setText] = useState("ARCHITECT");

  useEffect(() => {
    let scrambleInterval: NodeJS.Timeout;

    // FIX: Delay the start of the animation by 2.5s to prevent TBT (Total Blocking Time)
    const startTimeout = setTimeout(() => {
        let roleIndex = 0;
        scrambleInterval = setInterval(() => {
          roleIndex = (roleIndex + 1) % ROLES.length;
          const target = ROLES[roleIndex];
          let iterations = 0;
          
          const interval = setInterval(() => {
            setText(target.split("").map((_, i) => 
              i < iterations ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
            ).join(""));
            
            if (iterations >= target.length) clearInterval(interval);
            iterations += 1;
          }, 60);
        }, 7000);
    }, 2500);

    return () => {
        clearTimeout(startTimeout);
        if (scrambleInterval) clearInterval(scrambleInterval);
    };
  }, []);

  return (
    <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-text">
      [ <span aria-hidden="true">{text}</span> ]
      <span className="sr-only">REVENUE ENGINE ARCHITECT</span>
    </span>
  );
};

export default ScrambleTitle;
