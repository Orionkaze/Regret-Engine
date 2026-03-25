import { forwardRef } from 'react';
import { getScoreColor } from '../lib/score';

interface Props {
  decision: string;
  score: number;
  roast: string;
}

export const MemeCard = forwardRef<HTMLDivElement, Props>(({ decision, score, roast }, ref) => {
  const color = getScoreColor(score);

  return (
    <div 
      ref={ref}
      className="fixed -left-[9999px] top-0 w-[1080px] h-[1080px] bg-bg-primary flex flex-col justify-center items-center p-20 text-center"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${color}15 0%, #0F0E17 70%)`
      }}
    >
      <div className="text-[140px] font-black leading-none mb-4" style={{ color }}>
        {score}
      </div>
      
      <p className="text-[28px] font-bold text-text-muted uppercase tracking-[0.3em] mb-16">
        Regret Score
      </p>

      <h2 className="text-[64px] font-serif font-bold text-text-primary leading-[1.25] mb-20 max-w-[850px]">
        "{decision}"
      </h2>

      <div className="bg-[#1A1A2E] border border-[#2D2D44] p-12 rounded-[32px] max-w-[900px] shadow-[0_0_80px_rgba(0,0,0,0.5)]">
        <p className="text-[38px] italic text-text-primary leading-relaxed">
          "{roast}"
        </p>
      </div>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center items-center gap-4 opacity-80 mt-16">
        <p className="text-[32px] font-black tracking-tight">
          ☠️ <span className="text-accent-light">Regret</span><span className="text-text-primary">Engine</span>
        </p>
      </div>
    </div>
  );
});
