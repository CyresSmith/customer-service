import Button from 'components/Ui/Buttons/Button/Button';
import Dropdown from 'components/Ui/Dropdown';
import Menu from 'components/Ui/Menu';
import { MenuItem } from 'components/Ui/Menu/Item/Item';
import { useActions } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { HiDotsVertical, HiLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogOutMutation } from 'services/auth.api';
import {
  NavWrapper,
  UsersAvatar,
  UsersAvatarWrapper,
  UsersEmail,
  UsersNoAvatar,
  UsersOptions,
} from './UsersNav.styled';

const menuItems: MenuItem[] = [
  {
    id: 2,
    label: 'Профіль',
    to: '/',
  },
];

const UsersNav = () => {
  const { user, companies } = useAuth();
  const { logOut } = useActions();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [apiLogout, { isError, isLoading, isSuccess, error }] =
    useLogOutMutation();

  const handleLogout = (): void => {
    apiLogout({});
  };

  useEffect(() => {
    if (!companies.length) return;

    menuItems.push({
      id: 'companies',
      label: 'Компанії',
      to: '',
      children: companies.map(({ id, name }) => ({
        id,
        label: name,
        to: `/company/${id}`,
      })),
    });
  }, [companies]);

  useEffect(() => {
    if (isLoading) {
      console.log('isLoading');
    }

    if (isSuccess) {
      logOut();
      setDropOpen(false);
      toast.info(`До зустрічі, ${user?.firstName}!`);
      navigate('/', { replace: true });
    }

    if (isError) {
      console.log(error);
    }
  }, [error, isError, isLoading, isSuccess, logOut, navigate, user?.firstName]);

  return (
    <NavWrapper>
      <UsersOptions>
        <UsersAvatarWrapper>
          {user?.avatar ? (
            <UsersAvatar src={user?.avatar} />
          ) : (
            <UsersNoAvatar>{user?.firstName?.split('')[0]}</UsersNoAvatar>
          )}
        </UsersAvatarWrapper>

        <UsersEmail>{user?.email}</UsersEmail>

        <Button
          onClick={() => setDropOpen(true)}
          Icon={HiDotsVertical}
          $round
          $variant="text"
          $colors="accent"
        />

        {dropOpen && (
          <Dropdown $isOpen={dropOpen} closeDropdown={() => setDropOpen(false)}>
            <>
              <Menu items={menuItems} />

              <Button
                isLoading={isLoading}
                disabled={isLoading}
                onClick={handleLogout}
                Icon={HiLogout}
                $colors="light"
                size="s"
              >
                Вихід
              </Button>
            </>
          </Dropdown>
        )}
      </UsersOptions>
    </NavWrapper>
  );
};

export default UsersNav;
