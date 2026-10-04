// Pure layout math that sizes the card grid so the whole board fits the available area.

/** Gap between cards on regular containers, in px. */
export const GAP = 14;
/** Tighter gap used on narrow containers (phones), in px. */
export const GAP_NARROW = 8;
/** Container width (px) from which the regular gap applies. */
export const NARROW_BOARD_WIDTH = 640;
/** Smallest card that is still a comfortable touch target, in px. */
export const MIN_CARD_SIZE = 44;
/** Largest card, so big screens don't get giant cards, in px. */
export const MAX_CARD_SIZE = 200;

export type GridInput = {
  count: number;
  width: number;
  height: number;
  gap: number;
  minSize: number;
  maxSize: number;
};

export type GridLayout = {
  cols: number;
  rows: number;
  cardSize: number;
  /** False when even minSize cards don't fit; the board must then scroll. */
  fits: boolean;
};

type Candidate = GridLayout & { emptyCells: number; shapeDistance: number };

export function getBoardGap(width: number): number {
  return width >= NARROW_BOARD_WIDTH ? GAP : GAP_NARROW;
}

// Largest square card that fits `slots` cards plus their gaps along one side.
const sizeAlong = (length: number, slots: number, gap: number) => (length - (slots - 1) * gap) / slots;

// Ranks candidates: bigger cards first, then fewer empty cells, then the shape closest to the area's.
const isBetter = (a: Candidate, b: Candidate): boolean => {
  if (a.cardSize !== b.cardSize) return a.cardSize > b.cardSize;
  if (a.emptyCells !== b.emptyCells) return a.emptyCells < b.emptyCells;
  if (a.shapeDistance !== b.shapeDistance) return a.shapeDistance < b.shapeDistance;
  return a.cols < b.cols;
};

// Fallback when nothing fits: minSize cards, as many columns as the width allows, vertical scroll.
const scrollingGrid = ({ count, width, gap, minSize }: GridInput): GridLayout => {
  const fittingCols = Number.isFinite(width) ? Math.floor((width + gap) / (minSize + gap)) : 1;
  const cols = Math.min(count, Math.max(1, fittingCols));
  return { cols, rows: Math.ceil(count / cols), cardSize: minSize, fits: false };
};

// Best candidate among the column counts accepted by `allowCols`, or null if none is accepted.
const searchGrid = (input: GridInput, allowCols: (cols: number) => boolean): Candidate | null => {
  const { count, width, height, gap, maxSize } = input;
  const areaShape = Math.log(width / height);
  let best: Candidate | null = null;

  for (let cols = 1; cols <= count; cols++) {
    if (!allowCols(cols)) continue;
    const rows = Math.ceil(count / cols);
    const fitted = Math.floor(Math.min(sizeAlong(width, cols, gap), sizeAlong(height, rows, gap)));
    const candidate: Candidate = {
      cols,
      rows,
      cardSize: Math.min(fitted, maxSize),
      fits: true,
      emptyCells: cols * rows - count,
      shapeDistance: Math.abs(Math.log(cols / rows) - areaShape),
    };
    if (best === null || isBetter(candidate, best)) best = candidate;
  }
  return best;
};

export function getBestGrid(input: GridInput): GridLayout {
  const { count, width, height, minSize } = input;
  if (!(count > 0)) return { cols: 0, rows: 0, cardSize: 0, fits: true };
  if (!(width > 0) || !(height > 0)) return scrollingGrid(input);

  // Prefer complete rectangles (columns dividing the count); accept a ragged last row only
  // when no rectangle reaches minSize, and scroll only when nothing does.
  const searches = [(cols: number) => count % cols === 0, () => true];
  for (const allowCols of searches) {
    const best = searchGrid(input, allowCols);
    if (best !== null && best.cardSize >= minSize) {
      const { cols, rows, cardSize, fits } = best;
      return { cols, rows, cardSize, fits };
    }
  }
  return scrollingGrid(input);
}
