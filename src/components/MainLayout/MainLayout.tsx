import Modal from 'components/Modal/Modal';
import CustomForm from 'components/Ui/Form/CustomForm';
import { useActions } from 'hooks';
import { State } from 'hooks/useForm';
import { Suspense, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { Container, OutletWrapper } from './MainLayout.styled';

const registerInputs = [
  { name: 'firstName', type: 'text' },
  { name: 'lastName', type: 'text' },
  { name: 'phone', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'password', type: 'password' },
  { name: 'confirm', type: 'password' },
];

const loginInputs = registerInputs.filter(
  i => i.name !== 'confirm' && i.name !== 'firstName' && i.name !== 'lastName'
);

const initialRegState: State = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirm: '',
};

const initialLoginState: Pick<State, 'phone' | 'email' | 'password'> = {
  phone: '',
  email: '',
  password: '',
};

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, login } = useActions();

  const openModal = (name: string): void => {
    setIsOpen(name);
  };

  const closeModal = (): void => {
    setIsOpen(null);
  };

  const handleSubmit = (state: State): void => {
    if (isOpen === 'register') {
      register(state);
      closeModal();
    } else {
      login(state);
      closeModal();
      navigate('/workspace', { replace: true });
    }
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
            <CustomForm
              formType={isOpen}
              onSubmit={handleSubmit}
              initialState={
                isOpen === 'register' ? initialRegState : initialLoginState
              }
              inputs={isOpen === 'register' ? registerInputs : loginInputs}
            />
          }
          open={isOpen}
          closeModal={closeModal}
        />
      )}
    </Container>
  );
};

export default MainLayout;
