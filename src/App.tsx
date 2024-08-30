import ScoreBoard from './components/ScoreBoard'
import { useImages } from './context/ImageContext.tsx'
import './App.css'
import { Image } from './types/definitions.ts'
import { useEffect } from 'react'
import { useUser } from './context/UserContext.tsx'
import GameBoard from './components/GameBoard.tsx'
import LoginForm from './components/LoginForm.tsx'

function App() {

  const { user } = useUser();
  const { cards } = useImages();

  useEffect(() => {
    
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center">
      {user===null ?
        <LoginForm user={user} />
        :
        <GameBoard cards={cards} />
      }
    </div>
  )
}

export default App
