import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import { AvatarSize } from 'components/Ui/ItemsList/ItemsList.styled';
import { ModalHeaderBox, SubTitle, Title, TitleBox } from './ModalHeaderWithAvatar.styled';

type Props = {
    avatar: string | undefined;
    title: string;
    subtitle?: string;
    avatarSize?: AvatarSize;
};

const ModalHeaderWithAvatar = ({ avatar, title, subtitle, avatarSize = AvatarSize.M }: Props) => {
    return (
        <ModalHeaderBox>
            <ItemAvatar avatar={avatar} name={title} size={avatarSize} />

            <TitleBox>
                <Title>{title}</Title>

                {subtitle && <SubTitle>{subtitle}</SubTitle>}
            </TitleBox>
        </ModalHeaderBox>
    );
};

export default ModalHeaderWithAvatar;
