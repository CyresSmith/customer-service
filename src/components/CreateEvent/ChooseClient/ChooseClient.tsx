import ClientForm from 'components/ClientsListPage/ClientForm';
import ItemsList from 'components/Ui/ItemsList';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateClientMutation, useGetAllClientsQuery } from 'services/clients.api';
import { Client } from 'services/types/clients.types';
import { Container } from './ChooseClient.styled';

type Props = {
    companyId: number;
    setClient: React.Dispatch<React.SetStateAction<Client | null>>;
    setStep: (step: string) => void;
};

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

const ChooseClient = ({ companyId, setClient, setStep }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [createClientMutation] = useCreateClientMutation();
    const { data, isLoading } = useGetAllClientsQuery(companyId, {
        skip: !companyId,
    });

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
            setModalOpen(false);
            toast.success('Нового клієнта успішно збережено');
        }
    };

    const handleClientChoose = (id: number) => {
        if (data) {
            setClient(data.filter(c => c.id === id)[0]);
        }

        setStep('chooseWay');
    };

    return (
        <>
            <Container>
                {isLoading ? (
                    <Loader />
                ) : (
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
                                          //   email,
                                          //   gender,
                                          //   createdAt,
                                      }) => ({
                                          id,
                                          avatar: avatar || '',
                                          name: `${firstName}  ${lastName && lastName}`,
                                          phone,
                                          //   email: email || 'Пошта не вказана',
                                          //   gender: gender || 'other',
                                          //   register: createdAt
                                          //       ? new Date(createdAt).toLocaleDateString()
                                          //       : '',
                                      })
                                  )
                        }
                        onItemClick={handleClientChoose}
                        addButtonTitle="Додати клієнта"
                        onAddClick={() => setModalOpen(true)}
                        keyForSearch="phone"
                        notSortedKeys={['phone']}
                    />
                )}
            </Container>
            {modalOpen && (
                <Modal id="newClient" $isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
                    <ClientForm
                        type="add"
                        initialState={addInitialState}
                        onSubmit={handleAddClient}
                        isLoading={isLoading}
                    />
                </Modal>
            )}
        </>
    );
};

export default ChooseClient;
