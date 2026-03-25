import { ScoreBadge } from './ScoreBadge';
import { useAppStore } from '../store/useAppStore';

interface Reaction {
  type: string;
  user_id: string;
}

interface Props {
  decision: any;
  onReact: (decisionId: string, type: string) => void;
}

const REACTION_TYPES = [
  { id: 'skull', emoji: '💀' },
  { id: 'fire', emoji: '🔥' },
  { id: 'sob', emoji: '😭' },
  { id: 'relatable', emoji: '🫂' }
];

export function LeaderboardCard({ decision, onReact }: Props) {
  const { user } = useAppStore();

  const getReactionCount = (type: string) => {
    return decision.reactions?.filter((r: Reaction) => r.type === type).length || 0;
  };

  const hasReacted = (type: string) => {
    return decision.reactions?.some((r: Reaction) => r.type === type && r.user_id === user?.id);
  };

  return (
    <div className="bg-bg-card border border-border rounded-card p-6 md:p-8 shadow-lg transition-transform hover:-translate-y-[2px] animate-[fadeIn_400ms_ease-out_forwards] w-full">
      <div className="flex justify-between items-start gap-4 mb-5">
        <h3 className="text-xl md:text-2xl font-bold font-serif text-text-primary leading-tight">
          &ldquo;{decision.decision_text}&rdquo;
        </h3>
        <ScoreBadge score={decision.regret_score} />
      </div>
      
      <p className="text-text-muted italic text-[16px] mb-8 border-l-2 border-brand-danger/50 pl-4 py-1">
        "{decision.roast_text}"
      </p>
      
      <div className="flex flex-wrap gap-2.5 pt-5 border-t border-white/5">
        {REACTION_TYPES.map((rt) => {
          const count = getReactionCount(rt.id);
          const isActive = user && hasReacted(rt.id);
          return (
            <button
              key={rt.id}
              onClick={() => onReact(decision.id, rt.id)}
              disabled={!user}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-accent/20 border border-accent-mid text-text-primary' 
                  : 'bg-bg-input border border-border text-text-muted hover:border-text-muted'
              } ${!user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span>{rt.emoji}</span>
              {count > 0 && <span>{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
