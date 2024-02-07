import Button from 'components/Ui/Buttons/Button';
import Modal from 'components/Ui/Modal/Modal';
import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import AddClientForm from './AddClientForm';

type Props = {};

const ClientsListBar = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={toggleModal}
        children="Додати клієнта"
        Icon={IoMdAddCircle}
        $colors="accent"
      />

      {modalOpen && (
        <Modal
          children={<AddClientForm />}
          $isOpen={modalOpen}
          closeModal={toggleModal}
        />
      )}
    </>
  );
};

export default ClientsListBar;
