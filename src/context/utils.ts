
import { ImageContextType } from '../types/definitions';

export function shuffleAndDuplicate(array: ImageContextType['images']): ImageContextType['images'] {
    return array
        .flatMap(item => [{ ...item, match: false }, { ...item, match: false }])
        .sort(() => Math.random() - 0.5);
}

