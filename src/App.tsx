
import './App.css';
import { useUser } from './context/UserContext.tsx'
import GameBoard from './components/GameBoard.tsx'
import LoginForm from './components/LoginForm.tsx'
import { useEffect } from 'react';
import { useImages } from './context/ImageContext.tsx';

function App() {

  const { user } = useUser();
  const { level } = useImages();

  useEffect(() => {
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center">
      {user===null?
        <LoginForm  />
        :
        <GameBoard/>
      }
    </div>
  )
}

export default App
