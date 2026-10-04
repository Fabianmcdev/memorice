import { useCallback, useEffect, useReducer } from 'react';
import { GameCard } from '../types/definitions';
import { hasPendingPair, initialGameState, memoryGameReducer } from './memoryGame';

// How long every card is shown face up before play starts.
export const PREVIEW_MS = 1200;
// How long a pair of picked cards stays face up before being resolved.
export const FLIP_BACK_MS = 800;

export function useMemoryGame(deck: GameCard[]) {
  const [state, dispatch] = useReducer(memoryGameReducer, initialGameState);

  useEffect(() => {
    if (deck.length > 0) dispatch({ type: 'START', cards: deck });
  }, [deck]);

  // Restart the preview timer whenever a new deck enters preview.
  const previewCards = state.phase === 'preview' ? state.cards : null;
  useEffect(() => {
    if (previewCards === null) return;
    const timer = setTimeout(() => dispatch({ type: 'PREVIEW_END' }), PREVIEW_MS);
    return () => clearTimeout(timer);
  }, [previewCards]);

  const pairPending = hasPendingPair(state);
  useEffect(() => {
    if (!pairPending) return;
    const timer = setTimeout(() => dispatch({ type: 'RESOLVE' }), FLIP_BACK_MS);
    return () => clearTimeout(timer);
  }, [pairPending]);

  const pick = useCallback((cardId: string) => dispatch({ type: 'PICK', cardId }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return { state, pick, reset };
}
