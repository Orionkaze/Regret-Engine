import { useEffect, useState } from 'react';
import { getScoreColor, getScoreLabel } from '../lib/score';

interface Props {
  score: number;
}

export function RegretScore({ score }: Props) {
  const [displayScore, setDisplayScore] = useState(0);
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  useEffect(() => {
    let start = performance.now();
    const duration = 800; // ms

    const update = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }, [score]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius; // ~502.65
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <div className="flex flex-col items-center gap-3 my-8 opacity-0 animate-[fadeIn_300ms_ease-out_200ms_forwards]">
      <div className="relative w-[180px] h-[180px] flex items-center justify-center">
        <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
          {/* Background track */}
          <circle
            cx="90" cy="90" r={radius}
            stroke="#2D2D44"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress arc */}
          <circle
            cx="90" cy="90" r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: circumference, // start empty
              animation: `scoreReveal 800ms cubic-bezier(0.4, 0, 0.2, 1) 200ms forwards`,
            } as React.CSSProperties & { '--target-offset': number }}
            className="score-arc"
          />
        </svg>
        <span
          className="absolute text-[48px] font-black"
          style={{ color, fontVariantNumeric: 'tabular-nums' }}
        >
          {displayScore}
        </span>
      </div>
      <div
        className="text-base font-semibold"
        style={{ color }}
      >
        {label}
      </div>

      <style>{`
        @keyframes scoreReveal {
          from { stroke-dashoffset: ${circumference}; }
          to { stroke-dashoffset: ${strokeDashoffset}; }
        }
      `}</style>
    </div>
  );
}
