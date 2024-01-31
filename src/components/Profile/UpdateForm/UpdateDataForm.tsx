import CustomForm from "components/Ui/Form/CustomForm";
import { State } from "hooks/useForm";
import { FormBox } from "./UpdateForm.styled";

type Props = {
    userData: State;
};

const updateInputs = [
  { name: 'firstName', type: 'text' },
  { name: 'lastName', type: 'text' },
  { name: 'phone', type: 'text' },
  { name: 'email', type: 'email' },
];

const UpdateDataForm = ({ userData }: Props) => {
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

export default UpdateDataForm;