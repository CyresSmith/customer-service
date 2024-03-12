import Button from "components/Ui/Buttons/Button";
import { BtnsBox, Container, ContentBox } from "./CreateEvent.styled";
import { FirstStep } from "./Steps/FirstStep";
import EmployeesList from "./EmployeesList";
import { useCompany } from "hooks/useCompany";

type Props = {
    step: number;
    handleEventStep: (step: number) => void;
}

const CreateEvent = ({ step, handleEventStep }: Props) => {
    const { employees } = useCompany();

    return (
        <Container>
            <ContentBox>
                {step === 1 && <FirstStep setStep={handleEventStep} />}
                {step === 2 && <EmployeesList employees={employees} />}
            </ContentBox>
            <BtnsBox $step={step}>
                {step !== 1 &&
                    <Button onClick={() => handleEventStep(step - 1)} children='Назад' $colors="light" />
                }
                <Button onClick={() => handleEventStep(step + 1)} children='Далі' $colors="accent" />
            </BtnsBox>
        </Container>
    )
};

export default CreateEvent;