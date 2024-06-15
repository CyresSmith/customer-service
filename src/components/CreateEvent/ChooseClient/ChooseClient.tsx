import ClientForm from 'components/ClientsListPage/ClientForm';
import ItemsList from 'components/Ui/ItemsList';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import { addClientInitialState } from 'helpers/constants';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateClientMutation, useGetAllClientsQuery } from 'services/clients.api';
import { Client } from 'services/types/clients.types';

type Props = {
    companyId: number;
    setClient: React.Dispatch<React.SetStateAction<Client | null>>;
    setStep: (step: string) => void;
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

        setStep('choseWay');
    };

    const items =
        data?.map(({ id, avatar, firstName, lastName, phone }) => ({
            id,
            avatar: avatar || '',
            name: `${firstName}  ${lastName && lastName}`,
            phone,
        })) || [];

    return (
        <>
            <>
                {isLoading ? (
                    <Loader />
                ) : (
                    <ItemsList
                        items={items}
                        onItemClick={handleClientChoose}
                        addButtonTitle="Додати клієнта"
                        onAddClick={() => setModalOpen(true)}
                        keyForSearch="phone"
                        notSortedKeys={['phone']}
                        nameColumnTitle="Ім'я"
                    />
                )}
            </>
            {modalOpen && (
                <Modal id="newClient" $isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
                    <ClientForm
                        type="add"
                        initialState={addClientInitialState}
                        onSubmit={handleAddClient}
                        isLoading={isLoading}
                    />
                </Modal>
            )}
        </>
    );
};

export default ChooseClient;
