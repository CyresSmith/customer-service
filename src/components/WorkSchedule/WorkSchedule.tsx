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
import generateTimeArray from 'helpers/generateTimeArray';
import { useAdminRights, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useScrollIntoView } from 'hooks/useScrollIntoView';
import { UIEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    useGetAllCompanySchedulesQuery,
    useUpdateEmployeeScheduleMutation,
} from 'services/schedules.api';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { IDaySchedule, IMonthSchedule, ITime } from 'services/types/schedule.types';
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

const timeArray = generateTimeArray();

const WorkSchedule = ({ providers, selectedMonth }: Props) => {
    const { id, workingHours, employees } = useCompany();
    const { user, accessToken } = useAuth();
    const isAdmin = useAdminRights();

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

    const isEditingAllowed = isAdmin;

    const handleScroll: UIEventHandler<HTMLDivElement> = e => {
        const { scrollLeft } = e.target as HTMLDivElement;

        setScrollLeft(scrollLeft);
    };

    const { data: allSchedules } = useGetAllCompanySchedulesQuery(
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

    const [updateSchedule, { isLoading: isUpdateScheduleLoading }] =
        useUpdateEmployeeScheduleMutation();

    const monthDaysCount = getDaysInMonth(selectedMonth);

    const monthDays = eachDayOfInterval({
        start: startOfMonth(selectedMonth),
        end: endOfMonth(selectedMonth),
    });

    const { scrollRef } = useScrollIntoView<HTMLDivElement>({ dependence: monthDays.length });

    const isNotWorkingDay = (date: Date): boolean => {
        if (selectedDayCompanySchedule) {
            return !selectedDayCompanySchedule.days.includes(getDay(date));
        }

        return workingHours?.findIndex(({ days }) => days.includes(getDay(date))) === -1;
    };

    const resetState = () => {
        setSelectedDays([]);
        setFrom('');
        setTo('');
        setBreakFrom('');
        setBreakTo('');
        setIsBreak(false);
    };

    const handleDaySelect = (date: Date, employeeId: number) => {
        if (date < startOfToday() || isNotWorkingDay(date) || !isEditingAllowed) return;

        let currentDayCompanySchedule: IWorkingHours | undefined = undefined;

        const monthScheduleIdx = scheduleState.findIndex(
            schedule => schedule?.employee.id === employeeId
        );

        const dayScheduleIdx = scheduleState[monthScheduleIdx]?.schedule.findIndex(
            schedule => schedule?.day === getDate(date)
        );

        if (!selectedDayCompanySchedule) {
            currentDayCompanySchedule = workingHours?.find(({ days }) =>
                days.includes(getDay(date))
            );
        }

        const initialMonthSchedule = allSchedules?.find(
            ({ employee }) => employee.id === employeeId
        );

        const initialSchedule = initialMonthSchedule?.schedule.find(
            schedule => schedule?.day === getDate(date)
        );

        const employeeSelectionIdx = selectedDays.findIndex(
            selected => selected.employeeId === employeeId
        );
        const employeeSelectedDays = selectedDays[employeeSelectionIdx]?.dates;
        const isDateSelected = employeeSelectedDays?.find(selected => isSameDay(selected, date));

        setScheduleState(p => {
            let newState: IMonthSchedule[] = [...p];

            if (selectedDays.length > 0) {
                if (isDateSelected) {
                    if (initialSchedule) {
                        newState[monthScheduleIdx] = {
                            ...newState[monthScheduleIdx],
                            schedule: newState[monthScheduleIdx].schedule.map((schedule, i) =>
                                i === dayScheduleIdx ? initialSchedule : schedule
                            ),
                        };
                    } else {
                        if (dayScheduleIdx !== undefined && dayScheduleIdx !== -1) {
                            newState[monthScheduleIdx].schedule = newState[
                                monthScheduleIdx
                            ].schedule.filter((_, i) => i !== dayScheduleIdx);
                        } else {
                            if (initialMonthSchedule) {
                                newState[monthScheduleIdx] = initialMonthSchedule;
                            } else {
                                newState = newState.filter((_, i) => i !== monthScheduleIdx);
                            }
                        }
                    }
                } else {
                    let daySchedule: IDaySchedule = {
                        hours: { from, to },
                        day: getDate(date),
                    };

                    if (isBreak && breakFrom && breakTo) {
                        daySchedule = {
                            ...daySchedule,
                            breakHours: { from: breakFrom, to: breakTo },
                        };
                    }

                    if (monthScheduleIdx !== undefined && monthScheduleIdx !== -1) {
                        if (dayScheduleIdx !== undefined && dayScheduleIdx !== -1) {
                            newState[monthScheduleIdx] = {
                                ...newState[monthScheduleIdx],
                                schedule: newState[monthScheduleIdx].schedule.map((item, i) => {
                                    if (i === dayScheduleIdx) {
                                        return daySchedule;
                                    }

                                    return item;
                                }),
                            };
                        } else {
                            newState[monthScheduleIdx] = {
                                ...newState[monthScheduleIdx],
                                schedule: [...newState[monthScheduleIdx].schedule, daySchedule],
                            };
                        }
                    } else {
                        newState = [
                            ...newState,
                            {
                                year: getYear(selectedMonth),
                                month: getMonth(selectedMonth),
                                schedule: [daySchedule],
                                employee: { id: employeeId },
                            },
                        ];
                    }
                }
            } else {
                if (initialSchedule) {
                    setFrom(initialSchedule.hours.from);
                    setTo(initialSchedule.hours.to);

                    if (initialSchedule.breakHours) {
                        setIsBreak(true);
                        setBreakFrom(initialSchedule.breakHours.from);
                        setBreakTo(initialSchedule.breakHours.to);
                    }
                } else if (currentDayCompanySchedule) {
                    setFrom(currentDayCompanySchedule.hours.from);
                    setTo(currentDayCompanySchedule.hours.to);

                    const newDaySchedule = {
                        day: getDate(date),
                        hours: currentDayCompanySchedule.hours,
                    };

                    if (monthScheduleIdx && monthScheduleIdx !== -1) {
                        newState[monthScheduleIdx] = {
                            ...newState[monthScheduleIdx],
                            schedule: [...newState[monthScheduleIdx].schedule, newDaySchedule],
                        };
                    } else {
                        const newSchedule = {
                            year: getYear(selectedMonth),
                            month: getMonth(selectedMonth),
                            employee: { id: employeeId },
                            schedule: [newDaySchedule],
                        };

                        newState = [...newState, newSchedule];
                    }
                }
            }

            return newState;
        });

        setSelectedDays(p => {
            let newState = [...p];

            if (newState.length === 0 && currentDayCompanySchedule) {
                setSelectedDayCompanySchedule(currentDayCompanySchedule);
            }

            if (employeeSelectionIdx !== undefined && employeeSelectionIdx !== -1) {
                newState[employeeSelectionIdx].dates = isDateSelected
                    ? employeeSelectedDays.filter(selected => !isSameDay(selected, date))
                    : [...employeeSelectedDays, date];

                if (newState[employeeSelectionIdx].dates.length === 0) {
                    newState = newState.filter((_, i) => i !== employeeSelectionIdx);
                }
            } else {
                newState = [...newState, { employeeId, dates: [date] }];
            }

            return newState;
        });
    };

    const handleHeaderDateClick = (date: Date) => {
        if (date < startOfToday() || isNotWorkingDay(date) || !isEditingAllowed) return;

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

        setScheduleState(p => {
            let newState: IMonthSchedule[] = [...p];

            if (allProvidersSelect) {
                providers.map(({ id }) => {
                    const initialSchedule = allSchedules
                        ?.find(({ employee }) => employee?.id === id)
                        ?.schedule?.find(({ day }) => day === getDate(date));

                    const providerScheduleIdx = newState.findIndex(
                        ({ employee }) => employee.id === id
                    );

                    if (providerScheduleIdx !== undefined && providerScheduleIdx !== -1) {
                        const currentSchedule = newState[providerScheduleIdx];

                        const scheduleIdx = currentSchedule.schedule.findIndex(
                            ({ day }) => day === getDate(date)
                        );

                        if (scheduleIdx !== undefined && scheduleIdx !== -1) {
                            newState[providerScheduleIdx] = {
                                ...currentSchedule,
                                schedule: initialSchedule
                                    ? currentSchedule.schedule.map((item, i) => {
                                          if (i === scheduleIdx) {
                                              return initialSchedule;
                                          }

                                          return item;
                                      })
                                    : currentSchedule.schedule.filter((_, i) => i !== scheduleIdx),
                            };
                        }
                    }
                });
            } else {
                if (currentDayCompanySchedule) {
                    setFrom(currentDayCompanySchedule.hours.from);
                    setTo(currentDayCompanySchedule.hours.to);

                    providers.map(({ id }) => {
                        const providerScheduleIdx = newState.findIndex(
                            ({ employee }) => employee.id === id
                        );

                        if (providerScheduleIdx !== undefined && providerScheduleIdx !== -1) {
                            const currentSchedule = newState[providerScheduleIdx];

                            const scheduleIdx = currentSchedule.schedule.findIndex(
                                ({ day }) => day === getDate(date)
                            );

                            if (scheduleIdx !== undefined && scheduleIdx !== -1) {
                                newState[providerScheduleIdx] = {
                                    ...currentSchedule,
                                    schedule: currentSchedule.schedule.map((item, i) => {
                                        if (i === scheduleIdx) {
                                            return {
                                                day: getDate(date),
                                                hours: currentDayCompanySchedule.hours,
                                            };
                                        }

                                        return item;
                                    }),
                                };
                            } else {
                                newState[providerScheduleIdx] = {
                                    ...currentSchedule,
                                    schedule: [
                                        ...currentSchedule.schedule,
                                        {
                                            day: getDate(date),
                                            hours: currentDayCompanySchedule.hours,
                                        },
                                    ],
                                };
                            }
                        } else {
                            newState = [
                                ...newState,
                                {
                                    year: getYear(selectedMonth),
                                    month: getMonth(selectedMonth),
                                    schedule: [
                                        {
                                            day: getDate(date),
                                            hours: currentDayCompanySchedule.hours,
                                        },
                                    ],
                                    employee: { id },
                                },
                            ];
                        }
                    });
                }
            }

            return newState;
        });
    };

    const handleEmployeeClick = (id: number) => {
        if (!isEditingAllowed) return;

        const monthWorkingDays = monthDays.filter(
            date => (isToday(date) || !isPast(startOfDay(date))) && !isNotWorkingDay(date)
        );

        const selectionIdx = selectedDays.findIndex(({ employeeId }) => employeeId === id);

        const isAllDaysSelected =
            monthWorkingDays.length === selectedDays[selectionIdx]?.dates.length;

        setSelectedDays(p => {
            let newState = [...p];

            const idx = newState.findIndex(item => item.employeeId === id);

            if (idx !== -1) {
                if (monthWorkingDays.length === newState[idx].dates.length) {
                    newState = newState.filter((_, i) => i !== idx);
                } else {
                    newState[idx].dates = monthWorkingDays;
                }

                return newState;
            } else {
                return [...newState, { employeeId: id, dates: monthWorkingDays }];
            }
        });

        const allDaysSchedule = workingHours?.reduce((acc: ITime, item) => {
            const timeIdx = (time: string) => timeArray.indexOf(time);

            if (timeIdx(acc.from) < timeIdx(item.hours.from)) {
                acc = { ...acc, from: item.hours.from };
            }

            if (timeIdx(acc.to) > timeIdx(item.hours.to)) {
                acc = { ...acc, to: item.hours.to };
            }

            return acc;
        }, workingHours[0].hours);

        if (allDaysSchedule) {
            if (!selectedDayCompanySchedule) {
                setFrom(allDaysSchedule.from);
                setTo(allDaysSchedule.to);
            }

            setScheduleState(p => {
                let newState = [...p];

                const employeeScheduleIdx = newState.findIndex(
                    ({ employee }) => employee.id === id
                );

                if (isAllDaysSelected) {
                    const initialSchedule = allSchedules?.find(
                        ({ employee }) => employee.id === id
                    );

                    if (initialSchedule) {
                        newState[employeeScheduleIdx] = initialSchedule;
                    } else {
                        newState.filter((_, i) => i !== employeeScheduleIdx);
                    }
                } else {
                    if (employeeScheduleIdx !== undefined && employeeScheduleIdx !== -1) {
                        const currentSchedule = newState[employeeScheduleIdx];

                        newState[employeeScheduleIdx] = {
                            ...currentSchedule,
                            schedule: [
                                ...currentSchedule.schedule.filter(({ day }) => {
                                    const date = new Date(
                                        currentSchedule.year,
                                        currentSchedule.month,
                                        day + 1
                                    );

                                    return isToday(date) || isPast(date);
                                }),
                                ...monthWorkingDays.map(date => ({
                                    day: getDate(date),
                                    hours: selectedDayCompanySchedule?.hours || allDaysSchedule,
                                })),
                            ],
                        };
                    } else {
                        newState = [
                            ...newState,
                            {
                                year: getYear(selectedMonth),
                                month: getMonth(selectedMonth),
                                schedule: monthWorkingDays.map(date => ({
                                    day: getDate(date),
                                    hours: selectedDayCompanySchedule?.hours || allDaysSchedule,
                                })),
                                employee: { id },
                            },
                        ];
                    }
                }

                return newState;
            });
        }
    };

    const isTimeForBreak = (fromValue = from, toValue = to) =>
        fromValue !== '' &&
        toValue !== '' &&
        toValue >= timeArray[timeArray.indexOf(fromValue) + 3];

    const timeArrayFrom = (start: string, end?: string) =>
        timeArray.filter(time => (end ? time >= start && time <= end : time >= start));

    const handleTimeSelect = (time: string, id: string) => {
        if (typeof time !== 'string') return;

        if (id === 'from') {
            setFrom(time);
            removeSelectedDaysBreakHours();
            setIsBreak(false);
            setBreakFrom('');
            setBreakTo('');
        }
        if (id === 'to') {
            setTo(time);
            removeSelectedDaysBreakHours();
            setIsBreak(false);
            setBreakFrom('');
            setBreakTo('');
        }
        if (id === 'breakFrom') setBreakFrom(time);
        if (id == 'breakTo') setBreakTo(time);

        const key = id === 'from' || id === 'to' ? 'hours' : 'breakHours';
        const param = id === 'from' || id === 'breakFrom' ? 'from' : 'to';

        setScheduleState(p =>
            p.map(monthSchedule => {
                const isSelected = selectedDays.findIndex(
                    selected => selected.employeeId === monthSchedule.employee.id
                );

                if (isSelected !== undefined && isSelected !== -1) {
                    const newSchedule = { ...monthSchedule };

                    newSchedule.schedule = newSchedule.schedule.map(schedule =>
                        selectedDays[isSelected].dates
                            .map(date => getDate(date))
                            .includes(schedule.day)
                            ? { ...schedule, [key]: { ...schedule[key], [param]: time } }
                            : schedule
                    );

                    return newSchedule;
                } else {
                    return monthSchedule;
                }
            })
        );
    };

    const setBreakTime = (workingHoursFrom: string, workingHoursTo: string) => {
        if (isTimeForBreak()) {
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

    const removeSelectedDaysBreakHours = () => {
        setScheduleState(p =>
            p.map(monthSchedule => {
                const isSelected = selectedDays.findIndex(
                    selected => selected.employeeId === monthSchedule.employee.id
                );

                if (isSelected !== undefined && isSelected !== -1) {
                    const newSchedule = { ...monthSchedule };

                    newSchedule.schedule = newSchedule.schedule.map(schedule => {
                        if (
                            !selectedDays[isSelected].dates
                                .map(date => getDate(date))
                                .includes(schedule.day)
                        ) {
                            return schedule;
                        }

                        const newItem = { ...schedule };
                        delete newItem.breakHours;
                        return newItem;
                    });

                    return newSchedule;
                } else {
                    return monthSchedule;
                }
            })
        );
    };

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
                    p.map(monthSchedule => {
                        const isSelected = selectedDays.findIndex(
                            selected => selected.employeeId === monthSchedule.employee.id
                        );

                        if (isSelected !== undefined && isSelected !== -1) {
                            const newSchedule = { ...monthSchedule };

                            newSchedule.schedule = newSchedule.schedule.map(schedule =>
                                selectedDays[isSelected].dates
                                    .map(date => getDate(date))
                                    .includes(schedule.day)
                                    ? { ...schedule, ...breakHours }
                                    : schedule
                            );

                            return newSchedule;
                        } else {
                            return monthSchedule;
                        }
                    })
                );
            }
        }
    };

    const handleResetClick = async () => {
        if (selectedDays === undefined || selectedDays.length === 0) return;

        const updateData = scheduleState
            .filter(({ employee }) =>
                Boolean(selectedDays.find(({ employeeId }) => employeeId === employee.id))
            )
            .map(item => {
                const employeeSelection = selectedDays.find(
                    ({ employeeId }) => employeeId === item.employee.id
                );

                return {
                    ...item,
                    schedule: item.schedule.filter(
                        ({ day }) => !employeeSelection?.dates.map(getDate).includes(day)
                    ),
                };
            });

        Promise.allSettled(
            updateData.map(data =>
                updateSchedule({
                    companyId: id,
                    employeeId: data.employee.id,
                    data,
                })
            )
        ).then(() => {
            toast.success('Графік оновлено');

            resetState();
        });
    };

    const handleUpdateClick = async () => {
        if (selectedDays === undefined || selectedDays.length === 0) return;

        const updateData = scheduleState.filter(({ employee }) =>
            Boolean(selectedDays.find(({ employeeId }) => employeeId === employee.id))
        );

        Promise.allSettled(
            updateData.map(data =>
                updateSchedule({
                    companyId: id,
                    employeeId: data.employee.id,
                    data,
                })
            )
        ).then(() => {
            toast.success('Графік оновлено');

            resetState();
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
        if (selectedDays.length === 0) {
            setSelectedDayCompanySchedule(null);
            setFrom('');
            setTo('');
            setIsBreak(false);
            setBreakFrom('');
            setBreakTo('');
        }
    }, [selectedDays]);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `${isEditingAllowed ? '1fr 300px' : '1fr'}`,
                gap: '16px',
                height: '100%',
            }}
        >
            <WorkScheduleBox onScroll={handleScroll}>
                {isThisMonth(selectedMonth) && (
                    <Today
                        $left={
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
                                schedule => schedule?.employee.id === id
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
                                            schedule => schedule?.day === getDate(item)
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

            {isEditingAllowed && (
                <>
                    {selectedDays.length > 0 && workingHours ? (
                        <ScheduleTimeSelection
                            from={from}
                            setFrom={time => handleTimeSelect(time, 'from')}
                            to={to}
                            setTo={time => handleTimeSelect(time, 'to')}
                            breakFrom={breakFrom}
                            setBreakFrom={time => handleTimeSelect(time, 'breakFrom')}
                            breakTo={breakTo}
                            setBreakTo={time => handleTimeSelect(time, 'breakTo')}
                            isBreak={isBreak}
                            breakToggle={handleAddBreakHoursClick}
                            isEditingAllowed={true}
                            handleReset={handleResetClick}
                            handleUpdate={handleUpdateClick}
                            isUpdateDisabled={false}
                            isUpdateLoading={isUpdateScheduleLoading}
                            isResetLoading={isUpdateScheduleLoading}
                            selectedHours={selectedDayCompanySchedule?.hours}
                        />
                    ) : (
                        <Message>Виберіть дні місяця для налаштування часу роботи.</Message>
                    )}
                </>
            )}
        </div>
    );
};

export default WorkSchedule;
