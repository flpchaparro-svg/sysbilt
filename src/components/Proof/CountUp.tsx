import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CountUp: React.FC<{ value: number, suffix?: string, prefix?: string }> = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;
    
    // Handle decimal values by scaling up to ensure smooth animation
    const isDecimal = value % 1 !== 0;
    const scale = isDecimal ? 10 : 1; // Scale by 10 for 1 decimal place
    const scaledValue = Math.round(value * scale);
    const duration = 2000; // Same duration for all cards
    const steps = Math.max(scaledValue, 20); // Minimum 20 steps for smooth animation
    const incrementTime = duration / steps;
    const increment = scaledValue / steps; // Increment per step
    
    let current = 0;
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      current = value * progress;
      
      if (progress >= 1) {
        setCount(value); // Set final value exactly
        clearInterval(timer);
      } else {
        // For decimals, round to 1 decimal place during animation
        const displayCount = isDecimal ? Math.round(current * 10) / 10 : Math.round(current);
        setCount(displayCount);
      }
    }, 16); // ~60fps for smooth animation
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  // Format the display value
  const displayValue = count % 1 !== 0 ? count.toFixed(1) : count;

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
};

export default CountUp;
