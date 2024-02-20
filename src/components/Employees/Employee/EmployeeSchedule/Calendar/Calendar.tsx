import { Dispatch, SetStateAction } from 'react';
import { CalendarBox, Day, WeekDay } from './Calendar.styled';

import {
  addMonths,
  eachDayOfInterval,
  format,
  isMonday,
  lastDayOfMonth,
  nextMonday,
  nextSunday,
  previousMonday,
  startOfMonth,
} from 'date-fns';

type Props = {
  dateToDateString: (date: Date) => string;
  selectedMonth: Date;
  selectedDays: string[];
  setSelectedDays?: Dispatch<SetStateAction<string[]>>;
  handleDayClick: (date: Date) => void;
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
  dateToDateString,
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
      {monthDays.map((date, i) => (
        <Day
          key={i}
          onClick={() => handleDayClick(date)}
          $today={dateToDateString(date) === dateToDateString(today)}
          $selected={selectedDays.includes(dateToDateString(date))}
        >
          {dateFormat(date)}
        </Day>
      ))}
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
