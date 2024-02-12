import Button from "components/Ui/Buttons/Button"
import { BtnWrapper, LeftSideWrapper, SidesWrapper } from "../ClientProfile.styled"
import { Client } from "store/clients/clients.types";
import ClientForm from "components/ClientsListPage/ClientForm";
import Avatar from "components/Avatar";
import { useUpdateClientMutation, useUploadAvatarMutation } from "services/clients.api";
import { useActions } from "hooks";
import { toast } from "react-toastify";
import { useClients } from "hooks/useClients";

type Props = {
    companyId: number;
    clientRefetch: () => void;
}

export const Profile = ({ companyId, clientRefetch }: Props) => {
    const [uploadAvatar, { isLoading: uploadLoading }] = useUploadAvatarMutation();
    const [updateClientMutation] = useUpdateClientMutation();
    const { setClientAvatar, updateClient } = useActions();
    const { choosen } = useClients();

    const handleUpload = async (currentFile: File) => {
        if (!currentFile) {
            return;
        }

        const data = new FormData();
        data.append('avatar', currentFile);

        const { url } = await uploadAvatar({ companyId, id: +choosen?.id, data }).unwrap();

        if (url) {
            setClientAvatar({ avatar: url });
            toast.success('Аватар успішно оновлено');
        }
    };

    const handleUpdate = async (newData: Partial<Client>) => {
        if (choosen) {
            const filtered = Object.fromEntries(Object.entries(newData).filter(([, v]) => !Object.values(choosen).includes(v)));
            const data = await updateClientMutation({ companyId, id: choosen?.id, data: filtered }).unwrap();
            
            if (data) {
                updateClient(data);
                toast.success(`Профіль успішно оновлено`);
                clientRefetch();
            }
        }
    };

    return (
        <SidesWrapper>
            <LeftSideWrapper>
                <Avatar
                    size={200}
                    handleUpload={handleUpload}
                    alt="Client photo"
                    currentImageUrl={choosen.avatar}
                    allowChanges={true}
                    isLoading={uploadLoading}
                />
                <BtnWrapper>
                    <Button type='button' children='Видалити' $colors="light" />
                </BtnWrapper>
            </LeftSideWrapper>
            <ClientForm type='update' onSubmit={handleUpdate} isLoading={false} initialState={choosen} />
        </SidesWrapper>
    )
}