import { Dispatch, SetStateAction } from 'react';
import {
  Break,
  CalendarBox,
  Day,
  DayDate,
  DaySchedule,
  WeekDay,
} from './Calendar.styled';

import {
  addMonths,
  eachDayOfInterval,
  format,
  getDate,
  getMonth,
  isMonday,
  lastDayOfMonth,
  nextMonday,
  nextSunday,
  previousMonday,
  startOfMonth,
} from 'date-fns';
import { IDaySchedule } from 'services/types/schedule.types';

type Props = {
  monthSchedule: IDaySchedule[];
  selectedMonth: Date;
  selectedDays: number[];
  setSelectedDays?: Dispatch<SetStateAction<string[]>>;
  handleDayClick: (date: number) => void;
  toNextMonth: () => void;
  toPrevMonth: () => void;
};

const weekDays = [
  'понеділок',
  'вівторок',
  'середа',
  'четвер',
  'п’ятниця',
  'субота',
  'неділя',
];

const Calendar = ({
  monthSchedule = [],
  selectedMonth,
  selectedDays,
  handleDayClick,
  toNextMonth,
  toPrevMonth,
}: Props) => {
  const today = new Date(Date.now());

  const monthDays = eachDayOfInterval({
    start: selectedMonth,
    end: lastDayOfMonth(selectedMonth),
  });

  const prevMonthStart = startOfMonth(addMonths(selectedMonth, -1));
  const prevMonthLastDay = lastDayOfMonth(prevMonthStart);

  const prevMonthDays = eachDayOfInterval({
    start: prevMonthLastDay,
    end: previousMonday(prevMonthLastDay),
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

  return (
    <CalendarBox>
      {weekDays.map(day => (
        <WeekDay key={day}>{day}</WeekDay>
      ))}
      {!isFirstDayMonday &&
        prevMonthDays.map((date, i) => (
          <Day className="other" key={i} onClick={toPrevMonth}>
            {dateFormat(date)}
          </Day>
        ))}
      {monthDays.map((date, i) => {
        const dayDate = getDate(date);
        const isToday =
          dayDate === getDate(today) &&
          getMonth(selectedMonth) === getMonth(today);

        const daySchedule = monthSchedule.find(({ day }) => day === dayDate);

        return (
          <Day
            key={i}
            onClick={() => handleDayClick(dayDate)}
            $today={isToday}
            $selected={selectedDays.includes(dayDate)}
          >
            <DayDate $today={isToday}>{dateFormat(date)}</DayDate>
            {daySchedule && (
              <DaySchedule>
                <span>
                  {daySchedule?.hours?.from} - {daySchedule?.hours?.to}
                </span>

                {daySchedule?.breakHours?.from &&
                  daySchedule?.breakHours?.to && (
                    <Break>
                      {daySchedule.breakHours.from}
                      {' - '}
                      {daySchedule.breakHours.to}
                    </Break>
                  )}
              </DaySchedule>
            )}
          </Day>
        );
      })}
      {nextMonthDays.map((date, i) => (
        <Day className="other" key={i} onClick={toNextMonth}>
          <span>{dateFormat(date)}</span>
        </Day>
      ))}
      {daysCount() < 42 &&
        nextMonthExtended.map((date, i) => (
          <Day className="other" key={i} onClick={toNextMonth}>
            {dateFormat(date)}
          </Day>
        ))}
    </CalendarBox>
  );
};

export default Calendar;
