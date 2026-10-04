import { GameCard, ImageArray } from '../types/definitions';

export function shuffleAndDuplicate(array: ImageArray): GameCard[] {
    const duplicatedArray: GameCard[] = array.flatMap((item, index) => [0, 1].map((copy) => ({
        id: `${index}-${copy}-${item.uuid}`,
        pairKey: item.uuid,
        url: item.url,
        title: item.title,
        matched: false,
    })));

    let currentIndex = duplicatedArray.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [duplicatedArray[currentIndex], duplicatedArray[randomIndex]] = [duplicatedArray[randomIndex], duplicatedArray[currentIndex]];
    }

    return duplicatedArray;
}
