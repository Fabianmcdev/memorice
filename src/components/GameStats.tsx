import { CheckIcon, MissIcon, TurnsIcon } from './icons';
import StatTile, { StatValue } from './StatTile';

type GameStatsProps = {
  hits: number;
  turns: number;
  misses: number;
  totalPairs: number;
  accuracy: number;
  progressPct: number;
};

export default function GameStats({ hits, turns, misses, totalPairs, accuracy, progressPct }: GameStatsProps) {
  return (
    <section aria-label="Game stats" className="grid grid-cols-2 gap-4 min-[640px]:grid-cols-4">
      <StatTile
        className="col-span-2"
        label="Pairs found"
        icon={<CheckIcon size={16} className="text-hit" />}
        aside={
          <span className="whitespace-nowrap text-[13px] font-semibold text-muted">
            Accuracy <strong className="font-bold tabular-nums text-ink">{accuracy}%</strong>
          </span>
        }
      >
        <p className="flex items-baseline gap-1.5">
          <StatValue className="text-hit">{hits}</StatValue>
          <span className="text-[20px] font-medium tabular-nums text-muted">/ {totalPairs}</span>
        </p>
        <div
          role="progressbar"
          aria-label="Pairs found"
          aria-valuemin={0}
          aria-valuemax={totalPairs}
          aria-valuenow={Math.min(hits, totalPairs)}
          aria-valuetext={`${hits} of ${totalPairs} pairs`}
          className="h-2 w-full overflow-hidden rounded-full bg-track"
        >
          <div
            className="h-full rounded-full bg-hit transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </StatTile>

      <StatTile label="Turns" icon={<TurnsIcon size={16} className="text-ink" />}>
        <StatValue className="text-ink">{turns}</StatValue>
      </StatTile>

      <StatTile label="Misses" icon={<MissIcon size={16} className="text-miss" />}>
        <StatValue className="text-miss">{misses}</StatValue>
      </StatTile>

      {/* Single polite announcement per score change instead of making every tile live. */}
      <p role="status" className="sr-only">
        {`${hits} of ${totalPairs} pairs found, ${turns} turns, ${misses} misses`}
      </p>
    </section>
  );
}
