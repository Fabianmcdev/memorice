import { useImages } from "../context/ImageContext.tsx";
import { canPick, isFaceUp } from "../game/memoryGame.ts";
import { useMemoryGame } from "../game/useMemoryGame.ts";
import Card from "./Card.tsx";
import ScoreBoard from "./ScoreBoard.tsx";
import Confetti from "react-confetti";
import { useWindowSize } from "../hooks/useWindowSize.ts";

export default function GameBoard() {
  const { images, level, fetchAndShuffleImages } = useImages();
  const { width, height } = useWindowSize();
  const { state, pick, reset } = useMemoryGame(images);
  const isGameOver = state.phase === 'won';
  // Real pair count once the board is dealt (the API may return fewer images); the level until then.
  const totalPairs = state.cards.length / 2 || level;

  const handleReset = () => {
    reset();
    fetchAndShuffleImages(level);
  };

  return (
    <div className="game-board">
      {/* react-confetti reads the window size only once at import time and positions itself absolutely,
          so feed it the live viewport size and pin it to the viewport to cover any screen and scroll position. */}
      {isGameOver && <Confetti width={width} height={height} style={{ position: 'fixed' }} />}
      {isGameOver && <p className="text-center text-2xl font-bold">¡Juego Terminado!</p>}
      <ScoreBoard turns={state.turns} hits={state.hits} misses={state.misses} totalPairs={totalPairs} onReset={handleReset} onLogout={reset} />
      <ul className="game-board__list">
        {state.cards.length > 0 ? (
          state.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              flipped={isFaceUp(state, card)}
              disabled={!canPick(state, card.id)}
              onPick={pick}
            />
          ))
        ) : (
          <div className="loader mx-auto m-72"></div>
        )}
      </ul>
    </div>
  );
}
