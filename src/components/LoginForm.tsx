import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useImages } from '../context/ImageContext';
import { Levels } from '../types/definitions';


export default function LoginForm() {
  const { setUser } = useUser();
  const { setLevel} = useImages();
  const [name, setName] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const options: Levels = {
    'beginner': 10,
    'intermediate': 15,
    'advanced': 20,
  };
  

  const handleLogin = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', name);
    setUser(name);
    setShowForm(false);
  };

  const handleLevelSelection = (selectedLevel:any) => {
    setLevel(selectedLevel); 
   };

  return (
    <div className="login-form--centered">
      <div className="login-form__container">
        {showForm ? (
          <form onSubmit={handleSubmit} className="login-form__form">
             <h1 className="text-3xl text-black font-bold p-2">Memo Game</h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="login-form__input"
              required
            />
            <ul className="login-form__level-list">
              {Object.keys(options).map((key) => (
                <li key={key} className="login-form__level-item">
                  <button
                    type="button"
                    className="login-form__button login-form__button--primary"
                    onClick={() => handleLevelSelection(options[key])}
                  >
                    {key}
                  </button>
                </li>
              ))}
            </ul>
            <button type="submit" className="login-form__button login-form__button--secondary">
              Submit
            </button>
          </form>
        ) : (
          <div className="div">
            <h1 className="text-3xl text-black font-bold">Memo Game</h1>
            <button
            onClick={handleLogin}
            className="login-form__button login-form__button--primary"
          >
            Begin
          </button>
          </div>
         
        )}
      </div>
    </div>
  );
}
