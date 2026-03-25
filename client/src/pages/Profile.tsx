import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { api } from '../lib/api';

export function Profile() {
  const { user } = useAppStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    api.getUserStats(user.id)
      .then(data => setStats(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-[800px] mx-auto px-4 lg:px-16 py-24 text-center mt-12 animate-[fadeIn_300ms_ease-out_forwards]">
        <h2 className="text-3xl font-bold mb-4">Your Profile 💀</h2>
        <p className="text-text-muted">Sign in to see how many terrible decisions you've made.</p>
      </div>
    );
  }

  if (loading) return <div className="text-center py-24 mt-12 animate-[shimmer_1.5s_ease-in-out_infinite] text-text-muted italic">Computing your mistakes...</div>;

  return (
    <div className="max-w-[800px] mx-auto px-4 lg:px-16 py-12 md:py-24 animate-[fadeIn_300ms_ease-out_forwards]">
      <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tight">Your Regret Résumé 🪦</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16">
        <div className="bg-bg-card border border-border rounded-card p-8 flex flex-col justify-center items-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-danger opacity-5 blur-3xl pointer-events-none"></div>
          <span className="text-text-muted text-[13px] font-bold uppercase tracking-widest mb-2 z-10">Total Regret Score</span>
          <span className="text-[72px] font-black leading-none text-brand-danger z-10">
            {stats?.profile?.total_regret_score || 0}
          </span>
        </div>
        <div className="bg-bg-card border border-border rounded-card p-8 flex flex-col justify-center items-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-accent-light opacity-5 blur-3xl pointer-events-none"></div>
          <span className="text-text-muted text-[13px] font-bold uppercase tracking-widest mb-2 z-10">Decisions Made</span>
          <span className="text-[72px] font-black leading-none text-accent-light z-10">
            {stats?.profile?.decision_count || 0}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-bold uppercase tracking-widest text-text-muted mb-6">Habit Breakdown</h3>
      {stats?.habits?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {stats.habits.map((h: any) => (
             <div key={h.id} className="bg-bg-input border border-border rounded-full px-5 py-2 text-sm font-semibold flex items-center justify-between gap-4 shadow-sm hover:border-accent-mid transition-colors">
               <span className="capitalize text-text-primary">{h.category}</span>
               <span className="text-accent-light bg-accent-light/10 px-2.5 py-0.5 rounded-full">{h.count}</span>
             </div>
          ))}
        </div>
      ) : (
        <p className="text-text-muted italic opacity-75">You haven't made any categorized mistakes yet. Give it time.</p>
      )}

    </div>
  );
}
