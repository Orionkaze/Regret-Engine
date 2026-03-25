import { useEffect, useState } from 'react';
import { LeaderboardCard } from '../components/LeaderboardCard';
import { useAppStore } from '../store/useAppStore';
import { api } from '../lib/api';

export function Leaderboard() {
  const { user } = useAppStore();
  const [decisions, setDecisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const data = await api.getLeaderboard();
      setDecisions(data);
    } catch (err) {
      console.error('Failed to fetch leaderboard feed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReact = async (decisionId: string, type: string) => {
    if (!user) return;
    
    // Optimistic update mapping
    setDecisions(curr => curr.map(d => {
      if (d.id === decisionId) {
        const filtered = d.reactions?.filter((r: any) => r.user_id !== user.id) || [];
        return { ...d, reactions: [...filtered, { type, user_id: user.id }] };
      }
      return d;
    }));

    try {
      await api.reactToDecision(decisionId, type, user.id);
    } catch (err) {
      console.error(err);
      fetchFeed(); // Revert payload mapping on generic failure
    }
  };

  if (loading) {
    return <div className="text-center py-24 animate-[shimmer_1.5s_ease-in-out_infinite] text-text-muted italic">Polling global regret...</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 lg:px-16 py-12 md:py-24">
      <div className="text-center mb-16 animate-[fadeIn_300ms_ease-out_forwards]">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">The Hall of Shame 📉</h2>
        <p className="text-text-muted text-lg">A live feed of the worst decisions made on the internet today.</p>
      </div>
      
      {!user && (
        <div className="bg-accent-mid/10 border border-accent-mid/30 text-center p-4 rounded-inner mb-10 text-[14px] font-medium text-accent-light animate-[fadeIn_500ms_ease-out_forwards]">
          Sign in to react and judge other people's mistakes.
        </div>
      )}

      <div className="flex flex-col gap-6">
        {decisions.length > 0 ? decisions.map(d => (
          <LeaderboardCard key={d.id} decision={d} onReact={handleReact} />
        )) : (
          <div className="text-center py-16 bg-bg-card border border-border rounded-card shadow-sm animate-[fadeIn_500ms_ease-out_forwards]">
            <p className="text-text-muted italic">It's awfully quiet... be the first to make a bad decision.</p>
          </div>
        )}
      </div>
    </div>
  );
}
