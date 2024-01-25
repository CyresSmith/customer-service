import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import Modal from 'components/Ui/Modal/Modal';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import AuthNav from './AuthNav';
import { Logo, TopBarWrapper } from './TopBar.styled';
import UsersNav from './UsersNav';

export type IsOpenType = 'register' | 'login' | null;

const TopBar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState<IsOpenType>(null);

  const closeModal = () => setIsOpen(null);

  return (
    <>
      <TopBarWrapper>
        <Logo to="/">LOGO</Logo>
        {isLoggedIn && <UsersNav />}
        {!isLoggedIn && <AuthNav setIsOpen={setIsOpen} />}
      </TopBarWrapper>

      {isOpen && (
        <Modal
          $w="20%"
          children={
            isOpen === 'register' ? (
              <RegisterForm closeModal={closeModal} />
            ) : (
              <LoginForm closeModal={closeModal} />
            )
          }
          open={isOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default TopBar;
