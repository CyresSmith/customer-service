import Button from 'components/Ui/Buttons/Button';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import {
    useGetCompanyEmployeesQuery,
    useLazyGetEmployeeScheduleQuery,
} from 'services/employee.api';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { ServiceBasicInfo } from 'services/types/service.type';
import ChooseDate from './ChooseDate/ChooseDate';
import ChooseServices from './ChooseServices';
import Create from './Create/Create';
import { BtnsBox, ChosenServices, Container, ContentBox } from './CreateEvent.styled';
import EmployeesList from './EmployeesList';
import { IMonthSchedule } from 'services/types/schedule.types';
import { getMonth, getYear } from 'date-fns';

type Props = {
    step: string;
    handleEventStep: (step: string) => void;
    date: Date;
};

const CreateEvent = ({ step, date, handleEventStep }: Props) => {
    const { id } = useCompany();
    const [chosenEmployee, setChosenEmployee] = useState<BasicEmployeeInfo | null>(null);
    const [chosenServices, setChosenServices] = useState<ServiceBasicInfo[] | undefined>(undefined);
    const [chosenEmployeeSchedule, setChoseEmployeeSchedule] = useState<IMonthSchedule | null>(
        null
    );
    const [eventDate, setEventDate] = useState<Date>(new Date());
    const [eventTime, setEventTime] = useState<string>('');
    const month = getMonth(date);
    const year = getYear(date);
    const [getEmployeeSchedule] = useLazyGetEmployeeScheduleQuery();

    const { data: employees } = useGetCompanyEmployeesQuery(id);

    useEffect(() => {
        if (id && chosenEmployee && year && month) {
            const schedule = getEmployeeSchedule({
                companyId: id,
                employeeId: chosenEmployee.id,
                year,
                month,
            });

            if (schedule) {
                setChoseEmployeeSchedule(schedule);
            }
        }
    }, [chosenEmployee, getEmployeeSchedule, id, month, year]);

    const providersWithServices = employees?.filter(
        e => e.provider && e.servicesCount && e.servicesCount > 0
    );

    const handleGoBackClick = () => {
        if (step === 'services' && chosenEmployee) {
            if (chosenServices) {
                setChosenServices(undefined);
            }
            setChosenEmployee(null);
            handleEventStep('employees');
        } else if (step === 'date') {
            setEventDate(new Date());
            handleEventStep('services');
        } else {
            if (chosenServices) {
                setChosenServices(undefined);
            }
            handleEventStep('create');
        }
    };

    const handleGoForwardClick = () => {
        if (chosenEmployee && chosenServices && chosenServices.length > 0) {
            handleEventStep('date');
        }
    };

    const isNotForwardBtn =
        step === 'create' || step === 'employees' || (step === 'services' && !chosenEmployee);

    const disabledForwardBtn =
        step === 'services' && chosenEmployee && chosenServices && chosenServices.length > 0
            ? false
            : true;

    const calculateChosenServices = (): string | undefined => {
        if (chosenServices) {
            const count = chosenServices.length;
            const totalPrice = chosenServices.reduce(
                (acc, cs) => (cs.price ? acc + +cs.price : acc),
                0
            );

            return `Обрано послуг: ${count} на суму ${totalPrice} грн.`;
        }
    };

    const calculateEventDuration = (): number => {
        let duration: number = 0;

        if (chosenServices) {
            chosenServices.forEach(service => {
                if (service.duration) {
                    duration += service.duration;
                }
            });
        }

        return duration;
    };

    return providersWithServices ? (
        <Container>
            <ContentBox>
                {step === 'create' && <Create setStep={handleEventStep} />}
                {step === 'employees' && (
                    <EmployeesList
                        setStep={handleEventStep}
                        employees={providersWithServices}
                        chooseEmployee={setChosenEmployee}
                    />
                )}
                {step === 'services' && (
                    <ChooseServices
                        chosenEmployee={chosenEmployee}
                        setServices={setChosenServices}
                        chosenServices={chosenServices}
                    />
                )}
                {step === 'date' && chosenEmployee && (
                    <ChooseDate
                        employeeSchedules={chosenEmployee.schedules}
                        eventDate={eventDate}
                        eventTime={eventTime}
                        setEventDate={setEventDate}
                        setEventTime={setEventTime}
                        eventDuration={calculateEventDuration()}
                    />
                )}
            </ContentBox>
            {step !== 'create' && (
                <BtnsBox $step={step}>
                    <Button
                        Icon={HiArrowLeft}
                        onClick={handleGoBackClick}
                        children="Назад"
                        $colors="light"
                    />
                    {chosenServices && chosenServices.length > 0 && (
                        <ChosenServices>{calculateChosenServices()}</ChosenServices>
                    )}
                    {!isNotForwardBtn && (
                        <Button
                            disabled={disabledForwardBtn}
                            Icon={HiArrowRight}
                            $iconPosition="r"
                            onClick={handleGoForwardClick}
                            children="Далі"
                            $colors="accent"
                        />
                    )}
                </BtnsBox>
            )}
        </Container>
    ) : null;
};

export default CreateEvent;
