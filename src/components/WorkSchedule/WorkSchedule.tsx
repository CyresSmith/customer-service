import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import Loader from 'components/Ui/Loader';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isSameDay,
  startOfMonth,
  startOfToday,
} from 'date-fns';
import { useCompany } from 'hooks/useCompany';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { useGetAllCompanySchedulesQuery } from 'services/schedules.api';
import { IEmployee } from 'services/types/employee.types';
import {
  Day,
  DayDate,
  DayDateBox,
  DayName,
  Employee,
  EmployeesList,
  HeaderDay,
  HeaderRowBox,
  RowBox,
  SchedulesList,
  SchedulesListBox,
  WorkHours,
  WorkScheduleBox,
} from './WorkSchedule.styled';

type Props = { providers: IEmployee[]; selectedMonth: Date };

const WorkSchedule = ({ providers, selectedMonth }: Props) => {
  const { id, workingHours, employees } = useCompany();

  const [selectedDays, setSelectedDays] = useState<
    { id: number; dates: Date[] }[]
  >([]);

  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleScroll = e => {
    const { scrollLeft } = e.target;
    setScrollLeft(scrollLeft);
  };

  const { data: allSchedules, isLoading } = useGetAllCompanySchedulesQuery(
    {
      companyId: id,
      year: getYear(selectedMonth),
      month: getMonth(selectedMonth),
    },
    {
      skip: !id || !employees || !providers,
      refetchOnMountOrArgChange: true,
    }
  );

  const scrollRef: LegacyRef<HTMLLIElement> = useRef(null);

  const monthDaysCount = getDaysInMonth(selectedMonth);
  const monthDays = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth),
  });

  const handleSelect = (date: Date, id?: number) => {
    if (date < startOfToday()) return;

    if (id) {
      setSelectedDays(p => {
        const idx = p.findIndex(item => item.id === id);

        if (idx === -1) {
          return [...p, { id, dates: [date] }];
        } else {
          const dateIdx = p[idx].dates.findIndex(selected =>
            isSameDay(selected, date)
          );

          if (dateIdx === -1) {
            return p.map((item, index) =>
              index === idx ? { ...item, dates: [...item.dates, date] } : item
            );
          } else {
            const newDates = [...p[idx].dates];
            newDates.splice(dateIdx, 1);

            const newSelectedDays =
              newDates.length > 0
                ? p.map((item, index) =>
                    index === idx ? { ...item, dates: newDates } : item
                  )
                : p.filter((_, index) => index !== idx);

            return newSelectedDays;
          }
        }
      });
    } else {
      setSelectedDays(p => {
        let newState = [...p];

        for (const { id } of providers) {
          const idx = newState.findIndex(item => item.id === id);

          if (idx === -1) {
            newState = [...newState, { id, dates: [date] }];
          } else {
            const dateIdx = newState[idx].dates.findIndex(selected =>
              isSameDay(selected, date)
            );

            if (dateIdx === -1) {
              newState[idx].dates = [...newState[idx].dates, date];
            }
          }
        }

        return newState;
      });
    }
  };

  useEffect(() => {
    if (!scrollRef.current || isLoading) return;

    const timeout = setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [scrollRef, selectedMonth, isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <WorkScheduleBox onScroll={handleScroll}>
      <SchedulesList>
        <HeaderRowBox key={id} $daysCount={monthDaysCount + 1}>
          <HeaderDay />

          {monthDays.map((item, i) => {
            const hours = workingHours?.find(({ days }) =>
              days.includes(getDay(item))
            );

            return (
              <HeaderDay key={i}>
                <DayDateBox>
                  <DayDate>{getDate(item)}</DayDate>
                  <DayName>{format(item, 'EEEE')}</DayName>
                </DayDateBox>

                {hours && (
                  <WorkHours>
                    <span>{hours.hours.from}</span>
                    {' - '}
                    <span>{hours.hours.to}</span>
                  </WorkHours>
                )}
              </HeaderDay>
            );
          })}
        </HeaderRowBox>

        <SchedulesListBox $daysCount={monthDaysCount + 1}>
          <EmployeesList
            style={{ left: scrollLeft }}
            $employeesCount={providers.length}
          >
            {providers.map(({ id, avatar, firstName }) => (
              <Employee>
                <ItemAvatar avatar={avatar} name={firstName} />

                <p>{firstName}</p>
              </Employee>
            ))}
          </EmployeesList>

          {providers.map(({ id, avatar, firstName }) => (
            <RowBox key={id} $daysCount={monthDaysCount + 1}>
              <Day />

              {monthDays.map((item, i) => (
                <Day key={i}>{getDate(item)}</Day>
              ))}
            </RowBox>
          ))}
        </SchedulesListBox>
      </SchedulesList>
    </WorkScheduleBox>
  );
};

export default WorkSchedule;
