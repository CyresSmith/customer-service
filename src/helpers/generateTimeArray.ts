import { addHours, addMinutes, getHours, getMinutes } from 'date-fns';
import { EventType } from 'services/types/event.types';

const generateTimeArray = (quarters: boolean = false) => {
    const times = [];

    for (let hours = 0; hours <= 24; hours++) {
        if (hours === 24) {
            times.push('24:00');
        } else {
            for (let minutes = 0; minutes < 60; minutes += quarters ? 15 : 30) {
                const formattedHours = String(hours).padStart(2, '0');
                const formattedMinutes = String(minutes).padStart(2, '0');
                times.push(`${formattedHours}:${formattedMinutes}`);
            }
        }
    }

    return times;
};

export const getSchedule = (schedule: string[], from: string, to: string): string[] => {
    return schedule.slice(schedule.indexOf(from), schedule.indexOf(to) + 1);
};

const getEventEndTime = (
    eventDate: Date,
    eventStartTime: string,
    eventDuration: number
): string => {
    const endDate = new Date(
        new Date(
            addMinutes(
                addHours(eventDate, +eventStartTime!.split(':')[0]),
                +eventStartTime!.split(':')[1]
            )
        ).getTime() + eventDuration
    );

    return `${getHours(endDate)}:${
        String(getMinutes(endDate)).length < 2 ? '00' : getMinutes(endDate)
    }`;
};

export const getScheduleWithoutEvents = (
    date: Date,
    employeeSchedule: string[],
    events: EventType[] | null
) => {
    const schedule = employeeSchedule;
    const timeArray = generateTimeArray(true);

    console.log(events);

    if (!events) {
        return employeeSchedule;
    }

    events.forEach(e => {
        // console.log(timeArray, e.time, getEventEndTime(date, e.time, e.duration));
        const eventTimeArray = getSchedule(
            timeArray,
            e.time,
            getEventEndTime(date, e.time, e.duration)
        );

        // console.log(schedule);
        // console.log(eventTimeArray);
        schedule.splice(schedule.indexOf(eventTimeArray[0]), eventTimeArray.length - 1);
    });

    return schedule;
};

export default generateTimeArray;
