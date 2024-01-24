import Button from 'components/Ui/Buttons/Button/Button';
import Dropdown from 'components/Ui/Dropdown';
import { useAppSelector } from 'hooks';
import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import {
  NavWrapper,
  UsersAvatar,
  UsersAvatarWrapper,
  UsersEmail,
  UsersNoAvatar,
  UsersOptions,
} from './UsersNav.styled';
import UsersNavList from './UsersNavList';

const UsersNav = () => {
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const user = useAppSelector(state => state.users.user);

  const openDropdown = (): void => {
    setDropOpen(true);
  };

  const closeDropdown = (): void => {
    setDropOpen(false);
  };

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
          name="dropdown"
          handleClick={openDropdown}
          Icon={HiDotsVertical}
          type="button"
        />
        {dropOpen && (
          <Dropdown
            children={<UsersNavList handleClose={closeDropdown} />}
            $isOpen={dropOpen}
            closeDropdown={closeDropdown}
          />
        )}
      </UsersOptions>
    </NavWrapper>
  );
};

export default UsersNav;
