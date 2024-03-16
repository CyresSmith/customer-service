import Button from "components/Ui/Buttons/Button";
import { BtnsBox, ChosenServices, Container, ContentBox } from "./CreateEvent.styled";
import { FirstStep } from "./Steps/FirstStep";
import EmployeesList from "./EmployeesList";
import { useCompany } from "hooks/useCompany";
import ChooseServices from "./ChooseServices";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { IEmployee } from "services/types/employee.types";
import { useState } from "react";
import { IService } from "services/types/service.type";

type Props = {
    step: string;
    handleEventStep: (step: string) => void;
}

const CreateEvent = ({ step, handleEventStep }: Props) => {
    const { employees } = useCompany();
    const providersWithServices = employees.filter(e => e.provider && e.services?.length > 0);
    const [chosenEmployee, setChosenEmployee] = useState<IEmployee | null>(null);
    const [chosenServices, setChosenServices] = useState<Partial<IService>[] | undefined>(undefined);

    const handleGoBackClick = () => {
        if (step === 'services' && chosenEmployee) {
            if (chosenServices) {
                setChosenServices(undefined);
            }
            setChosenEmployee(null);
            handleEventStep('employees')
        } else {
            if (chosenServices) {
                setChosenServices(undefined);
            }
            handleEventStep('create')
        }
    };

    const calculateChosenServices = (): string | undefined => {
        if (chosenServices) {
            const count = chosenServices.length;
            const totalPrice = chosenServices.reduce((acc, cs) => cs.price ? acc + +cs.price : acc, 0);

            return `Обрано: ${count} ${count === 1 ? 'послугу' : count > 1 && count < 5 ? 'послуги' : 'послуг'} на суму ${totalPrice} грн.`
        }
    }

    return (
        <Container>
            <ContentBox>
                {step === 'create' && <FirstStep setStep={handleEventStep} />}
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
            </ContentBox>
            {step !== 'create' &&
                <BtnsBox $step={step}>
                    <Button Icon={HiArrowLeft} onClick={handleGoBackClick} children='Назад' $colors="light" />
                    {chosenServices && <ChosenServices>{calculateChosenServices()}</ChosenServices>}
                    <Button Icon={HiArrowRight} $iconPosition="r" onClick={() => handleEventStep('employees')} children='Далі' $colors="accent" />
                </BtnsBox>
            }
        </Container>
    )
};

export default CreateEvent;