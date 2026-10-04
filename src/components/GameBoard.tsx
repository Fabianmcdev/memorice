import { CSSProperties, useRef } from "react";
import { useImages } from "../context/ImageContext.tsx";
import { getBestGrid, getBoardGap, MAX_CARD_SIZE, MIN_CARD_SIZE } from "../game/boardLayout.ts";
import { canPick, isFaceUp } from "../game/memoryGame.ts";
import { useMemoryGame } from "../game/useMemoryGame.ts";
import Card from "./Card.tsx";
import ScoreBoard from "./ScoreBoard.tsx";
import Confetti from "react-confetti";
import { useElementSize } from "../hooks/useElementSize.ts";
import { useWindowSize } from "../hooks/useWindowSize.ts";

export default function GameBoard() {
  const { images, level, fetchAndShuffleImages } = useImages();
  const { width, height } = useWindowSize();
  const { state, pick, reset } = useMemoryGame(images);
  const isGameOver = state.phase === 'won';
  // Real pair count once the board is dealt (the API may return fewer images); the level until then.
  const totalPairs = state.cards.length / 2 || level;

  // Size the grid from the space actually left by the header (below it, or beside it as a sidebar
  // from 1024px) so every card stays on screen.
  const boardAreaRef = useRef<HTMLDivElement>(null);
  const boardArea = useElementSize(boardAreaRef);
  const gap = getBoardGap(boardArea.width);
  const grid = getBestGrid({
    count: state.cards.length,
    width: boardArea.width,
    height: boardArea.height,
    gap,
    minSize: MIN_CARD_SIZE,
    maxSize: MAX_CARD_SIZE,
  });
  const gridStyle = {
    '--cols': grid.cols,
    '--card-size': `${grid.cardSize}px`,
    gap: `${gap}px`,
  } as CSSProperties;

  const handleReset = () => {
    reset();
    fetchAndShuffleImages(level);
  };

  return (
    <div className="game-board">
      {/* react-confetti reads the window size only once at import time and positions itself absolutely,
          so feed it the live viewport size and pin it to the viewport to cover any screen and scroll position. */}
      {isGameOver && <Confetti width={width} height={height} style={{ position: 'fixed' }} />}
      {/* Overlay so the banner never takes board space and shrinks the cards. */}
      {isGameOver && (
        <div className="game-board__banner">
          <p role="status" className="rounded-[20px] bg-surface/90 px-6 py-4 text-2xl font-bold shadow-lg">
            ¡Juego Terminado!
          </p>
        </div>
      )}
      <ScoreBoard turns={state.turns} hits={state.hits} misses={state.misses} totalPairs={totalPairs} onReset={handleReset} onLogout={reset} />
      <div ref={boardAreaRef} className={`game-board__area ${grid.fits ? '' : 'overflow-y-auto'}`}>
        {state.cards.length > 0 ? (
          <ul className="game-board__list" style={gridStyle}>
            {state.cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                flipped={isFaceUp(state, card)}
                disabled={!canPick(state, card.id)}
                onPick={pick}
              />
            ))}
          </ul>
        ) : (
          <div className="loader m-auto"></div>
        )}
      </div>
    </div>
  );
}
