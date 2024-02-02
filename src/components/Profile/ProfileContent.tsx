import { useAuth } from "hooks";
import { Container, SectionWrapper, Title } from "./ProfileContent.styled";
import UpdateDataForm from "./UpdateForm";
import { User } from "store/user/user.types";
import { useUpdateUserMutation } from "services/auth.api";
import { useActions } from "hooks";
import { toast } from "react-toastify";
import Avatar from "./Avatar";

const ProfileContent = () => {
    const { user } = useAuth();
    const { updateUser } = useActions();
    const [updateMutation, {isLoading}] = useUpdateUserMutation();

    const handleSubmit = async (newData: Partial<User>): Promise<void> => {
        if (user) {
            const filtered = Object.fromEntries(Object.entries(newData).filter(([k, v]) => !Object.values(user).includes(v)));
            const data = await updateMutation({id: user?.id, data: filtered}).unwrap();
            
            if (data) {
                updateUser(data);
                toast.success(`Ваш профіль успішно оновлено`);
            }
        }
    };

    if (!user) {
        return
    }

    return (
        <Container>
            <Title>Редагування профілю</Title>
            <SectionWrapper>
                {/* <SectionTitle>Основні дані</SectionTitle> */}
                <Avatar id={user.id} avatar={user.avatar} />
                {user && <UpdateDataForm userData={user} onSubmit={handleSubmit} isLoading={isLoading} />}
            </SectionWrapper>
            {/* <SectionWrapper>
                <SectionTitle>Змінити пароль</SectionTitle>
            </SectionWrapper> */}
        </Container>
    )
};

export default ProfileContent;