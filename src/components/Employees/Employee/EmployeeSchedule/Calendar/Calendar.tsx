import moment from 'moment';
import { extendMoment } from 'moment-range';
const momentRange = extendMoment(moment);

import { CalendarBox, Day, OtherMonthDay } from './Calendar.styled';

type Props = { year: number; month: number };

const Calendar = ({ year, month }: Props) => {
  const firstDay = moment([year, month]);
  const lastDay = moment(firstDay).endOf('month');
  const monthDays = Array.from(momentRange.range(firstDay, lastDay).by('day'));

  const prevYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;

  const prevMonthLastMonday = moment([prevYear, prevMonth])
    .endOf('month')
    .isoWeekday('Monday');

  const prevMonthLastDay = moment([prevYear, prevMonth]).endOf('month');

  const prevMonthDays = Array.from(
    momentRange.range(prevMonthLastMonday, prevMonthLastDay).by('day')
  );

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const nextMonthFirstDay = moment([nextYear, nextMonth]);

  const nextMonthFirstSunday = moment([nextYear, nextMonth])
    .startOf('month')
    .isoWeekday('Sunday');

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

  return (
    <>
      <p>{firstDay.format('MMM-YYYY')}</p>
      <CalendarBox>
        {!isFirstDayMonday &&
          prevMonthDays.map((date, i) => (
            <OtherMonthDay key={i}>{date.format('DD')}</OtherMonthDay>
          ))}
        {monthDays.map((date, i) => (
          <Day key={i}>{date.format('DD')}</Day>
        ))}
        {nextMonthDays.map((date, i) => (
          <OtherMonthDay key={i}>{date.format('DD')}</OtherMonthDay>
        ))}
        {daysCount() < 42 &&
          nextMonthExtended.map((date, i) => (
            <OtherMonthDay key={i}>{date.format('DD')}</OtherMonthDay>
          ))}
      </CalendarBox>
    </>
  );
};

export default Calendar;
