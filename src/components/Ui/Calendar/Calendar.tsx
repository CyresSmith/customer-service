import {
  eachDayOfInterval,
  isMonday,
  lastDayOfMonth,
  startOfMonth,
  isSameMonth,
  subDays,
  addDays,
  isSameDay,
  subMonths,
} from 'date-fns';
import { CalendarBox, CalendarGrid, SwitcherWrapper, WeekDay } from './Calendar.styled';
import { shortWeekDays } from 'helpers/constants';
import { CalendarDay } from './CalendarDay';
import DateSwitcher from '../DateSwitcher';

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  cellSize?: number;
  monthSize?: string;
};

const Calendar = ({ date, setDate, cellSize = 30, monthSize = '18px' }: Props) => {
  const today = new Date(Date.now());

  const thisMonthStart = startOfMonth(date);
  const thisMonthEnd = lastDayOfMonth(date);
  const isMondayFirstDay = isMonday(startOfMonth(date));
  const isSundayFirstDay = thisMonthStart.getDay() === 0;
  const isSundayLastDay = thisMonthEnd.getDay() === 0;
  const thisMonthDaysArray = eachDayOfInterval({ start: startOfMonth(date), end: lastDayOfMonth(date) });

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

  return (
    <CalendarBox>
      <SwitcherWrapper>
        <DateSwitcher fontSize={monthSize} dateType='month' setDate={setDate} date={date} />
      </SwitcherWrapper>
      <CalendarGrid>
        {shortWeekDays.map(({ name }, i) => <WeekDay key={i}><span>{name}</span></WeekDay>)}
        {fullMonthArrayForRender.map((day, i) =>
          <CalendarDay
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