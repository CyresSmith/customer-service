import Avatar from 'components/Avatar';
import ClientForm from 'components/ClientsListPage/ClientForm';
import Button from 'components/Ui/Buttons/Button';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import { useState } from 'react';
import { HiUserRemove } from 'react-icons/hi';
import { toast } from 'react-toastify';
import {
    useDeleteMutation,
    useUpdateClientMutation,
    useUploadAvatarMutation,
} from 'services/clients.api';
import { Client } from 'services/types/clients.types';
import { BtnWrapper, LeftSideWrapper, SidesWrapper } from '../ClientProfile.styled';

type Props = {
    companyId: number;
    closeModal: () => void;
    client: Client;
};

export const Profile = ({ companyId, closeModal, client }: Props) => {
    const [uploadAvatar, { isLoading: uploadLoading }] = useUploadAvatarMutation();

    const [updateClientMutation, { isLoading: updateLoading }] = useUpdateClientMutation();

    const [deleteClientMutation, { isLoading: deleteLoading }] = useDeleteMutation();

    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    const confirmToggle = () => setConfirmOpen(o => !o);

    const handleUpload = async (currentFile: File) => {
        if (!currentFile) return;

        const data = new FormData();
        data.append('avatar', currentFile);

        if (client && client.id) {
            const { url } = await uploadAvatar({
                companyId,
                id: client.id,
                data,
            }).unwrap();

            if (url) {
                toast.success('Аватар успішно оновлено');
            }
        }
    };

    const handleUpdate = async (newData: Partial<Client>) => {
        if (client) {
            const filtered = Object.fromEntries(
                Object.entries(newData).filter(([, v]) => !Object.values(client).includes(v))
            );
            const data = await updateClientMutation({
                companyId,
                id: client.id,
                data: filtered,
            }).unwrap();

            if (data) {
                toast.success(`Профіль успішно оновлено`);
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (companyId && id) {
            const { message } = await deleteClientMutation({
                companyId: +companyId,
                id,
            }).unwrap();

            if (message) {
                setConfirmOpen(false);
                closeModal();
                toast.success('Клієнта видалено');
            }
        }
    };

    return client ? (
        <>
            <SidesWrapper>
                <LeftSideWrapper>
                    <Avatar
                        size={200}
                        handleUpload={handleUpload}
                        alt="Client photo"
                        currentImageUrl={client.avatar || ''}
                        allowChanges={true}
                        isLoading={uploadLoading}
                    />

                    <BtnWrapper>
                        <Button
                            Icon={HiUserRemove}
                            onClick={confirmToggle}
                            isLoading={deleteLoading}
                            type="button"
                            children="Видалити"
                            $colors="light"
                        />
                    </BtnWrapper>
                </LeftSideWrapper>

                <ClientForm
                    type="update"
                    onSubmit={handleUpdate}
                    isLoading={updateLoading}
                    initialState={client}
                />
            </SidesWrapper>

            {confirmOpen && (
                <ConfirmOperation
                    id="deleteClientConfirm"
                    isOpen={confirmOpen}
                    children={`Підвтердити видалення клієнта ${
                        client.lastName
                            ? client.firstName + ' ' + client.lastName
                            : client.firstName
                    }?`}
                    callback={() => handleDelete(+client.id)}
                    closeConfirm={confirmToggle}
                />
            )}
        </>
    ) : null;
};
