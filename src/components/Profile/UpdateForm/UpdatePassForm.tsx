import CustomForm from "components/Ui/Form/CustomForm";
import { State } from "hooks/useForm";
import { FormBox } from "./UpdateDataForm.styled";

type Props = {
    userData: State;
};

const updateInputs = [
    { name: 'password', type: 'password' },
    { name: 'newPassword', type: 'password' },
    { name: 'confirm', type: 'password' },
];

const UpdatePassForm = ({ userData }: Props) => {
    const handleSubmit = () => {

    }

    return (
        <FormBox>
            <CustomForm
                inputs={updateInputs}
                initialState={userData}
                onSubmit={handleSubmit}
                buttonLabel="Зберегти зміни"
                buttonWidth="fit-content"
            />
        </FormBox>
    )
};

export default UpdatePassForm;