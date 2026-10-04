import { Dispatch, SetStateAction } from 'react';

export type Image = {
    uuid: string;
    url: string;
    title: string;
    content_type?: string;
}

export type ImageArray = Array<Image>;

// One card instance on the board. Both cards of a pair share `pairKey`, but each has its own `id`.
export type GameCard = {
    id: string;
    pairKey: string;
    url: string;
    title: string;
    matched: boolean;
}

export type Setter<T> = Dispatch<SetStateAction<T>>;

export type Levels = Record<string, number>;

export interface UserContextType {
  user: string | null;
  setUser: Setter<string | null>;
}

export interface ImageContextType  {
    images: GameCard[];
    fetchAndShuffleImages: (limit: 10 | 15 | 20) => void;
    level: 10 | 15 | 20  ;
    setLevel: Setter<ImageContextType['level']>;
}
