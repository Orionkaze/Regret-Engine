import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { api } from '../lib/api';
import { DecisionInput } from '../components/DecisionInput';
import { LoadingState } from '../components/LoadingState';

export function Home() {
  const navigate = useNavigate();
  const { decision, setDecision, mode, setMode, setSimulationResult, user } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.simulate(decision, mode, user?.id);
      setSimulationResult(result);
      navigate('/result');
    } catch (err: any) {
      console.error('[handleSimulate]', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-content mx-auto px-4 lg:px-16 pb-24 w-full">
      <div className="flex justify-center mt-12 mb-10 md:mb-16">
        <div className="flex flex-col items-center">
          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] font-black tracking-tighter text-text-primary leading-[1.1] mb-4 text-center">
            Regret Engine
          </h1>
          <p className="text-center text-text-muted text-base md:text-lg max-w-lg">
            You type a bad decision. We tell you exactly how badly it ruins your life.
          </p>
        </div>
      </div>

      <div className="opacity-0 animate-[fadeUp_600ms_ease-out_300ms_forwards]">
        {isLoading ? (
          <LoadingState />
        ) : (
          <DecisionInput 
            decision={decision}
            setDecision={setDecision}
            mode={mode}
            setMode={setMode}
            onSubmit={handleSimulate}
          />
        )}
        
        {error && (
          <div className="text-center mt-4 text-brand-danger font-semibold bg-brand-danger/10 py-2 rounded-inner max-w-card mx-auto">
            {error}
          </div>
        )}
      </div>
      
      {!isLoading && (
        <div className="mt-20 text-center opacity-0 animate-[fadeIn_800ms_ease-out_600ms_forwards]">
          <button 
            onClick={() => navigate('/leaderboard')}
            className="text-text-muted hover:text-accent-light font-medium transition-colors cursor-pointer"
          >
            See what others regret →
          </button>
        </div>
      )}
    </div>
  );
}
