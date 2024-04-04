import Button from 'components/Ui/Buttons/Button';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiTrash } from 'react-icons/hi';
import { MdToday } from 'react-icons/md';
import { IEmployee } from 'services/types/employee.types';
import Calendar from './Calendar';
import {
  ButtonsBox,
  CalendarHeader,
  CalendarSide,
  EmployeeScheduleBox,
  Message,
  MonthBox,
  MonthName,
  ScheduleSection,
  SelectBox,
  SelectDaysBox,
  SelectionBox,
  SelectionSide,
  Title,
} from './EmployeeSchedule.styled';

import Checkbox from 'components/Ui/Form/Checkbox';
import Loader from 'components/Ui/Loader';
import Select from 'components/Ui/Select';
import {
  addMonths,
  format,
  getDay,
  getMonth,
  getYear,
  isPast,
  isThisMonth,
  setDefaultOptions,
  startOfMonth,
} from 'date-fns';
import { uk } from 'date-fns/locale';
import generateTimeArray from 'helpers/generateTimeArray';
import { useAdminRights, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import {
  useDeleteEmployeeScheduleMutation,
  useGetEmployeeScheduleQuery,
  useUpdateEmployeeScheduleMutation,
} from 'services/schedules.api';
import { IDaySchedule, IMonthSchedule } from 'services/types/schedule.types';
import { IWorkingHours } from 'store/company/company.types';

setDefaultOptions({ locale: uk });

type Props = { employee: IEmployee };

const EmployeeSchedule = ({ employee }: Props) => {
  const today = new Date(Date.now());
  const currentMonthStart = startOfMonth(today);

  const isAdmin = useAdminRights();
  const { user } = useAuth();
  const { id: companyId, workingHours } = useCompany();
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStart);

  const { isLoading: isScheduleLoading, data: employeeSchedule } =
    useGetEmployeeScheduleQuery(
      {
        companyId,
        employeeId: +employee.id,
        year: getYear(selectedMonth),
        month: getMonth(selectedMonth),
      },
      { refetchOnMountOrArgChange: true }
    );

  const [scheduleState, setScheduleState] = useState<IDaySchedule[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isBreak, setIsBreak] = useState(false);
  const [breakFrom, setBreakFrom] = useState('');
  const [breakTo, setBreakTo] = useState('');
  const [isStateChanged, setIsStateChanged] = useState(false);
  const [selectedDayCompanySchedule, setSelectedDayCompanySchedule] =
    useState<IWorkingHours | null>(null);

  const [updateSchedule, { isLoading }] = useUpdateEmployeeScheduleMutation();
  const [deleteSchedule, { isLoading: isDeleteLoading }] =
    useDeleteEmployeeScheduleMutation();

  const selectedMonthPassed =
    getMonth(today) !== getMonth(selectedMonth) && isPast(selectedMonth);

  const isEditingAllowed =
    !selectedMonthPassed && (isAdmin || user?.id === employee?.user?.id);

  const handleScheduleUpdate = async () => {
    const data: IMonthSchedule = {
      year: getYear(selectedMonth),
      month: getMonth(selectedMonth),
      schedule: scheduleState,
    };

    const { message } = await updateSchedule({
      companyId,
      employeeId: employee.id,
      data,
    }).unwrap();

    if (message) {
      resetState();
      setIsStateChanged(false);
      toast.success(message);
    }
  };

  const getCompanyScheduleByDay = (dayIdx: number) =>
    workingHours?.find(({ days }) => days.includes(dayIdx));

  const disabledDays = (date: Date): number[] =>
    getCompanyScheduleByDay(getDay(date))?.days || [];

  const resetState = () => {
    setSelectedDays([]);
    setFrom('');
    setTo('');
    setBreakFrom('');
    setBreakTo('');
    setIsBreak(false);
  };

  const handleNextMonthClick = () => {
    resetState();
    setScheduleState([]);
    setSelectedMonth(addMonths(selectedMonth, 1));
    setIsStateChanged(false);
  };

  const handlePrevMonthClick = () => {
    resetState();
    setScheduleState([]);
    setSelectedMonth(addMonths(selectedMonth, -1));
    setIsStateChanged(false);
  };

  const toToday = () => {
    setSelectedMonth(currentMonthStart);
  };

  const updateScheduleState = (schedule: IDaySchedule) => {
    setScheduleState(p => {
      const newState = [...p];

      const dayIdx = newState.findIndex(({ day }) => day === schedule.day);

      if (dayIdx !== undefined && dayIdx >= 0) {
        newState[dayIdx] = { ...newState[dayIdx], ...schedule };
      } else {
        newState.push(schedule);
      }

      return newState;
    });
  };

  const handleDayClick = (date: number, dayIdx: number) => {
    if (!isEditingAllowed) return;

    const currentDateSchedule = scheduleState.find(
      ({ day: dayDate }) => dayDate === date
    );

    const currentDayCompanySchedule = workingHours?.find(({ days }) =>
      days.includes(dayIdx)
    );

    currentDayCompanySchedule &&
      setSelectedDayCompanySchedule(currentDayCompanySchedule);

    setSelectedDays(p => {
      if (p.includes(date)) {
        if (p.length === 1) {
          setFrom('');
          setTo('');
          setIsBreak(false);
          setBreakFrom('');
          setBreakTo('');
        }

        const oldSchedule = employeeSchedule?.schedule?.find(
          ({ day }) => day === date
        );

        setScheduleState(p =>
          oldSchedule
            ? p.map(stateDay => {
                if (stateDay.day !== date) {
                  return stateDay;
                }
                return oldSchedule;
              })
            : p.filter(({ day }) => day !== date)
        );

        if (p.length === 1) {
          setIsStateChanged(false);
        }

        return p.filter(selectedDate => selectedDate !== date);
      } else {
        if (p.length === 0) {
          if (currentDateSchedule) {
            setFrom(currentDateSchedule.hours.from);
            setTo(currentDateSchedule.hours.to);

            if (currentDateSchedule.breakHours) {
              setIsBreak(true);
              setBreakFrom(currentDateSchedule.breakHours.from);
              setBreakTo(currentDateSchedule.breakHours.to);
            }
          } else if (currentDayCompanySchedule) {
            setFrom(currentDayCompanySchedule.hours.from);
            setTo(currentDayCompanySchedule.hours.to);

            updateScheduleState({
              day: date,
              hours: currentDayCompanySchedule.hours,
            });

            setIsStateChanged(true);
          }
        } else {
          let update: {
            day: number;
            hours: { from: string; to: string };
            breakHours?: { from: string; to: string };
          } = { day: date, hours: { from, to } };

          if (isBreak && breakFrom !== '' && breakTo !== '') {
            update = Object.assign(update, {
              breakHours: { from: breakFrom, to: breakTo },
            });
          }

          updateScheduleState(update);
          setIsStateChanged(true);
        }

        return [...p, date].sort((a, b) => a + b);
      }
    });
  };

  const timeArray = generateTimeArray();

  const timeArrayFrom = (start: string, end?: string) =>
    timeArray.filter(time =>
      end ? time >= start && time <= end : time >= start
    );

  const handleTimeSelect = (
    time: string | string[],
    id?: string | undefined
  ) => {
    if (typeof time !== 'string') return;

    if (id === 'from') setFrom(time);
    if (id === 'to') setTo(time);
    if (id === 'breakFrom') setBreakFrom(time);
    if (id == 'breakTo') setBreakTo(time);

    const key = id === 'from' || id === 'to' ? 'hours' : 'breakHours';
    const param = id === 'from' || id === 'breakFrom' ? 'from' : 'to';

    setScheduleState(p =>
      p.map(item =>
        !selectedDays.includes(item.day)
          ? item
          : { ...item, [key]: { ...item[key], [param]: time } }
      )
    );

    setIsStateChanged(true);
  };

  const isTimeForBreak =
    from !== '' && to !== '' && to >= timeArray[timeArray.indexOf(from) + 3];

  const removeSelectedDaysBreakHours = () =>
    setScheduleState(p =>
      p.map(item => {
        if (!selectedDays.includes(item.day)) return item;

        const newItem = { ...item };
        delete newItem.breakHours;
        return newItem;
      })
    );

  const handleAddBreakHoursClick = () => {
    if (!isEditingAllowed) return;

    if (isBreak) {
      setIsBreak(false);
      setBreakFrom('');
      setBreakTo('');
      removeSelectedDaysBreakHours();
    } else {
      const breakHours = setBreakTime(from, to);

      if (breakHours) {
        setScheduleState(p =>
          p.map(item =>
            !selectedDays.includes(item.day) ? item : { ...item, ...breakHours }
          )
        );
      }
    }

    setIsStateChanged(true);
  };

  const setBreakTime = (workingHoursFrom: string, workingHoursTo: string) => {
    if (isTimeForBreak) {
      const breakTime = timeArrayFrom(workingHoursFrom, workingHoursTo);
      const breakFromIdx = Math.floor(breakTime.length / 2) - 1;
      const breakFrom = breakTime[breakFromIdx];
      const breakTo = breakTime[breakFromIdx + 1];

      setIsBreak(true);
      setBreakFrom(breakFrom);
      setBreakTo(breakTo);

      return { breakHours: { from: breakFrom, to: breakTo } };
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
          scheduleId: employeeSchedule.id,
        }).unwrap();

        if (message) {
          toastMessage = message;
        }
      }

      if (toastMessage !== '') {
        toast.success(toastMessage);
      }
      resetState();
    }
    setIsStateChanged(false);
  };

  useEffect(() => {
    setScheduleState(employeeSchedule ? employeeSchedule?.schedule : []);
  }, [employeeSchedule]);

  useEffect(() => {
    if (!isTimeForBreak) {
      setIsBreak(false);
      setBreakFrom('');
      setBreakTo('');
      removeSelectedDaysBreakHours();
    }
  }, [isTimeForBreak]);

  return (
    <EmployeeScheduleBox>
      {workingHours && workingHours?.length > 0 ? (
        <>
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
                  disabledDays={disabledDays(
                    new Date(
                      getYear(selectedMonth),
                      getMonth(selectedMonth),
                      selectedDays[0]
                    )
                  )}
                  handleDayClick={handleDayClick}
                  toNextMonth={handleNextMonthClick}
                  toPrevMonth={handlePrevMonthClick}
                />
              </>
            )}
          </CalendarSide>

          {!selectedMonthPassed && isEditingAllowed && (
            <SelectionSide>
              <SelectionBox>
                {selectedDays.length > 0 ? (
                  <>
                    <ScheduleSection>
                      <Title>Робочій час</Title>

                      <SelectDaysBox>
                        <SelectBox>
                          <p>з</p>
                          <Select
                            id="from"
                            selectedItem={from}
                            onSelect={handleTimeSelect}
                            $colors="light"
                            items={
                              selectedDayCompanySchedule
                                ? timeArrayFrom(
                                    selectedDayCompanySchedule.hours.from,
                                    selectedDayCompanySchedule.hours.to
                                  )
                                : timeArray
                            }
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
                            items={
                              selectedDayCompanySchedule
                                ? timeArrayFrom(
                                    from
                                      ? timeArray[timeArray.indexOf(from) + 1]
                                      : timeArray[
                                          timeArray.indexOf(
                                            selectedDayCompanySchedule.hours
                                              .from
                                          ) + 1
                                        ],
                                    selectedDayCompanySchedule.hours.to
                                  )
                                : timeArrayFrom(
                                    timeArray[timeArray.indexOf(from) + 1]
                                  )
                            }
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
                              items={timeArrayFrom(
                                timeArray[timeArray.indexOf(from) + 1],
                                timeArray[timeArray.indexOf(breakTo) - 1] ||
                                  timeArray[timeArray.indexOf(to) - 1]
                              )}
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
                              items={timeArrayFrom(
                                timeArray[timeArray.indexOf(breakFrom) + 1] ||
                                  '',

                                to
                                  ? timeArray[timeArray.indexOf(to) - 1]
                                  : selectedDayCompanySchedule
                                    ? timeArray[
                                        timeArray.indexOf(
                                          selectedDayCompanySchedule.hours.to
                                        ) - 1
                                      ]
                                    : ''
                              )}
                              disabled={!isEditingAllowed || breakFrom === ''}
                            />
                          </SelectBox>
                        </SelectDaysBox>
                      )}
                    </ScheduleSection>
                  </>
                ) : (
                  <Message>
                    Виберіть дні місяця для налаштування часу роботи.
                  </Message>
                )}
              </SelectionBox>

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
        </>
      ) : (
        <Message>Чар роботи компанії не налаштовано!</Message>
      )}
    </EmployeeScheduleBox>
  );
};

export default EmployeeSchedule;
