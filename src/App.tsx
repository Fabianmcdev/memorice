
import './App.css';
import { useUser } from './context/UserContext.tsx'
import GameBoard from './components/GameBoard.tsx'
import LoginForm from './components/LoginForm.tsx'

function App() {

  const { user } = useUser();

 

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
