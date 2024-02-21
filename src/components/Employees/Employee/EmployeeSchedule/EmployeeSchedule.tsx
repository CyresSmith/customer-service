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
  isAfter,
  isThisMonth,
  lastDayOfMonth,
  set,
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

const initialState = {
  from: '',
  to: '',
  breakFrom: '',
  breakTo: '',
  days: [],
};

const EmployeeSchedule = ({ employee }: Props) => {
  const isAdmin = useAdminRights();
  const { user } = useAuth();

  const isEditingAllowed = isAdmin || user?.id === employee?.user?.id;

  const currentMonthStart = startOfMonth(new Date(Date.now()));

  const datesArrToDaysArr = useCallback(
    (dates: Date[]) => dates.map(day => getDate(day)),
    []
  );

  const { id: companyId } = useCompany();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthStart);

  const { isLoading: isScheduleLoading, data: employeeSchedule } =
    useGetEmployeeScheduleQuery(
      {
        companyId,
        employeeId: employee.id,
        year: getYear(selectedMonth),
        month: getMonth(selectedMonth) + 1,
      },
      { refetchOnMountOrArgChange: true }
    );

  const [selectType, setSelectType] = useState<SelectType | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>(initialState.days);
  const [from, setFrom] = useState(initialState.from);
  const [to, setTo] = useState(initialState.to);
  const [isBreak, setIsBreak] = useState(false);
  const [breakFrom, setBreakFrom] = useState(initialState.breakFrom);
  const [breakTo, setBreakTo] = useState(initialState.breakTo);

  const [updateSchedule, { isLoading }] = useUpdateEmployeeScheduleMutation();

  const [deleteSchedule, { isLoading: isDeleteLoading }] =
    useDeleteEmployeeScheduleMutation();

  const state = {
    from: '',
    to: '',
    breakFrom: '',
    breakTo: '',
    days: selectedDays,
  };

  const getUpdateData = () => {
    let schedule = {
      hours: { from, to },
      days: selectedDays,
    };

    if (breakFrom !== '' && breakTo !== '') {
      schedule = Object.assign(schedule, {
        breakHours: { from: breakFrom, to: breakTo },
      });
    }

    return {
      year: getYear(selectedMonth),
      month: getMonth(selectedMonth) + 1,
      schedule,
    };
  };

  const handleScheduleUpdate = async () => {
    const { message } = await updateSchedule({
      companyId,
      employeeId: employee.id,
      data: getUpdateData(),
    }).unwrap();

    if (message) {
      toast.success(message);
    }
  };

  const isStateChanged = JSON.stringify(initialState) === JSON.stringify(state);

  const isSaveDisabled =
    isStateChanged || !selectedDays.length || from === '' || to === '';

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

    setSelectedDays(p =>
      p.includes(date)
        ? p.filter(item => item !== date)
        : [...p, date].sort((a, b) => a - b)
    );
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

    if (type === SelectType.ALL) {
      setSelectedDays(datesArrToDaysArr(selectedMonthDays));
    }

    if (type === SelectType.WEEKDAY) {
      setSelectedDays(weekdays);
    }

    if (type === SelectType.EVEN) {
      setSelectedDays(evenDays);
    }

    if (type === SelectType.ODD) {
      setSelectedDays(oddDays);
    }
  };

  const timeArray = generateTimeArray();

  const timeArrayFrom = (from: string) =>
    timeArray.filter(item => {
      if (!from) return true;

      const [hours, minutes] = item.split(':');
      const [fromHours, formMinutes] = from.split(':');

      return isAfter(
        set(new Date(Date.now()), {
          hours: Number(hours),
          minutes: Number(minutes),
        }),
        set(new Date(Date.now()), {
          hours: Number(fromHours),
          minutes: Number(formMinutes),
        })
      );
    });

  const handleFromSelect = (item: string) => {
    setFrom(item);
    const nextItem = timeArray[timeArray.indexOf(item) + 1];
    setTo(nextItem);
    setBreakFrom(nextItem);
  };

  const handleAddBreakHoursClick = () => {
    if (!isEditingAllowed) return;

    if (isBreak) {
      setIsBreak(false);
      setBreakFrom('');
      setBreakTo('');
    } else {
      setIsBreak(true);
    }
  };

  const handleResetClick = async () => {
    resetState();

    if (employeeSchedule && employeeSchedule.id) {
      const { message } = await deleteSchedule({
        companyId,
        employeeId: employee.id,
        scheduleId: String(employeeSchedule.id),
      }).unwrap();

      if (message) {
        toast.success(message);
      }
    }
  };

  useEffect(() => {
    if (!employeeSchedule) return;

    resetState();

    const { schedule } = employeeSchedule;

    if (schedule) {
      const { days, hours, breakHours } = schedule;

      setSelectedDays(days);

      setFrom(hours.from);
      setTo(hours.to);

      if (breakHours) {
        setIsBreak(true);
        setBreakFrom(breakHours.from);
        setBreakTo(breakHours.to);
      }
    }
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
              selectedMonth={selectedMonth}
              selectedDays={selectedDays}
              handleDayClick={handleDayClick}
              toNextMonth={handleNextMonthClick}
              toPrevMonth={handlePrevMonthClick}
            />
          </>
        )}
      </CalendarSide>

      {/* {isEditingAllowed && ( */}
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

          <ScheduleSection>
            <p>Робочій час</p>

            <SelectDaysBox>
              <SelectBox>
                <p>з</p>
                <Select
                  selectedItem={from}
                  onSelect={handleFromSelect}
                  $colors="light"
                  items={timeArray}
                  disabled={!isEditingAllowed}
                />
              </SelectBox>

              <SelectBox>
                <p>до</p>
                <Select
                  selectedItem={to}
                  onSelect={setTo}
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
            />
            {isBreak && (
              <SelectDaysBox>
                <SelectBox>
                  <p>з</p>

                  <Select
                    selectedItem={breakFrom || ''}
                    onSelect={setBreakFrom}
                    $colors="light"
                    items={timeArrayFrom(from)}
                    disabled={!isEditingAllowed}
                  />
                </SelectBox>

                <SelectBox>
                  <p>до</p>

                  <Select
                    selectedItem={breakTo || ''}
                    onSelect={setBreakTo}
                    $colors="light"
                    items={timeArrayFrom(breakFrom || '')}
                    disabled={!isEditingAllowed || breakFrom === ''}
                  />
                </SelectBox>
              </SelectDaysBox>
            )}
          </ScheduleSection>
        </div>

        {isEditingAllowed && (
          <ButtonsBox>
            <Button
              onClick={handleResetClick}
              Icon={HiTrash}
              disabled={isStateChanged || isLoading}
              $colors="light"
              $variant="text"
            >
              Скинути
            </Button>

            <Button
              isLoading={isLoading}
              onClick={handleScheduleUpdate}
              Icon={IoIosSave}
              disabled={isSaveDisabled || isLoading}
              $colors="accent"
            >
              Зберегти
            </Button>
          </ButtonsBox>
        )}
      </SelectionSide>
      {/* )} */}
    </EmployeeScheduleBox>
  );
};

export default EmployeeSchedule;
