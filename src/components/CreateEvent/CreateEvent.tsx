import Button from "components/Ui/Buttons/Button";
import { BtnsBox, Container, ContentBox } from "./CreateEvent.styled";
import { FirstStep } from "./Steps/FirstStep";
import EmployeesList from "./EmployeesList";
import { useCompany } from "hooks/useCompany";
import ChooseServices from "./ChooseServices";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { IEmployee } from "services/types/employee.types";
import { useState } from "react";

type Props = {
    step: string;
    handleEventStep: (step: string) => void;
}

const CreateEvent = ({ step, handleEventStep }: Props) => {
    const { employees } = useCompany();
    const providersWithServices = employees.filter(e => e.provider && e.services?.length > 0);
    const [chosenEmployee, setChosenEmployee] = useState<IEmployee | null>(null);

    const handleGoBackClick = () => {
        if (step === 'services' && chosenEmployee) {
            setChosenEmployee(null);
            handleEventStep('employees')
        } else {
            handleEventStep('create')
        }
    }

    return (
        <Container>
            <ContentBox>
                {step === 'create' && <FirstStep setStep={handleEventStep} />}
                {step === 'employees' && <EmployeesList setStep={handleEventStep} employees={providersWithServices} chooseEmployee={setChosenEmployee} />}
                {step === 'services' && <ChooseServices chosenEmployee={chosenEmployee} />}
            </ContentBox>
            {step !== 'create' &&
                <BtnsBox $step={step}>
                    <Button Icon={HiArrowLeft} onClick={handleGoBackClick} children='Назад' $colors="light" />
                    {/* <Button Icon={HiArrowRight} $iconPosition="r" onClick={() => handleEventStep('employees')} children='Далі' $colors="accent" /> */}
                </BtnsBox>
            }
        </Container>
    )
};

export default CreateEvent;