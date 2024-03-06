import generateTimeArray, { getSchedule } from 'helpers/generateTimeArray';
import { IEmployee } from 'services/types/employee.types';
import { IWorkingHours } from 'store/company/company.types';
import {
  Container,
  LeftWrapper,
  ListsWrapper,
  NoSchedule,
  RigthWrapper,
  SchedulesContainer,
} from './RecordLog.styled';
import EmployeesInfoList from './RecordLogList/EmployeesInfoList/EmployeesInfoList';
import RecordLogList from './RecordLogList/RecordLogList';
import TimeList from './RecordLogList/TimeList';
import Calendar from 'components/Ui/Calendar/Calendar';

// const items = [
//     {
//         id: 2,
//         days: [
//             {
//                 day: 1,
//                 hours: {
//                     from: '10:00',
//                     to: '16:00'
//                 },
//                 events: [
//                     {
//                         id: 1,
//                         time: {
//                             from: '11:00',
//                             to: '13:00'
//                         }
//                     },
//                     {
//                         id: 2,
//                         time: {
//                             from: '14:00',
//                             to: '15:00'
//                         }
//                     }
//                 ]
//             },
//             {
//                 day: 2,
//                 hours: {
//                     from: '10:00',
//                     to: '16:00'
//                 }
//             }
//         ]
//     },
//     {
//         id: 1,
//         days: [
//             {
//                 day: 1,
//                 hours: {
//                     from: '09:00',
//                     to: '18:00'
//                 },
//                 events: [
//                     {
//                         id: 1,
//                         time: {
//                             from: '09:30',
//                             to: '11:00'
//                         }
//                     },
//                     {
//                         id: 2,
//                         time: {
//                             from: '12:00',
//                             to: '13:30'
//                         }
//                     }
//                 ]
//             },
//             {
//                 day: 2,
//                 hours: {
//                     from: '09:00',
//                     to: '18:00'
//                 }
//             }
//         ]
//     },
//     {
//         id: 2,
//         days: [
//             {
//                 day: 1,
//                 hours: {
//                     from: '12:00',
//                     to: '20:00'
//                 },
//                 events: [
//                     {
//                         id: 1,
//                         time: {
//                             from: '12:00',
//                             to: '13:45'
//                         }
//                     },
//                     {
//                         id: 2,
//                         time: {
//                             from: '16:00',
//                             to: '17:30'
//                         }
//                     }
//                 ]
//             },
//             {
//                 day: 2,
//                 hours: {
//                     from: '10:00',
//                     to: '16:00'
//                 }
//             }
//         ]
//     }
//

type Props = {
  date: Date;
  workingHours: IWorkingHours[] | null;
  employees: IEmployee[];
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const RecordLog = ({ date, workingHours, employees, setDate }: Props) => {
  const chosenDay = new Date(date).getDay();

  if (!workingHours) {
    return <p>Не встановлено графік роботи компанії!</p>;
  }

  const today = workingHours.find(wh => wh.days.includes(chosenDay));

  if (!today) {
    return (
      <NoSchedule>Не встановлено графік роботи для обраного дня!</NoSchedule>
    );
  }

  const { from, to } = today!.hours;

  const timeArray = generateTimeArray(true);

  const companyDaySchedule = getSchedule(timeArray, from, to);

  return (
    workingHours && (
      <Container>
        <LeftWrapper>
          <EmployeesInfoList
            $columns={employees.length}
            date={date}
            employees={employees}
          />
          <SchedulesContainer>
            <TimeList side="left" workHours={companyDaySchedule} />
            <ListsWrapper $columns={employees.length}>
              {employees.map((provider, i) => (
                <RecordLogList
                  schedules={provider.schedules}
                  companySchedule={companyDaySchedule}
                  key={provider.id}
                  date={date}
                  last={i === employees.length - 1}
                />
              ))}
            </ListsWrapper>
            <TimeList side="right" workHours={companyDaySchedule} />
          </SchedulesContainer>
        </LeftWrapper>
        <RigthWrapper>
          <Calendar date={date} setDate={setDate} />
        </RigthWrapper>
      </Container>
    )
  );
};

export default RecordLog;
