import { cn } from '../lib/utils';
import type { SimulationMode } from '../store/useAppStore';

interface Props {
  mode: SimulationMode;
  setMode: (mode: SimulationMode) => void;
}

export function PersonalityToggle({ mode, setMode }: Props) {
  const modes: { id: SimulationMode; label: string; activeClass: string }[] = [
    { id: 'savage', label: '🔥 Savage', activeClass: 'bg-brand-danger/20 border-brand-danger text-brand-danger shadow-[0_0_16px_rgba(239,68,68,0.2)]' },
    { id: 'motivational', label: '✨ Motivational', activeClass: 'bg-brand-warning/20 border-brand-warning text-brand-warning shadow-[0_0_16px_rgba(245,158,11,0.2)]' },
    { id: 'reality', label: '📊 Reality Check', activeClass: 'bg-gray-500/20 border-gray-500 text-gray-400 shadow-[0_0_16px_rgba(107,114,128,0.2)]' },
  ];

  return (
    <div className="mt-6 w-full">
      <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-2">
        PERSONALITY MODE
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {modes.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                'w-full py-2.5 px-4 rounded-[10px] text-sm font-semibold border transition-all duration-200 ease-out',
                isActive 
                  ? m.activeClass 
                  : 'bg-bg-input border-border text-text-muted hover:border-accent-mid hover:text-accent-light'
              )}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
