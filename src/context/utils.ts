import { ImageContextType } from '../types/definitions';
export function shuffleAndDuplicate(array: ImageContextType['images']): ImageContextType['images'] {
    const duplicatedArray = array.flatMap(item => [{ ...item, match: false }, { ...item, match: false }]);

    let currentIndex = duplicatedArray.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [duplicatedArray[currentIndex], duplicatedArray[randomIndex]] = [duplicatedArray[randomIndex], duplicatedArray[currentIndex]];
    }

    return duplicatedArray;
}
