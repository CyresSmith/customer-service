import CustomForm from 'components/Ui/Form/CustomForm';
import { useActions } from 'hooks';
import { useEffect } from 'react';
import { HiLogin } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogInMutation } from 'services/auth.api';
import { FormBox } from '../TopBar.styled';
import { UserLogin } from 'store/user/user.types';
import { InputProps } from 'components/Ui/Form/types';

type Props = {
    closeModal: () => void;
};

const loginInputs: Partial<InputProps>[] = [
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
];

const initialLoginState: UserLogin = {
    email: '',
    password: '',
};

const LoginForm = ({ closeModal }: Props) => {
    const navigate = useNavigate();
    const { logIn } = useActions();

    const [loginMutation, { isLoading, isSuccess }] = useLogInMutation();

    const handleSubmit = async (state: UserLogin): Promise<void> => {
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
            <CustomForm<UserLogin>
                SubmitButtonIcon={HiLogin}
                isLoading={isLoading}
                buttonLabel="Увійти"
                onSubmit={handleSubmit}
                initialState={initialLoginState}
                inputs={loginInputs}
                // title='Авторизація'
            />
        </FormBox>
    );
};

export default LoginForm;
