import AddEmployeeModal from 'components/Employees/AddEmployeeModal';
import { Message } from 'components/Employees/AddEmployeeModal/AddEmployeeModal.styled';
import Button from 'components/Ui/Buttons/Button';
import { useState } from 'react';
import { HiCheckCircle, HiUserAdd } from 'react-icons/hi';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { AddServiceStepProps } from 'services/types/service.type';
import { FormSide, ModalBox } from '../AddServiceModal.styled';
import EmployeeData, { IEmployeeData } from '../EmployeeData';
import {
  ButtonBox,
  CHECK_SIZE,
  Employee,
  EmployeesList,
} from './SecondStep.styled';

const SecondStep = ({
  setStep,
  serviceData,
  setServiceData,
  providers,
}: AddServiceStepProps) => {
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);

  const handleSelect = (id: string) => {
    setServiceData(p => ({
      ...p,
      employees: p.employees.includes(id)
        ? p.employees.filter(item => item !== id)
        : [...p.employees, id],
    }));
  };

  const handleBackClick = () => {
    setStep(1);
  };

  const handleNextClick = () => {
    setStep(3);
  };

  const handleAddEmployeeClose = () => {
    setAddEmployeeOpen(false);
  };

  return (
    <>
      <ModalBox>
        <FormSide>
          {providers &&
            (providers.length < 1 ? (
              <Message>Немає працівників що надають послуги</Message>
            ) : (
              <EmployeesList>
                {providers.map(item => (
                  <li key={item.id}>
                    <Employee
                      onClick={() => handleSelect(item.id)}
                      $selected={serviceData.employees.includes(item.id)}
                    >
                      <EmployeeData {...(item as IEmployeeData)} />
                      <HiCheckCircle size={CHECK_SIZE} />
                    </Employee>
                  </li>
                ))}
              </EmployeesList>
            ))}
        </FormSide>

        <ButtonBox>
          <Button
            $colors="light"
            Icon={HiArrowLeft}
            $iconPosition="l"
            onClick={handleBackClick}
          >
            Назад
          </Button>

          <Button
            $colors="light"
            Icon={HiUserAdd}
            onClick={() => setAddEmployeeOpen(true)}
          >
            Додати нового
          </Button>

          <Button
            $colors="accent"
            disabled={serviceData.employees.length === 0}
            Icon={HiArrowRight}
            $iconPosition="r"
            onClick={handleNextClick}
          >
            Далі
          </Button>
        </ButtonBox>
      </ModalBox>

      {addEmployeeOpen && (
        <AddEmployeeModal
          isOpen={addEmployeeOpen}
          closeModal={handleAddEmployeeClose}
        />
      )}
    </>
  );
};

export default SecondStep;
