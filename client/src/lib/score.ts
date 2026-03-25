export function getScoreColor(score: number): string {
  if (score <= 20) return '#10B981';
  if (score <= 40) return '#84CC16';
  if (score <= 60) return '#F59E0B';
  if (score <= 80) return '#EF4444';
  return '#991B1B';
}

export function getScoreColorClass(score: number): string {
  if (score <= 20) return 'text-brand-success outline-brand-success border-brand-success';
  if (score <= 40) return 'text-[#84CC16] outline-[#84CC16] border-[#84CC16]';
  if (score <= 60) return 'text-brand-warning outline-brand-warning border-brand-warning';
  if (score <= 80) return 'text-brand-danger outline-brand-danger border-brand-danger';
  return 'text-brand-danger-dark outline-brand-danger-dark border-brand-danger-dark';
}

export function getScoreLabel(score: number): string {
  if (score <= 20) return 'Chill King 😌';
  if (score <= 40) return 'Minor L 🤏';
  if (score <= 60) return 'Questionable Choices 🤔';
  if (score <= 80) return 'Self-Sabotage Arc 💀';
  return 'Congrats, You Played Yourself 🪦';
}
