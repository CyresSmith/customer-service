import Button from 'components/Ui/Buttons/Button';
import { useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiTrash } from 'react-icons/hi';
import { MdToday } from 'react-icons/md';
import { IEmployee } from 'services/types/employee.types';
import Calendar from './Calendar';
import {
  ButtonsBox,
  CalendarHeader,
  EmployeeScheduleBox,
  MonthBox,
  MonthName,
  ScheduleSection,
  SelectBox,
  SelectDaysBox,
  SelectionSide,
} from './EmployeeSchedule.styled';

import Checkbox from 'components/Ui/Form/Checkbox';
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
import generateTimeArray from 'helpers/generateTimeArray';
import { useCompany } from 'hooks/useCompany';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useUpdateEmployeeScheduleMutation } from 'services/employee.api';
import { IWorkSchedule } from 'services/types/schedule.types';

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

const initialState: IWorkSchedule = {
  hours: {
    from: '',
    to: '',
  },
  break: {
    from: '',
    to: '',
  },
  days: [],
};

const EmployeeSchedule = ({ employee }: Props) => {
  const currentMonthStart = startOfMonth(new Date(Date.now()));

  const { id: companyId } = useCompany();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthStart);
  const [selectType, setSelectType] = useState<SelectType | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [from, setFrom] = useState(initialState?.hours?.from);
  const [to, setTo] = useState(initialState?.hours?.to);
  const [isBreak, setIsBreak] = useState(false);
  const [breakFrom, setBreakFrom] = useState(initialState?.break?.from);
  const [breakTo, setBreakTo] = useState(initialState?.break?.to);

  const [updateSchedule, { isLoading, isError, isSuccess, error }] =
    useUpdateEmployeeScheduleMutation();

  console.log('🚀 ~ EmployeeSchedule ~ selectedDays:', selectedDays);

  const state = {
    hours: {
      from,
      to,
    },
    break: {
      from: breakFrom,
      to: breakTo,
    },
    days: selectedDays,
  };

  const handleScheduleUpdate = async () => {
    let schedule = {
      hours: { from, to },
      days: selectedDays.map(day => getDate(day)),
    };

    if (breakFrom !== '' && breakTo !== '') {
      schedule = Object.assign(schedule, {
        break: { from: breakFrom, to: breakTo },
      });
    }

    const data = {
      year: getYear(selectedMonth),
      month: getMonth(selectedMonth) + 1,
      schedule,
    };

    const { message } = await updateSchedule({
      companyId,
      employeeId: employee.id,
      data,
    }).unwrap();

    if (message) {
      toast.success(message);
    }
  };

  const isStateChanged = JSON.stringify(initialState) === JSON.stringify(state);

  const isSaveDisabled =
    isStateChanged || !selectedDays.length || from === '' || to === '';

  const dateToDateString = (date: Date) => format(date, 'MM-dd-yyyy');

  const datesArrToDatesStringArr = (dates: Date[]) =>
    dates.map(day => dateToDateString(day));

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
    setSelectedMonth(addMonths(selectedMonth, 1));
  };

  const handlePrevMonthClick = () => {
    setSelectedMonth(addMonths(selectedMonth, -1));
  };

  const selectedMonthDays = eachDayOfInterval({
    start: selectedMonth,
    end: lastDayOfMonth(selectedMonth),
  });

  const toToday = () => {
    setSelectedMonth(currentMonthStart);
  };

  const handleDayClick = (date: Date) => {
    if (selectedDays.some(day => getMonth(day) !== getMonth(date))) {
      resetState();
    }

    if (selectType) setSelectType(null);

    const day = dateToDateString(date);

    setSelectedDays(p =>
      p.includes(day) ? p.filter(item => item !== day) : [...p, day]
    );
  };

  const handleQuickSelectClick = (type: SelectType) => {
    if (selectType === type) {
      return resetState();
    }

    let selectedDays: Date[] = [];

    if (type === SelectType.ALL) {
      selectedDays = selectedMonthDays;
    }

    if (type === SelectType.WEEKDAY) {
      const eachWeekend = datesArrToDatesStringArr(
        eachWeekendOfMonth(selectedMonth)
      );

      selectedDays = selectedMonthDays.filter(
        day => !eachWeekend.includes(dateToDateString(day))
      );
    }

    if (type === SelectType.EVEN) {
      selectedDays = selectedMonthDays.filter(day => day.getDate() % 2 === 0);
    }

    if (type === SelectType.ODD) {
      selectedDays = selectedMonthDays.filter(day => day.getDate() % 2 !== 0);
    }

    setSelectedDays(datesArrToDatesStringArr(selectedDays));
    setSelectType(type);
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

  return (
    <EmployeeScheduleBox>
      <div>
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
            <Button onClick={toToday} Icon={MdToday} $round $colors="light" />
          )}
        </CalendarHeader>

        <Calendar
          dateToDateString={dateToDateString}
          selectedMonth={selectedMonth}
          selectedDays={selectedDays}
          handleDayClick={handleDayClick}
          toNextMonth={handleNextMonthClick}
          toPrevMonth={handlePrevMonthClick}
        />
      </div>

      <SelectionSide>
        <div>
          <ScheduleSection>
            <p>Швидкий вибір днів</p>

            <SelectDaysBox>
              {quickSelectButtons.map(({ type, label }) => (
                <li>
                  <Button
                    key={type}
                    onClick={() => handleQuickSelectClick(type)}
                    $colors={selectType === type ? 'accent' : 'light'}
                  >
                    {label}
                  </Button>
                </li>
              ))}
            </SelectDaysBox>
          </ScheduleSection>

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
                />
              </SelectBox>

              <SelectBox>
                <p>до</p>
                <Select
                  selectedItem={to}
                  onSelect={setTo}
                  $colors="light"
                  items={timeArrayFrom(from)}
                  disabled={from === ''}
                />
              </SelectBox>
            </SelectDaysBox>
          </ScheduleSection>

          <ScheduleSection>
            <Checkbox
              isChecked={isBreak}
              handleCheck={() => setIsBreak(p => !p)}
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
                  />
                </SelectBox>

                <SelectBox>
                  <p>до</p>

                  <Select
                    selectedItem={breakTo || ''}
                    onSelect={setBreakTo}
                    $colors="light"
                    items={timeArrayFrom(breakFrom || '')}
                    disabled={breakFrom === ''}
                  />
                </SelectBox>
              </SelectDaysBox>
            )}
          </ScheduleSection>
        </div>

        <ButtonsBox>
          <Button
            onClick={resetState}
            // isLoading={isLoading}
            Icon={HiTrash}
            disabled={isStateChanged}
            $colors="light"
            $variant="text"
          >
            Скинути
          </Button>

          <Button
            isLoading={isLoading}
            onClick={handleScheduleUpdate}
            Icon={IoIosSave}
            disabled={isSaveDisabled}
            $colors="accent"
          >
            Зберегти
          </Button>
        </ButtonsBox>
      </SelectionSide>
    </EmployeeScheduleBox>
  );
};

export default EmployeeSchedule;
