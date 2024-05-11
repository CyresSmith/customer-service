import { isPast, addHours, addMinutes, getHours, getMinutes } from 'date-fns';
import { EventType } from 'services/types/event.types';
import generateTimeArray, { getSchedule } from './generateTimeArray';

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
        const eventTimeArray = getSchedule(
            timeArray,
            e.time,
            getEventEndTime(date, e.time, e.duration)
        );

        schedule.splice(schedule.indexOf(eventTimeArray[0]), eventTimeArray.length - 1);
    });

    return schedule;
};

export const isTimeEnableForEvent = (
    schedule: string[],
    eventDate: Date,
    eventDuration: number,
    potentialEventStart: string,
    lastEnableEventEnd: string
): boolean => {
    const startDateTime = new Date(
        addMinutes(
            addHours(eventDate, +potentialEventStart.split(':')[0]),
            +potentialEventStart.split(':')[1]
        )
    ).getTime();
    const endDateTime = new Date(
        addMinutes(
            addHours(eventDate, +lastEnableEventEnd.split(':')[0]),
            +lastEnableEventEnd.split(':')[1]
        )
    ).getTime();

    // console.log(getEventEndTime(eventDate, potentialEventStart, eventDuration));

    return (
        !isPast(startDateTime) &&
        eventDuration < endDateTime - startDateTime &&
        schedule.includes(getEventEndTime(eventDate, potentialEventStart, eventDuration))
    );
};
