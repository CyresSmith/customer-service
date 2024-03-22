import Button from "components/Ui/Buttons/Button";
import { BtnsBox, ChosenServices, Container, ContentBox } from "./CreateEvent.styled";
import Create from "./Create/Create";
import EmployeesList from "./EmployeesList";
import { useCompany } from "hooks/useCompany";
import ChooseServices from "./ChooseServices";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { IEmployee } from "services/types/employee.types";
import { useState } from "react";
import { IService } from "services/types/service.type";
import ChooseDate from "./ChooseDate/ChooseDate";

type Props = {
    step: string;
    handleEventStep: (step: string) => void;
}

const CreateEvent = ({ step, handleEventStep }: Props) => {
    const { employees } = useCompany();
    const providersWithServices = employees.filter(e => e.provider && e.services?.length > 0);
    const [chosenEmployee, setChosenEmployee] = useState<IEmployee | null>(null);
    const [chosenServices, setChosenServices] = useState<Partial<IService>[] | undefined>(undefined);
    const [eventDate, setEventDate] = useState<Date>(new Date());
    const [eventTime, setEventTime] = useState<string>('');

    const handleGoBackClick = () => {
        if (step === 'services' && chosenEmployee) {
            if (chosenServices) {
                setChosenServices(undefined);
            }
            setChosenEmployee(null);
            handleEventStep('employees')
        } else if (step === 'date') {
            setEventDate(new Date());
            handleEventStep('services');
        } else {
            if (chosenServices) {
                setChosenServices(undefined);
            }
            handleEventStep('create')
        }
    };

    const handleGoForwardClick = () => {
        if (chosenEmployee && chosenServices && chosenServices.length > 0) {
            handleEventStep('date');
        }
    };

    const isNotForwardBtn = step === 'create' || step === 'employees' || (step === 'services' && !chosenEmployee);
    const disabledForwardBtn = step ==='services' && chosenEmployee && chosenServices && chosenServices.length > 0 ?
        false : true;

    const calculateChosenServices = (): string | undefined => {
        if (chosenServices) {
            const count = chosenServices.length;
            const totalPrice = chosenServices.reduce((acc, cs) => cs.price ? acc + +cs.price : acc, 0);

            return `Обрано послуг: ${count} на суму ${totalPrice} грн.`
        }
    }

    const calculateEventDuration = (): number => {
        let duration: number = 0;

        if (chosenServices) {
            chosenServices.forEach(service => {
                if (service.duration) {
                    duration += service.duration
                }
            })
        }

        return duration;
    }

    return (
        <Container>
            <ContentBox>
                {step === 'create' && <Create setStep={handleEventStep} />}
                {step === 'employees' &&
                    <EmployeesList
                        setStep={handleEventStep}
                        employees={providersWithServices}
                        chooseEmployee={setChosenEmployee}
                    />}
                {step === 'services' &&
                    <ChooseServices
                        chosenEmployee={chosenEmployee}
                        setServices={setChosenServices}
                        chosenServices={chosenServices}
                    />}
                {step === 'date' && chosenEmployee &&
                    <ChooseDate
                        employeeSchedules={chosenEmployee.schedules}
                        eventDate={eventDate}
                        eventTime={eventTime}
                        setEventDate={setEventDate}
                        setEventTime={setEventTime}
                        eventDuration={calculateEventDuration()}
                    />}
            </ContentBox>
            {step !== 'create' &&
                <BtnsBox $step={step}>
                    <Button
                        Icon={HiArrowLeft}
                        onClick={handleGoBackClick}
                        children='Назад'
                        $colors="light"
                    />
                    {chosenServices && chosenServices.length > 0 &&
                        <ChosenServices>{calculateChosenServices()}</ChosenServices>
                    }
                    {!isNotForwardBtn &&
                    <Button
                        disabled={disabledForwardBtn}
                        Icon={HiArrowRight}
                        $iconPosition="r"
                        onClick={handleGoForwardClick}
                        children='Далі'
                        $colors="accent"
                    />
                    }
                </BtnsBox>
            }
        </Container>
    )
};

export default CreateEvent;