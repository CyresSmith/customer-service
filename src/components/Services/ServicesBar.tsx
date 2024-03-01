import Button from 'components/Ui/Buttons/Button';
import Modal from 'components/Ui/Modal/Modal';
import { AddServiceOpenModal } from 'helpers/enums';
import { useAdminRights } from 'hooks';
import { useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useAddNewServiceMutation } from 'services/company.api';
import AddServiceModal from './AddServiceModal';

type Props = {};

const ServicesBar = (props: Props) => {
  const isAdmin = useAdminRights();
  const [openModal, setOpenModal] = useState<AddServiceOpenModal | null>(null);

  const [addNewService, { isLoading }] = useAddNewServiceMutation();

  const handleModalClose = () => {
    setOpenModal(null);
  };

  return (
    <>
      {isAdmin && (
        <Button
          onClick={() => setOpenModal(AddServiceOpenModal.ADD)}
          Icon={HiPlusCircle}
          $colors="light"
        >
          Додати послугу
        </Button>
      )}

      {openModal && (
        <Modal
          id="addService"
          title="Створення послуги"
          $isOpen={openModal !== null}
          closeModal={handleModalClose}
        >
          <AddServiceModal setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};

export default ServicesBar;
