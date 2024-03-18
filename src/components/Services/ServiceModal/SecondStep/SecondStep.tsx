import AddEmployeeModal from 'components/Employees/AddEmployeeModal';
import { Message } from 'components/Employees/AddEmployeeModal/AddEmployeeModal.styled';
import Button from 'components/Ui/Buttons/Button';
import { ServiceOpenModal } from 'helpers/enums';
import { useAdminRights } from 'hooks';
import { useState } from 'react';
import { HiCheckCircle, HiUserAdd } from 'react-icons/hi';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { ServiceStepProps } from 'services/types/service.type';
import EmployeeData, { IEmployeeData } from '../EmployeeData';
import {
  ButtonBox as SaveButtonBox,
  StepFormBox,
} from '../ServiceModal.styled';
import {
  ButtonBox,
  CHECK_SIZE,
  Employee,
  EmployeesList,
} from './SecondStep.styled';

const SecondStep = ({
  openModal,
  setStep,
  serviceData,
  setServiceData,
  providers,
  stateToCheck,
  handleServiceUpdate,
  isServiceUpdateLoading,
}: ServiceStepProps) => {
  const isAdmin = useAdminRights();
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);

  const handleSelect = (id: string) => {
    if (!isAdmin) return;

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

  const serviceUpdate = async () => {
    handleServiceUpdate({ employees: serviceData.employees });
  };

  const saveDisabled =
    JSON.stringify(stateToCheck?.employees) ===
      JSON.stringify(serviceData?.employees) ||
    serviceData.employees?.length === 0;

  return (
    <>
      <StepFormBox as="div">
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

        {openModal === ServiceOpenModal.EDIT_SERVICE && isAdmin && (
          <SaveButtonBox>
            <Button
              onClick={serviceUpdate}
              disabled={saveDisabled || isServiceUpdateLoading}
              Icon={IoIosSave}
              $colors="accent"
              isLoading={isServiceUpdateLoading}
            >
              Зберегти
            </Button>
          </SaveButtonBox>
        )}

        {openModal === ServiceOpenModal.ADD && (
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
        )}
      </StepFormBox>

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
