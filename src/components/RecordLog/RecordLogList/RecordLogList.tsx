// import { EmployeeEvent } from "./EmployeeEvent";
import { getSchedule } from 'helpers/generateTimeArray';
import { IMonthSchedule } from 'services/types/schedule.types';
import { List, ListWrapper } from './RecordLogList.styled';
import { RecordLogListItem } from './RecordLogListItem';

export type EventType = {
  id: number;
  time: {
    from: string;
    to: string;
  };
};

type Props = {
  companySchedule: string[];
  // item: {
  //     day: number,
  //     hours: {
  //         from: string,
  //         to: string
  //     },
  //     events?: EventType[],
  // }
  schedules: IMonthSchedule[];
  date: Date;
  last: boolean;
};

const RecordLogList = ({ companySchedule, schedules, date, last }: Props) => {
  const chosenDay = new Date(date).getDate();
  const chosenMonth = new Date(date).getMonth();
  const chosenYear = new Date(date).getFullYear();

  const chosenSchedule = schedules
    .filter(s => s.year === chosenYear && s.month === chosenMonth)[0]
    ?.schedule.find(sh => sh.day === chosenDay)?.hours
    ? schedules
        .filter(s => s.year === chosenYear && s.month === chosenMonth)[0]
        ?.schedule.find(sh => sh.day === chosenDay)?.hours
    : { from: '', to: '' };

  const breakHours = schedules
    .find(s => s.year === chosenYear && s.month === chosenMonth)
    ?.schedule.find(s => s.day === chosenDay)?.breakHours;

  const getEmployeeSchedule = (): string[] => {
    const { from, to } = chosenSchedule!;

    const workingHours = getSchedule(companySchedule, from, to);

    const fullSchedule = companySchedule.map(ch => {
      if (workingHours.slice(0, workingHours.length - 1).includes(ch)) {
        return ch;
      } else {
        return 'skip';
      }
    });

    fullSchedule.splice(fullSchedule.length - 1, 1);

    if (breakHours) {
      const withBreaks = fullSchedule.map(s => {
        if (s >= breakHours.from && s < breakHours.to) {
          return 'break';
        } else {
          return s;
        }
      });

      return withBreaks;
    }

    return fullSchedule;
  };

  const employeesSchedule = getEmployeeSchedule();

  return (
    <ListWrapper>
      <List $wh={employeesSchedule.length} $last={last}>
        {employeesSchedule.map((hour, i) => (
          <RecordLogListItem key={i} index={i} hour={hour} />
        ))}
      </List>
      {/* {events && events?.length > 0 && events.map((e, i) => <EmployeeEvent key={i} event={e} employeeSchedule={employeeSchedule} />)} */}
    </ListWrapper>
  );
};

export default RecordLogList;
