import { getScoreColor } from '../lib/score';

interface Props {
  score: number;
}

export function ScoreBadge({ score }: Props) {
  const color = getScoreColor(score);
  
  // Tailwind arbitrary values for colored shadow and background tint
  return (
    <span 
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap"
      style={{
        backgroundColor: `${color}33`, // 20% opacity hex
        color: color
      }}
    >
      Score: {score}
    </span>
  );
}
