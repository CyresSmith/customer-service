import ClientForm from 'components/ClientsListPage/ClientForm';
import ClientProfile from 'components/ClientsListPage/ClientProfile';
import ItemsList from 'components/Ui/ItemsList';
import Modal from 'components/Ui/Modal/Modal';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateClientMutation, useGetAllClientsQuery } from 'services/clients.api';
import { Client } from 'services/types/clients.types';

const addInitialState: Client = {
    id: 0,
    firstName: '',
    lastName: '',
    birthday: null,
    phone: '',
    email: '',
    discount: 0,
    card: '',
    source: '',
    comment: '',
    gender: '',
};

enum OpenModal {
    ADD = 1,
    EDIT = 2,
}

const ClientsListPage = () => {
    const { id: companyId } = useCompany();
    const [modalOpen, setModalOpen] = useState<OpenModal | null>(null);
    const [chosenClientId, setChosenClientId] = useState<number | null>(null);

    const { data, isLoading } = useGetAllClientsQuery(companyId, {
        skip: !companyId,
    });

    const [createClientMutation] = useCreateClientMutation();

    const handleItemClick = (id: string | number) => {
        setChosenClientId(+id);
        setModalOpen(OpenModal.EDIT);
    };

    const handleAddClient = async (state: Client) => {
        if (!companyId) {
            return;
        }

        const data = Object.fromEntries(Object.entries(state).filter(i => i[1] !== ''));

        const result = await createClientMutation({
            data,
            companyId: +companyId,
        }).unwrap();

        if (result) {
            setModalOpen(null);
            toast.success('Нового клієнта успішно збережено');
        }
    };

    return (
        <>
            <ItemsList
                items={
                    !data
                        ? []
                        : data.map(
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
                                  name: `${firstName}  ${lastName && lastName}`,
                                  phone,
                                  email: email || 'Пошта не вказана',
                                  gender: gender || 'other',
                                  register: createdAt
                                      ? new Date(createdAt).toLocaleDateString()
                                      : '',
                              })
                          )
                }
                onItemClick={handleItemClick}
                addButtonTitle="Додати клієнта"
                onAddClick={() => setModalOpen(OpenModal.ADD)}
                keyForSelect="gender"
                keyForSearch="phone"
                notSortedKeys={['phone', 'email']}
                nameColumnTitle="Ім'я"
            />

            {modalOpen === OpenModal.ADD && (
                <Modal
                    id="newClient"
                    $isOpen={modalOpen === OpenModal.ADD}
                    closeModal={() => setModalOpen(null)}
                >
                    <ClientForm
                        type="add"
                        initialState={addInitialState}
                        onSubmit={handleAddClient}
                        isLoading={isLoading}
                    />
                </Modal>
            )}

            {modalOpen === OpenModal.EDIT && companyId && chosenClientId && (
                <Modal
                    id="clientProfile"
                    $isOpen={modalOpen === OpenModal.EDIT}
                    closeModal={() => setModalOpen(null)}
                >
                    <ClientProfile
                        companyId={+companyId}
                        clientId={chosenClientId}
                        closeModal={() => setModalOpen(null)}
                    />
                </Modal>
            )}
        </>
    );
};

export default ClientsListPage;
