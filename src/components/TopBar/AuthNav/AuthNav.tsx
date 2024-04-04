import Button from 'components/Ui/Buttons/Button/Button';
import { Dispatch, SetStateAction } from 'react';
import { HiLogin, HiOutlineUserAdd } from 'react-icons/hi';
import { IsOpenType } from '../TopBar';
import { List, ListItem } from './AuthNav.styled';

type Props = {
    setIsOpen: Dispatch<SetStateAction<IsOpenType>>;
};

const AuthNav = ({ setIsOpen }: Props) => {
    return (
        <List>
            <ListItem>
                <Button
                    Icon={HiLogin}
                    onClick={() => setIsOpen('login')}
                    children="Вхід"
                    $colors="light"
                />
            </ListItem>
            <ListItem>
                <Button
                    Icon={HiOutlineUserAdd}
                    onClick={() => setIsOpen('register')}
                    children="Реєстрація"
                    $colors="light"
                />
            </ListItem>
        </List>
    );
};

export default AuthNav;
