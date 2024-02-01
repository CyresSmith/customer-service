import { useAuth } from "hooks";
import { Avatar, AvatarWrapper, Container, SectionTitle, SectionWrapper, Title } from "./ProfileContent.styled";
import UpdateDataForm from "./UpdateForm";
import { User } from "store/user/user.types";
import { useUpdateUserMutation } from "services/auth.api";
import { useActions } from "hooks";

const ProfileContent = () => {
    const { user } = useAuth();
    const { updateUser } = useActions();
    const [updateMutation] = useUpdateUserMutation();

    const handleSubmit = async (newData: Partial<User>): Promise<void> => {
        if (user) {
            const filtered = Object.fromEntries(Object.entries(newData).filter(([k, v]) => !Object.values(user).includes(v)));
            console.log(filtered)
            const result = await updateMutation({...filtered, id: user?.id});
            console.log(result);
        }
    };

    return (
        <Container>
            <Title>Редагування профілю</Title>
            <SectionWrapper>
                {/* <SectionTitle>Основні дані</SectionTitle> */}
                <AvatarWrapper>
                    {user?.avatar && <Avatar src={user?.avatar} />}
                </AvatarWrapper>
                {user && <UpdateDataForm userData={user} onSubmit={handleSubmit} />}
            </SectionWrapper>
            {/* <SectionWrapper>
                <SectionTitle>Змінити пароль</SectionTitle>
            </SectionWrapper> */}
        </Container>
    )
};

export default ProfileContent;