import Button from 'components/Ui/Buttons/Button';
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

import { addMonths, format, setDefaultOptions, startOfMonth } from 'date-fns';
import { uk } from 'date-fns/locale';

setDefaultOptions({ locale: uk });

type Props = { employee: IEmployee };

const EmployeeSchedule = ({ employee }: Props) => {
  const currentMonthStart = startOfMonth(new Date(Date.now()));
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStart);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  console.log('🚀 ~ EmployeeSchedule ~ selectedDays:', selectedDays);

  const handleNextMonthClick = () => {
    setSelectedMonth(addMonths(selectedMonth, 1));
  };

  const handlePrevMonthClick = () => {
    setSelectedMonth(addMonths(selectedMonth, -1));
  };

  const toToday = () => {
    setSelectedMonth(currentMonthStart);
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
              {format(selectedMonth, 'LLLL yyyy').toLocaleUpperCase()}
            </MonthName>
            <Button
              onClick={handleNextMonthClick}
              Icon={HiArrowRight}
              $round
              $colors="light"
            />
          </MonthBox>

          {currentMonthStart !== selectedMonth && (
            <Button onClick={toToday} Icon={MdToday} $round $colors="light" />
          )}
        </CalendarHeader>

        <Calendar
          selectedMonth={selectedMonth}
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
