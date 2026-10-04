import { ImageContextType } from '../types/definitions';

export type Level = ImageContextType['level'];

export type ScoreSummary = {
  /** Share of turns that found a pair, 0-100 rounded. */
  accuracy: number;
  /** Share of pairs found, 0-100 rounded and clamped. */
  progressPct: number;
};

const toPercent = (part: number, whole: number): number =>
  whole > 0 ? Math.round((part / whole) * 100) : 0;

const clampPercent = (value: number): number => Math.min(100, Math.max(0, value));

export const getScoreSummary = ({
  hits,
  turns,
  totalPairs,
}: {
  hits: number;
  turns: number;
  totalPairs: number;
}): ScoreSummary => ({
  accuracy: clampPercent(toPercent(hits, turns)),
  progressPct: clampPercent(toPercent(hits, totalPairs)),
});

const pluralize = (count: number, singular: string, plural: string): string =>
  `${count} ${count === 1 ? singular : plural}`;

/** Accessible value text for the pairs progress bar, e.g. "3 de 10 pares". */
export const getPairsProgressText = ({ hits, totalPairs }: { hits: number; totalPairs: number }): string =>
  `${hits} de ${totalPairs} pares`;

/** Live-region summary of the score, e.g. "3 de 10 pares encontrados, 5 turnos, 2 errores". */
export const getStatsAnnouncement = ({
  hits,
  totalPairs,
  turns,
  misses,
}: {
  hits: number;
  totalPairs: number;
  turns: number;
  misses: number;
}): string =>
  `${hits} de ${totalPairs} pares encontrados, ${pluralize(turns, 'turno', 'turnos')}, ${pluralize(misses, 'error', 'errores')}`;

const LEVEL_LABELS: Record<Level, string> = {
  10: 'Principiante',
  15: 'Intermedio',
  20: 'Avanzado',
};

export const getLevelLabel = (level: Level): string => LEVEL_LABELS[level];

export const getPlayerInitial = (name: string | null): string =>
  name?.trim().charAt(0).toUpperCase() || '?';
