import { describe, expect, it } from 'vitest';
import {
  getLevelLabel,
  getPairsProgressText,
  getPlayerInitial,
  getScoreSummary,
  getStatsAnnouncement,
} from './score';

describe('getScoreSummary', () => {
  it('reports 0% accuracy before any turn is played', () => {
    expect(getScoreSummary({ hits: 0, turns: 0, totalPairs: 10 }).accuracy).toBe(0);
  });

  it('rounds accuracy to the nearest whole percent', () => {
    expect(getScoreSummary({ hits: 1, turns: 11, totalPairs: 10 }).accuracy).toBe(9);
    expect(getScoreSummary({ hits: 2, turns: 3, totalPairs: 10 }).accuracy).toBe(67);
  });

  it('reports 100% accuracy when every turn was a hit', () => {
    expect(getScoreSummary({ hits: 4, turns: 4, totalPairs: 10 }).accuracy).toBe(100);
  });

  it('computes progress as the share of pairs found', () => {
    expect(getScoreSummary({ hits: 3, turns: 5, totalPairs: 10 }).progressPct).toBe(30);
    expect(getScoreSummary({ hits: 1, turns: 1, totalPairs: 15 }).progressPct).toBe(7);
  });

  it('clamps progress to 100 when hits exceed the total pairs', () => {
    expect(getScoreSummary({ hits: 12, turns: 12, totalPairs: 10 }).progressPct).toBe(100);
  });

  it('reports 0 progress when there are no pairs yet (board still loading)', () => {
    expect(getScoreSummary({ hits: 0, turns: 0, totalPairs: 0 }).progressPct).toBe(0);
  });
});

describe('getLevelLabel', () => {
  it.each([
    [10, 'Principiante'],
    [15, 'Intermedio'],
    [20, 'Avanzado'],
  ] as const)('labels %i pairs as %s', (level, label) => {
    expect(getLevelLabel(level)).toBe(label);
  });
});

describe('getPlayerInitial', () => {
  it('returns the uppercased first letter of the name', () => {
    expect(getPlayerInitial('fabian')).toBe('F');
  });

  it('ignores leading whitespace', () => {
    expect(getPlayerInitial('  ana')).toBe('A');
  });

  it('falls back to "?" for a missing or blank name', () => {
    expect(getPlayerInitial(null)).toBe('?');
    expect(getPlayerInitial('   ')).toBe('?');
  });
});

describe('getPairsProgressText', () => {
  it('describes the pairs found out of the total, in Spanish', () => {
    expect(getPairsProgressText({ hits: 3, totalPairs: 10 })).toBe('3 de 10 pares');
  });

  it('handles the initial state', () => {
    expect(getPairsProgressText({ hits: 0, totalPairs: 15 })).toBe('0 de 15 pares');
  });
});

describe('getStatsAnnouncement', () => {
  it('summarizes pairs, turns and misses in Spanish', () => {
    expect(getStatsAnnouncement({ hits: 3, totalPairs: 10, turns: 5, misses: 2 })).toBe(
      '3 de 10 pares encontrados, 5 turnos, 2 errores',
    );
  });

  it('uses the singular for exactly one turn and one miss', () => {
    expect(getStatsAnnouncement({ hits: 0, totalPairs: 10, turns: 1, misses: 1 })).toBe(
      '0 de 10 pares encontrados, 1 turno, 1 error',
    );
  });

  it('uses the plural for zero turns and zero misses', () => {
    expect(getStatsAnnouncement({ hits: 0, totalPairs: 20, turns: 0, misses: 0 })).toBe(
      '0 de 20 pares encontrados, 0 turnos, 0 errores',
    );
  });
});
