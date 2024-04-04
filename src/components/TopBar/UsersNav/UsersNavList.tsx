import { useActions, useAuth } from 'hooks';
import { useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdWorkOutline } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogOutMutation } from 'services/auth.api';
import { NavList, NavListItemLink, StyledIcon } from './UsersNav.styled';

type Props = {
    handleClose: () => void;
};

const menuItems = [
    { to: 'workspace', Icon: MdWorkOutline, label: 'Компанія' },
    { to: '#', Icon: AiOutlineUser, label: 'Профіль' },
    { to: '', Icon: RiLogoutBoxRLine, label: 'Вийти' },
];

const UsersNavList = ({ handleClose }: Props) => {
    const navigate = useNavigate();
    const { logOut } = useActions();
    const { user } = useAuth();

    const [apiLogout, { isError, isLoading, isSuccess, error }] = useLogOutMutation();

    const handleLogout = (): void => {
        apiLogout({});
    };

    useEffect(() => {
        if (isLoading) {
            console.log('isLoading');
        }

        if (isSuccess) {
            logOut();
            toast.info(`До зустрічі, ${user?.firstName}!`);
            navigate('/', { replace: true });
        }

        if (isError) {
            console.log(error);
        }
    }, [error, isError, isLoading, isSuccess, logOut, navigate, user?.firstName]);

    return (
        <NavList>
            {menuItems.map(({ to, label, Icon }) => (
                <li key={label} onClick={label === 'Вийти' ? handleLogout : handleClose}>
                    <NavListItemLink to={to} as={label === 'Вийти' ? 'button' : NavLink}>
                        <StyledIcon as={Icon} />
                        {label}
                    </NavListItemLink>
                </li>
            ))}
        </NavList>
    );
};

export default UsersNavList;
