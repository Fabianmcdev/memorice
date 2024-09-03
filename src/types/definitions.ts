
export type Image = {
    uuid: string;
    url: string;
    title: string;
    content_type?: string;
    match?: boolean;
}


export type ImageArray = Array<Image>;
type Setter<T> = (value: T) => void;

type ImageNullable = Image | null;

export type Levels = Record<string, number>;

export interface UserContextType {
  user: string | null;
  setUser: Setter<string | null>;
}

export interface ImageContextType  {
    images: ImageArray;
    turns: number;
    setTurns: Setter<number>;
    fetchAndShuffleImages: (limit: 10 | 15 | 20) => void;
    cards: ImageArray | null;
    setCards: Setter<ImageArray | null>;
    choiceOne: ImageNullable;
    setChoiceOne: Setter<ImageNullable>;
    choiceTwo: ImageNullable;
    setChoiceTwo: Setter<ImageNullable>;
    misses: number;
    hits: number;
    setMisses: Setter<number>;
    setHits: Setter<number>;
    score: number;
    setScore: Setter<number>;
    resetTurn: () => void;
    level: 10 | 15 | 20  ;
    setLevel: Setter<ImageContextType['level']>;
}
