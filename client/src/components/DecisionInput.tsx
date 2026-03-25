import { useRef, useEffect } from 'react';
import { PersonalityToggle } from './PersonalityToggle';
import type { SimulationMode } from '../store/useAppStore';

interface Props {
  decision: string;
  setDecision: (text: string) => void;
  mode: SimulationMode;
  setMode: (mode: SimulationMode) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const PILLS = [
  "Skip the gym 🏋️", "Text my ex 💔", "Start coding at 2AM 💻",
  "Eat instant noodles again 🍜", "Pull an all-nighter 🦉",
  "Ghost someone 👻", "One more reel 📱"
];

export function DecisionInput({ decision, setDecision, mode, setMode, onSubmit, isLoading }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '80px';
      textareaRef.current.style.height = `${Math.max(80, textareaRef.current.scrollHeight)}px`;
    }
  }, [decision]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!decision.trim() || isLoading) return;
    onSubmit();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-bg-card border border-border rounded-card p-6 md:p-8 max-w-card mx-auto shadow-xl"
    >
      <label htmlFor="decision-input" className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-2">
        Your Terrible Decision
      </label>
      
      <textarea
        id="decision-input"
        ref={textareaRef}
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
        disabled={isLoading}
        placeholder="I'm thinking about quitting my job to become a DJ..."
        className="w-full bg-bg-input border border-border rounded-inner px-5 py-4 text-lg text-text-primary min-h-[80px] resize-none overflow-hidden focus:outline-none focus:border-accent-mid focus:shadow-[0_0_0_3px_#7C3AED33] transition-all disabled:opacity-50 placeholder-gray-600"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      
      <div className="flex flex-wrap gap-2 mt-4">
        {PILLS.map((pill) => (
          <button
            key={pill}
            type="button"
            disabled={isLoading}
            onClick={() => setDecision(pill)}
            className="bg-bg-input border border-border rounded-full px-3.5 py-1.5 text-[13px] text-text-muted cursor-pointer transition-all hover:border-accent-mid hover:text-accent-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pill}
          </button>
        ))}
      </div>

      <PersonalityToggle mode={mode} setMode={setMode} />

      <button
        type="submit"
        disabled={isLoading || !decision.trim()}
        className="mt-6 w-full bg-accent border-none rounded-inner p-4 text-base font-semibold text-text-primary cursor-pointer transition-all duration-200 hover:bg-accent-mid hover:shadow-[0_0_24px_#A78BFA44] hover:-translate-y-[1px] active:scale-[0.98] disabled:bg-border disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        Simulate My Regret →
      </button>
    </form>
  );
}
