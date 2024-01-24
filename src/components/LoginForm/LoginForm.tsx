import CustomForm from 'components/Ui/Form/CustomForm';
import { useActions } from 'hooks';
import { State } from 'hooks/useForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogInMutation } from 'services/auth.api';

type Props = {
  closeModal: () => void;
};

const loginInputs = [
  { name: 'email', type: 'email' },
  { name: 'password', type: 'password' },
];

const initialLoginState: Pick<State, 'email' | 'password'> = {
  email: '',
  password: '',
};

const LoginForm = ({ closeModal }: Props) => {
  const navigate = useNavigate();
  const { logIn: loginAction } = useActions();

  const [login, { isLoading, isSuccess, isError, error }] = useLogInMutation();

  const handleSubmit = async (state: State): Promise<void> => {
    const data = await login(state).unwrap();

    if (data) loginAction(data);
  };

  useEffect(() => {
    if (isLoading) {
      console.log('isLoading');
    }

    if (isSuccess) {
      closeModal();
      navigate('/workspace', { replace: true });
    }

    if (isError) {
      console.log(error);
    }
  }, [closeModal, error, isError, isLoading, isSuccess, navigate]);

  return (
    <CustomForm
      buttonLabel="Увійти"
      onSubmit={handleSubmit}
      initialState={initialLoginState}
      inputs={loginInputs}
    />
  );
};

export default LoginForm;
