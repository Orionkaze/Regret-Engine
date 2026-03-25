interface Props {
  roast: string;
  repeatCount?: number;
}

export function RoastCard({ roast, repeatCount = 1 }: Props) {
  return (
    <div className="relative bg-bg-card border border-brand-danger/30 rounded-card p-7 md:p-8 mt-6 overflow-hidden opacity-0 animate-[fadeUp_400ms_ease-out_800ms_forwards] max-w-[800px] mx-auto shadow-[0_0_20px_rgba(239,68,68,0.15)]">
      
      <span className="absolute -top-4 right-4 text-[64px] opacity-15 pointer-events-none select-none">
        ☠️
      </span>

      {repeatCount >= 3 && (
        <div className="inline-flex items-center bg-[#991B1B40] text-[#FCA5A5] rounded-full px-3 py-1 text-[12px] font-bold mb-4">
          You've done this {repeatCount} times 💀
        </div>
      )}

      <span className="block text-[48px] text-brand-danger/30 leading-none -mb-4 font-serif">
        &ldquo;
      </span>
      <p className="text-[20px] md:text-[24px] font-semibold text-text-primary italic leading-relaxed relative z-10 pr-6">
        {roast}
      </p>
    </div>
  );
}
