import { describe, expect, it } from 'vitest';
import { getLevelLabel, getPlayerInitial, getScoreSummary } from './score';

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
    [10, 'Beginner'],
    [15, 'Intermediate'],
    [20, 'Advanced'],
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
