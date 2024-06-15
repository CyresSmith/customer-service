import { addMilliseconds, differenceInMilliseconds, format, startOfDay } from 'date-fns';

export const getTimeInMilliseconds = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    const startOfToday = startOfDay(now);
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    return differenceInMilliseconds(targetTime, startOfToday);
};

export const getTimeStr = (ms: number): string =>
    format(addMilliseconds(startOfDay(new Date()), ms), 'HH:mm');
