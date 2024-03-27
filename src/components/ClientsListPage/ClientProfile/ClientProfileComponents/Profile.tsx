import Avatar from 'components/Avatar';
import ClientForm from 'components/ClientsListPage/ClientForm';
import Button from 'components/Ui/Buttons/Button';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import { useActions } from 'hooks';
import { useClients } from 'hooks/useClients';
import { useState } from 'react';
import { HiUserRemove } from 'react-icons/hi';
import { toast } from 'react-toastify';
import {
  useDeleteMutation,
  useUpdateClientMutation,
  useUploadAvatarMutation,
} from 'services/clients.api';
import { Client } from 'store/clients/clients.types';
import {
  BtnWrapper,
  LeftSideWrapper,
  SidesWrapper,
} from '../ClientProfile.styled';

type Props = {
  companyId: number;
  clientRefetch: () => void;
  closeModal: () => void;
  refetchChosen: () => void;
};

export const Profile = ({
  companyId,
  clientRefetch,
  closeModal,
  refetchChosen,
}: Props) => {
  const { chosen } = useClients();
  const { setClientAvatar, updateClient, deleteClient } = useActions();

  const [uploadAvatar, { isLoading: uploadLoading }] =
    useUploadAvatarMutation();

  const [updateClientMutation, { isLoading: updateLoading }] =
    useUpdateClientMutation();

  const [deleteClientMutation, { isLoading: deleteLoading }] =
    useDeleteMutation();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const confirmToggle = () => setConfirmOpen(o => !o);

  const handleUpload = async (currentFile: File) => {
    if (!currentFile) return;

    const data = new FormData();
    data.append('avatar', currentFile);

    if (chosen && chosen.id) {
      const { url } = await uploadAvatar({
        companyId,
        id: chosen?.id,
        data,
      }).unwrap();

      if (url) {
        setClientAvatar({ avatar: url });
        clientRefetch();
        refetchChosen();
        toast.success('Аватар успішно оновлено');
      }
    }
  };

  const handleUpdate = async (newData: Partial<Client>) => {
    if (chosen) {
      const filtered = Object.fromEntries(
        Object.entries(newData).filter(
          ([, v]) => !Object.values(chosen).includes(v)
        )
      );
      const data = await updateClientMutation({
        companyId,
        id: chosen?.id,
        data: filtered,
      }).unwrap();

      if (data) {
        updateClient(data);
        toast.success(`Профіль успішно оновлено`);
        clientRefetch();
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
        deleteClient({ id });
        clientRefetch();
        setConfirmOpen(false);
        closeModal();
        toast.success('Клієнта видалено');
      }
    }
  };

  return chosen ? (
    <>
      <SidesWrapper>
        <LeftSideWrapper>
          <Avatar
            size={200}
            handleUpload={handleUpload}
            alt="Client photo"
            currentImageUrl={chosen.avatar || ''}
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
          initialState={chosen}
        />
      </SidesWrapper>

      {confirmOpen && (
        <ConfirmOperation
          id="deleteClientConfirm"
          isOpen={confirmOpen}
          children={`Підвтердити видалення клієнта ${
            chosen.lastName
              ? chosen.firstName + ' ' + chosen.lastName
              : chosen.firstName
          }?`}
          callback={() => handleDelete(+chosen.id)}
          closeConfirm={confirmToggle}
        />
      )}
    </>
  ) : null;
};
