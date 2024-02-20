import { extendMoment } from 'moment-range';
import moment, { Moment } from 'moment/min/moment-with-locales';
import { Dispatch, SetStateAction } from 'react';
import { CalendarBox, Day, WeekDay } from './Calendar.styled';

const momentRange = extendMoment(moment);

type Props = {
  year: number;
  month: number;
  selectedDays: string[];
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
  toNextMonth: () => void;
  toPrevMonth: () => void;
};

const Calendar = ({
  year,
  month,
  selectedDays,
  setSelectedDays,
  toNextMonth,
  toPrevMonth,
}: Props) => {
  const today = moment();
  const firstDay = moment([year, month]);
  const lastDay = moment(firstDay).endOf('month');
  const monthDays = Array.from(momentRange.range(firstDay, lastDay).by('day'));

  const prevYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;

  const prevMonthLastMonday = moment([prevYear, prevMonth])
    .endOf('month')
    .isoWeekday(1);

  const prevMonthLastDay = moment([prevYear, prevMonth]).endOf('month');

  const prevMonthDays = Array.from(
    momentRange.range(prevMonthLastMonday, prevMonthLastDay).by('day')
  );

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const nextMonthFirstDay = moment([nextYear, nextMonth]);

  const nextMonthFirstSunday = moment([nextYear, nextMonth])
    .startOf('month')
    .isoWeekday(7);

  const nextMonthDays = Array.from(
    momentRange.range(nextMonthFirstDay, nextMonthFirstSunday).by('day')
  );

  const nextMonthSecondFirstMonday = nextMonthFirstSunday.clone().add(1, 'd');
  const nextMonthSecondSunday = nextMonthFirstSunday.clone().add(7, 'd');

  const nextMonthExtended = Array.from(
    momentRange
      .range(nextMonthSecondFirstMonday, nextMonthSecondSunday)
      .by('day')
  );

  const isFirstDayMonday = firstDay.isoWeekday() === 1;

  const daysCount = () => {
    return isFirstDayMonday
      ? [...monthDays, ...nextMonthDays].length
      : [...prevMonthDays, ...monthDays, ...nextMonthDays].length;
  };

  const dateString = (date: Moment) => date.format('MM-DD-YYYY');

  const handleDayClick = (date: Moment) => {
    const day = dateString(date);

    setSelectedDays(p =>
      p.includes(day) ? p.filter(item => item !== day) : [...p, day]
    );
  };

  return (
    <CalendarBox>
      {moment.weekdays().map(day => (
        <WeekDay>{day}</WeekDay>
      ))}
      {!isFirstDayMonday &&
        prevMonthDays.map((date, i) => (
          <Day className="other" key={i} onClick={toPrevMonth}>
            {date.format('D')}
          </Day>
        ))}
      {monthDays.map((date, i) => (
        <Day
          key={i}
          onClick={() => handleDayClick(date)}
          $today={dateString(date) === dateString(today)}
          $selected={selectedDays.includes(dateString(date))}
        >
          {date.format('D')}
        </Day>
      ))}
      {nextMonthDays.map((date, i) => (
        <Day className="other" key={i} onClick={toNextMonth}>
          <span>{date.format('D')}</span>
        </Day>
      ))}
      {daysCount() < 42 &&
        nextMonthExtended.map((date, i) => (
          <Day className="other" key={i} onClick={toNextMonth}>
            {date.format('D')}
          </Day>
        ))}
    </CalendarBox>
  );
};

export default Calendar;
