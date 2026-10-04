import { RefObject, useLayoutEffect, useState } from 'react';

type ElementSize = { width: number; height: number };

// Tracks the content-box size of an element, following resizes caused by the viewport,
// rotations or siblings changing height (e.g. the header wrapping).
export function useElementSize<T extends Element>(ref: RefObject<T>): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
