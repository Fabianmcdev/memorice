import { useEffect } from "react";
import { useImages } from "../context/ImageContext.tsx";
import { Image } from "../types/definitions";
import Card from "./Card.tsx";
import ScoreBoard from "./ScoreBoard.tsx";

type GameBoardProps = { cards: Image[] | null };

export default function GameBoard({cards}:GameBoardProps) {

    const {setMisses, setHits , setTurns, turns, hits, misses, resetTurn, choiceOne, choiceTwo, setCards,useFetchAndShuffleImages, level} = useImages();
   
    const res = useFetchAndShuffleImages(level);
    
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.uuid === choiceTwo.uuid) {
        setCards((prevCards) => {
          return prevCards.map((card: Image) => {
            if (card.uuid === choiceOne.uuid) {
              return { ...card, match: true }
            }
            else { return card }
          })
        });
        console.log('hit');
        setTurns(turns + 1);
        setHits(hits + 1);
        resetTurn();
      } else {
        console.log('miss');
        setTurns(turns + 1);
        setMisses(misses + 1);
        setTimeout(resetTurn, 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    setCards(res);
  }, [level]);
    

  return (
    <div className="game-board">
    <ScoreBoard />
      <ul className="game-board__list">
        {cards ? (
          cards.map((card: Image, index: number) => {
            return (
              <li key={index} className="game-board__card">
                <Card
                  card={card}
                  flipped={card === choiceOne || card === choiceTwo || card.match === true}
                />
              </li>
            );
          })
        ) : (
          <div className="loader"></div>
        )}
      </ul>
     
    </div>
  );
}
