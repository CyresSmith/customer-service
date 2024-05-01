import { LegacyRef, useEffect, useRef } from 'react';

export const useScrollIntoView = <T extends HTMLElement>(dependence?: unknown) => {
    const scrollRef: LegacyRef<T> | undefined = useRef<T>(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        const timeout = setTimeout(() => {
            scrollRef.current?.scrollIntoView({
                inline: 'center',
                behavior: 'smooth',
            });
        }, 100);

        return () => clearTimeout(timeout);
    }, [scrollRef, dependence]);

    return { scrollRef };
};
