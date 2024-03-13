import Button from "components/Ui/Buttons/Button";
import { BtnsBox, Container, ContentBox } from "./CreateEvent.styled";
import { FirstStep } from "./Steps/FirstStep";
import EmployeesList from "./EmployeesList";
import { useCompany } from "hooks/useCompany";

type Props = {
    step: string;
    handleEventStep: (step: string) => void;
}

const CreateEvent = ({ step, handleEventStep }: Props) => {
    const { employees } = useCompany();
    const providersWithServices = employees.filter(e => e.provider && e.services?.length > 0);

    return (
        <Container>
            <ContentBox>
                {step === 'create' && <FirstStep setStep={handleEventStep} />}
                {step === 'employees' && <EmployeesList employees={providersWithServices} />}
            </ContentBox>
            {step !== 'create' &&
                <BtnsBox $step={step}>
                    <Button onClick={() => handleEventStep('create')} children='Назад' $colors="light" />
                    <Button onClick={() => handleEventStep('employees')} children='Далі' $colors="accent" />
                </BtnsBox>
            }
        </Container>
    )
};

export default CreateEvent;