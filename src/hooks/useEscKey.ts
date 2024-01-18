import { useCallback, useEffect } from "react";

export const useEscapeKey = (callback: () => void) => {
    const handleEscKey = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            callback();
        }
    }, [callback]);

    useEffect(() => {
        document.addEventListener('keyup', handleEscKey, false);
        
        return () => {document.removeEventListener('keyup', handleEscKey, false)};
    }, [handleEscKey]);
};