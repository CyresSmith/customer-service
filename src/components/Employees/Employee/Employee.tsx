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

type Props = { employee: IEmployee };

const Employee = ({ employee }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { avatar, user, firstName, lastName, role, jobTitle, status } =
    employee;

  const fullName =
    (firstName || user.firstName) + ' ' + (lastName || user.lastName);

  return (
    <>
      <EmployeeBox onClick={() => setIsModalOpen(p => !p)}>
        <ItemLayout>
          <EmployeeImg>
            {avatar !== '' || user.avatar !== '' ? (
              <img
                src={avatar || user.avatar}
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

      {isModalOpen && (
        <Modal $isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <EmployeeModal employee={employee} />
        </Modal>
      )}
    </>
  );
};

export default Employee;
