import { LegacyRef, useEffect, useRef } from 'react';

type Props = {
    dependence: unknown;
    behavior?: 'auto' | 'instant' | 'smooth';
    inline?: 'center' | 'end' | 'nearest' | 'start';
};

export const useScrollIntoView = <T extends HTMLElement>({
    dependence,
    behavior = 'auto',
    inline = 'center',
}: Props) => {
    const scrollRef: LegacyRef<T> | undefined = useRef<T>(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        const timeout = setTimeout(() => {
            scrollRef.current?.scrollIntoView({
                inline,
                behavior,
            });
        }, 100);

        return () => clearTimeout(timeout);
    }, [scrollRef, dependence, behavior]);

    return { scrollRef };
};
