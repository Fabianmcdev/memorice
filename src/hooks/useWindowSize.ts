import { useEffect, useState } from 'react';

type WindowSize = { width: number; height: number };

const readWindowSize = (): WindowSize => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

// Tracks the viewport size so full-screen effects (e.g. confetti) follow resizes and rotations.
export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(readWindowSize);

  useEffect(() => {
    const handleResize = () => setSize(readWindowSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
