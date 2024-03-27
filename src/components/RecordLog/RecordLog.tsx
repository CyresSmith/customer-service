import Button from 'components/Ui/Buttons/Button';
import Calendar from 'components/Ui/Calendar/Calendar';
import { getMonth, getYear } from 'date-fns';
import { SCHEDULES_PERPAGE } from 'helpers/constants';
import generateTimeArray, { getSchedule } from 'helpers/generateTimeArray';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useSchedules } from 'hooks/useSchedules';
import { useEffect, useLayoutEffect, useState } from 'react';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useGetAllCompanySchedulesQuery } from 'services/schedules.api';
import { BasicEmployeeInfo } from 'services/types/employee.types';
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

type Props = {
  date: Date;
  workingHours: IWorkingHours[] | null;
  employees: BasicEmployeeInfo[];
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const RecordLog = ({ date, workingHours, employees, setDate }: Props) => {
  const { id } = useCompany();
  const { setAllSchedules } = useActions();
  const { schedules } = useSchedules();
  const chosenDay = new Date(date).getDay();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const { data: freshAllSchedules, isSuccess: successGetSchedules } =
    useGetAllCompanySchedulesQuery(
      {
        companyId: +id,
        year: getYear(date),
        month: getMonth(date),
      },
      {
        skip: !id,
        refetchOnMountOrArgChange: true,
      }
    );

  useEffect(() => {
    if (freshAllSchedules && successGetSchedules) {
      setAllSchedules(freshAllSchedules);
    }
  }, [freshAllSchedules, setAllSchedules, successGetSchedules]);

  useLayoutEffect(() => {
    const schedulesListElementHeight =
      document.getElementById('schedulesList')?.offsetHeight;
    const schedulesContainerElementHeight =
      document.getElementById('schedulesContainer')?.offsetHeight;

    if (
      schedulesListElementHeight === undefined ||
      schedulesContainerElementHeight === undefined
    ) {
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

  const toRender =
    employees.length > SCHEDULES_PERPAGE
      ? employees.slice(startIndex, startIndex + SCHEDULES_PERPAGE)
      : employees;

  return (
    workingHours && (
      <Container>
        <LeftWrapper>
          <EmployeesListWrapper>
            {startIndex !== 0 && employees.length > SCHEDULES_PERPAGE && (
              <BtnWrapper $left="10px">
                <Button
                  onClick={() => setStartIndex(s => s - 1)}
                  size="l"
                  $round={true}
                  $colors="transparent"
                  Icon={HiArrowCircleLeft}
                />
              </BtnWrapper>
            )}
            <EmployeesInfoList
              isScroll={isScroll}
              columns={toRender.length}
              date={date}
              employees={toRender}
              schedules={schedules}
            />
            {employees.length > SCHEDULES_PERPAGE &&
              employees[employees.length - 1] !==
                toRender[toRender.length - 1] && (
                <BtnWrapper $right="10px">
                  <Button
                    onClick={() => setStartIndex(s => s + 1)}
                    size="l"
                    $round={true}
                    $colors="transparent"
                    Icon={HiArrowCircleRight}
                  />
                </BtnWrapper>
              )}
          </EmployeesListWrapper>
          <ScrollWrapper id="schedulesContainer">
            <SchedulesContainer>
              <TimeList side="left" workHours={companyDaySchedule} />
              <ListsWrapper id="schedulesList" $columns={toRender.length}>
                {toRender.map((provider, i) => (
                  <RecordLogList
                    schedules={schedules.filter(s => s.id === +provider.id)}
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
