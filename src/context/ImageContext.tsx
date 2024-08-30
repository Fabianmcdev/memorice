import { createContext, useState,useContext, ReactNode, useEffect } from 'react';
import { ImageContextType } from '../types/definitions';
import { shuffleAndDuplicate } from './utils';
import axios from 'axios';

const ImageContext = createContext<ImageContextType | undefined>(undefined);


export const useImages = () => {
    const context = useContext(ImageContext);
    if (context === undefined) {
        throw new Error('useImages must be used within an ImageProvider');
    }
    return context;
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
    const [images, setImages] = useState<ImageContextType['images']>([]);
    const [cards, setCards] = useState<ImageContextType['cards']>([]);
    const [choiceOne, setChoiceOne] = useState<ImageContextType['choiceOne'] | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<ImageContextType['choiceTwo'] | null>(null);
    const [score, setScore] = useState<ImageContextType['score']>(0);
    const [turns, setTurns] = useState<ImageContextType['turns']>(0);
    const [misses, setMisses] = useState<ImageContextType['misses']>(0);
    const [hits, setHits] = useState<ImageContextType['hits']>(0);
    const [level, setLevel] = useState<ImageContextType['level']>(10);

     const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);  
    }

 const useFetchAndShuffleImages =(limit: ImageContextType['level']): ImageContextType['images'] => {
       
        useEffect(() => {
            axios.get('/api/images')
                .then(response => {
                    const limitedImages = response.data.slice(0, limit);
                    const shuffledAndDuplicatedImages = shuffleAndDuplicate(limitedImages);
                    setImages(shuffledAndDuplicatedImages);
                })
                .catch(error => {
                    console.error("Error fetching the images:", error);
                });
        }, [limit]);
    
        return images;
    }



    return (
        <ImageContext.Provider value={{
            images, useFetchAndShuffleImages, resetTurn, cards, turns, setTurns, setCards, level, setLevel,
            choiceOne, setChoiceOne, choiceTwo, setChoiceTwo, setScore, score, setMisses, misses, setHits, hits
        }}>
            {children}
        </ImageContext.Provider>
    );
};
