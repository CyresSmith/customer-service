import { GrDocumentUser, GrServicePlay } from 'react-icons/gr';
import {
    Container,
    FirstStepChoose,
    FirstStepChooseDesc,
    FirstStepChooseIcon,
    FirstStepChooseText,
    FirstStepChooseTitle,
} from './ChooseWay.styled';

type Props = {
    setStep: (step: string) => void;
};

const ChooseWay = ({ setStep }: Props) => {
    return (
        <Container>
            <FirstStepChoose onClick={() => setStep('employees')}>
                <FirstStepChooseIcon as={GrDocumentUser} />
                <FirstStepChooseText>
                    <FirstStepChooseTitle>Обрати працівника</FirstStepChooseTitle>
                    <FirstStepChooseDesc>
                        Якщо клієнт хоче записатись до конкретного працівника
                    </FirstStepChooseDesc>
                </FirstStepChooseText>
            </FirstStepChoose>
            <FirstStepChoose onClick={() => setStep('services')}>
                <FirstStepChooseIcon as={GrServicePlay} />
                <FirstStepChooseText>
                    <FirstStepChooseTitle>Обрати послугу</FirstStepChooseTitle>
                    <FirstStepChooseDesc>
                        Якщо клієнту важливий конкретний день та час послуги
                    </FirstStepChooseDesc>
                </FirstStepChooseText>
            </FirstStepChoose>
        </Container>
    );
};

export default ChooseWay;
