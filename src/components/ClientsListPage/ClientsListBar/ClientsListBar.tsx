import Button from 'components/Ui/Buttons/Button';
import Modal from 'components/Ui/Modal/Modal';
import { ChangeEvent, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import ClientForm from '../ClientForm';
import Search from 'components/Ui/Search/Search';
import { BarWrapper, SearchWrapper } from './ClientsListBar.styled';
import { Client } from 'store/clients/clients.types';
import { useCreateClientMutation } from 'services/clients.api';
import { useParams } from 'react-router-dom';
import { useActions } from 'hooks';
import { toast } from 'react-toastify';

const addInitialState: Client = {
  id: '',
  firstName: '',
  lastName: '',
  birthday: '',
  phone: '',
  email: '',
  discount: undefined,
  card: '',
  source: '',
  comments: '',
  gender: undefined
};

type Props = {
  searchQuery: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  refetchData: () => void;
};

const ClientsListBar = ({searchQuery, handleSearch, refetchData}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [createClientMutatuin, { isLoading }] = useCreateClientMutation();
  const { addNewClient } = useActions();

  const {companyId} = useParams();

  const handleAddClient = async (state: Client) => {
    if (!companyId) {
      return;
    }

    const data = Object.fromEntries(Object.entries(state).filter(i => i[1] !== ''));

    const result = await createClientMutatuin({data, companyId: +companyId}).unwrap();
    
    if (result) {
      addNewClient(result);
      toggleModal();
      toast.success('Нового клієнта успішно збережено')
    }
  };

  function toggleModal () {
    if (modalOpen) {
      refetchData();
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

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
          children={
            <ClientForm
              type='add'
              initialState={addInitialState}
              onSubmit={handleAddClient}
              isLoading={isLoading}
            />}
          $isOpen={modalOpen}
          closeModal={toggleModal}
        />
      )}
    </BarWrapper>
  );
};

export default ClientsListBar;
