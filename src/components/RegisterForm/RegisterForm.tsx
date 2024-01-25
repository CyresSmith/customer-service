import CustomForm from 'components/Ui/Form/CustomForm';
import { State } from 'hooks/useForm';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRegisterMutation } from 'services/auth.api';

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

const initialRegState: State = {
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

  const handleSubmit = async (state: State): void => {
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
    <CustomForm
      buttonLabel="Реєстрація"
      onSubmit={handleSubmit}
      initialState={initialRegState}
      inputs={registerInputs}
    />
  );
};

export default RegisterForm;
