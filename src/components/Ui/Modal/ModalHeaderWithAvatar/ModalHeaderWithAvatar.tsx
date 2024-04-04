import { HiPhoto } from 'react-icons/hi2';
import {
    AvatarBox,
    ModalHeaderBox,
    SubTitle,
    Title,
    TitleBox,
} from './ModalHeaderWithAvatar.styled';

type Props = { avatar: string; title: string; subtitle?: string };

const ModalHeaderWithAvatar = ({ avatar, title, subtitle }: Props) => {
    return (
        <ModalHeaderBox>
            {
                <AvatarBox>
                    {avatar ? (
                        <img src={avatar} alt={`${title} image`} />
                    ) : title ? (
                        <span>{title.slice(0, 1)}</span>
                    ) : (
                        <HiPhoto />
                    )}
                </AvatarBox>
            }

            <TitleBox>
                <Title>{title}</Title>

                {subtitle && <SubTitle>{subtitle}</SubTitle>}
            </TitleBox>
        </ModalHeaderBox>
    );
};

export default ModalHeaderWithAvatar;
