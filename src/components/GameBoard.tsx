import { useEffect } from "react";
import { useImages } from "../context/ImageContext.tsx";
import { Image } from "../types/definitions";
import Card from "./Card.tsx";
import ScoreBoard from "./ScoreBoard.tsx";


export default function GameBoard() {

  const { setMisses, setHits, setTurns, turns, hits, misses, resetTurn, choiceOne, choiceTwo, setCards, cards, images } = useImages();


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
    setCards(images);
  }, [cards]);

  return (
    <div className="game-board">
      <ScoreBoard />
      <ul className="game-board__list">
        {cards ? (
          cards.map((card: Image, index: number) => {
            return (

              <Card
                key={index}
                card={card}
                flipped={card === choiceOne || card === choiceTwo || card.match === true}
              />

            );
          })
        ) : (
          <div className="loader flex"></div>
        )}
      </ul>

    </div>
  );
}
