import Button from 'components/Ui/Buttons/Button';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { IEmployee } from 'services/types/employee.types';
import Calendar from './Calendar';
import { EmployeeScheduleBox } from './EmployeeSchedule.styled';

type Props = { employee: IEmployee };

const EmployeeSchedule = ({ employee }: Props) => {
  const [selectedDays, setSelectedDays] = useState(null);
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(today.getMonth());
  // console.log('🚀 ~ EmployeeSchedule ~ month:', month);
  const [year, setYear] = useState(today.getFullYear());
  // console.log('🚀 ~ EmployeeSchedule ~ year:', year);

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

  return (
    <EmployeeScheduleBox>
      <div>EmployeeScheduleBox</div>

      <div>
        <Button onClick={handlePrevMonthClick} Icon={HiMinusCircle} $round />
        <Button onClick={handleNextMonthClick} Icon={HiPlusCircle} $round />

        <Calendar year={year} month={month} />
      </div>
    </EmployeeScheduleBox>
  );
};

export default EmployeeSchedule;
