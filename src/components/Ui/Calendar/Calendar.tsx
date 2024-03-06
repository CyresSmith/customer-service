import {
  eachDayOfInterval,
  isMonday,
  lastDayOfMonth,
  startOfMonth,
  isSameMonth,
  subDays,
  addDays,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { CalendarBox, CalendarGrid, MonthBox, MonthName, MonthSwitcher, WeekDay } from './Calendar.styled';
import { shortWeekDays } from 'helpers/constants';
import { CalendarDay } from './CalendarDay';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Button from '../Buttons/Button';

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const Calendar = ({
    date,
    setDate,
}: Props) => {
  const today = new Date(Date.now());

  const thisMonthStart = startOfMonth(date);
  const thisMonthEnd = lastDayOfMonth(date);
  const isMondayFirstDay = isMonday(startOfMonth(date));
  const isSundayLastDay = thisMonthEnd.getDay() === 0;
  const thisMonthDaysArray = eachDayOfInterval({ start: startOfMonth(date), end: lastDayOfMonth(date) });

  const getFullMonthArrayForRender = () => {
    let daysArray: Date[] = [];

    if (!isMondayFirstDay) {
      daysArray = eachDayOfInterval({ start: subDays(thisMonthStart, thisMonthStart.getDay() - 1), end: subDays(thisMonthStart, 1) });
    }

    daysArray = [...daysArray, ...thisMonthDaysArray];
    
    if (!isSundayLastDay) {
      daysArray = [...daysArray, ...eachDayOfInterval({ start: addDays(thisMonthEnd, 1), end: addDays(thisMonthEnd, 7 - thisMonthEnd.getDay())})]
    }

    return daysArray;
  };

  const fullMonthArrayForRender = getFullMonthArrayForRender();

  const handleMonthSwitch = (type: string) => {
    if (type === '+') {
      setDate(addMonths(date, 1));
    } else {
      setDate(subMonths(date, 1));
    }
  };

  return (
    <CalendarBox>
      <MonthSwitcher>
        <Button onClick={() => handleMonthSwitch('-')} Icon={HiArrowLeft} $round={true} $colors='accent' />
        <MonthBox>
          <MonthName>{date.toLocaleDateString('uk-UK', {month: 'long'})}</MonthName>
        </MonthBox>
        <Button onClick={() => handleMonthSwitch('+')} Icon={HiArrowRight} $round={true} $colors="accent" />
      </MonthSwitcher>
      <CalendarGrid>
        {shortWeekDays.map(({ name }, i) => <WeekDay key={i}><span>{name}</span></WeekDay>)}
        {fullMonthArrayForRender.map((day, i) =>
          <CalendarDay
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