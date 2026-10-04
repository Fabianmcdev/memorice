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

const LEVEL_LABELS: Record<Level, string> = {
  10: 'Beginner',
  15: 'Intermediate',
  20: 'Advanced',
};

export const getLevelLabel = (level: Level): string => LEVEL_LABELS[level];

export const getPlayerInitial = (name: string | null): string =>
  name?.trim().charAt(0).toUpperCase() || '?';
