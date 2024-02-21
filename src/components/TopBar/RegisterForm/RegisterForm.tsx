import CustomForm from 'components/Ui/Form/CustomForm';
import { useEffect } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useRegisterMutation } from 'services/auth.api';
import { FormBox } from '../TopBar.styled';
import { UserRegister } from 'store/user/user.types';

type Props = {
  closeModal: () => void;
};

const registerInputs = [
  { name: 'firstName', type: 'text' },
  { name: 'lastName', type: 'text' },
  { name: 'phone', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'password', type: 'password' },
  { name: 'confirm', type: 'password' },
];

const initialRegState: UserRegister = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirm: '',
};

const RegisterForm = ({ closeModal }: Props) => {
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const handleSubmit = async (state: UserRegister): Promise<void> => {
    const data = await register(state).unwrap();

    if (data && data.user?.firstName) {
      toast.success(
        `Раді знайомству, ${data.user?.firstName}! Будь ласка підтвердіть реєстрацію на вказаній  е-пошті!`
      );
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('isLoading');
    }

    if (isSuccess) {
      closeModal();
    }

    if (isError) {
      console.log('error: ', error);
      toast.error(`${error instanceof Array ? error[0] : error}`);
    }
  }, [closeModal, error, isError, isLoading, isSuccess]);

  return (
    <FormBox>
      <CustomForm<UserRegister>
        SubmitButtonIcon={HiOutlineUserAdd}
        isLoading={isLoading}
        buttonLabel="Реєстрація"
        onSubmit={handleSubmit}
        initialState={initialRegState}
        inputs={registerInputs}
        title='Реєстрація'
      />
    </FormBox>
  );
};

export default RegisterForm;
