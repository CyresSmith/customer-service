import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import ModalSectionsList from 'components/Ui/Modal/ModalSectionsList';
import translateEmployee from 'helpers/translateEmployee';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { HiCurrencyDollar } from 'react-icons/hi';
import { HiCalendarDays, HiMiniIdentification } from 'react-icons/hi2';
import { useGetOneEmployeeQuery } from 'services/employee.api';
import { IEmployee } from 'services/types/employee.types';
import { EmployeeModalContent } from './EmployeeModal.styled';
import EmployeeProfile from './EmployeeProfile';
import EmployeeSchedule from './EmployeeSchedule';
import EmployeeServices from './EmployeeServices';

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
  const { id: companyId } = useCompany();
  const [activeSection, setActiveSection] = useState<number>(
    sectionButtons[0].id
  );
  const [chosenEmployee, setChosenEmployee] = useState<IEmployee | null>(null);

  const { data, isSuccess } = useGetOneEmployeeQuery(
    { companyId: +companyId, id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data && isSuccess) {
      setChosenEmployee(data);
    }
  }, [data, isSuccess, setChosenEmployee]);

  if (!chosenEmployee) {
    return;
  }

  const { avatar, user, firstName, lastName, role, jobTitle } = chosenEmployee;

  return (
    <EmployeeModalContent>
      <ModalHeaderWithAvatar
        avatar={avatar || user.avatar}
        title={`${firstName}  ${lastName && lastName}`}
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
