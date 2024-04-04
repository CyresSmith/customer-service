import { useEffect, useRef } from 'react';

export const useClickOutside = (callback: (e: MouseEvent) => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.body.style.overflow = 'unset';
    };
  }, [callback]);

  return ref;
};
