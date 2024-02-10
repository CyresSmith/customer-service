import Button from 'components/Ui/Buttons/Button';
import Modal from 'components/Ui/Modal/Modal';
import { ChangeEvent, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import AddClientForm from './AddClientForm';
import Search from 'components/Ui/Search/Search';
import { BarWrapper, SearchWrapper } from './ClientsListBar.styled';

type Props = {
  searchQuery: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ClientsListBar = ({searchQuery, handleSearch}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <BarWrapper>
      <SearchWrapper>
        <Search
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchWrapper>
      <Button
        type="button"
        onClick={toggleModal}
        children="Додати клієнта"
        Icon={IoMdAddCircle}
        $colors="accent"
      />

      {modalOpen && (
        <Modal
          children={<AddClientForm closeModal={toggleModal} />}
          $isOpen={modalOpen}
          closeModal={toggleModal}
        />
      )}
    </BarWrapper>
  );
};

export default ClientsListBar;
