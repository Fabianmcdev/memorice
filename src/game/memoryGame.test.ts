import { describe, expect, it } from 'vitest';
import { GameCard } from '../types/definitions';
import {
  GameAction,
  GameState,
  canPick,
  initialGameState,
  isFaceUp,
  memoryGameReducer,
} from './memoryGame';

const makeDeck = (...pairKeys: string[]): GameCard[] =>
  pairKeys.flatMap((pairKey) => [0, 1].map((copy) => ({
    id: `${pairKey}-${copy}`,
    pairKey,
    url: `https://example.com/${pairKey}.png`,
    title: pairKey,
    matched: false,
  })));

const run = (state: GameState, ...actions: GameAction[]): GameState =>
  actions.reduce(memoryGameReducer, state);

const startPlaying = (deck: GameCard[]): GameState =>
  run(initialGameState, { type: 'START', cards: deck }, { type: 'PREVIEW_END' });

const pick = (cardId: string): GameAction => ({ type: 'PICK', cardId });
const RESOLVE: GameAction = { type: 'RESOLVE' };

describe('memoryGameReducer', () => {
  describe('START / PREVIEW_END', () => {
    it('enters preview with fresh counters and unmatched cards', () => {
      const stale = makeDeck('a', 'b').map((card) => ({ ...card, matched: true }));

      const state = run(initialGameState, { type: 'START', cards: stale });

      expect(state.phase).toBe('preview');
      expect(state.cards.every((card) => !card.matched)).toBe(true);
      expect(state).toMatchObject({ firstPick: null, secondPick: null, turns: 0, hits: 0, misses: 0 });
    });

    it('reveals every card during preview without marking them matched', () => {
      const state = run(initialGameState, { type: 'START', cards: makeDeck('a', 'b') });

      expect(state.cards.every((card) => isFaceUp(state, card))).toBe(true);
      expect(state.cards.some((card) => card.matched)).toBe(false);
    });

    it('moves from preview to playing and hides the cards', () => {
      const state = startPlaying(makeDeck('a', 'b'));

      expect(state.phase).toBe('playing');
      expect(state.cards.some((card) => isFaceUp(state, card))).toBe(false);
    });

    it('ignores PREVIEW_END outside of preview', () => {
      expect(run(initialGameState, { type: 'PREVIEW_END' }).phase).toBe('idle');
    });
  });

  describe('PICK guards', () => {
    it('ignores picks during preview', () => {
      const preview = run(initialGameState, { type: 'START', cards: makeDeck('a', 'b') });

      const state = run(preview, pick('a-0'));

      expect(state).toBe(preview);
      expect(canPick(preview, 'a-0')).toBe(false);
    });

    it('ignores picks while idle', () => {
      expect(run(initialGameState, pick('a-0'))).toBe(initialGameState);
    });

    it('ignores a second pick of the same card instance (no fake hit)', () => {
      const first = run(startPlaying(makeDeck('a', 'b')), pick('a-0'));

      const state = run(first, pick('a-0'));

      expect(state).toBe(first);
      expect(state.hits).toBe(0);
      expect(state.turns).toBe(0);
      expect(state.cards.some((card) => card.matched)).toBe(false);
    });

    it('ignores a third pick while two picks are pending', () => {
      const pending = run(startPlaying(makeDeck('a', 'b', 'c')), pick('a-0'), pick('b-0'));

      const state = run(pending, pick('c-0'));

      expect(state).toBe(pending);
      expect(state.firstPick).toBe('a-0');
      expect(state.secondPick).toBe('b-0');
      expect(canPick(pending, 'c-0')).toBe(false);
    });

    it('ignores picking an already matched card', () => {
      const matched = run(startPlaying(makeDeck('a', 'b')), pick('a-0'), pick('a-1'), RESOLVE);

      const state = run(matched, pick('a-0'));

      expect(state).toBe(matched);
      expect(canPick(matched, 'a-0')).toBe(false);
    });

    it('ignores unknown card ids', () => {
      const playing = startPlaying(makeDeck('a', 'b'));

      expect(run(playing, pick('nope'))).toBe(playing);
    });
  });

  describe('scoring', () => {
    it('counts a match as a hit and a turn and marks both cards matched', () => {
      const state = run(startPlaying(makeDeck('a', 'b')), pick('a-0'), pick('a-1'));

      expect(state).toMatchObject({ turns: 1, hits: 1, misses: 0 });
      expect(state.cards.filter((card) => card.matched).map((card) => card.id)).toEqual(['a-0', 'a-1']);
    });

    it('counts a mismatch as a miss and a turn and keeps both cards face up until RESOLVE', () => {
      const pending = run(startPlaying(makeDeck('a', 'b')), pick('a-0'), pick('b-0'));

      expect(pending).toMatchObject({ turns: 1, hits: 0, misses: 1 });
      expect(pending.cards.some((card) => card.matched)).toBe(false);
      expect(isFaceUp(pending, pending.cards[0])).toBe(true);

      const resolved = run(pending, RESOLVE);

      expect(resolved).toMatchObject({ firstPick: null, secondPick: null, turns: 1, misses: 1 });
      expect(resolved.cards.some((card) => isFaceUp(resolved, card))).toBe(false);
    });

    it('ignores RESOLVE when no pair is pending', () => {
      const first = run(startPlaying(makeDeck('a', 'b')), pick('a-0'));

      expect(run(first, RESOLVE)).toBe(first);
    });
  });

  describe('winning', () => {
    it('reaches won only on RESOLVE after every card is matched', () => {
      const lastPair = run(startPlaying(makeDeck('a', 'b')), pick('a-0'), pick('a-1'), RESOLVE, pick('b-0'), pick('b-1'));

      expect(lastPair.cards.every((card) => card.matched)).toBe(true);
      expect(lastPair.phase).toBe('playing');

      const won = run(lastPair, RESOLVE);

      expect(won.phase).toBe('won');
      expect(won).toMatchObject({ turns: 2, hits: 2, misses: 0 });
      expect(won.cards.every((card) => isFaceUp(won, card))).toBe(true);
    });

    it('does not win while some cards remain unmatched', () => {
      const state = run(startPlaying(makeDeck('a', 'b')), pick('a-0'), pick('a-1'), RESOLVE);

      expect(state.phase).toBe('playing');
    });

    it('never reports won during preview, even after a reset and restart', () => {
      const won = run(startPlaying(makeDeck('a')), pick('a-0'), pick('a-1'), RESOLVE);
      expect(won.phase).toBe('won');

      const restarted = run(won, { type: 'RESET' }, { type: 'START', cards: makeDeck('a', 'b') }, RESOLVE);

      expect(restarted.phase).toBe('preview');
      expect(restarted.cards.some((card) => card.matched)).toBe(false);
    });
  });

  describe('RESET', () => {
    const phases: Record<string, GameState> = {
      idle: initialGameState,
      preview: run(initialGameState, { type: 'START', cards: makeDeck('a', 'b') }),
      playing: run(startPlaying(makeDeck('a', 'b')), pick('a-0'), pick('b-0')),
      won: run(startPlaying(makeDeck('a')), pick('a-0'), pick('a-1'), RESOLVE),
    };

    it.each(Object.entries(phases))('returns a clean idle state from %s', (_, state) => {
      expect(run(state, { type: 'RESET' })).toEqual(initialGameState);
    });
  });
});
