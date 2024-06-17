import { Dispatch, SetStateAction } from 'react';
import { Break, CalendarBox, Day, DayDate, DaySchedule, Hours, WeekDay } from './Calendar.styled';

import {
    addMonths,
    eachDayOfInterval,
    format,
    getDate,
    getDay,
    getMonth,
    isMonday,
    isPast,
    lastDayOfMonth,
    nextMonday,
    nextSunday,
    previousMonday,
    startOfMonth,
} from 'date-fns';
import { shortWeekDays, weekDays } from 'helpers/constants';
import { useCompany } from 'hooks/useCompany';
import { IDaySchedule } from 'services/types/schedule.types';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';

type Props = {
    monthSchedule: IDaySchedule[];
    selectedMonth: Date;
    selectedDays: number[];
    disabledDays: number[];
    setSelectedDays?: Dispatch<SetStateAction<string[]>>;
    handleDayClick: (date: number, dayIdx: number) => void;
    toNextMonth: () => void;
    toPrevMonth: () => void;
};

const Calendar = ({
    selectedMonth,
    monthSchedule = [],
    selectedDays = [],
    disabledDays = [],
    handleDayClick,
    toNextMonth,
    toPrevMonth,
}: Props) => {
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);

    const today = new Date(Date.now());
    const { workingHours } = useCompany();

    const monthDays = eachDayOfInterval({
        start: selectedMonth,
        end: lastDayOfMonth(selectedMonth),
    });

    const prevMonthStart = startOfMonth(addMonths(selectedMonth, -1));
    const prevMonthLastDay = lastDayOfMonth(prevMonthStart);

    const prevMonthDays = eachDayOfInterval({
        start: previousMonday(prevMonthLastDay),
        end: prevMonthLastDay,
    });

    const nextMonthFirstDay = startOfMonth(addMonths(selectedMonth, 1));
    const nextMonthFirstSunday = nextSunday(nextMonthFirstDay);

    const nextMonthDays = eachDayOfInterval({
        start: nextMonthFirstDay,
        end: nextSunday(nextMonthFirstDay),
    });

    const nextMonthSecondMonday = nextMonday(nextMonthFirstSunday);

    const nextMonthExtended = eachDayOfInterval({
        start: nextMonthSecondMonday,
        end: nextSunday(nextMonthSecondMonday),
    });

    const isFirstDayMonday = isMonday(selectedMonth);

    const daysCount = () => {
        return isFirstDayMonday
            ? [...monthDays, ...nextMonthDays].length
            : [...prevMonthDays, ...monthDays, ...nextMonthDays].length;
    };

    const dateFormat = (date: Date) => format(date, 'd');

    const isDayDisabled = (dayIndex: number) => {
        return disabledDays.length > 0 ? !disabledDays.includes(dayIndex) : false;
    };

    const notWorkingDays = () => {
        const workingDays: number[] = workingHours?.flatMap(({ days }) => days) || [];

        return Array.from({ length: 7 })
            .map((_, i) => i)
            .filter(i => !workingDays.includes(i));
    };

    return (
        <CalendarBox>
            {(isMobile ? shortWeekDays : weekDays).map(({ name, id }) => {
                const hours = workingHours?.find(({ days }) => days.includes(id))?.hours;

                return (
                    <div key={name}>
                        <WeekDay>
                            <span>{name}</span>

                            {hours && (
                                <Hours>
                                    <span>{hours.from}</span>
                                    {!isMobile && <span> - </span>}
                                    <span>{hours.to}</span>
                                </Hours>
                            )}
                        </WeekDay>
                    </div>
                );
            })}
            {!isFirstDayMonday &&
                prevMonthDays.map((date, i) => (
                    <Day className="other" key={i} onClick={toPrevMonth}>
                        <DayDate>{dateFormat(date)}</DayDate>
                    </Day>
                ))}
            {monthDays.map((date, i) => {
                const dayDate = getDate(date);
                const day = getDay(date);

                const isToday =
                    dayDate === getDate(today) && getMonth(selectedMonth) === getMonth(today);

                const daySchedule = monthSchedule.find(({ day }) => day === dayDate);
                const isDisabled =
                    notWorkingDays().includes(day) || isDayDisabled(day) || isPast(date);

                return (
                    <Day
                        key={i}
                        onClick={() => !isDisabled && handleDayClick(dayDate, day)}
                        $today={isToday}
                        $selected={selectedDays.includes(dayDate)}
                        $isDisabled={isDisabled}
                    >
                        <DayDate $today={isToday}>{dateFormat(date)}</DayDate>
                        {daySchedule && (
                            <DaySchedule>
                                <span>{daySchedule?.hours?.from}</span>

                                {daySchedule?.breakHours?.from && daySchedule?.breakHours?.to && (
                                    <Break>
                                        <span>{daySchedule.breakHours.from}</span>
                                        {!isMobile && <span> - </span>}
                                        <span>{daySchedule.breakHours.to}</span>
                                    </Break>
                                )}

                                <span>{daySchedule?.hours?.to}</span>
                            </DaySchedule>
                        )}
                    </Day>
                );
            })}
            {nextMonthDays.map((date, i) => (
                <Day className="other" key={i} onClick={toNextMonth}>
                    <DayDate>{dateFormat(date)}</DayDate>
                </Day>
            ))}
            {daysCount() < 42 &&
                nextMonthExtended.map((date, i) => (
                    <Day className="other" key={i} onClick={toNextMonth}>
                        <DayDate>{dateFormat(date)}</DayDate>
                    </Day>
                ))}
        </CalendarBox>
    );
};

export default Calendar;
