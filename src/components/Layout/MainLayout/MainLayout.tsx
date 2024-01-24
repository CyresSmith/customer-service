import Modal from 'components/Ui/Modal/Modal';

import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../TopBar';
import { Container, OutletWrapper } from './MainLayout.styled';

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const openModal = (name: string): void => {
    setIsOpen(name);
  };

  const closeModal = (): void => {
    setIsOpen(null);
  };

  return (
    <Container>
      <TopBar openModal={openModal} />
      <OutletWrapper>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </OutletWrapper>
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
    </Container>
  );
};

export default MainLayout;
