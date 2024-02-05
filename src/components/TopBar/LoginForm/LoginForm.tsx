import CustomForm from 'components/Ui/Form/CustomForm';
import { useActions } from 'hooks';
import { State } from 'hooks/useForm';
import { useEffect } from 'react';
import { HiLogin } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogInMutation } from 'services/auth.api';
import { FormBox } from '../TopBar.styled';

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

  const [loginMutation, { isLoading, isSuccess }] =
    useLogInMutation();

  const handleSubmit = async (state: State): Promise<void> => {
    const data = await loginMutation(state).unwrap();

    if (data) {
      logIn(data);
      toast.success(`Вітаю, ${data.user?.firstName}`);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      navigate('/', { replace: true });
    }
  }, [closeModal, isSuccess, navigate]);

  return (
    <FormBox>
      <CustomForm
        SubmitButtonIcon={HiLogin}
        isLoading={isLoading}
        buttonLabel="Увійти"
        onSubmit={handleSubmit}
        initialState={initialLoginState}
        inputs={loginInputs}
      />
    </FormBox>
  );
};

export default LoginForm;
