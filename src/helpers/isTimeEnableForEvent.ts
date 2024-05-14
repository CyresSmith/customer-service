import { isPast, getHours, getMinutes, setMinutes, setHours } from 'date-fns';
import { EventType } from 'services/types/event.types';
import generateTimeArray, { getSchedule } from './generateTimeArray';

const getEventEndTime = (
    eventDate: Date,
    eventStartTime: string,
    eventDuration: number
): string => {
    const endDate = new Date(
        new Date(
            setMinutes(
                setHours(eventDate, +eventStartTime!.split(':')[0]),
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
    events: EventType[] | undefined
) => {
    const schedule = [...employeeSchedule];
    // const eventsSchedule: string[] = [];

    if (!events) {
        return employeeSchedule;
    }
    events.forEach(e => {
        const eventTimeArray = getSchedule(
            generateTimeArray(true),
            e.time,
            getEventEndTime(date, e.time, e.duration)
        );
        // console.log(eventTimeArray);
        // eventsSchedule.push(...eventTimeArray);
        schedule.splice(schedule.indexOf(eventTimeArray[1]), eventTimeArray.length - 2);
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
        setMinutes(
            setHours(eventDate, +potentialEventStart.split(':')[0]),
            +potentialEventStart.split(':')[1]
        )
    ).getTime();
    const endDateTime = new Date(
        setMinutes(
            setHours(eventDate, +lastEnableEventEnd.split(':')[0]),
            +lastEnableEventEnd.split(':')[1]
        )
    ).getTime();

    return (
        !isPast(startDateTime) &&
        eventDuration <= endDateTime - startDateTime &&
        schedule.includes(getEventEndTime(eventDate, potentialEventStart, eventDuration))
    );
};
