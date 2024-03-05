import { Message } from 'components/Employees/AddEmployeeModal/AddEmployeeModal.styled';
import Button from 'components/Ui/Buttons/Button';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { HiUserAdd } from 'react-icons/hi';
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheckCircle,
  HiPhoto,
} from 'react-icons/hi2';
import { EmployeeStatusEnum } from 'services/types/employee.types';
import { AddServiceStepProps } from 'services/types/service.type';
import { FormBox } from '../AddServiceModal.styled';
import {
  ButtonBox,
  CHECK_SIZE,
  Employee,
  EmployeeImg,
  EmployeesList,
  Name,
} from './SecondStep.styled';

const SecondStep = ({
  setStep,
  serviceData,
  setServiceData,
}: AddServiceStepProps) => {
  console.log('🚀 ~ serviceData:', serviceData);
  const { employees } = useCompany();

  const [selected, setSelected] = useState<string[]>([]);

  const providers = employees.filter(
    ({ provider, status }) => provider && status === EmployeeStatusEnum.WORKING
  );

  const handleSelect = (id: string) =>
    setSelected(p =>
      p.includes(id) ? p.filter(item => item !== id) : [...p, id]
    );

  const handleBackClick = () => {
    setStep(1);
  };

  const handleNextClick = () => {
    setStep(3);
    setServiceData(p => ({ ...p, employees: selected.map(e => +e) }));
  };

  return (
    <FormBox as="div">
      {providers.length < 1 ? (
        <Message>Немає працівників що надають послуги</Message>
      ) : (
        <EmployeesList>
          {providers.map(({ id, avatar, firstName, lastName }) => (
            <li key={id}>
              <Employee
                onClick={() => handleSelect(id)}
                $selected={selected.includes(id)}
              >
                <EmployeeImg>
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={`photo of ${firstName} ${lastName}`}
                    />
                  ) : (
                    <HiPhoto />
                  )}
                </EmployeeImg>

                <Name>
                  {firstName} {lastName && lastName}
                </Name>

                <HiCheckCircle size={CHECK_SIZE} />
              </Employee>
            </li>
          ))}
        </EmployeesList>
      )}

      <ButtonBox>
        <Button
          $colors="light"
          Icon={HiArrowLeft}
          $iconPosition="l"
          onClick={handleBackClick}
        >
          Назад
        </Button>

        <Button $colors="light" Icon={HiUserAdd}>
          Додати нового
        </Button>

        <Button
          $colors="accent"
          disabled={selected.length === 0}
          Icon={HiArrowRight}
          $iconPosition="r"
          onClick={handleNextClick}
        >
          Далі
        </Button>
      </ButtonBox>
    </FormBox>
  );
};

export default SecondStep;
