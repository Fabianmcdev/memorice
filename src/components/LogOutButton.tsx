import { useImages } from "../context/ImageContext";
import { useUser } from "../context/UserContext";
import { LogoutIcon } from "./icons";

type LogOutButtonProps = {
  onLogout: () => void;
  /** Extra classes for the button, e.g. to make it full width in a given layout. */
  className?: string;
  /** Classes for the visible "Log out" text; hidden by default (icon-only button). */
  labelClassName?: string;
};

export default function LogOutButton({ onLogout, className = '', labelClassName = 'hidden' }: LogOutButtonProps) {
  const { setUser } = useUser();
  const { setLevel } = useImages();
  const handleLogout = () => {
    onLogout();
    setUser(null);
    setLevel(10);
    localStorage.removeItem('user');
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      aria-label="Cerrar sesión"
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.16] bg-transparent text-muted transition-colors hover:border-white/40 hover:text-white focus-visible:border-white/40 focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      <LogoutIcon />
      <span className={labelClassName}>Cerrar sesión</span>
    </button>
  );
}
