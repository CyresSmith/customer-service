import Button from 'components/Ui/Buttons/Button';
import translateEmployee from 'helpers/translateEmployee';
import { useState } from 'react';
import { HiFaceSmile } from 'react-icons/hi2';
import { IEmployee } from 'services/types/employee.types';
import { ItemLayout } from '../Employees.styled';
import {
  EmployeeBox,
  EmployeeContent,
  EmployeeHeader,
  EmployeeImg,
  JobTitle,
  Name,
  NameBox,
  Sections,
} from './Employee.styled';
import EmployeeProfile from './EmployeeProfile';

type Props = { employee: IEmployee };

const sectionButtons = [
  { id: 1, label: 'Профіль' },
  { id: 2, label: 'Графік' },
  { id: 3, label: 'Послуги' },
];

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

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<number>(
    sectionButtons[0].id
  );

  const fullName = firstName + ' ' + lastName;

  return (
    <EmployeeBox $isOpen={isOpen}>
      <EmployeeHeader $isOpen={isOpen} onClick={() => setIsOpen(p => !p)}>
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
      </EmployeeHeader>

      <EmployeeContent>
        <Sections>
          {sectionButtons.map(({ label, id }) => (
            <Button
              key={label}
              size="s"
              $colors="light"
              $variant={activeSection === id ? 'solid' : 'text'}
              onClick={() => setActiveSection(id)}
            >
              {label}
            </Button>
          ))}
        </Sections>

        {activeSection === 1 && <EmployeeProfile employeeId={id} />}
      </EmployeeContent>
    </EmployeeBox>
  );
};

export default Employee;
