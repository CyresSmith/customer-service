import { useCallback, useEffect } from 'react';

export const useEscapeKey = (callback: (e: KeyboardEvent) => void) => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback(event);
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey, false);

    return () => {
      document.removeEventListener('keyup', handleEscKey, false);
    };
  }, [handleEscKey]);
};
