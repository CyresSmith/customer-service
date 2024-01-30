import Button from 'components/Ui/Buttons/Button/Button';
import Dropdown from 'components/Ui/Dropdown';
import Menu from 'components/Ui/Menu';
import { MenuItem } from 'components/Ui/Menu/Item/Item';
import Modal from 'components/Ui/Modal/Modal';
import { useActions } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { HiLogout, HiMenu } from 'react-icons/hi';
import { IoMdAddCircle } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogOutMutation } from 'services/auth.api';
import CreateCompanyForm from './CreateCompanyForm';
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
    to: '/my-profile',
  },
];

const UsersNav = () => {
  const { user, companies } = useAuth();
  const { logOut } = useActions();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [apiLogout, { isError, isLoading, isSuccess, error }] =
    useLogOutMutation();

  const setMenuItems = () => {
    return companies.length > 0
      ? [
          ...menuItems,
          {
            id: 'companies',
            label: 'Компанії',
            to: '',
            children: companies.map(({ id, name }) => ({
              id,
              label: name,
              to: `/company/${id}`,
            })),
          },
        ]
      : menuItems;
  };

  const handleLogout = (): void => {
    apiLogout({});
  };

  useEffect(() => {
    if (isLoading) {
      console.log('isLoading');
    }

    if (isSuccess) {
      console.log('isSuccess');
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
        {pathname === '/' && (
          <Button
            onClick={() => setModalOpen(true)}
            Icon={IoMdAddCircle}
            $colors="light"
            children="Нова компанія"
          />
        )}

        <UsersAvatarWrapper>
          {user?.avatar ? (
            <UsersAvatar src={user?.avatar} />
          ) : (
            <UsersNoAvatar>{user?.firstName?.split('')[0]}</UsersNoAvatar>
          )}
        </UsersAvatarWrapper>

        <UsersEmail>
          {user?.firstName ? user?.firstName : user?.email}
        </UsersEmail>

        <Button
          onClick={() => setDropOpen(true)}
          Icon={HiMenu}
          $variant="text"
          $colors="accent"
          $round
        />

        {dropOpen && (
          <Dropdown $isOpen={dropOpen} closeDropdown={() => setDropOpen(false)}>
            <>
              <Menu
                items={setMenuItems()}
                onItemClick={() => setDropOpen(false)}
              />

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

      {modalOpen && (
        <Modal $isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
          <CreateCompanyForm closeModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </NavWrapper>
  );
};

export default UsersNav;
