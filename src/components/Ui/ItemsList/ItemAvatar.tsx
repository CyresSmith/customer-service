import getAvatarLetters from 'helpers/getAvatarLetters';
import { HiPhoto } from 'react-icons/hi2';
import { AvatarBox } from './ItemsList.styled';

type Props = { avatar?: string; name?: string };

const ItemAvatar = ({ avatar, name }: Props) => {
    return (
        <AvatarBox>
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
