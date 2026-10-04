import { getPlayerInitial } from '../game/score';

type PlayerChipProps = {
  name: string;
  levelLabel: string;
  pairs: number;
  /** `pill`: compact chip for the top bar. `row`: full-width row used below the bar on small screens. */
  variant: 'pill' | 'row';
  className?: string;
};

export default function PlayerChip({ name, levelLabel, pairs, variant, className = '' }: PlayerChipProps) {
  const levelText = `${levelLabel} · ${pairs} pairs`;
  const initial = getPlayerInitial(name);

  if (variant === 'row') {
    return (
      <div className={`flex items-center justify-between gap-3 px-1 ${className}`}>
        <div className="flex min-w-0 items-center gap-[10px]">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent font-display text-base font-semibold text-white"
          >
            {initial}
          </span>
          <span className="truncate text-[15px] font-bold text-ink">{name}</span>
        </div>
        <span className="shrink-0 rounded-full bg-surface-2 px-3 py-1 text-[12px] font-bold text-muted">
          {levelText}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 items-center gap-[10px] rounded-full bg-surface-2 py-1.5 pl-1.5 pr-[18px] ${className}`}>
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-display text-base font-semibold text-white"
      >
        {initial}
      </span>
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="max-w-[12rem] truncate text-[15px] font-bold text-ink">{name}</span>
        <span className="whitespace-nowrap text-[12px] font-semibold text-muted">{levelText}</span>
      </div>
    </div>
  );
}
