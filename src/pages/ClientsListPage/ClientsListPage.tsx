import AddClientForm from "components/ClientsContent/AddClientForm";
import Button from "components/Ui/Buttons/Button";
import Modal from "components/Ui/Modal/Modal";
import PageTopBar from "components/Ui/PageTopBar";
import { useState } from "react";
import { IoMdAddCircle } from 'react-icons/io';

const ClientsListPage = () => {
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
      <PageTopBar components={
        [
          <Button type='button' onClick={toggleModal} children='Додати клієнта' Icon={IoMdAddCircle} $colors="accent" />
        ]
      } />
      {modalOpen && (
        <Modal
          children={
            <AddClientForm />
          }
          $isOpen={modalOpen}
          closeModal={toggleModal}
        />
      )}
    </>
  )
};

export default ClientsListPage;