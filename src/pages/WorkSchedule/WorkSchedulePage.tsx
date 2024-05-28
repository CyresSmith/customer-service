import PageContentLayout from 'components/Layout/PageContentLayout';
import ScheduleTimeSelection from 'components/ScheduleTimeSelection';
import Modal from 'components/Ui/Modal/Modal';
import WorkSchedule from 'components/WorkSchedule';
import { SelectedDays } from 'components/WorkSchedule/types';
import WorkScheduleBar from 'components/WorkSchedule/WorkScheduleBar';
import {
    eachDayOfInterval,
    endOfMonth,
    getDate,
    getDay,
    getMonth,
    getYear,
    isPast,
    isSameDay,
    isToday,
    startOfDay,
    startOfMonth,
    startOfToday,
} from 'date-fns';
import generateTimeArray from 'helpers/generateTimeArray';
import { useAdminRights, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import {
    useGetAllCompanySchedulesQuery,
    useUpdateEmployeeScheduleMutation,
} from 'services/schedules.api';
import { EmployeeStatusEnum } from 'services/types/employee.types';
import { IDaySchedule, IMonthSchedule, ITime } from 'services/types/schedule.types';
import { IWorkingHours } from 'store/company/company.types';

const timeArray = generateTimeArray();

const WorkSchedulePage = () => {
    const { id: companyId, workingHours } = useCompany();
    const { user, accessToken } = useAuth();
    const isAdmin = useAdminRights();
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date(Date.now()));
    const [selectedDays, setSelectedDays] = useState<SelectedDays[]>([]);
    const [scheduleState, setScheduleState] = useState<IMonthSchedule[]>([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [isBreak, setIsBreak] = useState(false);
    const [breakFrom, setBreakFrom] = useState('');
    const [breakTo, setBreakTo] = useState('');
    const [selectedDayCompanySchedule, setSelectedDayCompanySchedule] =
        useState<IWorkingHours | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { data: employees } = useGetCompanyEmployeesQuery(companyId, {
        skip: !user || !accessToken || !companyId,
        refetchOnMountOrArgChange: true,
    });

    const providers = employees?.filter(
        ({ provider, status }) => provider && status === EmployeeStatusEnum.WORKING
    );

    const providersForRender = providers?.filter(({ id }) => selectedProviders.includes(id)) || [];

    const [updateSchedule, { isLoading: isUpdateLoading }] = useUpdateEmployeeScheduleMutation();

    const isEditingAllowed = isAdmin;

    const { data: allSchedules } = useGetAllCompanySchedulesQuery(
        {
            companyId,
            year: getYear(selectedMonth),
            month: getMonth(selectedMonth),
        },
        {
            skip: !user || !accessToken || !companyId || !employees || !providers,
            refetchOnMountOrArgChange: true,
        }
    );

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

    const resetState = () => {
        setSelectedDays([]);
        setFrom('');
        setTo('');
        setBreakFrom('');
        setBreakTo('');
        setIsBreak(false);
    };

    const dateInitialSchedule = (date: Date, employeeId: number) => {
        const initialMonthSchedule = allSchedules?.find(
            ({ employee }) => employee.id === employeeId
        );

        return initialMonthSchedule?.schedule.find(schedule => schedule?.day === getDate(date));
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

        const initialSchedule = dateInitialSchedule(date, employeeId);

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

                    if (monthScheduleIdx !== undefined && monthScheduleIdx !== -1) {
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

    const resetSelection = () => {
        setScheduleState(p => {
            let newState: IMonthSchedule[] = [...p];

            selectedDays.map(({ employeeId, dates }) => {
                const monthScheduleIdx = scheduleState.findIndex(
                    schedule => schedule?.employee.id === employeeId
                );

                const initialMonthSchedule = allSchedules?.find(
                    ({ employee }) => employee.id === employeeId
                );

                dates.map(date => {
                    const dayScheduleIdx = scheduleState[monthScheduleIdx]?.schedule.findIndex(
                        schedule => schedule?.day === getDate(date)
                    );

                    const initialSchedule = dateInitialSchedule(date, employeeId);

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
                });
            });

            return newState;
        });

        setSelectedDays([]);
    };

    const handleHeaderDateClick = (date: Date) => {
        if (date < startOfToday() || isNotWorkingDay(date) || !isEditingAllowed) return;

        const allProvidersSelect =
            selectedDays.length === providers?.length
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

            if (providers) {
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
            }

            return newState;
        });

        setScheduleState(p => {
            let newState: IMonthSchedule[] = [...p];

            if (allProvidersSelect && providers) {
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

                    providers?.map(({ id }) => {
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
                    companyId,
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
                    companyId,
                    employeeId: data.employee.id,
                    data,
                })
            )
        ).then(() => {
            toast.success('Графік оновлено');

            resetState();
            setModalOpen(false);
        });
    };

    useEffect(() => {
        if (!allSchedules) return;

        setScheduleState(allSchedules);
    }, [allSchedules]);

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

    useEffect(() => {
        setSelectedDays([]);
        setSelectedDayCompanySchedule(null);
    }, [selectedMonth]);

    useEffect(() => {
        if (!employees) return;

        providers && setSelectedProviders(providers.map(({ id }) => id));
    }, [employees]);

    const workScheduleProps = {
        providers: providersForRender || [],
        selectedMonth,
        selectedDays,
        setSelectedDays,
        scheduleState,
        setScheduleState,
        monthDays,
        isEditingAllowed,
        isNotWorkingDay,
        handleHeaderDateClick,
        handleEmployeeClick,
        handleDaySelect,
    };

    return (
        <>
            <PageContentLayout
                bar={
                    <WorkScheduleBar
                        providers={providers || []}
                        setSelectedProviders={setSelectedProviders}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedDays={selectedDays}
                        setSelectedDays={setSelectedDays}
                        onResetClick={handleResetClick}
                        isResetLoading={isUpdateLoading}
                        resetSelection={resetSelection}
                        onChangeClick={() => setModalOpen(true)}
                        isEditingAllowed={isEditingAllowed}
                    />
                }
                content={<WorkSchedule {...workScheduleProps} />}
            />

            {modalOpen && (
                <Modal
                    closeModal={() => setModalOpen(false)}
                    $isOpen={modalOpen}
                    title="Налаштування робочого часу"
                >
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
                        isUpdateLoading={isUpdateLoading}
                        isResetLoading={isUpdateLoading}
                        selectedHours={selectedDayCompanySchedule?.hours}
                        isDeleteButton={false}
                        isTitle={false}
                    />
                </Modal>
            )}
        </>
    );
};

export default WorkSchedulePage;
