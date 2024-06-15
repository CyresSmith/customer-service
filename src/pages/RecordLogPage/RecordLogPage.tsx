import CreateEvent from 'components/CreateEvent';
import PageContentLayout from 'components/Layout/PageContentLayout';
import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import { SelectItem } from 'components/Ui/Form/types';
import Modal from 'components/Ui/Modal/Modal';
import { getDate, getMonth, getYear } from 'date-fns';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import { useGetCompanyEventsQuery } from 'services/events.api';
import { useGetAllCompanySchedulesQuery } from 'services/schedules.api';
import { EmployeeBasicInfo, EmployeeStatusEnum } from 'services/types/employee.types';
import { EventType } from 'services/types/event.types';
import { IMonthSchedule } from 'services/types/schedule.types';
import theme from 'utils/theme';

const getModalTitles = (step: string) => {
    return step === 'employees'
        ? 'Вибір працівника'
        : step === 'services'
        ? 'Вибір послуги'
        : step === 'date'
        ? 'Вибір дати та часу'
        : step === 'confirm'
        ? 'Перевірка деталей запису'
        : 'Вибір клієнта';
};

const initialSelection = [{ id: 'all', value: `Всі` }];

const RecordLogPage = () => {
    const { workingHours, id } = useCompany();
    const [eventStep, setEventStep] = useState<string | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [selectedItem, setSelectedItem] = useState<SelectItem[]>(initialSelection);
    const [allSchedules, setAllSchedules] = useState<IMonthSchedule[] | null>(null);
    const [allEmployees, setAllEmployees] = useState<EmployeeBasicInfo[] | null>(null);
    const [allEvents, setAllEvents] = useState<EventType[] | []>([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const calendarToggle = () => setIsCalendarOpen(p => !p);
    const closeCalendar = () => setIsCalendarOpen(false);

    const chosenYear = getYear(date);
    const chosenMonth = getMonth(date);
    const { data: employeesData, isFetching: fetchingEmployees } = useGetCompanyEmployeesQuery(id, {
        skip: !id,
    });
    const { data: schedulesData, isFetching: fetchingSchedules } = useGetAllCompanySchedulesQuery(
        {
            companyId: id,
            year: chosenYear,
            month: chosenMonth,
        },
        { skip: !id || fetchingEmployees }
    );
    const { data: eventsData } = useGetCompanyEventsQuery(
        {
            companyId: id,
            year: chosenYear,
            month: chosenMonth,
        },
        { skip: !id || fetchingSchedules }
    );

    useEffect(() => {
        if (employeesData) {
            setAllEmployees(employeesData);
        }

        if (schedulesData) {
            setAllSchedules(schedulesData);
        }

        if (eventsData) {
            setAllEvents(eventsData);
        }
    }, [employeesData, eventsData, schedulesData]);

    const workingProviders =
        allEmployees &&
        allEmployees.filter(e => e.provider && e.status === EmployeeStatusEnum.WORKING);

    const employeesWithThisDaySchedule =
        workingProviders && Array.isArray(workingProviders)
            ? workingProviders.filter(e => {
                  const year = getYear(date);
                  const month = getMonth(date);
                  const day = getDate(date);

                  if (allSchedules && Array.isArray(allSchedules)) {
                      return allSchedules.some(
                          s =>
                              s.employee &&
                              s.employee.id === e.id &&
                              s.year === year &&
                              s.month === month &&
                              s.schedule &&
                              s.schedule.find(ss => ss.day === day)
                      );
                  }

                  return false;
              })
            : [];

    const providersForSelect = employeesWithThisDaySchedule.map(p => {
        return {
            id: p.id,
            value: p.lastName ? p.firstName + ' ' + p.lastName : p.firstName,
        };
    });

    const handleSelect = (item: SelectItem) => {
        if (item.id === initialSelection[0].id) {
            setSelectedItem(initialSelection);
        } else {
            setSelectedItem(p => {
                const newState = p.filter(({ id }) => id !== initialSelection[0].id);

                const itemIdx = newState.findIndex(({ id }) => id === item.id);

                return itemIdx === -1
                    ? [...newState, item]
                    : newState.filter(({ id }) => id !== item.id);
            });
        }
    };

    const handleEventStep = (step: string) => {
        setEventStep(step);
    };

    const closeEventModal = () => {
        setEventStep(null);
    };

    const filteredProvidersList =
        selectedItem[0]?.id !== 'all'
            ? employeesWithThisDaySchedule.filter(p => selectedItem.find(s => s.id === p.id))
            : employeesWithThisDaySchedule;

    return (
        id && (
            <>
                <PageContentLayout
                    bar={
                        <RecordLogBar
                            date={date}
                            selectItems={[...initialSelection, ...providersForSelect]}
                            selected={selectedItem}
                            setDate={setDate}
                            handleSelect={handleSelect}
                            openEventModal={handleEventStep}
                            calendarToggle={calendarToggle}
                            closeCalendar={closeCalendar}
                        />
                    }
                    content={
                        <RecordLog
                            allEvents={allEvents}
                            allSchedules={allSchedules}
                            date={date}
                            setDate={setDate}
                            workingHours={workingHours}
                            employees={filteredProvidersList}
                            companyId={id}
                            isCalendarOpen={isCalendarOpen}
                            closeCalendar={closeCalendar}
                        />
                    }
                />
                {eventStep !== null && (
                    <Modal
                        id="createEvent"
                        titleMargin={theme.space[5]}
                        closeModal={closeEventModal}
                        $isOpen={eventStep !== null}
                        title={getModalTitles(eventStep)}
                        children={
                            <CreateEvent
                                events={allEvents}
                                date={date}
                                step={eventStep}
                                setStep={handleEventStep}
                                closeModal={closeEventModal}
                            />
                        }
                    />
                )}
            </>
        )
    );
};

export default RecordLogPage;
