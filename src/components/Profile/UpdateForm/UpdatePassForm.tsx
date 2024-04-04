import CustomForm from 'components/Ui/Form/CustomForm';
import { FormBox } from './UpdateDataForm.styled';
import { IoMdSave } from 'react-icons/io';

type UpdtPass = {
    password: string;
    newPassword: string;
    confirm: string;
};

type Props = {
    handleSubmit: (arg: UpdtPass) => void;
    isLoading: boolean;
};

const updateInputs = [
    { name: 'password', type: 'password' },
    { name: 'newPassword', type: 'password' },
    { name: 'confirm', type: 'password' },
];

const initialState: UpdtPass = {
    password: '',
    newPassword: '',
    confirm: '',
};

const UpdatePassForm = ({ handleSubmit, isLoading }: Props) => {
    return (
        <FormBox>
            <CustomForm<UpdtPass>
                title="Зміна паролю"
                inputs={updateInputs}
                initialState={initialState}
                onSubmit={handleSubmit}
                buttonLabel="Оновити пароль"
                buttonWidth="fit-content"
                SubmitButtonIcon={IoMdSave}
                isLoading={isLoading}
            />
        </FormBox>
    );
};

export default UpdatePassForm;
