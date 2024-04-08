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
import Loader from 'components/Ui/Loader';

const initialSelection = [{ id: 'all', value: `Всі працівники` }];

const RecordLogPage = () => {
    const { workingHours, id } = useCompany();
    const [eventStep, setEventStep] = useState<string | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [selectedItem, setSelectedItem] = useState<SelectItem[]>(initialSelection);
    const [allSchedules, setAllSchedules] = useState<IMonthSchedule[]>([]);
    const [allEmployees, setAllEmployees] = useState<BasicEmployeeInfo[]>([]);
    const [getEmployees] = useLazyGetCompanyEmployeesQuery();
    const [getSchedules] = useLazyGetAllCompanySchedulesQuery();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const chosenYear = getYear(date);
    const chosenMonth = getMonth(date);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);

                if (id) {
                    const { data: employees } = await getEmployees(id);

                    if (employees) {
                        setAllEmployees(employees);
                    }

                    if (employees && employees.length > 0) {
                        const { data: schedules } = await getSchedules({
                            companyId: id,
                            month: chosenMonth,
                            year: chosenYear,
                        });
                        if (schedules) {
                            setAllSchedules(schedules);
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [chosenMonth, chosenYear, getEmployees, getSchedules, id]);

    const workingProviders = allEmployees.filter(
        e => e.provider && e.status === EmployeeStatusEnum.WORKING
    );

    const employeesWithThisDaySchedule = workingProviders.filter(e => {
        const year = getYear(date);
        const month = getMonth(date);
        const day = getDate(date);

        if (
            allSchedules.find(
                s =>
                    s.employee.id === e.id &&
                    s.year === year &&
                    s.month === month &&
                    s.schedule.find(ss => ss.day === day)
            )
        ) {
            return e;
        }
    });

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

    return isLoading ? (
        <Loader />
    ) : (
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
                        allSchedules={allSchedules}
                        date={date}
                        setDate={setDate}
                        workingHours={workingHours}
                        employees={filteredProvidersList}
                    />
                }
            />
            {eventStep !== null && (
                <Modal
                    titleMargin="10px"
                    closeModal={closeEventModal}
                    $isOpen={eventStep !== null}
                    title={
                        eventStep === 'employees'
                            ? 'Оберіть працівника'
                            : eventStep === 'services'
                              ? 'Оберіть послугу'
                              : eventStep === 'date'
                                ? 'Оберіть дату та час'
                                : 'Створення запису'
                    }
                    children={<CreateEvent step={eventStep} handleEventStep={handleEventStep} />}
                />
            )}
        </>
    );
};

export default RecordLogPage;
