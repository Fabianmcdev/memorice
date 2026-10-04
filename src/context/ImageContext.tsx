import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
    const [level, setLevel] = useState<ImageContextType['level']>(10);

    const fetchAndShuffleImages = async (limit: number) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${apiUrl}/images`);
            const limitedImages = response.data.slice(0, limit);
            const shuffledAndDuplicatedImages = shuffleAndDuplicate(limitedImages);
            setImages(shuffledAndDuplicatedImages);
        } catch (error) {
            console.error("Error fetching the images:", error);
        }
    };

    useEffect(() => {
        fetchAndShuffleImages(level);
    }, [level]);


    return (
        <ImageContext.Provider value={{ images, fetchAndShuffleImages, level, setLevel }}>
            {children}
        </ImageContext.Provider>
    );
};
