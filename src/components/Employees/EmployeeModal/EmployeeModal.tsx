import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import ModalSectionsList from 'components/Ui/Modal/ModalSectionsList';
import translateEmployee from 'helpers/translateEmployee';
import { useState } from 'react';
import { HiCurrencyDollar } from 'react-icons/hi';
import { HiCalendarDays, HiMiniIdentification } from 'react-icons/hi2';
import { IEmployee } from 'services/types/employee.types';
import { EmployeeModalContent } from './EmployeeModal.styled';
import EmployeeProfile from './EmployeeProfile';
import EmployeeSchedule from './EmployeeSchedule';
import EmployeeServices from './EmployeeServices';

type Props = { employee: IEmployee };

enum OpenModalEnum {
  PROFILE = 1,
  SCHEDULE = 2,
  SERVICES = 3,
}

const sectionButtons = [
  { id: 1, label: 'Профіль', Icon: HiMiniIdentification },
  { id: 2, label: 'Графік', Icon: HiCalendarDays },
  { id: 3, label: 'Послуги', Icon: HiCurrencyDollar },
];

const EmployeeModal = ({ employee }: Props) => {
  const { avatar, user, firstName, lastName, role, jobTitle, services } =
    employee;

  const [activeSection, setActiveSection] = useState<OpenModalEnum>(
    OpenModalEnum.PROFILE
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
        sectionButtons={
          employee.provider
            ? sectionButtons
            : sectionButtons.filter(({ id }) => id !== OpenModalEnum.SERVICES)
        }
        currentSection={activeSection}
        handleSectionSelect={setActiveSection}
      />

      {activeSection === OpenModalEnum.PROFILE && (
        <EmployeeProfile employee={employee} />
      )}
      {activeSection === OpenModalEnum.SCHEDULE && (
        <EmployeeSchedule employee={employee} />
      )}
      {activeSection === OpenModalEnum.SERVICES && (
        <EmployeeServices employee={employee} />
      )}
    </EmployeeModalContent>
  );
};

export default EmployeeModal;
