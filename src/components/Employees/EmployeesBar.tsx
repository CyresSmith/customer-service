import Button from 'components/Ui/Buttons/Button';
import { useAdminRights } from 'hooks';
// import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import AddEmployeeModal from './AddEmployeeModal';
import { useEmployees } from 'hooks/useEmployees';

enum OpenModal {
  ADD = 1,
}

const EmployeesBar = () => {
  const [openModal, setOpenModal] = useState<OpenModal | null>(null);
  const isAdmin = useAdminRights();
  const { allEmployees } = useEmployees();

  return (
    <>
      {isAdmin && (
        <Button
          onClick={() => setOpenModal(OpenModal.ADD)}
          Icon={HiPlusCircle}
          $colors="accent"
          shake={allEmployees.length === 0}
        >
          Додати співробітника
        </Button>
      )}

      {openModal && (
        <AddEmployeeModal
          isOpen={openModal === OpenModal.ADD}
          closeModal={() => setOpenModal(null)}
        />
      )}
    </>
  );
};

export default EmployeesBar;
