import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import {
  eachDayOfInterval,
  endOfMonth,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isToday,
  isWeekend,
  startOfMonth,
} from 'date-fns';
import translateWorkSchedule from 'helpers/translateWorkSchedule';
import { useCompany } from 'hooks/useCompany';
import { LegacyRef, useEffect, useRef } from 'react';
import { EmployeeStatusEnum } from 'services/types/employee.types';
import {
  DayBox,
  DayName,
  DayNumber,
  EmployeeName,
  FirstCell,
  HeaderDayBox,
  HeaderFirstCell,
  Month,
  RowBox,
  ScheduleBox,
} from './WorkSchedule.styled';

type Props = {};

const WorkSchedule = (props: Props) => {
  const { workingHours, employees } = useCompany();

  const scrollRef: LegacyRef<HTMLLIElement> = useRef(null);

  const providers = employees.filter(
    ({ provider, status }) => provider && status === EmployeeStatusEnum.WORKING
  );

  const today = new Date(Date.now());
  const monthDaysCount = getDaysInMonth(today);
  const monthDays = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView({
      inline: 'center',
      behavior: 'smooth',
    });
  }, []);

  return (
    <ScheduleBox>
      <RowBox $daysCount={monthDaysCount}>
        <HeaderFirstCell></HeaderFirstCell>

        <Month>
          {monthDays.map((item, i) => {
            const today = isToday(item);
            const day = getDay(item);

            return (
              <HeaderDayBox
                $isWeekend={isWeekend(item)}
                $isNotWorking={Boolean(
                  !workingHours?.find(({ days }) => days.includes(day))
                )}
                $isToday={today}
                key={i}
                ref={today ? scrollRef : null}
              >
                <DayNumber>{getDate(item)}</DayNumber>
                <DayName>{translateWorkSchedule(day)}</DayName>
              </HeaderDayBox>
            );
          })}
        </Month>
      </RowBox>

      {providers.map(({ id, avatar, firstName, lastName, schedules }) => {
        const currentSchedule = schedules.find(
          ({ year, month }) =>
            year === getYear(today) && month === getMonth(today)
        );

        return (
          <RowBox key={id} $daysCount={monthDaysCount}>
            <FirstCell>
              <ItemAvatar avatar={avatar} />

              <EmployeeName>{`${firstName} ${lastName}`}</EmployeeName>
            </FirstCell>

            <Month>
              {monthDays.map((item, i) => {
                const daySchedule =
                  currentSchedule &&
                  currentSchedule.schedule.find(
                    ({ day }) => day === getDate(item)
                  );

                return (
                  <DayBox key={i}>
                    {daySchedule ? (
                      <>
                        <span>{daySchedule.hours.from}</span>
                        <span>{daySchedule.hours.to}</span>
                      </>
                    ) : null}
                  </DayBox>
                );
              })}
            </Month>
          </RowBox>
        );
      })}
    </ScheduleBox>
  );
};

export default WorkSchedule;
