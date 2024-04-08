import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDate,
    getDay,
    getDaysInMonth,
    getMonth,
    getYear,
    isPast,
    isSameDay,
    isThisMonth,
    isToday,
    startOfDay,
    startOfMonth,
    startOfToday,
} from 'date-fns';

import ScheduleTimeSelection from 'components/ScheduleTimeSelection';
import { Message } from 'components/ScheduleTimeSelection/ScheduleTimeSelection.styled';
import { useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { LegacyRef, UIEventHandler, useEffect, useRef, useState } from 'react';
import { useGetAllCompanySchedulesQuery } from 'services/schedules.api';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { IMonthSchedule } from 'services/types/schedule.types';
import { IWorkingHours } from 'store/company/company.types';
import {
    Day,
    DayBox,
    DayBreak,
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
    Today,
    WorkHours,
    WorkScheduleBox,
} from './WorkSchedule.styled';

type Props = { providers: BasicEmployeeInfo[]; selectedMonth: Date };

const WorkSchedule = ({ providers, selectedMonth }: Props) => {
    const { id, workingHours, employees } = useCompany();
    const { user, accessToken } = useAuth();

    const [scheduleState, setScheduleState] = useState<IMonthSchedule[]>([]);
    const [selectedDays, setSelectedDays] = useState<{ employeeId: number; dates: Date[] }[]>([]);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [isBreak, setIsBreak] = useState(false);
    const [breakFrom, setBreakFrom] = useState('');
    const [breakTo, setBreakTo] = useState('');
    const [selectedDayCompanySchedule, setSelectedDayCompanySchedule] =
        useState<IWorkingHours | null>(null);

    const [isStateChanged, setIsStateChanged] = useState(false);

    const handleScroll: UIEventHandler<HTMLDivElement> = e => {
        const { scrollLeft } = e.target as HTMLDivElement;

        setScrollLeft(scrollLeft);
    };

    const { data: allSchedules, isLoading } = useGetAllCompanySchedulesQuery(
        {
            companyId: id,
            year: getYear(selectedMonth),
            month: getMonth(selectedMonth),
        },
        {
            skip: !user || !accessToken || !id || !employees || !providers,
            refetchOnMountOrArgChange: true,
        }
    );

    const scrollRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);

    const monthDaysCount = getDaysInMonth(selectedMonth);

    const monthDays = eachDayOfInterval({
        start: startOfMonth(selectedMonth),
        end: endOfMonth(selectedMonth),
    });

    const isNotWorkingDay = (date: Date): boolean => {
        if (selectedDayCompanySchedule) {
            return !selectedDayCompanySchedule.days.includes(getDay(date));
        }

        return workingHours?.findIndex(({ days }) => days.includes(getDay(date))) === -1;
    };

    const handleDaySelect = (date: Date, employeeId: number) => {
        if (date < startOfToday() || isNotWorkingDay(date)) return;

        let currentDayCompanySchedule: IWorkingHours | undefined = undefined;

        const monthScheduleIdx = scheduleState.findIndex(
            ({ employee }) => employee.id === employeeId
        );

        const dayScheduleIdx = scheduleState[monthScheduleIdx]?.schedule.findIndex(
            ({ day }) => day === getDate(date)
        );

        if (!selectedDayCompanySchedule) {
            currentDayCompanySchedule = workingHours?.find(({ days }) =>
                days.includes(getDay(date))
            );
        }

        setScheduleState(p => {
            const newState = [...p];

            if (dayScheduleIdx > -1) {
                const daySchedule = scheduleState[monthScheduleIdx]?.schedule[dayScheduleIdx];

                if (daySchedule) {
                    const { hours, breakHours } = daySchedule;

                    setFrom(hours.from);
                    setTo(hours.to);

                    if (breakHours) {
                        setIsBreak(true);
                        setBreakFrom(breakHours.from);
                        setBreakTo(breakHours.to);
                    }
                }
            } else if (currentDayCompanySchedule) {
                const { hours } = currentDayCompanySchedule;

                setFrom(hours.from);
                setTo(hours.to);

                newState[monthScheduleIdx] = {
                    ...newState[monthScheduleIdx],

                    schedule: [{ hours, day: getDate(date) }],
                };
            }

            return newState;
        });

        setSelectedDays(p => {
            const idx = p.findIndex(item => item.employeeId === employeeId);

            if (idx === -1) {
                currentDayCompanySchedule &&
                    setSelectedDayCompanySchedule(currentDayCompanySchedule);

                return [...p, { employeeId, dates: [date] }];
            } else {
                const dateIdx = p[idx].dates.findIndex(selected => isSameDay(selected, date));

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
    };

    const handleHeaderDateClick = (date: Date) => {
        if (date < startOfToday() || isNotWorkingDay(date)) return;

        const allProvidersSelect =
            selectedDays.length === providers.length
                ? selectedDays.every(item =>
                      item.dates.some(selectedDate => isSameDay(selectedDate, date))
                  )
                : false;

        const currentDayCompanySchedule = workingHours?.find(({ days }) =>
            days.includes(getDay(date))
        );

        setSelectedDays(p => {
            let newState = [...p];

            if (allProvidersSelect) {
                setSelectedDayCompanySchedule(null);

                return newState.reduce((acc: typeof newState, item) => {
                    item.dates = item.dates.filter(selectedDate => !isSameDay(selectedDate, date));

                    if (item.dates.length === 0) {
                        acc = acc.filter(({ employeeId }) => employeeId !== item.employeeId);
                    }

                    return acc;
                }, newState);
            }

            currentDayCompanySchedule && setSelectedDayCompanySchedule(currentDayCompanySchedule);

            for (const { id } of providers) {
                const idx = newState.findIndex(item => item?.employeeId === id);

                if (idx === -1) {
                    newState = [...newState, { employeeId: id, dates: [date] }];
                } else {
                    const dateIdx = newState[idx]?.dates.findIndex(selected =>
                        isSameDay(selected, date)
                    );

                    if (dateIdx === -1) {
                        newState[idx].dates = [...newState[idx].dates, date];
                    }
                }
            }

            return newState;
        });
    };

    const handleEmployeeClick = (id: number) => {
        setSelectedDays(p => {
            const newState = [...p];

            const idx = newState.findIndex(item => item.employeeId === id);

            const monthWorkingDays = monthDays.filter(
                date => (isToday(date) || !isPast(startOfDay(date))) && !isNotWorkingDay(date)
            );

            if (idx !== -1) {
                if (monthWorkingDays.length === newState[idx].dates.length) {
                    newState[idx].dates = [];
                } else {
                    newState[idx].dates = monthWorkingDays;
                }

                return newState;
            } else {
                return [...newState, { employeeId: id, dates: monthWorkingDays }];
            }
        });
    };

    useEffect(() => {
        if (!allSchedules) return;

        setScheduleState(allSchedules);
    }, [allSchedules]);

    useEffect(() => {
        setSelectedDays([]);
        setSelectedDayCompanySchedule(null);
    }, [selectedMonth]);

    useEffect(() => {
        if (selectedDays.length === 0) setSelectedDayCompanySchedule(null);
    }, [selectedDays]);

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

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 300px',
                gap: '16px',
                height: '100%',
            }}
        >
            <WorkScheduleBox onScroll={handleScroll}>
                {isThisMonth(selectedMonth) && (
                    <Today
                        left={
                            eachDayOfInterval({
                                start: startOfMonth(selectedMonth),
                                end: startOfToday(),
                            }).length
                        }
                    />
                )}
                <SchedulesList>
                    <HeaderRowBox key={id} $daysCount={monthDaysCount + 1}>
                        <HeaderDay />

                        {monthDays.map((item, i) => {
                            const hours = workingHours?.find(({ days }) =>
                                days.includes(getDay(item))
                            );

                            const today = isToday(item);
                            const isNotWorking = isNotWorkingDay(item) || (!today && isPast(item));

                            return (
                                <HeaderDay
                                    onClick={() => handleHeaderDateClick(item)}
                                    key={i}
                                    $isNotWorkingDay={isNotWorking}
                                    $isToday={today}
                                >
                                    <DayDateBox $isNotWorkingDay={isNotWorking} $isToday={today}>
                                        <DayDate>{getDate(item)}</DayDate>
                                        <DayName>{format(item, 'EEEE')}</DayName>
                                    </DayDateBox>

                                    {hours && (
                                        <WorkHours $isToday={today}>
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
                                <Employee key={id} onClick={() => handleEmployeeClick(id)}>
                                    <ItemAvatar avatar={avatar} name={firstName} />

                                    <p>{firstName}</p>
                                </Employee>
                            ))}
                        </EmployeesList>

                        {providers.map(({ id }) => {
                            const employeeSchedule = scheduleState?.find(
                                ({ employee }) => employee.id === id
                            );

                            return (
                                <RowBox key={id} $daysCount={monthDaysCount + 1}>
                                    <Day />

                                    {monthDays.map((item, i) => {
                                        const isSelected =
                                            selectedDays?.findIndex(
                                                selected =>
                                                    selected?.employeeId === id &&
                                                    selected?.dates?.findIndex(selected =>
                                                        isSameDay(selected, item)
                                                    ) !== -1
                                            ) !== -1;

                                        const daySchedule = employeeSchedule?.schedule.find(
                                            ({ day }) => day === getDate(item)
                                        );

                                        const today = isToday(item);

                                        const dayRef = isThisMonth(selectedMonth)
                                            ? today
                                            : getDate(item) === 1;

                                        const isNotWorking =
                                            isNotWorkingDay(item) || (!today && isPast(item));

                                        return (
                                            <Day
                                                $isNotWorkingDay={isNotWorking}
                                                ref={dayRef ? scrollRef : null}
                                                onClick={() => handleDaySelect(item, id)}
                                                key={i}
                                            >
                                                <DayBox
                                                    $isNotWorkingDay={isNotWorking}
                                                    $selected={isSelected}
                                                >
                                                    {daySchedule && (
                                                        <>
                                                            <span>{daySchedule.hours.from}</span>
                                                            {daySchedule.breakHours && (
                                                                <DayBreak $selected={isSelected}>
                                                                    <span>
                                                                        {
                                                                            daySchedule.breakHours
                                                                                .from
                                                                        }
                                                                    </span>
                                                                    {'-'}
                                                                    <span>
                                                                        {daySchedule.breakHours.to}
                                                                    </span>
                                                                </DayBreak>
                                                            )}
                                                            <span>{daySchedule.hours.to}</span>
                                                        </>
                                                    )}
                                                </DayBox>
                                            </Day>
                                        );
                                    })}
                                </RowBox>
                            );
                        })}
                    </SchedulesListBox>
                </SchedulesList>
            </WorkScheduleBox>

            {selectedDays.length > 0 && workingHours ? (
                <ScheduleTimeSelection
                    from={from}
                    setFrom={time => {}}
                    to={to}
                    setTo={time => {}}
                    breakFrom={breakFrom}
                    setBreakFrom={time => {}}
                    breakTo={breakTo}
                    setBreakTo={time => {}}
                    isBreak={isBreak}
                    breakToggle={() => {}}
                    isEditingAllowed={true}
                    handleReset={() => {}}
                    handleUpdate={() => {}}
                    isUpdateDisabled={!isStateChanged}
                    isUpdateLoading={isLoading}
                    isResetLoading={false}
                    selectedHours={selectedDayCompanySchedule?.hours}
                />
            ) : (
                <Message>Виберіть дні місяця для налаштування часу роботи.</Message>
            )}
        </div>
    );
};

export default WorkSchedule;
