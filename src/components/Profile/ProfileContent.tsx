import { useAuth } from "hooks";
import { Container, Title } from "./ProfileContent.styled";
import UpdateDataForm from "./UpdateForm";
import { UpdatePassword, User } from "store/user/user.types";
import { useUpdatePasswordMutation, useUpdateUserMutation } from "services/auth.api";
import { useActions } from "hooks";
import { toast } from "react-toastify";
import Avatar from "./Avatar";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "components/Ui/Buttons/Button";
import Modal from "components/Ui/Modal/Modal";
import { useEffect, useState } from "react";
import UpdatePassForm from "./UpdateForm/UpdatePassForm";
import { State } from "hooks/useForm";

const ProfileContent = () => {
    const { user } = useAuth();
    const { updateUser } = useActions();
    const [updateMutation, { isLoading }] = useUpdateUserMutation();
    const [updatePasswordMutation, {isLoading: isPassLoading, isSuccess}] = useUpdatePasswordMutation();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    const handleDataUpdate = async (newData: Partial<User>): Promise<void> => {
        if (user) {
            const filtered = Object.fromEntries(Object.entries(newData).filter(([k, v]) => !Object.values(user).includes(v)));
            const data = await updateMutation({id: user?.id, data: filtered}).unwrap();
            
            if (data) {
                updateUser(data);
                toast.success(`Ваш профіль успішно оновлено`);
            }
        }
    };

    const handlePassUpdate = async (state: State): Promise<void> => {
        const { password, newPassword } = state;

        if (user) {
            if (password && newPassword) {
                const updateData: UpdatePassword = {
                    id: user.id,
                    data: {
                        password,
                        newPassword
                    }
                }
                
                await updatePasswordMutation(updateData);
            }
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            toast.success('Пароль успішно оновлено.');
        }
    }, [isSuccess]);

    if (!user) {
        return
    }

    return (
        <Container>
            <Title>Редагування профілю</Title>
                <Avatar id={user.id} avatar={user.avatar} />
                {user && <UpdateDataForm userData={user} onSubmit={handleDataUpdate} isLoading={isLoading} />}
                <Button id="updatePass" type='button' Icon={RiLockPasswordLine} $colors="light" onClick={toggleModal}>Змінити пароль</Button>
                {isOpen && (
                    <Modal
                    children={<UpdatePassForm isLoading={isPassLoading} handleSubmit={handlePassUpdate} />}
                    $isOpen={isOpen}
                    closeModal={toggleModal}
                    />
                )}
        </Container>
    )
};

export default ProfileContent;