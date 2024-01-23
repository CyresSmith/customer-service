import Modal from 'components/Ui/Modal/Modal';
import CustomForm from 'components/Ui/Form/CustomForm';
import { useAppDispatch, useAppSelector } from 'hooks';
import { State } from 'hooks/useForm';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import usersOperations from 'store/users/usersOperations';
import TopBar from '../../TopBar';
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
const verifyingInputs = [{ name: 'code', type: 'text' }];

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

const initialVerifyState: Pick<State, 'code'> = {
  code: '',
};

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const status = useAppSelector(state => state.users.verify);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openModal = (name: string): void => {
    setIsOpen(name);
  };

  const closeModal = (): void => {
    setIsOpen(null);
  };

  const handleSubmit = (state: State): void => {
    if (isOpen === 'register') {
      dispatch(usersOperations.register(state));
      closeModal();
    } else if (isOpen === 'login') {
      dispatch(usersOperations.login(state));
      closeModal();
      navigate('/workspace', { replace: true });
    } else {
      dispatch(usersOperations.verify(state));
      closeModal();
      navigate('/workspace', { replace: true });
    }
  };

  useEffect(() => {
    if (status === false) {
      setIsOpen('verify');
    }
  }, [status]);

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
                isOpen === 'register'
                  ? initialRegState
                  : isOpen === 'login'
                  ? initialLoginState
                  : initialVerifyState
              }
              inputs={
                isOpen === 'register'
                  ? registerInputs
                  : isOpen === 'login'
                  ? loginInputs
                  : verifyingInputs
              }
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
