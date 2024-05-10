export function throttle<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let lastCall = 0;
    let timeoutID: ReturnType<typeof setTimeout> | null = null;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        const now = Date.now();

        if (now - lastCall >= delay) {
            lastCall = now;

            if (timeoutID !== null) {
                clearTimeout(timeoutID);
                timeoutID = null;
            }

            fn.apply(this, args);
        } else {
            if (timeoutID !== null) {
                clearTimeout(timeoutID);
            }
            timeoutID = setTimeout(() => {
                lastCall = Date.now();
                fn.apply(this, args);
            }, delay - (now - lastCall));
        }
    };
}
