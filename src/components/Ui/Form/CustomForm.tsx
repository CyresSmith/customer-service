import {useForm} from '../../../hooks';
import { Form } from "./CustomForm.styled";
import { State } from "hooks/useForm";
import CustomFormInput from "./CustomFormInput";

type FormInput = {
    name: string,
    type: string,
    id?: string | number,
};

type Props = {
    inputs: FormInput[],
    onSubmit: () => void,
    initialState: State
}

const CustomForm = ({inputs, onSubmit, initialState}: Props) => {
    const {handleChange, state} = useForm({initialState, onSubmit});

    return (
        <Form>
            {inputs.map(({name, type}, i) =>
                <CustomFormInput
                    key={i}
                    type={type}
                    name={name}
                    value={state[name as keyof State]}
                    handleChange={handleChange}
                />)}
        </Form>
    )
};

export default CustomForm;