import translateEmployee from 'helpers/translateEmployee';
import { HiFaceSmile } from 'react-icons/hi2';
import { IEmployee } from 'services/types/employee.types';
import { ItemLayout } from '../Employees.styled';
import {
  EmployeeBox,
  EmployeeImg,
  JobTitle,
  Name,
  NameBox,
} from './Employee.styled';

type Props = { employee: IEmployee };

const Employee = ({ employee }: Props) => {
  const { id, jobTitle, role, status, avatar, provider, user } = employee;
  const {
    id: employeeUserId,
    email,
    phone,
    firstName,
    lastName,
    avatar: userAvatar,
  } = user;

  const fullName = firstName + ' ' + lastName;

  return (
    <EmployeeBox>
      <ItemLayout>
        <EmployeeImg>
          {avatar !== '' || userAvatar !== '' ? (
            <img
              src={avatar || userAvatar}
              alt={`${firstName + ' ' + lastName} image`}
            />
          ) : (
            <HiFaceSmile />
          )}
        </EmployeeImg>

        <NameBox>
          <Name>{fullName}</Name>
          <JobTitle>
            {role === 'owner' ? translateEmployee(role) : jobTitle}
          </JobTitle>
        </NameBox>

        <div></div>

        <p>{translateEmployee(status)}</p>
      </ItemLayout>
    </EmployeeBox>
  );
};

export default Employee;
