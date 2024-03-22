import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import ModalSectionsList from 'components/Ui/Modal/ModalSectionsList';
import translateEmployee from 'helpers/translateEmployee';
import { useEffect, useState } from 'react';
import { HiCurrencyDollar } from 'react-icons/hi';
import { HiCalendarDays, HiMiniIdentification } from 'react-icons/hi2';
import EmployeeProfile from './EmployeeProfile';
import EmployeeSchedule from './EmployeeSchedule';
import EmployeeServices from './EmployeeServices';
import { EmployeeModalContent } from './EmployeeModal.styled';
import { useGetOneQuery } from 'services/employee.api';
import { useCompany } from 'hooks/useCompany';
import { useActions } from 'hooks';
import { useEmployees } from 'hooks/useEmployees';

enum OpenModalEnum {
  PROFILE = 1,
  SCHEDULE = 2,
  SERVICES = 3,
}

type Props = { id: number };

const sectionButtons = [
  { id: 1, label: 'Профіль', Icon: HiMiniIdentification },
  { id: 2, label: 'Графік', Icon: HiCalendarDays },
  { id: 3, label: 'Послуги', Icon: HiCurrencyDollar },
];

const EmployeeModal = ({ id }: Props) => {
  const [activeSection, setActiveSection] = useState<number>(
    sectionButtons[0].id
  );
  const { setChosenEmployee } = useActions();
  const { id: companyId } = useCompany();
  const { data, isSuccess } = useGetOneQuery(
    { companyId: +companyId, id: id },
    {
      skip: !id,
    }
  );

  useEffect(() => {
    if (data && isSuccess) {
      setChosenEmployee(data);
    }
  }, [data, isSuccess, setChosenEmployee]);

  const { chosenEmployee } = useEmployees();

  if (!chosenEmployee) {
    return;
  }

  const { avatar, user, firstName, lastName, role, jobTitle, services } =
    chosenEmployee;

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
          chosenEmployee.provider
            ? sectionButtons
            : sectionButtons.filter(({ id }) => id !== OpenModalEnum.SERVICES)
        }
        currentSection={activeSection}
        handleSectionSelect={setActiveSection}
      />

      {activeSection === OpenModalEnum.PROFILE && (
        <EmployeeProfile employee={chosenEmployee} />
      )}
      {activeSection === OpenModalEnum.SCHEDULE && (
        <EmployeeSchedule employee={chosenEmployee} />
      )}
      {activeSection === OpenModalEnum.SERVICES && (
        <EmployeeServices employee={chosenEmployee} />
      )}
    </EmployeeModalContent>
  );
};

export default EmployeeModal;
