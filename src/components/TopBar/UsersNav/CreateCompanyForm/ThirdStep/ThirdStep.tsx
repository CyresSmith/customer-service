import { Branches, EmployeesCount } from 'store/company/company.types';
import BackButton from '../Buttons/BackButton';
import NextButton from '../Buttons/NextButton';
import { ButtonBox, Title } from '../CreateCompanyForm.styled';
import { stepProps } from '../CreateCompanyForm.types';
import { Box, Select, SelectItem, SubTitle } from './ThirdStep.styled';

const branches = [
  {
    id: 'one',
    name: 'Одна філія',
  },
  { id: 'more', name: 'Кілька' },
];

const employees = [
  { id: '2-5', name: 'Від 2 до 5' },
  { id: '6-9', name: 'Від 6 до 9' },
  { id: '10+', name: 'Від 10' },
];

const ThirdStep = ({
  companyData,
  setCompanyData,
  nextPage,
  prevPage,
}: stepProps) => {
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

          <Select>
            {branches.map(({ id, name }) => (
              <SelectItem
                key={id}
                selected={companyData.branches === id}
                $itemsCount={branches.length}
                onClick={() =>
                  setCompanyData(p => ({ ...p, branches: id as Branches }))
                }
              >
                {name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <SubTitle>Кількість співробітників</SubTitle>

          <Select>
            {employees.map(({ id, name }) => (
              <SelectItem
                key={id}
                selected={companyData.employeesCount === id}
                $itemsCount={employees.length}
                onClick={() =>
                  setCompanyData(p => ({
                    ...p,
                    employeesCount: id as EmployeesCount,
                  }))
                }
              >
                {name}
              </SelectItem>
            ))}
          </Select>
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
