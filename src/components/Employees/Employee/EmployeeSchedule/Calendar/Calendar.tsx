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
  selectedMonth: Date;
  selectedDays: string[];
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
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
  selectedMonth,
  selectedDays,
  setSelectedDays,
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

  const dateString = (date: Date) => format(date, 'MM-dd-yyyy');
  const dateFormat = (date: Date) => format(date, 'd');

  const handleDayClick = (date: Date) => {
    const day = dateString(date);

    setSelectedDays(p =>
      p.includes(day) ? p.filter(item => item !== day) : [...p, day]
    );
  };

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
          $today={dateString(date) === dateString(today)}
          $selected={selectedDays.includes(dateString(date))}
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
