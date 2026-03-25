import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { RegretScore } from '../components/RegretScore';
import { RoastCard } from '../components/RoastCard';
import { OutcomeCard } from '../components/OutcomeCard';
import { MoodGraph } from '../components/MoodGraph';

export function Result() {
  const navigate = useNavigate();
  const { decision, mode, simulationResult, clearResult } = useAppStore();

  useEffect(() => {
    if (!simulationResult) {
      navigate('/');
    }
  }, [simulationResult, navigate]);

  if (!simulationResult) return null;

  return (
    <div className="max-w-[800px] w-full mx-auto px-4 pb-24 flex flex-col items-center">
      
      {/* Decision Echo */}
      <div className="text-center mt-12 mb-8 opacity-0 animate-[fadeIn_300ms_ease-out_forwards]">
        <p className="text-sm font-semibold tracking-widest text-text-muted uppercase mb-3">
          You decided to:
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
          &ldquo;{decision}&rdquo;
        </h2>
        <span className="inline-block bg-bg-input border border-border text-text-muted text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          Mode: {mode}
        </span>
      </div>

      <RegretScore score={simulationResult.regretScore} />

      <div className="w-full flex justify-center">
        <RoastCard roast={simulationResult.roastText} repeatCount={simulationResult.repeat_count || 1} />
      </div>

      <div className="w-full mt-16">
        <h3 className="text-center text-text-muted font-bold tracking-widest uppercase text-sm mb-6 opacity-0 animate-[fadeIn_300ms_ease-out_1000ms_forwards]">
          Timeline of Regret
        </h3>
        <OutcomeCard outcomes={simulationResult.outcomes} />
      </div>

      <div className="w-full mt-10">
        <MoodGraph data={simulationResult.moodData} />
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-16 opacity-0 animate-[fadeIn_300ms_ease-out_2400ms_forwards]">
        <button 
          className="bg-bg-input border border-border text-text-primary px-6 py-3 rounded-lg font-semibold hover:bg-hover hover:border-accent-light transition-all shadow-md active:scale-95"
          onClick={() => {
            alert('Meme generator to be implemented in Phase 2!');
          }}
        >
          Share 📤
        </button>
        <button 
          className="bg-accent text-text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-mid hover:shadow-purple transition-all shadow-md active:scale-95"
          onClick={() => navigate('/leaderboard')}
        >
          Submit to Leaderboard
        </button>
        <button 
          onClick={() => {
            clearResult();
            navigate('/');
          }}
          className="bg-transparent border border-border text-text-muted px-6 py-3 rounded-lg font-medium hover:text-text-primary hover:border-text-muted transition-all active:scale-95"
        >
          Try Another
        </button>
      </div>

    </div>
  );
}
