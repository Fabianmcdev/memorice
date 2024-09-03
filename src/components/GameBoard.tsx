import { useEffect, useState } from "react";
import { useImages } from "../context/ImageContext.tsx";
import { Image } from "../types/definitions";
import Card from "./Card.tsx";
import ScoreBoard from "./ScoreBoard.tsx";
import Confetti from "react-confetti";
import { useUser } from "../context/UserContext.tsx";


export default function GameBoard() {

  const { setMisses, setHits, setTurns, turns, hits, misses, resetTurn, choiceOne, choiceTwo, setCards, cards, images } = useImages();
  const { setIsGameOver, isGameOver } = useUser();
  const [gameStarted, setGameStarted] = useState<boolean>();


  useEffect(() => {
    setCards(images.map((card: Image) => ({ ...card, match: true })));
    const timer = setTimeout(() => {
      setCards(images.map((card: Image) => ({ ...card, match: false })));
      setGameStarted(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [images, setCards]);



  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.uuid === choiceTwo.uuid) {
        setCards((prevCards: Image[]) => {
          return prevCards.map((card: Image) => {
            if (card.uuid === choiceOne.uuid) {
              return { ...card, match: true }
            }
            else { return card }
          })
        });
        setTurns(turns + 1);
        setHits(hits + 1);
        resetTurn();
      } else {
        setTurns(turns + 1);
        setMisses(misses + 1);
        setTimeout(resetTurn, 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (gameStarted && cards ? cards.length > 0 && cards.every((card) => card.match === true) : false) {
      setIsGameOver(true);
    }
  }, [gameStarted]);


  return (
    <div className="game-board">
      {isGameOver  && <Confetti />}
      <ScoreBoard /> 
      <ul className="game-board__list">
        {cards && cards.length > 0 ? 
          cards.map((card: Image, index: number) => {
            return (
              <Card
                key={index}
                card={card}
                flipped={card === choiceOne || card === choiceTwo || card.match === true}
              />
            );
          })
         : <div className="loader mx-auto m-72"></div>
        }
      </ul>

    </div>
  );
}
