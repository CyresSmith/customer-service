import generateTimeArray, { getSchedule } from 'helpers/generateTimeArray';
import { IEmployee } from 'services/types/employee.types';
import { IWorkingHours } from 'store/company/company.types';
import {
  BtnWrapper,
  Container,
  EmployeesListWrapper,
  LeftWrapper,
  ListsWrapper,
  NoSchedule,
  RigthWrapper,
  SchedulesContainer,
  ScrollWrapper,
} from './RecordLog.styled';
import EmployeesInfoList from './RecordLogList/EmployeesInfoList/EmployeesInfoList';
import RecordLogList from './RecordLogList/RecordLogList';
import TimeList from './RecordLogList/TimeList';
import Calendar from 'components/Ui/Calendar/Calendar';
import { useLayoutEffect, useState } from 'react';
import { SCHEDULES_PERPAGE } from 'helpers/constants';
import Button from 'components/Ui/Buttons/Button';
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

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
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useLayoutEffect(() => {
    const schedulesListElementHeight = document.getElementById('schedulesList')?.offsetHeight;
    const schedulesContainerElementHeight = document.getElementById('schedulesContainer')?.offsetHeight;

    if (schedulesListElementHeight === undefined || schedulesContainerElementHeight === undefined) {
      return;
    }

    setIsScroll(schedulesListElementHeight > schedulesContainerElementHeight);
  }, [employees]);

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

  const toRender = employees.length > SCHEDULES_PERPAGE ? employees.slice(startIndex, startIndex + SCHEDULES_PERPAGE) : employees;

  return (
    workingHours && (
      <Container>
        <LeftWrapper>
          <EmployeesListWrapper>
            {startIndex !== 0 && employees.length > SCHEDULES_PERPAGE &&
              <BtnWrapper $left='10px'>
                <Button onClick={() => setStartIndex(s => s - 1)} size='l' $round={true} $colors='transparent' Icon={HiArrowCircleLeft} />
              </BtnWrapper>
            }
            <EmployeesInfoList isScroll={isScroll}
              columns={toRender.length}
              date={date}
              employees={toRender}
            />
            {employees.length > SCHEDULES_PERPAGE && employees[employees.length - 1] !== toRender[toRender.length - 1] && 
              <BtnWrapper $right='10px'>
                <Button onClick={() => setStartIndex(s => s + 1)} size='l' $round={true} $colors='transparent' Icon={HiArrowCircleRight} />
              </BtnWrapper>
            }
          </EmployeesListWrapper>
          <ScrollWrapper id='schedulesContainer'>
            <SchedulesContainer>
              <TimeList side="left" workHours={companyDaySchedule} />
              <ListsWrapper id='schedulesList' $columns={toRender.length}>
                {toRender.map((provider, i) => (
                  <RecordLogList
                    schedules={provider.schedules}
                    companySchedule={companyDaySchedule}
                    key={provider.id}
                    date={date}
                    last={i === toRender.length - 1}
                  />
                ))}
              </ListsWrapper>
              <TimeList side="right" workHours={companyDaySchedule} />
            </SchedulesContainer>
          </ScrollWrapper>
        </LeftWrapper>
        <RigthWrapper>
          <Calendar cellSize={30} date={date} setDate={setDate} />
        </RigthWrapper>
      </Container>
    )
  );
};

export default RecordLog;
