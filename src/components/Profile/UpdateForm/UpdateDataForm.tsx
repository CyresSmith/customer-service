import CustomForm from 'components/Ui/Form/CustomForm';
import { FormBox } from './UpdateDataForm.styled';
import { IoMdClose, IoMdSave } from 'react-icons/io';
import { User } from 'store/user/user.types';

type Props = {
  userData: User;
  onSubmit: (arg: User) => void;
  isLoading: boolean;
};

const updateInputs = [
  { name: 'firstName', type: 'text' },
  { name: 'lastName', type: 'text' },
  { name: 'phone', type: 'text' },
  { name: 'email', type: 'email' },
];

const UpdateDataForm = ({ userData, onSubmit, isLoading }: Props) => {
  return (
    <FormBox>
      <CustomForm
        inputs={updateInputs}
        initialState={userData}
        onSubmit={onSubmit}
        buttonLabel="Зберегти зміни"
        buttonWidth="fit-content"
        resetButtonLabel="Відмінити"
        SubmitButtonIcon={IoMdSave}
        ResetButtonIcon={IoMdClose}
        isLoading={isLoading}
      />
    </FormBox>
  );
};

export default UpdateDataForm;
