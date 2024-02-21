import Button from 'components/Ui/Buttons/Button';
import translateEmployee from 'helpers/translateEmployee';
import { useState } from 'react';
import { HiCurrencyDollar } from 'react-icons/hi';
import {
  HiCalendarDays,
  HiFaceSmile,
  HiMiniIdentification,
} from 'react-icons/hi2';
import { EmployeeRoleEnum, IEmployee } from 'services/types/employee.types';
import { EmployeeImg, JobTitle, Name, NameBox } from '../Employee.styled';
import EmployeeProfile from '../EmployeeProfile';
import {
  EmployeeModalContent,
  EmployeeModalHeader,
  SectionsButtonList,
} from './EmployeeModal.styled';
import EmployeeSchedule from '../EmployeeSchedule';

type Props = { employee: IEmployee };

const sectionButtons = [
  { id: 1, label: 'Профіль', Icon: HiMiniIdentification },
  { id: 2, label: 'Графік', Icon: HiCalendarDays },
  { id: 3, label: 'Послуги', Icon: HiCurrencyDollar },
];

const EmployeeModal = ({ employee }: Props) => {
  const { avatar, user, firstName, lastName, role, jobTitle } = employee;

  const [activeSection, setActiveSection] = useState<number>(
    sectionButtons[0].id
  );

  const fullName =
    (firstName || user.firstName) + ' ' + (lastName || user.lastName);

  return (
    <EmployeeModalContent>
      <EmployeeModalHeader>
        <EmployeeImg>
          {avatar !== '' || user.avatar !== '' ? (
            <img src={avatar || user.avatar} alt={`${fullName} image`} />
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
      </EmployeeModalHeader>

      <SectionsButtonList>
        {sectionButtons.map(({ label, id, Icon }) => (
          <li key={label}>
            <Button
              size="s"
              $colors={activeSection === id ? 'accent' : 'light'}
              $variant={activeSection === id ? 'solid' : 'text'}
              onClick={() => setActiveSection(id)}
              Icon={Icon}
            >
              {label}
            </Button>
          </li>
        ))}
      </SectionsButtonList>

      {activeSection === 1 && <EmployeeProfile employee={employee} />}
      {activeSection === 2 && <EmployeeSchedule employee={employee} />}
    </EmployeeModalContent>
  );
};

export default EmployeeModal;
