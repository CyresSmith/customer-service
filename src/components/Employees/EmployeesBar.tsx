import Button from 'components/Ui/Buttons/Button';
import Modal from 'components/Ui/Modal/Modal';
import { useAdminRights } from 'hooks';
import { useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import AddEmployeeModal from './AddEmployeeModal';

const EmployeesBar = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const isAdmin = useAdminRights();

  return (
    <>
      {isAdmin && (
        <Button
          onClick={() => setOpenModal('addEmployee')}
          Icon={HiPlusCircle}
          $colors="light"
        >
          Додати співробітника
        </Button>
      )}

      {openModal && (
        <Modal
          title="Додати співробітника"
          $isOpen={openModal === 'addEmployee'}
          closeModal={() => setOpenModal(null)}
        >
          <AddEmployeeModal closeModal={() => setOpenModal(null)} />
        </Modal>
      )}
    </>
  );
};

export default EmployeesBar;