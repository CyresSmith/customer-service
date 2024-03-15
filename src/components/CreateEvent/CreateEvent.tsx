import Button from "components/Ui/Buttons/Button";
import { BtnsBox, Container, ContentBox } from "./CreateEvent.styled";
import { FirstStep } from "./Steps/FirstStep";
import EmployeesList from "./EmployeesList";
import { useCompany } from "hooks/useCompany";
import ChooseServices from "./ChooseServices";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

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
                {step === 'services' && <ChooseServices />}
            </ContentBox>
            {step !== 'create' &&
                <BtnsBox $step={step}>
                    <Button Icon={HiArrowLeft} onClick={() => handleEventStep('create')} children='Назад' $colors="light" />
                    <Button Icon={HiArrowRight} $iconPosition="r" onClick={() => handleEventStep('employees')} children='Далі' $colors="accent" />
                </BtnsBox>
            }
        </Container>
    )
};

export default CreateEvent;