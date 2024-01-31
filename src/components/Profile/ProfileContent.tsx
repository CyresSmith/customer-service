import { useAuth } from "hooks";
import { Avatar, AvatarWrapper, Container, SectionTitle, SectionWrapper, Title } from "./ProfileContent.styled";
import UpdateDataForm from "./UpdateForm";

const ProfileContent = () => {
    const { user } = useAuth();

    return (
        <Container>
            <Title>Редагування профілю</Title>
            <SectionWrapper>
                {/* <SectionTitle>Основні дані</SectionTitle> */}
                <AvatarWrapper>
                    {user?.avatar && <Avatar src={user?.avatar} />}
                </AvatarWrapper>
                {user && <UpdateDataForm userData={user} />}
            </SectionWrapper>
            {/* <SectionWrapper>
                <SectionTitle>Змінити пароль</SectionTitle>
            </SectionWrapper> */}
        </Container>
    )
};

export default ProfileContent;