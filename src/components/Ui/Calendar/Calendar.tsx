import {
  eachDayOfInterval,
  isMonday,
  lastDayOfMonth,
  startOfMonth,
  isSameMonth,
  subDays,
  addDays,
  isSameDay,
} from 'date-fns';
import { CalendarBox, CalendarGrid, SwitcherWrapper, WeekDay } from './Calendar.styled';
import { shortWeekDays } from 'helpers/constants';
import { CalendarDay } from './CalendarDay';
import DateSwitcher from '../DateSwitcher';
import { useState } from 'react';

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  cellSize?: number;
  monthSize?: string;
  enableDays?: Date[];
};

const Calendar = ({ date, setDate, cellSize = 30, monthSize = '18px', enableDays }: Props) => {
  const [monthDate, setMonthDate] = useState(new Date(Date.now()));
  const today = new Date(Date.now());

  const thisMonthStart = startOfMonth(monthDate);
  const thisMonthEnd = lastDayOfMonth(monthDate);
  const isMondayFirstDay = isMonday(startOfMonth(monthDate));
  const isSundayFirstDay = thisMonthStart.getDay() === 0;
  const isSundayLastDay = thisMonthEnd.getDay() === 0;
  const thisMonthDaysArray = eachDayOfInterval({ start: startOfMonth(monthDate), end: lastDayOfMonth(monthDate) });

  const getFullMonthArrayForRender = () => {
    let daysArray: Date[] = [];

    if (!isMondayFirstDay) {
      daysArray = eachDayOfInterval({
        start: subDays(thisMonthStart, isSundayFirstDay ? 6 : thisMonthStart.getDay() - 1),
        end: subDays(thisMonthStart, 1)
      });
    }

    daysArray = [...daysArray, ...thisMonthDaysArray];
    
    if (!isSundayLastDay) {
      daysArray = [...daysArray, ...eachDayOfInterval({ start: addDays(thisMonthEnd, 1), end: addDays(thisMonthEnd, 7 - thisMonthEnd.getDay())})]
    }

    return daysArray;
  };

  const fullMonthArrayForRender = getFullMonthArrayForRender();

  const isDayDisabled = (day: Date): boolean => {
    return enableDays ? !JSON.stringify(enableDays).includes(JSON.stringify(day)) && !isSameDay(today, day) : false;
  }

  return (
    <CalendarBox>
      <SwitcherWrapper>
        <DateSwitcher fontSize={monthSize} dateType='month' setDate={setMonthDate} date={monthDate} />
      </SwitcherWrapper>
      <CalendarGrid>
        {shortWeekDays.map(({ name }, i) => <WeekDay key={i}><span>{name}</span></WeekDay>)}
        {fullMonthArrayForRender.map((day, i) =>
          <CalendarDay
            disabled={isDayDisabled(day)}
            cellSize={cellSize}
            handleClick={() => setDate(day)}
            isToday={isSameDay(day, today)}
            key={i}
            date={day.getDate()}
            selected={isSameDay(day, date)}
            anotherMonth={!isSameMonth(day, date)}
          />)}
      </CalendarGrid>
    </CalendarBox>
  );
};

export default Calendar;