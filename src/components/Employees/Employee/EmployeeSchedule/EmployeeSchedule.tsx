import Button from 'components/Ui/Buttons/Button';
import moment from 'moment/min/moment-with-locales';
import { useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { MdToday } from 'react-icons/md';
import { IEmployee } from 'services/types/employee.types';
import Calendar from './Calendar';
import {
  CalendarHeader,
  EmployeeScheduleBox,
  MonthBox,
  MonthName,
} from './EmployeeSchedule.styled';

moment.locale('uk');

moment.updateLocale('uk', {
  week: {
    dow: 1,
  },
});

type Props = { employee: IEmployee };

const EmployeeSchedule = ({ employee }: Props) => {
  const today = moment();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  console.log('🚀 ~ EmployeeSchedule ~ selectedDays:', selectedDays);
  const [month, setMonth] = useState(today.month());
  const [year, setYear] = useState(today.year());

  const handleNextMonthClick = () => {
    if (month === 11) {
      setYear(p => p + 1);
      setMonth(0);
    } else {
      setMonth(p => p + 1);
    }
  };

  const handlePrevMonthClick = () => {
    if (month === 0) {
      setYear(p => p - 1);
      setMonth(11);
    } else {
      setMonth(p => p - 1);
    }
  };

  const currentYear = today.year();
  const currentMonth = today.month();

  const toToday = () => {
    setYear(currentYear);
    setMonth(currentMonth);
  };

  return (
    <EmployeeScheduleBox>
      <div>EmployeeScheduleBox</div>

      <div>
        <CalendarHeader>
          <MonthBox>
            <Button
              onClick={handlePrevMonthClick}
              Icon={HiArrowLeft}
              $round
              $colors="light"
            />
            <MonthName>
              {moment([year, month]).format('MMMM yyyy').toLocaleUpperCase()}
            </MonthName>
            <Button
              onClick={handleNextMonthClick}
              Icon={HiArrowRight}
              $round
              $colors="light"
            />
          </MonthBox>

          {(currentMonth !== month || currentYear !== year) && (
            <Button onClick={toToday} Icon={MdToday} $round $colors="light" />
          )}
        </CalendarHeader>

        <Calendar
          year={year}
          month={month}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          toNextMonth={handleNextMonthClick}
          toPrevMonth={handlePrevMonthClick}
        />
      </div>
    </EmployeeScheduleBox>
  );
};

export default EmployeeSchedule;
