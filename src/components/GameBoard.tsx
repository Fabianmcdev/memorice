import { useEffect, useState } from "react";
import { useImages } from "../context/ImageContext.tsx";
import { Image } from "../types/definitions";
import Card from "./Card.tsx";
import ScoreBoard from "./ScoreBoard.tsx";
import Confetti from "react-confetti";
import { useUser } from "../context/UserContext.tsx";

export default function GameBoard() {
  const { setMisses, setHits, setTurns, turns, hits, misses, resetTurn, choiceOne, choiceTwo, setCards, cards, images } = useImages();
  const { setIsGameOver, isGameOver, setGameStarted, gameStarted } = useUser();
  const [disableClicks, setDisableClicks] = useState<boolean>(false); // Flag para deshabilitar clics mientras se comparan las cartas

  useEffect(() => {
    setCards(images.map((card: Image) => ({ ...card, match: true })));
    const timer = setTimeout(() => {
      setCards(images.map((card: Image) => ({ ...card, match: false })));
      setGameStarted(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [images, setCards]);

  useEffect(() => {
    if (choiceOne && choiceTwo && !disableClicks) {
      setDisableClicks(true); // Deshabilitar clics mientras se realiza la comparación

      if (choiceOne.uuid === choiceTwo.uuid) {
        // Si las cartas coinciden
        setCards((prevCards: Image[] ) => {
          if (!prevCards) return [];
          return prevCards.map((card: Image) => {
            if (card.uuid === choiceOne.uuid) {
              return { ...card, match: true };
            }
            return card;
          });
        });
        setTurns(turns + 1);
        setHits(hits + 1);
        setTimeout(() => {
          resetTurn();
          setDisableClicks(false); 
        }, 800);
      } else {
        // Si las cartas no coinciden
        setTurns(turns + 1);
        setMisses(misses + 1);
        setTimeout(() => {
          resetTurn();
          setDisableClicks(false); 
        }, 800); // Tiempo para que las cartas se giren antes de resetear
      }
    }
  }, [choiceOne, choiceTwo, setCards, setHits, setMisses, resetTurn, turns, hits, misses, disableClicks]);

  useEffect(() => {
    // Verificar si todas las cartas están emparejadas
    if (gameStarted && cards && cards.length > 0 && cards.every((card) => card.match === true)) {
      setIsGameOver(true);
      setGameStarted(false) // Actualizar el estado del juego
    }
  }, [gameStarted, cards, setIsGameOver]);

  return (
    <div className="game-board">
      {isGameOver==true && gameStarted==false && <Confetti />}
      {isGameOver==true && gameStarted==false && <p className="text-center text-2xl font-bold">¡Juego Terminado!</p>} 
      <ScoreBoard />
      <ul className="game-board__list">
        {cards && cards.length > 0 ? (
          cards.map((card: Image, index: number) => (
            <Card
              key={index}
              card={card}
              flipped={card === choiceOne || card === choiceTwo || card.match === true}
             
            />
          ))
        ) : (
          <div className="loader mx-auto m-72"></div>
        )}
      </ul>
    </div>
  );
}
