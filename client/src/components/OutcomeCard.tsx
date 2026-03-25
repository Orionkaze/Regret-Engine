import { cn } from '../lib/utils';
import type { Timeline } from '../store/useAppStore'; // Temp import before centralizing

interface Props {
  outcomes: Timeline;
}

export function OutcomeCard({ outcomes }: Props) {
  const cards = [
    { key: 'day1', label: 'Day 1', text: outcomes.day1, borderColor: 'border-l-brand-success', textColor: 'text-brand-success', delay: 'animation-delay-1200' },
    { key: 'week1', label: 'Week 1', text: outcomes.week1, borderColor: 'border-l-brand-warning', textColor: 'text-brand-warning', delay: 'animation-delay-1400' },
    { key: 'month1', label: 'Month 1', text: outcomes.month1, borderColor: 'border-l-brand-danger', textColor: 'text-brand-danger', delay: 'animation-delay-1600' },
    { key: 'year1', label: 'Year 1', text: outcomes.year1, borderColor: 'border-l-brand-danger-dark', textColor: 'text-red-300', delay: 'animation-delay-1800' },
  ];

  return (
    <div className="flex flex-col gap-3 max-w-[700px] w-full mx-auto my-6">
      {cards.map((card) => (
        <div
          key={card.key}
          className={cn(
            'bg-bg-card border border-border border-l-[3px] rounded-inner p-5 flex gap-4 items-start opacity-0 animate-[fadeUp_300ms_ease-out_forwards]',
            card.borderColor,
            card.delay // Needs custom index.css generation or inline style for delay
          )}
          style={{ animationDelay: card.delay.split('-')[2] + 'ms' }}
        >
          <div className={cn('min-w-[80px] text-xs font-semibold uppercase tracking-widest pt-0.5', card.textColor)}>
            {card.label}
          </div>
          <div className="text-base text-text-primary font-normal leading-relaxed">
            {card.text}
          </div>
        </div>
      ))}
    </div>
  );
}
