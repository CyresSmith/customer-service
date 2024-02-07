import CustomForm from "components/Ui/Form/CustomForm";
import { State } from "hooks/useForm";
import { FormBox } from "./UpdateDataForm.styled";
import { IoMdSave  } from 'react-icons/io';

type Props = {
    handleSubmit: (arg: State) => void;
    isLoading: boolean;
};

const updateInputs = [
    { name: 'password', type: 'password' },
    { name: 'newPassword', type: 'password' },
    { name: 'confirm', type: 'password' },
];

const initialState: State = {
    password: '',
    newPassword: '',
    confirm: ''
}

const UpdatePassForm = ({ handleSubmit, isLoading }: Props) => {

    return (
        <FormBox>
            <CustomForm
                inputs={updateInputs}
                initialState={initialState}
                onSubmit={handleSubmit}
                buttonLabel="Оновити пароль"
                buttonWidth="fit-content"
                SubmitButtonIcon={IoMdSave}
                isLoading={isLoading}
            />
        </FormBox>
    )
};

export default UpdatePassForm;