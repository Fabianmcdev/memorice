
import { useImages } from "../context/ImageContext"
import { useUser } from "../context/UserContext";
import LogOutButton from "./LogOutButton";


const ScoreBoard = () => {
    const { user, setIsGameOver } = useUser();
    const { turns, misses, hits, setCards, setMisses, setHits, setTurns, level, fetchAndShuffleImages } = useImages();

    const handleReset = () => {
        setMisses(0);
        setHits(0);
        setTurns(0);
        setCards(null);
        fetchAndShuffleImages(level);
        
    };
    return (
        <nav className="flex flex-col items-center justify-center gap-2">

            <section className="flex flex-col items-center flex-auto ">
                <h1 className="text-3xl font-bold">Memo Game</h1>
                <p className="text-xl font-bold">User: {user}</p>
            </section>
            <section className="flex flex-row items-center justify-center sm:gap-2 md:gap-6 p-0">
                <p className="text-xl font-bold">Turns: {turns}</p>
                <p className="text-xl font-bold text-green-500">Hits: {hits}</p>
                <p className="text-xl font-bold text-red-500">Misses: {misses}</p>
                <button onClick={handleReset} className="game-board__button">Reset</button>

                <LogOutButton />
            </section>

        </nav>
    );
};

export default ScoreBoard;
