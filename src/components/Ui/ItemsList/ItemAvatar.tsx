import getAvatarLetters from 'helpers/getAvatarLetters';
import { HiPhoto } from 'react-icons/hi2';
import { AvatarBox, AvatarSize } from './ItemsList.styled';

type Props = { avatar?: string; name?: string; size?: AvatarSize };

const ItemAvatar = ({ avatar, name, size = AvatarSize.M }: Props) => {
    return (
        <AvatarBox size={size}>
            {avatar ? (
                <img src={String(avatar)} alt={`${name} image`} />
            ) : name ? (
                <span>{getAvatarLetters(name)}</span>
            ) : (
                <HiPhoto />
            )}
        </AvatarBox>
    );
};

export default ItemAvatar;
