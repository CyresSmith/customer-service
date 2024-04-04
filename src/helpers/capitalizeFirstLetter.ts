export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeObjectValues(obj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            result[key] = capitalizeFirstLetter(String(obj[key]));
        } else {
            result[key] = obj[key];
        }
    }

    return result;
}
