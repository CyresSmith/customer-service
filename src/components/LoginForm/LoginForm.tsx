import CustomForm from 'components/Ui/Form/CustomForm';
import { useActions } from 'hooks';
import { State } from 'hooks/useForm';
import { useEffect } from 'react';
import { HiLogin } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const { logIn } = useActions();

  const [loginMutation, { isLoading, isSuccess, isError, error }] =
    useLogInMutation();

  const handleSubmit = async (state: State): Promise<void> => {
    const data = await loginMutation(state).unwrap();

    if (data) {
      logIn(data);
      toast.success(`Вітаю, ${data.user?.firstName}`);
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('isLoading');
    }

    if (isSuccess) {
      closeModal();
      navigate('/', { replace: true });
    }

    if (isError) {
      console.log('error: ', error);
      toast.error(`${error instanceof Array ? error[0] : error}`);
    }
  }, [closeModal, error, isError, isLoading, isSuccess, navigate]);

  return (
    <CustomForm
      SubmitButtonIcon={HiLogin}
      isLoading={isLoading}
      buttonLabel="Увійти"
      onSubmit={handleSubmit}
      initialState={initialLoginState}
      inputs={loginInputs}
    />
  );
};

export default LoginForm;
