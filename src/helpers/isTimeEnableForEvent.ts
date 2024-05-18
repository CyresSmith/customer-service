import { isPast, getHours, getMinutes, setMinutes, setHours } from 'date-fns';
import { EventType } from 'services/types/event.types';
import generateTimeArray, { getSchedule } from './generateTimeArray';

export const getEventEndTime = (
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

export const isTimeEnableForEvent = (
    eventDate: Date,
    schedule: string[],
    eventDuration: number,
    potentialEventStart: string,
    lastEnableEventEnd: string,
    events: EventType[] | undefined
): boolean => {
    const defaultTimeArray = generateTimeArray(true);

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

    const eventEndTime = getEventEndTime(eventDate, potentialEventStart, eventDuration);
    const allEventsTime =
        events &&
        events
            .map(e => {
                const eventSchedule = getSchedule(defaultTimeArray, e.time.from, e.time.to);
                eventSchedule.shift();
                eventSchedule.pop();

                return eventSchedule;
            })
            .flat();

    const newEventTimeArray = getSchedule(defaultTimeArray, potentialEventStart, eventEndTime);
    newEventTimeArray.shift();
    newEventTimeArray.pop();

    return !isPast(startDateTime) &&
        eventDuration <= endDateTime - startDateTime &&
        newEventTimeArray.every(t => !allEventsTime?.includes(t)) &&
        schedule.includes(eventEndTime)
        ? schedule.includes(eventEndTime)
        : events
        ? events.some(e => e.time.from === eventEndTime)
        : false;
};

export const getScheduleWithoutEvents = (
    date: Date,
    employeeSchedule: string[],
    events: EventType[] | undefined,
    eventDuration: number
) => {
    const schedule = [...employeeSchedule];

    if (!events) {
        return employeeSchedule;
    }

    events.forEach(e => {
        const {
            time: { from, to },
        } = e;
        schedule.splice(schedule.indexOf(from), schedule.indexOf(to) - schedule.indexOf(from));
    });

    return schedule.filter(t =>
        isTimeEnableForEvent(
            date,
            schedule,
            eventDuration,
            t,
            schedule[schedule.length - 1],
            events
        )
    );
};
