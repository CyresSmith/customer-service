import ClientForm from 'components/ClientsListPage/ClientForm';
import ClientProfile from 'components/ClientsListPage/ClientProfile';
import ItemsList from 'components/Ui/ItemsList';
import Modal from 'components/Ui/Modal/Modal';
import { useActions } from 'hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  useCreateClientMutation,
  useDeleteMutation,
  useGetAllQuery,
} from 'services/clients.api';
import { Client } from 'store/clients/clients.types';

const addInitialState: Client = {
  id: '',
  firstName: '',
  lastName: '',
  birthday: '',
  phone: '',
  email: '',
  discount: 0,
  card: '',
  source: '',
  comment: '',
  gender: '',
};

const ClientsListPage = () => {
  const { companyId } = useParams();
  const { setClients, addNewClient, deleteClient } = useActions();
  const [modalOpen, setModalOpen] = useState<boolean | number>(false);

  const { data, isSuccess, refetch, isLoading } = useGetAllQuery(companyId, {
    skip: Boolean(!companyId),
  });
  const [createClientMutation, { isLoading: addClientLoading }] =
    useCreateClientMutation();

  const [
    deleteClientMutation,
    { isLoading: deleteLoading, isSuccess: deleteSuccess },
  ] = useDeleteMutation();

  function toggleModal() {
    if (modalOpen) {
      refetch();
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  const handleItemClick = (id: string | number) => {
    setModalOpen(+id);
  };

  const handleClientDelete = async (id: number) => {
    if (companyId && id) {
      const { message } = await deleteClientMutation({
        companyId: +companyId,
        id,
      }).unwrap();
      if (message) {
        setModalOpen(false);
        deleteClient({ id });
      }
    }
  };

  const handleAddClient = async (state: Client) => {
    if (!companyId) {
      return;
    }

    const data = Object.fromEntries(
      Object.entries(state).filter(i => i[1] !== '')
    );

    const result = await createClientMutation({
      data,
      companyId: +companyId,
    }).unwrap();

    if (result) {
      addNewClient(result);
      toggleModal();
      toast.success('Нового клієнта успішно збережено');
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setClients(data);
    }
  }, [data, isSuccess, setClients]);

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success('Клієнта видалено');
    }
  }, [deleteSuccess, refetch]);

  return (
    <>
      {data && data.length && (
        <ItemsList
          items={data?.map(
            ({
              id,
              avatar,
              firstName,
              lastName,
              phone,
              email,
              gender,
              createdAt,
            }) => ({
              id,
              avatar: avatar || '',
              name: lastName ? firstName + ' ' + lastName : firstName,
              phone,
              email: email || 'Пошта не вказана',
              gender: gender || 'Не вказано',
              register: createdAt
                ? new Date(createdAt).toLocaleDateString()
                : '',
            })
          )}
          onItemClick={handleItemClick}
          addButtonTitle="Додати клієнта"
          onAddClick={toggleModal}
          keyForSelect="gender"
        />
      )}

      {modalOpen && typeof modalOpen === 'boolean' && (
        <Modal
          id="add"
          children={
            <ClientForm
              type="add"
              initialState={addInitialState}
              onSubmit={handleAddClient}
              isLoading={isLoading}
            />
          }
          $isOpen={Boolean(modalOpen)}
          closeModal={toggleModal}
        />
      )}

      {typeof modalOpen === 'number' && companyId && (
        <Modal
          children={
            <ClientProfile
              deleteLoading={deleteLoading}
              deleteClient={handleClientDelete}
              companyId={+companyId}
              id={modalOpen}
            />
          }
          $isOpen={Boolean(modalOpen)}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default ClientsListPage;
