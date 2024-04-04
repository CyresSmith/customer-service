import RadioSelect from 'components/Ui/RadioSelect/RadioSelect';
import { Branches, EmployeesCount } from 'store/company/company.types';
import BackButton from '../Buttons/BackButton';
import NextButton from '../Buttons/NextButton';
import { ButtonBox, Title } from '../CreateCompanyForm.styled';
import { stepProps } from '../CreateCompanyForm.types';
import { Box, SubTitle } from './ThirdStep.styled';

const branches = [
    {
        id: 'one',
        label: 'Одна філія',
    },
    { id: 'more', label: 'Кілька' },
];

const employees = [
    { id: '2-5', label: 'Від 2 до 5' },
    { id: '6-9', label: 'Від 6 до 9' },
    { id: '10+', label: 'Від 10' },
];

const ThirdStep = ({ companyData, setCompanyData, nextPage, prevPage }: stepProps) => {
    const handleBackClick = () => {
        setCompanyData(p => ({ ...p, branches: '', employeesCount: '' }));
        prevPage();
    };

    return (
        <>
            <Title>Про ваш бізнес</Title>

            <Box>
                <div>
                    <SubTitle>Є філії за кількома адресами</SubTitle>

                    <RadioSelect
                        items={branches}
                        selectedItemId={companyData.branches}
                        onSelect={item =>
                            setCompanyData(p => ({ ...p, branches: item.id as Branches }))
                        }
                    />
                </div>

                <div>
                    <SubTitle>Кількість співробітників</SubTitle>

                    <RadioSelect
                        items={employees}
                        selectedItemId={companyData.employeesCount}
                        onSelect={item =>
                            setCompanyData(p => ({
                                ...p,
                                employeesCount: item.id as EmployeesCount,
                            }))
                        }
                    />
                </div>
            </Box>

            <ButtonBox>
                <BackButton onClick={handleBackClick} />
                <NextButton onClick={nextPage} />
            </ButtonBox>
        </>
    );
};

export default ThirdStep;
