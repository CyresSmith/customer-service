import { useAppDispatch } from 'hooks';
import { AiOutlineUser } from 'react-icons/ai';
import { MdWorkOutline } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import usersOperations from 'store/users/usersOperations';
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
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(usersOperations.logout());
    navigate('/', { replace: true });
  };

  return (
    <NavList>
      {menuItems.map(({ to, label, Icon }) => (
        <li
          key={label}
          onClick={label === 'Вийти' ? handleLogout : handleClose}
        >
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
