import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useImages } from '../context/ImageContext';
import { Levels } from '../types/definitions';

type LoginFormProps = {
  user: string | null;
};

export default function LoginForm({ user }: LoginFormProps) {
  const { setUser } = useUser();
  const { setLevel, useFetchAndShuffleImages, level, setCards } = useImages();
  const [name, setName] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const options: Levels = {
    'beginner': 10,
    'intermediate': 15,
    'advanced': 20,
  };
  
  const res = useFetchAndShuffleImages(level);
  const handleLogin = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', name);
    setUser(name);
    setShowForm(false);
    setCards(res)
  };

  const handleLevelSelection = (selectedLevel:any) => {
    setLevel(selectedLevel); // Realiza el fetch de las imágenes basado en el nivel seleccionado
  };

  return (
    <div className="login-form--centered">
      <div className="login-form__container">
        {showForm ? (
          <form onSubmit={handleSubmit} className="login-form__form">
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
          <button
            onClick={handleLogin}
            className="login-form__button login-form__button--primary"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
