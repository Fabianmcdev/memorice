import { GameCard } from '../types/definitions';

export type GamePhase = 'idle' | 'preview' | 'playing' | 'won';

export type GameState = {
  phase: GamePhase;
  cards: GameCard[];
  firstPick: string | null;
  secondPick: string | null;
  turns: number;
  hits: number;
  misses: number;
};

export type GameAction =
  | { type: 'START'; cards: GameCard[] }
  | { type: 'PREVIEW_END' }
  | { type: 'PICK'; cardId: string }
  | { type: 'RESOLVE' }
  | { type: 'RESET' };

export const initialGameState: GameState = {
  phase: 'idle',
  cards: [],
  firstPick: null,
  secondPick: null,
  turns: 0,
  hits: 0,
  misses: 0,
};

export const hasPendingPair = (state: GameState): boolean =>
  state.firstPick !== null && state.secondPick !== null;

export const canPick = (state: GameState, cardId: string): boolean => {
  if (state.phase !== 'playing' || hasPendingPair(state) || cardId === state.firstPick) return false;
  const card = state.cards.find((candidate) => candidate.id === cardId);
  return card !== undefined && !card.matched;
};

// Preview reveal derives from the phase; `matched` only ever means "paired by the player".
export const isFaceUp = (state: GameState, card: GameCard): boolean =>
  state.phase === 'preview' || card.matched || card.id === state.firstPick || card.id === state.secondPick;

const pickCard = (state: GameState, cardId: string): GameState => {
  if (!canPick(state, cardId)) return state;
  if (state.firstPick === null) return { ...state, firstPick: cardId };

  const firstPick = state.firstPick;
  const pairKeyOf = (id: string) => state.cards.find((card) => card.id === id)?.pairKey;
  const isMatch = pairKeyOf(firstPick) === pairKeyOf(cardId);

  return {
    ...state,
    secondPick: cardId,
    turns: state.turns + 1,
    hits: isMatch ? state.hits + 1 : state.hits,
    misses: isMatch ? state.misses : state.misses + 1,
    cards: isMatch
      ? state.cards.map((card) => (card.id === firstPick || card.id === cardId ? { ...card, matched: true } : card))
      : state.cards,
  };
};

const resolvePicks = (state: GameState): GameState => {
  if (state.phase !== 'playing' || !hasPendingPair(state)) return state;
  const allMatched = state.cards.every((card) => card.matched);
  return { ...state, firstPick: null, secondPick: null, phase: allMatched ? 'won' : 'playing' };
};

export function memoryGameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START':
      if (action.cards.length === 0) return initialGameState;
      return {
        ...initialGameState,
        phase: 'preview',
        cards: action.cards.map((card) => ({ ...card, matched: false })),
      };
    case 'PREVIEW_END':
      return state.phase === 'preview' ? { ...state, phase: 'playing' } : state;
    case 'PICK':
      return pickCard(state, action.cardId);
    case 'RESOLVE':
      return resolvePicks(state);
    case 'RESET':
      return initialGameState;
  }
}
