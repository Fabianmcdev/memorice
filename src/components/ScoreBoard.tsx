
import { useEffect } from "react";
import { useImages } from "../context/ImageContext"
import { useUser } from "../context/UserContext";
import LogOutButton from "./LogOutButton";


const ScoreBoard = () => {
    const { user } = useUser();
    const { turns, misses, hits, setMisses, setHits, setTurns} = useImages();

    
    const handleReset = () => {
      setMisses(0);
      setHits(0);
      setTurns(0);
    }

    useEffect(() => {
      handleReset();
    }, []);
  
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="flexflex-col justify-start">
      <h1 className="text-4xl font-bold">Memo Game</h1>
        <p className="text-2xl font-bold">User: {user}</p>
        <p className="text-2xl font-bold">Turns: {turns}</p>
      </div>
      
        <section className="flex flex-row items-center justify-center gap-10">
            <p className="text-2xl font-bold">Score</p>
            <p className="text-2xl font-bold text-green-500">Hits: {hits}</p>
            <p className="text-2xl font-bold text-red-500">Misses: {misses}</p>
            
        </section>
       
      <LogOutButton />


       
    </div>
    
  )
}

export default ScoreBoard