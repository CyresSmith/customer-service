import Button from 'components/Ui/Buttons/Button';
import { getDate, getMonth, getYear } from 'date-fns';
import { calculateEventDuration } from 'helpers/calculateEventDuration';
import { getEventEndTime } from 'helpers/isTimeEnableForEvent';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { RiSave2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import { useCreateEventMutation } from 'services/events.api';
import { useLazyGetEmployeeAllSchedulesQuery } from 'services/schedules.api';
import { Client } from 'services/types/clients.types';
import { IEmployee } from 'services/types/employee.types';
import { EventType } from 'services/types/event.types';
import { IMonthSchedule } from 'services/types/schedule.types';
import { ServiceBasicInfo } from 'services/types/service.type';
import ChooseClient from './ChooseClient';
import ChooseDate from './ChooseDate/ChooseDate';
import ChooseServices from './ChooseServices';
import ChooseWay from './ChooseWay/ChooseWay';
import ConfirmEvent from './ConfirmEvent';
import { BtnsBox, Container, ContentBox } from './CreateEvent.styled';
import EmployeesList from './EmployeesList';

type Props = {
    step: string;
    setStep: (step: string) => void;
    closeModal: () => void;
    date: Date;
    events: EventType[] | null;
};

const CreateEvent = ({ step, setStep, events, closeModal }: Props) => {
    const { id } = useCompany();
    const [chosenClient, setChosenClient] = useState<Client | null>(null);
    const [chosenEmployee, setChosenEmployee] = useState<IEmployee | null>(null);
    const [chosenServices, setChosenServices] = useState<ServiceBasicInfo[]>([]);
    const [chosenEmployeeSchedule, setChosenEmployeeSchedule] = useState<IMonthSchedule[] | null>(
        null
    );
    const [eventDate, setEventDate] = useState<Date>(new Date());
    const [eventTime, setEventTime] = useState<string | null>(null);

    const [getEmployeeSchedules] = useLazyGetEmployeeAllSchedulesQuery();
    const [createEventMutation] = useCreateEventMutation();

    const { data: employees } = useGetCompanyEmployeesQuery(id);

    useEffect(() => {
        const getSchedule = async (employeeId: number) => {
            const { data, isSuccess } = await getEmployeeSchedules({
                companyId: id,
                employeeId,
            });

            if (data && isSuccess) {
                setChosenEmployeeSchedule(data);
            }
        };

        if (chosenEmployee) {
            getSchedule(chosenEmployee.id);
        }
    }, [chosenEmployee, getEmployeeSchedules, id]);

    const providersWithServices = employees?.filter(
        e => e.provider && e.servicesCount && e.servicesCount > 0
    );

    const handleEventSave = async () => {
        if (chosenClient && chosenEmployee && chosenServices && eventDate && eventTime) {
            const newEvent = {
                employee: chosenEmployee.id,
                client: chosenClient.id,
                year: getYear(eventDate),
                month: getMonth(eventDate),
                day: getDate(eventDate),
                time: {
                    from: eventTime,
                    to: getEventEndTime(
                        eventDate,
                        eventTime,
                        calculateEventDuration(chosenServices)
                    ),
                },
                services: chosenServices?.map(s => s.id),
                duration: calculateEventDuration(chosenServices),
            };

            const result = await createEventMutation({ data: newEvent, companyId: id });

            if (result) {
                setChosenClient(null);
                setChosenEmployee(null);
                setChosenServices([]);
                setChosenEmployeeSchedule(null);
                closeModal();
                toast.success('Запис успішно збережено!');
            }
        }
    };

    const handleGoBackClick = () => {
        if (step === 'services' && chosenEmployee) {
            if (chosenServices) {
                setChosenServices([]);
            }
            setChosenEmployee(null);
            setStep('employees');
        } else if (step === 'date') {
            setEventDate(new Date());
            setEventTime(null);
            setStep('services');
        } else if (step === 'confirm') {
            setStep('date');
        } else {
            if (chosenServices) {
                setChosenServices([]);
            }
            setStep('create');
        }
    };

    const handleGoForwardClick = () => {
        if (step === 'services' && chosenServices && chosenServices.length > 0) {
            setStep('date');
        }

        if (step === 'date' && eventDate && eventTime) {
            setStep('confirm');
        }
    };

    const isNotForwardBtn =
        step === 'create' || step === 'employees' || (step === 'services' && !chosenEmployee);

    const disabledForwardBtn =
        (step === 'services' && chosenEmployee && chosenServices && chosenServices.length > 0) ||
        (step === 'date' && chosenEmployee && chosenServices && eventDate && eventTime) ||
        (step === 'confirm' &&
            chosenClient &&
            chosenEmployee &&
            eventDate &&
            eventTime &&
            chosenServices.length)
            ? false
            : true;

    return providersWithServices ? (
        <Container>
            <ContentBox>
                {step === 'create' && (
                    <ChooseClient setStep={setStep} setClient={setChosenClient} companyId={id} />
                )}
                {step === 'chooseWay' && <ChooseWay setStep={setStep} />}
                {step === 'employees' && (
                    <EmployeesList
                        companyId={id}
                        setStep={setStep}
                        employees={providersWithServices}
                        chooseEmployee={setChosenEmployee}
                    />
                )}
                {step === 'services' && chosenEmployee && (
                    <ChooseServices
                        chosenEmployee={chosenEmployee}
                        setServices={setChosenServices}
                        chosenServices={chosenServices}
                    />
                )}
                {step === 'date' && chosenEmployee && chosenEmployeeSchedule && chosenServices && (
                    <ChooseDate
                        events={events}
                        companyId={id}
                        employeeSchedules={chosenEmployeeSchedule}
                        eventDate={eventDate}
                        eventTime={eventTime}
                        setEventDate={setEventDate}
                        setEventTime={setEventTime}
                        eventDuration={calculateEventDuration(chosenServices)}
                    />
                )}
                {step === 'confirm' &&
                    chosenEmployee &&
                    chosenServices &&
                    eventTime &&
                    chosenClient && (
                        <ConfirmEvent
                            setServices={setChosenServices}
                            chosenClient={chosenClient}
                            chosenEmployee={chosenEmployee}
                            chosenServices={chosenServices}
                            eventDate={eventDate}
                            eventTime={eventTime}
                            eventDuration={calculateEventDuration(chosenServices)}
                            setStep={setStep}
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
                    {/* {chosenServices && chosenServices.length > 0 && (
                        <ChosenServices>{calculateChosenServices()}</ChosenServices>
                    )} */}
                    {!isNotForwardBtn && (
                        <Button
                            disabled={disabledForwardBtn}
                            Icon={step === 'confirm' ? RiSave2Fill : HiArrowRight}
                            $iconPosition="r"
                            onClick={step === 'confirm' ? handleEventSave : handleGoForwardClick}
                            children={step === 'confirm' ? 'Зберегти' : 'Далі'}
                            $colors="accent"
                        />
                    )}
                </BtnsBox>
            )}
        </Container>
    ) : null;
};

export default CreateEvent;
