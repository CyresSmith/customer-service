import CustomForm from 'components/Ui/Form/CustomForm';
import { State } from 'hooks/useForm';
import { useEffect } from 'react';
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

  const handleSubmit = (state: State): void => {
    register(state);
  };

  useEffect(() => {
    if (isLoading) {
      console.log('isLoading');
    }

    if (isSuccess) {
      console.log('register successfully');
      closeModal();
    }

    if (isError) {
      console.log(error);
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
