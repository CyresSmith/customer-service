import { hoursToMilliseconds, millisecondsToHours, millisecondsToMinutes } from "date-fns";

export const millisecondsToTime = (time: number): string => {
    const hours = millisecondsToHours(time);
    const hoursInMs = hoursToMilliseconds(hours);
    const minutes = millisecondsToMinutes(time - hoursInMs);

    return hours && minutes ? hours + ' г.' + ' ' + minutes + ' хв.' : hours && !minutes ? hours + ' г.' : minutes + ' хв.'
}