import { useCallback, useState } from 'react';

type Props = { root?: Element | null | undefined; rootMargin?: string; threshold?: number };

export const useObserver = <T extends HTMLElement>({
    root = null,
    rootMargin = '0px',
    threshold = 0,
}: Props) => {
    const [observer, setObserver] = useState<IntersectionObserver | undefined>();
    const [isIntersecting, setIntersecting] = useState(false);

    const measureRef = useCallback(
        (node: T | null) => {
            if (node) {
                const newObserver = new IntersectionObserver(
                    ([entry]) => setIntersecting(entry.isIntersecting),
                    { root, rootMargin, threshold }
                );

                newObserver.observe(node);
                setObserver(newObserver);
            }
        },
        [root, rootMargin, threshold]
    );

    return [measureRef, isIntersecting, observer] as const;
};
