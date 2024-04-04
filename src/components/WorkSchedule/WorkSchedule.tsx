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

import arraysAreEqual from 'helpers/areArrayEqual';
import { useCompany } from 'hooks/useCompany';
import { LegacyRef, UIEventHandler, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetAllCompanySchedulesQuery } from 'services/schedules.api';
import { BasicEmployeeInfo } from 'services/types/employee.types';
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

    const [selectedDays, setSelectedDays] = useState<{ id: number; dates: Date[] }[]>([]);

    const [scrollLeft, setScrollLeft] = useState<number>(0);

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
            skip: !id || !employees || !providers,
            refetchOnMountOrArgChange: true,
        }
    );

    const scrollRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);

    const monthDaysCount = getDaysInMonth(selectedMonth);
    const monthDays = eachDayOfInterval({
        start: startOfMonth(selectedMonth),
        end: endOfMonth(selectedMonth),
    });

    const isNotWorkingDay = (date: Date): boolean =>
        workingHours?.findIndex(({ days }) => days.includes(getDay(date))) === -1;

    const handleSelect = (date?: Date, id?: number) => {
        if (date) {
            if (date < startOfToday()) return;

            if (isNotWorkingDay(date)) {
                return toast.info('Нині свято, робити гріх');
            }

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
                const allProvidersSelect =
                    selectedDays.length === providers.length
                        ? selectedDays.every(item =>
                              item.dates.some(selectedDate => isSameDay(selectedDate, date))
                          )
                        : false;

                setSelectedDays(p => {
                    let newState = [...p];

                    if (allProvidersSelect) {
                        return newState.reduce((acc: typeof newState, item) => {
                            item.dates = item.dates.filter(
                                selectedDate => !isSameDay(selectedDate, date)
                            );

                            if (item.dates.length === 0) {
                                acc = acc.filter(({ id }) => id !== item.id);
                            }

                            return acc;
                        }, newState);
                    }

                    for (const { id } of providers) {
                        const idx = newState.findIndex(item => item?.id === id);

                        if (idx === -1) {
                            newState = [...newState, { id, dates: [date] }];
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
            }
        } else if (id) {
            setSelectedDays(p => {
                let newState = [...p];

                const idx = newState.findIndex(item => item.id === id);

                const monthWorkingDays = monthDays.filter(date => !isNotWorkingDay(date));

                if (idx !== -1) {
                    if (
                        newState[idx].dates.length !== monthWorkingDays.length ||
                        !arraysAreEqual(monthWorkingDays, newState[idx].dates)
                    ) {
                        newState = newState.filter(item => item.id !== id);
                    } else {
                        newState[idx].dates = monthWorkingDays;
                    }

                    return newState;
                } else {
                    return [...newState, { id, dates: monthWorkingDays }];
                }
            });
        }
    };

    useEffect(() => {
        setSelectedDays([]);
    }, [selectedMonth]);

    const handleEmployeeClick = (id: number) =>
        setSelectedDays(p => {
            const newState = [...p];

            const idx = newState.findIndex(item => item.id === id);

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
                return [...newState, { id, dates: monthWorkingDays }];
            }
        });

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
        <>
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
                                    onClick={() => handleSelect(item)}
                                    key={i}
                                    $isNotWorkingDay={isNotWorking}
                                    $isToday={today}
                                >
                                    <DayDateBox $isNotWorkingDay={isNotWorking} $isToday={today}>
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
                                <Employee key={id} onClick={() => handleEmployeeClick(id)}>
                                    <ItemAvatar avatar={avatar} name={firstName} />

                                    <p>{firstName}</p>
                                </Employee>
                            ))}
                        </EmployeesList>

                        {providers.map(({ id }) => {
                            const employeeSchedule = allSchedules?.find(
                                ({ employee }) => employee.id === id
                            );

                            return (
                                <RowBox key={id} $daysCount={monthDaysCount + 1}>
                                    <Day />

                                    {monthDays.map((item, i) => {
                                        const isSelected =
                                            selectedDays?.findIndex(
                                                selected =>
                                                    selected?.id === id &&
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
                                                onClick={() => handleSelect(item, id)}
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

            {/* <ScheduleTimeSelection selectedDays={selectedDays.map()} /> */}
        </>
    );
};

export default WorkSchedule;
