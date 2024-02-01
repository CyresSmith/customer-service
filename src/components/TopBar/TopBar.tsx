import LoginForm from 'components/TopBar/LoginForm';
import RegisterForm from 'components/TopBar/RegisterForm';
import Modal from 'components/Ui/Modal/Modal';
import { useAuth } from 'hooks/useAuth';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthNav from './AuthNav';
import { Logo, TopBarWrapper } from './TopBar.styled';
import UsersNav from './UsersNav';

export type IsOpenType = 'register' | 'login' | null;

const TopBar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState<IsOpenType>(null);
  const { avatar, name, id } = useCompany();
  const { pathname } = useLocation();
  console.log('🚀 ~ TopBar ~ pathname:', pathname);
  const closeModal = () => setIsOpen(null);

  return (
    <>
      <TopBarWrapper>
        {!pathname.startsWith('') || !id ? (
          <Logo to="/">
            <span>Logo</span>
          </Logo>
        ) : (
          <Logo to={`/${id}`}>
            {avatar && <img src={avatar} alt={`company ${name} logo`} />}
            {name && <span>{name}</span>}
          </Logo>
        )}

        {isLoggedIn && <UsersNav />}
        {!isLoggedIn && <AuthNav setIsOpen={setIsOpen} />}
      </TopBarWrapper>

      {isOpen && (
        <Modal
          children={
            isOpen === 'register' ? (
              <RegisterForm closeModal={closeModal} />
            ) : (
              <LoginForm closeModal={closeModal} />
            )
          }
          $isOpen={isOpen !== null}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default TopBar;
