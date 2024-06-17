import Button from 'components/Ui/Buttons/Button/Button';
import { Dispatch, SetStateAction } from 'react';
import { HiLogin, HiOutlineUserAdd } from 'react-icons/hi';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import { IsOpenType } from '../TopBar';
import { List, ListItem } from './AuthNav.styled';

type Props = {
    setIsOpen: Dispatch<SetStateAction<IsOpenType>>;
};

const AuthNav = ({ setIsOpen }: Props) => {
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);

    return (
        <List>
            <ListItem>
                <Button
                    Icon={HiLogin}
                    onClick={() => setIsOpen('login')}
                    children={isMobile ? undefined : 'Вхід'}
                    $colors="light"
                />
            </ListItem>
            <ListItem>
                <Button
                    Icon={HiOutlineUserAdd}
                    onClick={() => setIsOpen('register')}
                    children={isMobile ? undefined : 'Реєстрація'}
                    $colors="light"
                />
            </ListItem>
        </List>
    );
};

export default AuthNav;
