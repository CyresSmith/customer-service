import { useAuth } from 'hooks';
import { Container, ContentWrapper, Title } from './ProfileContent.styled';
import UpdateDataForm from './UpdateForm';
import { Auth, UpdatePassword, User } from 'store/user/user.types';
import {
    useUpdatePasswordMutation,
    useUpdateUserMutation,
    useUploadAvatarMutation,
} from 'services/auth.api';
import { useActions } from 'hooks';
import { toast } from 'react-toastify';
// import Avatar from "./Avatar";
import Avatar from 'components/Avatar';
import { RiLockPasswordLine } from 'react-icons/ri';
import Button from 'components/Ui/Buttons/Button';
import Modal from 'components/Ui/Modal/Modal';
import { useEffect, useState } from 'react';
import UpdatePassForm from './UpdateForm/UpdatePassForm';

const ProfileContent = () => {
    const { user } = useAuth();
    const { updateUser } = useActions();
    const [updateMutation, { isLoading }] = useUpdateUserMutation();
    const [updatePasswordMutation, { isLoading: isPassLoading, isSuccess }] =
        useUpdatePasswordMutation();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

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
        if (isSuccess) {
            setIsOpen(false);
            toast.success('Пароль успішно оновлено.');
        }
    }, [isSuccess]);

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
                    onClick={toggleModal}
                >
                    Змінити пароль
                </Button>
                {isOpen && (
                    <Modal
                        children={
                            <UpdatePassForm
                                isLoading={isPassLoading}
                                handleSubmit={handlePassUpdate}
                            />
                        }
                        $isOpen={isOpen}
                        closeModal={toggleModal}
                    />
                )}
            </ContentWrapper>
        </Container>
    );
};

export default ProfileContent;
