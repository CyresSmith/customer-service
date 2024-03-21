import Modal from 'components/Ui/Modal/Modal';
import translateEmployee from 'helpers/translateEmployee';
import { useState } from 'react';
import { HiFaceSmile } from 'react-icons/hi2';
import {
  EmployeeRoleEnum,
  EmployeeStatusEnum,
  IEmployee,
} from 'services/types/employee.types';
import { ItemLayout } from '../Employees.styled';
import {
  EmployeeBox,
  EmployeeImg,
  JobTitle,
  Name,
  NameBox,
} from './Employee.styled';
import EmployeeModal from './EmployeeModal';
import { StatusBadge } from './EmployeeProfile/EmployeeProfile.styled';
import { useActions } from 'hooks';

type Props = { employee: Partial<IEmployee> };

const Employee = ({ employee }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setChosenEmployee } = useActions();

  const { avatar, firstName, lastName, role, jobTitle, status, id } =
    employee;

  const fullName =
    (firstName) + ' ' + (lastName);
  
  const handleModalClose = () => {
    setChosenEmployee(null);
    setIsModalOpen(false)
  }

  return (
    <>
      <EmployeeBox onClick={() => setIsModalOpen(p => !p)}>
        <ItemLayout>
          <EmployeeImg>
            {avatar !== '' ? (
              <img
                src={avatar}
                alt={`${firstName + ' ' + lastName} image`}
              />
            ) : (
              <HiFaceSmile />
            )}
          </EmployeeImg>

          <NameBox>
            <Name>{fullName}</Name>
            <JobTitle>
              {role === EmployeeRoleEnum.OWNER
                ? translateEmployee(role)
                : jobTitle}
            </JobTitle>
          </NameBox>

          <div></div>

          <StatusBadge
            $active={status === EmployeeStatusEnum.WORKING}
            $size="s"
          >
            {status === EmployeeStatusEnum.WORKING && <span>Працює</span>}
            {status === EmployeeStatusEnum.FIRED && <span>Звільнено</span>}
          </StatusBadge>
        </ItemLayout>
      </EmployeeBox>

      {isModalOpen && id && (
        <Modal $isOpen={isModalOpen} closeModal={handleModalClose}>
          <EmployeeModal id={ +id } />
        </Modal>
      )}
    </>
  );
};

export default Employee;
