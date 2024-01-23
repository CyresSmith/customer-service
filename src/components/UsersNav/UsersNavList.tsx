import { useAppDispatch } from 'hooks';
import { AiOutlineUser } from 'react-icons/ai';
import { MdWorkOutline } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import usersOperations from 'store/users/usersOperations';
import {
  NavList,
  NavListItem,
  NavListItemLink,
  StyledIcon,
} from './UsersNav.styled';

type Props = {
  handleClose: () => void;
};

const UsersNavList = ({ handleClose }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(usersOperations.logout());
    navigate('/', { replace: true });
  };

  return (
    <NavList>
      <NavListItem onClick={handleClose}>
        <NavListItemLink to="/workspace">
          <StyledIcon as={MdWorkOutline} />
          Компанія
        </NavListItemLink>
      </NavListItem>
      <NavListItem onClick={handleClose}>
        <NavListItemLink to="#">
          <StyledIcon as={AiOutlineUser} />
          Профіль
        </NavListItemLink>
      </NavListItem>
      <NavListItem onClick={handleClose}>
        <NavListItemLink
          to={''}
          as="button"
          onClick={handleLogout}
          type="button"
        >
          <StyledIcon as={RiLogoutBoxRLine} />
          Вийти
        </NavListItemLink>
      </NavListItem>
    </NavList>
  );
};

export default UsersNavList;
