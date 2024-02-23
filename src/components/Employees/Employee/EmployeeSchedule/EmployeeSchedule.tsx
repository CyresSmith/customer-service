import Button from 'components/Ui/Buttons/Button';
import { useCallback, useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiTrash } from 'react-icons/hi';
import { MdToday } from 'react-icons/md';
import { IEmployee } from 'services/types/employee.types';
import Calendar from './Calendar';
import {
  ButtonsBox,
  CalendarHeader,
  CalendarSide,
  EmployeeScheduleBox,
  MonthBox,
  MonthName,
  ScheduleSection,
  SelectBox,
  SelectDaysBox,
  SelectionSide,
} from './EmployeeSchedule.styled';

import Checkbox from 'components/Ui/Form/Checkbox';
import Loader from 'components/Ui/Loader';
import Select from 'components/Ui/Select';
import {
  addMonths,
  eachDayOfInterval,
  eachWeekendOfMonth,
  format,
  getDate,
  getMonth,
  getYear,
  isThisMonth,
  lastDayOfMonth,
  setDefaultOptions,
  startOfMonth,
} from 'date-fns';
import { uk } from 'date-fns/locale';
import arraysAreEqual from 'helpers/areArrayEqual';
import generateTimeArray from 'helpers/generateTimeArray';
import { useAdminRights, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import {
  useDeleteEmployeeScheduleMutation,
  useGetEmployeeScheduleQuery,
  useUpdateEmployeeScheduleMutation,
} from 'services/employee.api';
import { IDaySchedule, ITime } from 'services/types/schedule.types';

setDefaultOptions({ locale: uk });

enum SelectType {
  ALL = 1,
  WEEKDAY = 2,
  EVEN = 3,
  ODD = 4,
}

const quickSelectButtons = [
  { type: SelectType.ALL, label: 'Всі дні' },
  { type: SelectType.WEEKDAY, label: 'Будні' },
  { type: SelectType.EVEN, label: 'Парні' },
  { type: SelectType.ODD, label: 'Непарні' },
];

type Props = { employee: IEmployee };

const EmployeeSchedule = ({ employee }: Props) => {
  const isAdmin = useAdminRights();
  const { user } = useAuth();
  const { id: companyId } = useCompany();

  const isEditingAllowed = isAdmin || user?.id === employee?.user?.id;

  const currentMonthStart = startOfMonth(new Date(Date.now()));

  const datesArrToDaysArr = useCallback(
    (dates: Date[]) => dates.map(day => getDate(day)),
    []
  );

  const [selectedMonth, setSelectedMonth] = useState(currentMonthStart);

  const {
    isLoading: isScheduleLoading,
    data: employeeSchedule,
    refetch,
  } = useGetEmployeeScheduleQuery(
    {
      companyId,
      employeeId: employee.id,
      year: getYear(selectedMonth),
      month: getMonth(selectedMonth) + 1,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [scheduleState, setScheduleState] = useState<IDaySchedule[]>([]);
  const [selectType, setSelectType] = useState<SelectType | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isBreak, setIsBreak] = useState(false);
  const [breakFrom, setBreakFrom] = useState('');
  const [breakTo, setBreakTo] = useState('');
  const [isStateChanged, setIsStateChanged] = useState(false);

  const [updateSchedule, { isLoading }] = useUpdateEmployeeScheduleMutation();
  const [deleteSchedule, { isLoading: isDeleteLoading }] =
    useDeleteEmployeeScheduleMutation();

  const handleScheduleUpdate = async () => {
    const { message } = await updateSchedule({
      companyId,
      employeeId: employee.id,
      data: {
        year: getYear(selectedMonth),
        month: getMonth(selectedMonth) + 1,
        schedule: scheduleState,
      },
    }).unwrap();

    if (message) {
      resetState();
      setIsStateChanged(false);
      toast.success(message);
    }
  };

  const resetState = () => {
    setSelectedDays([]);
    setSelectType(null);
    setFrom('');
    setTo('');
    setBreakFrom('');
    setBreakTo('');
    setIsBreak(false);
  };

  const handleNextMonthClick = () => {
    resetState();
    setSelectedMonth(addMonths(selectedMonth, 1));
  };

  const handlePrevMonthClick = () => {
    resetState();
    setSelectedMonth(addMonths(selectedMonth, -1));
  };

  const selectedMonthDays = eachDayOfInterval({
    start: selectedMonth,
    end: lastDayOfMonth(selectedMonth),
  });

  const toToday = () => {
    setSelectedMonth(currentMonthStart);
  };

  const handleDayClick = (date: number) => {
    if (!isEditingAllowed) return;
    if (selectType) setSelectType(null);

    if (selectedDays.length === 0) {
      const state = scheduleState.find(({ day }) => day === date);

      if (state) {
        setFrom(state?.hours?.from);
        setTo(state?.hours?.to);

        if (state.breakHours) {
          setIsBreak(true);
          setBreakFrom(state.breakHours.from);
          setBreakTo(state.breakHours.to);
        }
      }
    }

    setSelectedDays(p => {
      if (p.includes(date)) {
        if (p.length === 1) {
          setFrom('');
          setTo('');
          setIsBreak(false);
          setBreakFrom('');
          setBreakTo('');
        }

        return p.filter(item => item !== date);
      } else {
        return [...p, date].sort((a, b) => a - b);
      }
    });
  };

  const eachWeekend = datesArrToDaysArr(eachWeekendOfMonth(selectedMonth));

  const weekdays = datesArrToDaysArr(
    selectedMonthDays.filter(day => !eachWeekend.includes(getDate(day)))
  );

  const evenDays = datesArrToDaysArr(
    selectedMonthDays.filter(day => getDate(day) % 2 === 0)
  );

  const oddDays = datesArrToDaysArr(
    selectedMonthDays.filter(day => getDate(day) % 2 !== 0)
  );

  const handleQuickSelectClick = (type: SelectType) => {
    if (selectType === type) {
      return resetState();
    }

    let selected: number[] = [];

    if (type === SelectType.ALL) {
      selected = datesArrToDaysArr(selectedMonthDays);
    }

    if (type === SelectType.WEEKDAY) {
      selected = weekdays;
    }

    if (type === SelectType.EVEN) {
      selected = evenDays;
    }

    if (type === SelectType.ODD) {
      selected = oddDays;
    }

    setSelectedDays(selected);

    if (employeeSchedule) {
      const schedule = employeeSchedule.schedule.find(
        ({ day, hours }) => selected.includes(day) && hours.from && hours.to
      );

      if (schedule) {
        setFrom(schedule?.hours?.from);
        setTo(schedule?.hours?.to);

        if (schedule.breakHours) {
          setIsBreak(true);
          setBreakFrom(schedule?.breakHours?.from);
          setBreakTo(schedule?.breakHours?.to);
        }
      } else {
        setFrom('');
        setTo('');
        setBreakFrom('');
        setBreakTo('');
      }
    }
  };

  const timeArray = generateTimeArray();

  const timeArrayFrom = (start: string, end?: string) =>
    timeArray.filter(time => (end ? time > start && time < end : time > start));

  const handleTimeSelect = (time: string, id: string) => {
    const nextTime = () => timeArray[timeArray.indexOf(time) + 1];

    const key = id === 'from' || id === 'to' ? 'hours' : 'breakHours';

    let newData = {
      [id === 'from' || id === 'breakFrom' ? 'from' : 'to']: time,
    };

    if (id === 'from') {
      setFrom(time);

      if (to === '') {
        setTo(nextTime());
        newData = { ...newData, to: nextTime() };
      } else {
        newData = { ...newData, to };
      }

      breakFrom === '' && setBreakFrom(nextTime());
    }

    if (id === 'to') {
      setTo(time);

      if (from !== '') {
        isBreak && setBreakTime(from, time);
        newData = { ...newData, from };
      }
    }

    if (id === 'breakFrom') {
      setBreakFrom(time);
      setBreakTo(nextTime());
      newData = { ...newData, to: nextTime() };
    }

    if (id == 'breakTo') setBreakTo(time);

    if (scheduleState.length > 0) {
      setScheduleState(p => {
        const newArr: IDaySchedule[] = [...p];

        for (const day of selectedDays) {
          const idx = newArr.findIndex(({ day: existDay }) => day === existDay);

          if (idx >= 0) {
            newArr[idx] = {
              ...newArr[idx],
              [key]: { ...newArr[idx][key], ...newData },
            };
          } else {
            let data: {
              hours?: Partial<ITime>;
              breakHours?: Partial<ITime>;
            } = {};

            if (from) {
              data = { ...data, hours: { ...data?.hours, from } };
            }

            if (to) {
              data = { ...data, hours: { ...data?.hours, to } };
            }

            if (breakFrom) {
              data = {
                ...data,
                breakHours: { ...data?.breakHours, from: breakFrom },
              };
            }

            if (breakTo) {
              data = {
                ...data,
                breakHours: { ...data?.breakHours, to: breakTo },
              };
            }

            if (key === 'hours') {
              data = { ...data, hours: { ...data.hours, ...newData } };
            }

            if (key === 'breakHours') {
              data = {
                ...data,
                breakHours: { ...data.breakHours, ...newData },
              };
            }

            newArr.push({
              day,
              ...data,
            } as unknown as IDaySchedule);
          }
        }
        return newArr;
      });
    } else {
      setScheduleState(
        selectedDays.map(
          day => ({ day, [key]: newData } as unknown as IDaySchedule)
        )
      );
    }

    if (!isTimeForBreak) {
      setIsBreak(false);
      setBreakFrom('');
      setBreakTo('');
    }

    setIsStateChanged(true);
  };

  const isTimeForBreak =
    from !== '' &&
    to !== '' &&
    to >= timeArray[timeArray.findIndex(item => item === from) + 3];

  const handleAddBreakHoursClick = () => {
    if (!isEditingAllowed) return;

    if (isBreak) {
      setIsBreak(false);
      setBreakFrom('');
      setBreakTo('');

      if (scheduleState.length > 0) {
        setScheduleState(p => {
          const newArr: IDaySchedule[] = [...p];

          for (const day of selectedDays) {
            const idx = newArr.findIndex(
              ({ day: existDay }) => day === existDay
            );

            if (idx >= 0) {
              const newObj = { ...newArr[idx] };
              delete newObj.breakHours;
              newArr[idx] = newObj;
            }
          }
          return newArr;
        });
      }
    } else {
      setIsBreak(true);
      setBreakTime(from, to);
    }

    setIsStateChanged(true);
  };

  const setBreakTime = (workingHoursFrom: string, workingHoursTo: string) => {
    if (isTimeForBreak) {
      const breakTime = timeArrayFrom(workingHoursFrom, workingHoursTo);
      const breakFromIdx = Math.floor(breakTime.length / 2) - 1;
      const breakFrom = breakTime[breakFromIdx];
      const breakTo = breakTime[breakFromIdx + 1];

      setBreakFrom(breakFrom);
      setBreakTo(breakTo);

      setScheduleState(p => {
        const newArr = [...p];

        for (const selectedDay of selectedDays) {
          const idx = newArr.findIndex(({ day }) => day === selectedDay);

          if (idx > -1) {
            const newObj = {
              ...newArr[idx],
              breakHours: { from: breakFrom, to: breakTo },
            };
            newArr[idx] = newObj;
          } else {
            newArr.push({
              day: selectedDay,
              hours: { from: workingHoursFrom, to: workingHoursTo },
              breakHours: { from: breakFrom, to: breakTo },
            });
          }
        }
        return newArr;
      });
    }
  };

  const handleResetClick = async () => {
    resetState();
    setScheduleState([]);

    let toastMessage: string = '';

    if (employeeSchedule && employeeSchedule.id) {
      if (selectedDays.length > 0) {
        const { message } = await updateSchedule({
          companyId,
          employeeId: employee.id,
          data: {
            year: getYear(selectedMonth),
            month: getMonth(selectedMonth) + 1,
            schedule: scheduleState.filter(
              ({ day }) => !selectedDays.includes(day)
            ),
          },
        }).unwrap();

        if (message) {
          toastMessage = message;
        }
      } else {
        const { message } = await deleteSchedule({
          companyId,
          employeeId: employee.id,
          scheduleId: String(employeeSchedule.id),
        }).unwrap();

        if (message) {
          toastMessage = message;
        }
      }

      if (toastMessage !== '') {
        toast.success(toastMessage);
      }
      setIsStateChanged(false);
      refetch();
      resetState();
    }
  };

  useEffect(() => {
    setScheduleState(employeeSchedule ? employeeSchedule?.schedule : []);
  }, [employeeSchedule]);

  useEffect(() => {
    if (arraysAreEqual(selectedDays, datesArrToDaysArr(selectedMonthDays)))
      setSelectType(SelectType.ALL);

    if (arraysAreEqual(selectedDays, weekdays))
      setSelectType(SelectType.WEEKDAY);

    if (arraysAreEqual(selectedDays, evenDays)) setSelectType(SelectType.EVEN);

    if (arraysAreEqual(selectedDays, oddDays)) setSelectType(SelectType.ODD);
  }, [
    datesArrToDaysArr,
    evenDays,
    oddDays,
    selectedDays,
    selectedMonthDays,
    weekdays,
  ]);

  return (
    <EmployeeScheduleBox>
      <CalendarSide>
        {isScheduleLoading || isDeleteLoading || isLoading ? (
          <Loader />
        ) : (
          <>
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

              {!isThisMonth(selectedMonth) && (
                <Button
                  onClick={toToday}
                  Icon={MdToday}
                  $round
                  $colors="light"
                />
              )}
            </CalendarHeader>

            <Calendar
              monthSchedule={scheduleState}
              selectedMonth={selectedMonth}
              selectedDays={selectedDays}
              handleDayClick={handleDayClick}
              toNextMonth={handleNextMonthClick}
              toPrevMonth={handlePrevMonthClick}
            />
          </>
        )}
      </CalendarSide>

      {isEditingAllowed && (
        <SelectionSide>
          <div>
            {isEditingAllowed && (
              <ScheduleSection>
                <p>Швидкий вибір днів</p>

                <SelectDaysBox>
                  {quickSelectButtons.map(({ type, label }) => (
                    <li key={type}>
                      <Button
                        onClick={() => handleQuickSelectClick(type)}
                        $colors={selectType === type ? 'accent' : 'light'}
                        disabled={!isEditingAllowed}
                      >
                        {label}
                      </Button>
                    </li>
                  ))}
                </SelectDaysBox>
              </ScheduleSection>
            )}

            {selectedDays.length > 0 && (
              <>
                <ScheduleSection>
                  <p>Робочій час</p>

                  <SelectDaysBox>
                    <SelectBox>
                      <p>з</p>
                      <Select
                        id="from"
                        selectedItem={from}
                        onSelect={handleTimeSelect}
                        $colors="light"
                        items={timeArray}
                        disabled={!isEditingAllowed}
                      />
                    </SelectBox>

                    <SelectBox>
                      <p>до</p>
                      <Select
                        id="to"
                        selectedItem={to}
                        onSelect={handleTimeSelect}
                        $colors="light"
                        items={timeArrayFrom(from)}
                        disabled={!isEditingAllowed || from === ''}
                      />
                    </SelectBox>
                  </SelectDaysBox>
                </ScheduleSection>

                <ScheduleSection>
                  <Checkbox
                    isChecked={isBreak}
                    handleCheck={handleAddBreakHoursClick}
                    name="break"
                    isReadonly={!isTimeForBreak}
                  />
                  {isBreak && (
                    <SelectDaysBox>
                      <SelectBox>
                        <p>з</p>

                        <Select
                          id="breakFrom"
                          selectedItem={breakFrom || ''}
                          onSelect={handleTimeSelect}
                          $colors="light"
                          items={timeArrayFrom(from, breakTo || to)}
                          disabled={!isEditingAllowed}
                        />
                      </SelectBox>

                      <SelectBox>
                        <p>до</p>

                        <Select
                          id="breakTo"
                          selectedItem={breakTo || ''}
                          onSelect={handleTimeSelect}
                          $colors="light"
                          items={timeArrayFrom(breakFrom || '', to || '')}
                          disabled={!isEditingAllowed || breakFrom === ''}
                        />
                      </SelectBox>
                    </SelectDaysBox>
                  )}
                </ScheduleSection>
              </>
            )}
          </div>

          {isEditingAllowed && (
            <ButtonsBox>
              <Button
                onClick={handleResetClick}
                Icon={HiTrash}
                disabled={isLoading}
                $colors="light"
                $variant="text"
              >
                Скинути
              </Button>

              <Button
                isLoading={isLoading}
                onClick={handleScheduleUpdate}
                Icon={IoIosSave}
                disabled={!isStateChanged || isLoading}
                $colors="accent"
              >
                Зберегти
              </Button>
            </ButtonsBox>
          )}
        </SelectionSide>
      )}
    </EmployeeScheduleBox>
  );
};

export default EmployeeSchedule;
