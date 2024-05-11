import CreateEvent from 'components/CreateEvent';
import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import { SelectItem } from 'components/Ui/Form/types';
import Modal from 'components/Ui/Modal/Modal';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { useLazyGetCompanyEmployeesQuery } from 'services/employee.api';
import { useLazyGetAllCompanySchedulesQuery } from 'services/schedules.api';
import { IMonthSchedule } from 'services/types/schedule.types';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { EmployeeStatusEnum } from 'services/types/employee.types';
import { getDate, getMonth, getYear } from 'date-fns';
import { useLazyGetCompanyEventsQuery } from 'services/events.api';
import { EventType } from 'services/types/event.types';

const getModalTitles = (step: string) => {
    return step === 'employees'
        ? 'Оберіть працівника'
        : step === 'services'
        ? 'Оберіть послугу'
        : step === 'date'
        ? 'Оберіть дату та час'
        : step === 'confirm'
        ? 'Перевірте деталі запису'
        : 'Створення запису';
};

const initialSelection = [{ id: 'all', value: `Всі працівники` }];

const RecordLogPage = () => {
    const { workingHours, id } = useCompany();
    const [eventStep, setEventStep] = useState<string | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [selectedItem, setSelectedItem] = useState<SelectItem[]>(initialSelection);
    const [allSchedules, setAllSchedules] = useState<IMonthSchedule[] | null>(null);
    const [allEmployees, setAllEmployees] = useState<BasicEmployeeInfo[] | null>(null);
    const [allEvents, setAllEvents] = useState<EventType[] | []>([]);
    const [getEmployees] = useLazyGetCompanyEmployeesQuery();
    const [getSchedules] = useLazyGetAllCompanySchedulesQuery();
    const [getEvents] = useLazyGetCompanyEventsQuery();
    const chosenYear = getYear(date);
    const chosenMonth = getMonth(date);

    useEffect(() => {
        const getData = async () => {
            if (id) {
                await getEmployees(id)
                    .then(response => {
                        if (Array.isArray(response.data)) {
                            setAllEmployees(response.data);
                        }
                    })
                    .then(async () => {
                        await getSchedules({
                            companyId: id,
                            month: chosenMonth,
                            year: chosenYear,
                        }).then(response => {
                            if (Array.isArray(response.data)) {
                                setAllSchedules(response.data);
                            }
                        });
                    })
                    .then(async () => {
                        await getEvents({
                            companyId: id,
                            year: chosenYear,
                            month: chosenMonth,
                        }).then(response => {
                            if (Array.isArray(response.data)) {
                                setAllEvents(response.data);
                            }
                        });
                    });
            }
        };

        getData();
    }, [chosenMonth, chosenYear, getEmployees, getEvents, getSchedules, id]);

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
                        />
                    }
                />
                {eventStep !== null && (
                    <Modal
                        id="createEvent"
                        titleMargin="10px"
                        closeModal={closeEventModal}
                        $isOpen={eventStep !== null}
                        title={getModalTitles(eventStep)}
                        children={
                            <CreateEvent
                                events={allEvents}
                                date={date}
                                step={eventStep}
                                setStep={handleEventStep}
                            />
                        }
                    />
                )}
            </>
        )
    );
};

export default RecordLogPage;
