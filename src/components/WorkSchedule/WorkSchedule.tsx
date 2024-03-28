import {
  eachDayOfInterval,
  endOfMonth,
  getDate,
  getDaysInMonth,
  startOfMonth,
} from 'date-fns';
import { useCompany } from 'hooks/useCompany';
import { EmployeeStatusEnum } from 'services/types/employee.types';
import {
  DayBox,
  EmployeesList,
  FirstCell,
  HeaderDayBox,
  Month,
  MonthDaysBox,
  ScheduleBox,
} from './WorkSchedule.styled';

type Props = {};

const WorkSchedule = (props: Props) => {
  const { workingHours, employees } = useCompany();

  const providers = employees.filter(
    ({ provider, status }) => provider && status === EmployeeStatusEnum.WORKING
  );

  const today = new Date(Date.now());
  const monthDaysCount = getDaysInMonth(today);
  const monthDays = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  return (
    <ScheduleBox>
      <EmployeesList>
        <FirstCell></FirstCell>

        {providers.map(item => (
          <FirstCell key={item.id}>{item.firstName}</FirstCell>
        ))}
      </EmployeesList>

      <MonthDaysBox>
        <Month $daysCount={monthDaysCount}>
          {monthDays.map((item, i) => (
            <HeaderDayBox key={i}>{getDate(item)}</HeaderDayBox>
          ))}
        </Month>

        {providers.map(item => (
          <Month key={item.id} $daysCount={monthDaysCount}>
            {monthDays.map((item, i) => (
              <DayBox key={i}>{getDate(item)}</DayBox>
            ))}
          </Month>
        ))}
      </MonthDaysBox>
    </ScheduleBox>
  );
};

export default WorkSchedule;
