import { useImages } from "../context/ImageContext";
import { useUser } from "../context/UserContext";

export default function LogOutButton() {
    const { setUser } = useUser();
    const { setCards, setLevel } = useImages();
    const handleLogout = () => {
        setCards(null);
        setUser(null);
        setLevel(10);
        localStorage.removeItem('user');
      };
  return (
    <>
    <button
      onClick={handleLogout}
      className="game-board__button--secondary "
    >
      Logout
    </button>
  </>
  )
}
