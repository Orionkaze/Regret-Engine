import { useEffect, useState } from 'react';

const MESSAGES = [
  "Calculating your poor choices...",
  "Consulting the regret oracle...",
  "This might sting a little...",
  "Preparing your consequences...",
];

export function LoadingState() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((idx) => (idx + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6 w-full mt-6" role="status" aria-label="Loading your results...">
      <div className="w-9 h-9 border-[3px] border-border border-t-accent-light rounded-full animate-spin flex-shrink-0" />
      <div className="h-6 flex items-center overflow-hidden">
        <span
          key={msgIdx}
          className="text-[15px] text-text-muted italic text-center animate-[shimmer_1.5s_ease-in-out_infinite]"
        >
          {MESSAGES[msgIdx]}
        </span>
      </div>
    </div>
  );
}
