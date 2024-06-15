import ClientForm from 'components/ClientsListPage/ClientForm';
import ClientProfile from 'components/ClientsListPage/ClientProfile';
import ItemsList from 'components/Ui/ItemsList';
import Modal from 'components/Ui/Modal/Modal';
import { addClientInitialState } from 'helpers/constants';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateClientMutation, useGetAllClientsQuery } from 'services/clients.api';
import { Client } from 'services/types/clients.types';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';

enum OpenModal {
    ADD = 1,
    EDIT = 2,
}

const ClientsListPage = () => {
    const isTablet = useMediaQuery(theme.breakpoints.tablet.media);
    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);

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

    const items =
        data?.map(({ id, avatar, firstName, lastName, phone, email, gender, createdAt }) => {
            let userData = {
                id,
                avatar: avatar || '',
                name: `${firstName}  ${lastName && lastName}`,
                phone,
            };

            if (isTablet || isDesktop) {
                userData = Object.assign(userData, {
                    gender: gender || 'other',
                    email: email || 'Пошта не вказана',
                });
            }

            if (isDesktop) {
                userData = Object.assign(userData, {
                    register: createdAt ? new Date(createdAt).toLocaleDateString() : '',
                });
            }

            return userData;
        }) || [];

    const keyForSelect =
        items.length > 0 && Object.keys(items[0]).includes('gender') ? 'gender' : undefined;

    return (
        <>
            <ItemsList
                items={items}
                onItemClick={handleItemClick}
                addButtonTitle={'Додати клієнта'}
                onAddClick={() => setModalOpen(OpenModal.ADD)}
                keyForSelect={keyForSelect as 'phone' | 'name' | undefined}
                keyForSearch="phone"
                notSortedKeys={['phone', 'email'] as ('phone' | 'name')[] | undefined}
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
                        initialState={addClientInitialState}
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
