import { useEffect, useState } from 'react';
import { IEmployee } from 'services/types/employee.types';
import Calendar from './Calendar';
import {
    CalendarHeader,
    CalendarSide,
    EditScheduleButtonsBox,
    Message,
} from './EmployeeSchedule.styled';

import ScheduleTimeSelection from 'components/ScheduleTimeSelection';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import DateSwitcher from 'components/Ui/DateSwitcher';
import Modal from 'components/Ui/Modal/Modal';
import EditScheduleButtons from 'components/WorkSchedule/WorkScheduleBar/EditScheduleButtons';
import { addMonths, getDay, getMonth, getYear, isPast, startOfMonth } from 'date-fns';
import generateTimeArray from 'helpers/generateTimeArray';
import { useAdminRights, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { toast } from 'react-toastify';
import {
    useDeleteEmployeeScheduleMutation,
    useGetEmployeeScheduleQuery,
    useUpdateEmployeeScheduleMutation,
} from 'services/schedules.api';
import { IDaySchedule, IMonthSchedule } from 'services/types/schedule.types';
import { IWorkingHours } from 'store/company/company.types';

type Props = { employee: IEmployee };

enum OpenModal {
    EDIT = 1,
    CONFIRM = 2,
}

const EmployeeSchedule = ({ employee }: Props) => {
    const today = new Date(Date.now());
    const currentMonthStart = startOfMonth(today);

    const isAdmin = useAdminRights();
    const { user } = useAuth();
    const { id: companyId, workingHours } = useCompany();
    const [selectedMonth, setSelectedMonth] = useState(currentMonthStart);

    const { data: employeeSchedule } = useGetEmployeeScheduleQuery(
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
    const [openModal, setOpenModal] = useState<OpenModal | null>(null);
    const [selectedDayCompanySchedule, setSelectedDayCompanySchedule] =
        useState<IWorkingHours | null>(null);

    const [updateSchedule, { isLoading }] = useUpdateEmployeeScheduleMutation();
    const [deleteSchedule] = useDeleteEmployeeScheduleMutation();

    const selectedMonthPassed =
        getMonth(today) !== getMonth(selectedMonth) && isPast(selectedMonth);

    const isEditingAllowed = !selectedMonthPassed && (isAdmin || user?.id === employee?.user?.id);

    const handleScheduleUpdate = async () => {
        const data: IMonthSchedule = {
            year: getYear(selectedMonth),
            month: getMonth(selectedMonth),
            schedule: scheduleState,
            employee: { id: employee.id },
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
            setOpenModal(null);
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

    useEffect(() => {
        resetState();
        setScheduleState([]);
        setIsStateChanged(false);
    }, [selectedMonth]);

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

        const currentDateSchedule = scheduleState.find(({ day: dayDate }) => dayDate === date);

        const currentDayCompanySchedule = workingHours?.find(({ days }) => days.includes(dayIdx));

        currentDayCompanySchedule && setSelectedDayCompanySchedule(currentDayCompanySchedule);

        setSelectedDays(p => {
            if (p.includes(date)) {
                if (p.length === 1) {
                    setFrom('');
                    setTo('');
                    setIsBreak(false);
                    setBreakFrom('');
                    setBreakTo('');
                }

                const oldSchedule = employeeSchedule?.schedule?.find(({ day }) => day === date);

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
        timeArray.filter(time => (end ? time >= start && time <= end : time >= start));

    const handleTimeSelect = (time: string, id: string) => {
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

    const isTimeForBreak = from !== '' && to !== '' && to >= timeArray[timeArray.indexOf(from) + 3];

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
                const data = {
                    year: getYear(selectedMonth),
                    month: getMonth(selectedMonth),
                    schedule: scheduleState.filter(({ day }) => !selectedDays.includes(day)),
                    employee: { id: employee.id },
                };

                const { message } = await updateSchedule({
                    companyId,
                    employeeId: employee.id,
                    data,
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

    const onChangeClick = () => setOpenModal(OpenModal.EDIT);

    const resetSelection = () => {
        if (!isEditingAllowed) return;

        setScheduleState(p => {
            let newState = [...p];

            selectedDays.map(date => {
                const oldSchedule = employeeSchedule?.schedule?.find(({ day }) => day === date);

                const dayScheduleIdx = newState.findIndex(item => item.day === date);

                if (dayScheduleIdx !== undefined || dayScheduleIdx !== -1) {
                    if (oldSchedule) {
                        newState[dayScheduleIdx] = oldSchedule;
                    } else {
                        newState = newState.filter(({ day }) => day !== date);
                    }
                }
            });

            return newState;
        });

        resetState();
    };
    const handleModalClose = () => setOpenModal(null);

    const timeSelectionProps = {
        from,
        setFrom: (time: string) => handleTimeSelect(time, 'from'),
        to,
        setTo: (time: string) => handleTimeSelect(time, 'to'),
        breakFrom,
        setBreakFrom: (time: string) => handleTimeSelect(time, 'breakFrom'),
        breakTo,
        setBreakTo: (time: string) => handleTimeSelect(time, 'breakTo'),
        isBreak,
        breakToggle: handleAddBreakHoursClick,
        isEditingAllowed,
        handleUpdate: handleScheduleUpdate,
        isUpdateDisabled: !isStateChanged,
        isUpdateLoading: isLoading,
        selectedHours: selectedDayCompanySchedule?.hours,
    };

    return (
        <>
            <div>
                {workingHours && workingHours?.length > 0 ? (
                    <>
                        <CalendarSide>
                            <>
                                <CalendarHeader>
                                    <DateSwitcher
                                        dateType="month"
                                        date={selectedMonth}
                                        setDate={setSelectedMonth}
                                        buttonsColor="light"
                                        roundBtns
                                    />

                                    {isEditingAllowed && selectedDays.length > 0 && (
                                        <EditScheduleButtonsBox>
                                            <EditScheduleButtons
                                                onChangeClick={onChangeClick}
                                                onResetClick={() => setOpenModal(OpenModal.CONFIRM)}
                                                isResetLoading={false}
                                                resetSelection={resetSelection}
                                            />
                                        </EditScheduleButtonsBox>
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
                        </CalendarSide>
                    </>
                ) : (
                    <Message>Чар роботи компанії не налаштовано!</Message>
                )}

                {openModal === OpenModal.EDIT && (
                    <Modal
                        $w="350px"
                        id="ScheduleTimeSelectionModal"
                        closeModal={handleModalClose}
                        $isOpen={openModal === OpenModal.EDIT}
                    >
                        <ScheduleTimeSelection {...timeSelectionProps} />
                    </Modal>
                )}

                {openModal === OpenModal.CONFIRM && (
                    <ConfirmOperation
                        id="confirmReset"
                        isOpen={openModal === OpenModal.CONFIRM}
                        children="Скинути графік обраних днів?"
                        callback={handleResetClick}
                        closeConfirm={handleModalClose}
                    />
                )}
            </div>
        </>
    );
};

export default EmployeeSchedule;
