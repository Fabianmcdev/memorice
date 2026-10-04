import { getPairsProgressText, getStatsAnnouncement } from '../game/score';
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

const PAIRS_LABEL = 'Pares encontrados';

export default function GameStats({ hits, turns, misses, totalPairs, accuracy, progressPct }: GameStatsProps) {
  // Shown next to the label from 640px and under the value below it (the pairs tile is too narrow there);
  // only one copy is displayed at a time, so assistive tech reads it once.
  const accuracyText = (
    <>
      Precisión <strong className="font-bold tabular-nums text-ink">{accuracy}%</strong>
    </>
  );

  return (
    <section
      aria-label="Estadísticas de la partida"
      className="grid grid-cols-4 gap-2 min-[640px]:gap-4 min-[1024px]:grid-cols-2 min-[1024px]:gap-3"
    >
      <StatTile
        className="col-span-2"
        label={PAIRS_LABEL}
        icon={<CheckIcon size={16} className="text-hit" />}
        aside={
          <span className="hidden whitespace-nowrap text-[13px] font-semibold text-muted min-[640px]:inline">
            {accuracyText}
          </span>
        }
      >
        <div className="flex flex-col gap-1">
          <p className="flex items-baseline gap-1 min-[640px]:gap-1.5">
            <StatValue className="text-hit">{hits}</StatValue>
            <span className="text-[15px] font-medium tabular-nums text-muted min-[640px]:text-[20px]">/ {totalPairs}</span>
          </p>
          <span className="whitespace-nowrap text-[11px] font-semibold text-muted min-[640px]:hidden">{accuracyText}</span>
        </div>
        <div
          role="progressbar"
          aria-label={PAIRS_LABEL}
          aria-valuemin={0}
          aria-valuemax={totalPairs}
          aria-valuenow={Math.min(hits, totalPairs)}
          aria-valuetext={getPairsProgressText({ hits, totalPairs })}
          className="h-2 w-full overflow-hidden rounded-full bg-track"
        >
          <div
            className="h-full rounded-full bg-hit transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </StatTile>

      <StatTile label="Turnos" icon={<TurnsIcon size={16} className="text-ink" />}>
        <StatValue className="text-ink">{turns}</StatValue>
      </StatTile>

      <StatTile label="Errores" icon={<MissIcon size={16} className="text-miss" />}>
        <StatValue className="text-miss">{misses}</StatValue>
      </StatTile>

      {/* Single polite announcement per score change instead of making every tile live. */}
      <p role="status" className="sr-only">
        {getStatsAnnouncement({ hits, totalPairs, turns, misses })}
      </p>
    </section>
  );
}
