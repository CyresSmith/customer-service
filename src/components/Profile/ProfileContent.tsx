import { useActions, useAuth } from 'hooks';
import { toast } from 'react-toastify';
import {
    useDeleteUserMutation,
    useUpdatePasswordMutation,
    useUpdateUserMutation,
    useUploadAvatarMutation,
} from 'services/auth.api';
import { Auth, UpdatePassword, User } from 'store/user/user.types';
import { Container, ContentWrapper, Title } from './ProfileContent.styled';
import UpdateDataForm from './UpdateForm';
// import Avatar from "./Avatar";
import Avatar from 'components/Avatar';
import Button from 'components/Ui/Buttons/Button';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import Modal from 'components/Ui/Modal/Modal';
import { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi2';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import UpdatePassForm from './UpdateForm/UpdatePassForm';

enum OpenModalEnum {
    CHANGE_PASS = 1,
    DELETE = 2,
}

const ProfileContent = () => {
    const { user } = useAuth();
    const { updateUser, logOut } = useActions();
    const navigate = useNavigate();
    const [updateMutation, { isLoading }] = useUpdateUserMutation();
    const [
        updatePasswordMutation,
        { isLoading: isPassLoading, isSuccess: isPasswordUpdateSuccess },
    ] = useUpdatePasswordMutation();
    const [isOpen, setIsOpen] = useState<OpenModalEnum | null>(null);

    const [deleteUser, { isLoading: isDeleteUserLoading }] = useDeleteUserMutation();

    const toggleModal = (id?: OpenModalEnum): void => setIsOpen(id ? id : null);

    const handleDataUpdate = async (newData: Partial<User>): Promise<void> => {
        if (user) {
            const filtered = Object.fromEntries(
                Object.entries(newData).filter(([, v]) => !Object.values(user).includes(v))
            );
            const data = await updateMutation({
                id: user?.id,
                data: filtered,
            }).unwrap();

            if (data) {
                updateUser(data);
                toast.success(`Ваш профіль успішно оновлено`);
            }
        }
    };

    const handleUserDelete = async () => {
        if (!user) return;

        const { message } = await deleteUser({ id: user.id }).unwrap();

        if (message) {
            logOut();
            navigate('/');
            toast.success(message);
        }
    };

    const handlePassUpdate = async (state: Auth): Promise<void> => {
        const { password, newPassword } = state;

        if (user) {
            if (password && newPassword) {
                const updateData: UpdatePassword = {
                    id: user.id,
                    data: {
                        password,
                        newPassword,
                    },
                };

                await updatePasswordMutation(updateData);
            }
        }
    };

    const [uploadAvatarMutation, { isLoading: uploadLoading }] = useUploadAvatarMutation();

    const { setAvatar } = useActions();

    const handleUpload = async (currentFile: File) => {
        if (!currentFile || !user) {
            return;
        }

        const data = new FormData();
        data.append('avatar', currentFile);

        const { url } = await uploadAvatarMutation({
            id: +user?.id,
            data,
        }).unwrap();

        if (url) {
            setAvatar({ avatar: url });
            toast.success('Аватар успішно оновлено');
        }
    };

    useEffect(() => {
        if (isPasswordUpdateSuccess) {
            toggleModal();
            toast.success('Пароль успішно оновлено.');
        }
    }, [isPasswordUpdateSuccess]);

    if (!user) {
        return;
    }

    return (
        <Container>
            <ContentWrapper>
                <Title>Редагування профілю</Title>
                <Avatar
                    size={200}
                    currentImageUrl={user.avatar}
                    allowChanges={true}
                    // light={true}
                    handleUpload={handleUpload}
                    $round={true}
                    isLoading={uploadLoading}
                    alt="User photo"
                />
                {/* <Avatar id={user.id} avatar={user.avatar} /> */}
                {user && (
                    <UpdateDataForm
                        userData={user}
                        onSubmit={handleDataUpdate}
                        isLoading={isLoading}
                    />
                )}
                <Button
                    id="updatePass"
                    type="button"
                    Icon={RiLockPasswordLine}
                    $colors="light"
                    onClick={() => toggleModal(OpenModalEnum.CHANGE_PASS)}
                >
                    Змінити пароль
                </Button>
                <Button
                    id="deleteUser"
                    type="button"
                    Icon={HiTrash}
                    $colors="light"
                    onClick={() => toggleModal(OpenModalEnum.DELETE)}
                >
                    Видалити
                </Button>
                {isOpen === OpenModalEnum.CHANGE_PASS && (
                    <Modal
                        children={
                            <UpdatePassForm
                                isLoading={isPassLoading}
                                handleSubmit={handlePassUpdate}
                            />
                        }
                        $isOpen={isOpen === OpenModalEnum.CHANGE_PASS}
                        closeModal={toggleModal}
                    />
                )}
                {isOpen === OpenModalEnum.DELETE && (
                    <ConfirmOperation
                        id="deleteUserConfirm"
                        callback={handleUserDelete}
                        closeConfirm={toggleModal}
                        isOpen={isOpen === OpenModalEnum.DELETE}
                        isLoading={isDeleteUserLoading}
                    >
                        Ви дійсно бажаєте видалити профіль?
                    </ConfirmOperation>
                )}
            </ContentWrapper>
        </Container>
    );
};

export default ProfileContent;
