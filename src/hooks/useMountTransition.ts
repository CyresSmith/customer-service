import { useEffect, useState } from 'react';

type Props = {
    isMounted: boolean;
    mountDelay?: number;
    unmountDelay?: number;
};

const useMountTransition = ({ isMounted, mountDelay, unmountDelay }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        let timeoutId: number;

        if (isMounted && !mounted) {
            if (mountDelay) {
                timeoutId = setTimeout(() => setMounted(true), mountDelay);
            } else {
                setMounted(true);
            }
        } else if (!isMounted && mounted) {
            if (unmountDelay) {
                timeoutId = setTimeout(() => setMounted(false), unmountDelay);
            } else {
                setMounted(false);
            }
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [unmountDelay, isMounted, mounted, mountDelay]);

    return mounted;
};

export default useMountTransition;
