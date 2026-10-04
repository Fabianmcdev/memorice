import { describe, expect, it } from 'vitest';
import { Image } from '../types/definitions';
import { shuffleAndDuplicate } from './utils';

const images: Image[] = ['a', 'b', 'c'].map((uuid) => ({
  uuid,
  url: `https://example.com/${uuid}.png`,
  title: uuid,
}));

describe('shuffleAndDuplicate', () => {
  it('creates two unmatched cards per image', () => {
    const cards = shuffleAndDuplicate(images);

    expect(cards).toHaveLength(images.length * 2);
    expect(cards.every((card) => card.matched === false)).toBe(true);
    for (const image of images) {
      const pair = cards.filter((card) => card.pairKey === image.uuid);
      expect(pair).toHaveLength(2);
      expect(pair.every((card) => card.url === image.url && card.title === image.title)).toBe(true);
    }
  });

  it('gives every card instance a unique id distinct from its pair key', () => {
    const cards = shuffleAndDuplicate(images);

    expect(new Set(cards.map((card) => card.id)).size).toBe(cards.length);
    expect(cards.every((card) => card.id !== card.pairKey)).toBe(true);
  });

  it('does not mutate the input', () => {
    const snapshot = structuredClone(images);

    shuffleAndDuplicate(images);

    expect(images).toEqual(snapshot);
  });
});
