import Button from 'components/Ui/Buttons/Button';
import Modal from 'components/Ui/Modal/Modal';
import { useAdminRights } from 'hooks';
import { useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';

type Props = {};

enum OpenModal {
  ADD = 1,
}

const ServicesBar = (props: Props) => {
  const [openModal, setOpenModal] = useState<OpenModal | null>(null);
  const isAdmin = useAdminRights();

  return (
    <>
      {isAdmin && (
        <Button
          onClick={() => setOpenModal(OpenModal.ADD)}
          Icon={HiPlusCircle}
          $colors="light"
        >
          Додати послугу
        </Button>
      )}

      {openModal && (
        <Modal
          title="Додати послугу"
          $isOpen={openModal === OpenModal.ADD}
          closeModal={() => setOpenModal(null)}
        >
          <div> services modal</div>
        </Modal>
      )}
    </>
  );
};

export default ServicesBar;
