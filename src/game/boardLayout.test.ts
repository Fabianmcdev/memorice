import { describe, expect, it } from 'vitest';
import {
  getBestGrid,
  getBoardGap,
  GAP,
  GAP_NARROW,
  MAX_CARD_SIZE,
  MIN_CARD_SIZE,
  NARROW_BOARD_WIDTH,
} from './boardLayout';

const base = { gap: GAP, minSize: MIN_CARD_SIZE, maxSize: MAX_CARD_SIZE };

const boardWidth = (cols: number, size: number, gap: number) => cols * size + (cols - 1) * gap;

// Realistic board areas: desktop sidebar layout, tablets, phones (portrait and landscape).
const AREAS: Array<[number, number]> = [
  [944, 688], [1104, 868], [1200, 868], [1200, 1048],
  [1180, 560], [1800, 800], [990, 470], [700, 900],
  [374, 520], [358, 560], [320, 480], [780, 250],
];

describe('getBestGrid', () => {
  it('lays 20 cards in a wide landscape area out as a complete 5x4 rectangle', () => {
    const grid = getBestGrid({ ...base, count: 20, width: 1180, height: 560 });
    expect(grid).toMatchObject({ cols: 5, rows: 4, fits: true });
  });

  it('only returns complete rectangles (no empty cells) whenever the grid fits', () => {
    for (const count of [12, 16, 20, 24, 30, 40]) {
      for (const [width, height] of AREAS) {
        const grid = getBestGrid({ ...base, gap: getBoardGap(width), count, width, height });
        if (grid.fits) expect(grid.cols * grid.rows).toBe(count);
      }
    }
  });

  it('picks the largest card among the exact divisors of the count', () => {
    // 30 cards in a wide area: 6x5 (no empty cells) instead of a bigger-looking 8x4 with 2 holes.
    const grid = getBestGrid({ ...base, count: 30, width: 1180, height: 560 });
    expect(grid.cols * grid.rows).toBe(30);
    expect([6, 10, 15]).toContain(grid.cols);
  });

  it('falls back to any column count when no exact rectangle reaches minSize', () => {
    // 22 cards only split into 1x22, 2x11, 11x2, 22x1: none reach 44px in 400x400, a 5x5 grid does.
    const grid = getBestGrid({ ...base, count: 22, width: 400, height: 400 });
    expect(grid.fits).toBe(true);
    expect(grid.cardSize).toBeGreaterThanOrEqual(MIN_CARD_SIZE);
    expect(grid.cols * grid.rows).toBeGreaterThan(22);
    expect(boardWidth(grid.cols, grid.cardSize, GAP)).toBeLessThanOrEqual(400);
    expect(boardWidth(grid.rows, grid.cardSize, GAP)).toBeLessThanOrEqual(400);
  });

  it('lays 40 cards in a tall portrait area out with more rows than columns at a touchable size', () => {
    const grid = getBestGrid({ ...base, gap: GAP_NARROW, count: 40, width: 374, height: 560 });
    expect(grid.rows).toBeGreaterThan(grid.cols);
    expect(grid.cardSize).toBeGreaterThanOrEqual(55);
    expect(grid.cardSize).toBeLessThanOrEqual(70);
    expect(grid.fits).toBe(true);
  });

  it('always fits the board inside the area when it reports fits', () => {
    for (const count of [20, 30, 40]) {
      for (const [width, height] of [[1180, 560], [1800, 800], [374, 520], [320, 480], [700, 900], [990, 470]]) {
        const gap = getBoardGap(width);
        const grid = getBestGrid({ ...base, gap, count, width, height });
        expect(grid.fits).toBe(true);
        expect(grid.cols * grid.rows).toBe(count);
        expect(boardWidth(grid.cols, grid.cardSize, gap)).toBeLessThanOrEqual(width);
        expect(boardWidth(grid.rows, grid.cardSize, gap)).toBeLessThanOrEqual(height);
        expect(grid.cardSize).toBeGreaterThanOrEqual(MIN_CARD_SIZE);
        expect(grid.cardSize).toBeLessThanOrEqual(MAX_CARD_SIZE);
      }
    }
  });

  it('never uses more columns than cards', () => {
    const grid = getBestGrid({ ...base, count: 3, width: 4000, height: 4000 });
    expect(grid.cols).toBeLessThanOrEqual(3);
    expect(grid.rows).toBe(1);
  });

  it('clamps the card size to maxSize on very large areas', () => {
    const grid = getBestGrid({ ...base, count: 20, width: 5000, height: 3000 });
    expect(grid.cardSize).toBe(MAX_CARD_SIZE);
    expect(grid.fits).toBe(true);
  });

  it('falls back to minSize with fits=false when the area is too small, using as many columns as fit the width', () => {
    const grid = getBestGrid({ ...base, count: 40, width: 800, height: 140 });
    expect(grid.fits).toBe(false);
    expect(grid.cardSize).toBe(MIN_CARD_SIZE);
    expect(boardWidth(grid.cols, MIN_CARD_SIZE, GAP)).toBeLessThanOrEqual(800);
    expect(boardWidth(grid.cols + 1, MIN_CARD_SIZE, GAP)).toBeGreaterThan(800);
    expect(grid.rows).toBe(Math.ceil(40 / grid.cols));
  });

  it('returns an empty grid for zero cards', () => {
    expect(getBestGrid({ ...base, count: 0, width: 800, height: 600 })).toEqual({
      cols: 0,
      rows: 0,
      cardSize: 0,
      fits: true,
    });
  });

  it('does not throw on zero or negative dimensions and falls back to a single column', () => {
    for (const [width, height] of [[0, 0], [-10, 500], [500, -10], [Number.NaN, 300]]) {
      const grid = getBestGrid({ ...base, count: 20, width, height });
      expect(grid.fits).toBe(false);
      expect(grid.cardSize).toBe(MIN_CARD_SIZE);
      expect(grid.cols).toBeGreaterThanOrEqual(1);
      expect(grid.cols * grid.rows).toBeGreaterThanOrEqual(20);
    }
  });

  it('is deterministic for the same input', () => {
    const input = { ...base, count: 30, width: 1180, height: 560 };
    expect(getBestGrid(input)).toEqual(getBestGrid(input));
  });

  it('prefers fewer empty cells when two shapes give the same card size', () => {
    // With the size capped, 5x4 (no empty cells) beats 6x4 / 7x3 (empty cells).
    const grid = getBestGrid({ count: 20, width: 2000, height: 2000, gap: 10, minSize: 44, maxSize: 100 });
    expect(grid.cols * grid.rows).toBe(20);
  });
});

describe('getBoardGap', () => {
  it('uses the narrow gap below the breakpoint and the regular gap from it on', () => {
    expect(getBoardGap(NARROW_BOARD_WIDTH - 1)).toBe(GAP_NARROW);
    expect(getBoardGap(NARROW_BOARD_WIDTH)).toBe(GAP);
    expect(getBoardGap(0)).toBe(GAP_NARROW);
  });
});
