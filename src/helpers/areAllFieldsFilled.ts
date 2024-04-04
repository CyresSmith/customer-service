export type ObjectWithStrings = Record<string, unknown>;

const areAllFieldsFilled = <T extends ObjectWithStrings>(data: T): boolean => {
    for (const key in data) {
        if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
            if (!areAllFieldsFilled(data[key] as ObjectWithStrings)) {
                return false;
            }
        } else if (
            data[key] === '' ||
            (Array.isArray(data[key]) && (data[key] as Array<unknown>).length === 0)
        ) {
            return false;
        }
    }
    return true;
};

export default areAllFieldsFilled;
