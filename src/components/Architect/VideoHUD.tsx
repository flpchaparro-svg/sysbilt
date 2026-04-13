import React from 'react';

/**
 * VideoHUD - A transparent overlay for the video player
 * This component renders ONLY visual overlays (scanlines, "LIVE FEED" indicator)
 * It does NOT render any <video> element - the main video is handled by the parent component
 */
const VideoHUD: React.FC = () => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* SCANLINES OVERLAY */}
      <div 
        className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat" 
      />
      
      {/* LIVE FEED INDICATOR */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <div className="w-2 h-2 bg-red-solid rounded-full animate-pulse" />
        <span className="font-mono text-[10px] text-red-text tracking-widest">LIVE FEED</span>
      </div>

      {/* CORNER BRACKETS - Technical Frame */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-white/30" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-white/30" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-white/30" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-white/30" />
    </div>
  );
};

export default VideoHUD;
