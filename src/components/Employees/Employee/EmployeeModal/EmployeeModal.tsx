import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import ModalSectionsList from 'components/Ui/Modal/ModalSectionsList';
import translateEmployee from 'helpers/translateEmployee';
import { useState } from 'react';
import { HiCurrencyDollar } from 'react-icons/hi';
import { HiCalendarDays, HiMiniIdentification } from 'react-icons/hi2';
import { IEmployee } from 'services/types/employee.types';
import EmployeeProfile from '../EmployeeProfile';
import EmployeeSchedule from '../EmployeeSchedule';
import { EmployeeModalContent } from './EmployeeModal.styled';

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
      <ModalHeaderWithAvatar
        avatar={avatar || user.avatar}
        title={fullName}
        subtitle={translateEmployee(role) || jobTitle}
      />

      <ModalSectionsList
        sectionButtons={sectionButtons}
        currentSection={activeSection}
        handleSectionSelect={setActiveSection}
      />

      {activeSection === 1 && <EmployeeProfile employee={employee} />}
      {activeSection === 2 && <EmployeeSchedule employee={employee} />}
    </EmployeeModalContent>
  );
};

export default EmployeeModal;
