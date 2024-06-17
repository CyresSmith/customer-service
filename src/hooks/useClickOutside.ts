import { LegacyRef, useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(callback: (e: MouseEvent) => void) => {
    const ref: LegacyRef<T> | undefined = useRef<T>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event);
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            document.body.style.overflow = 'unset';
        };
    }, [callback]);

    return ref;
};
