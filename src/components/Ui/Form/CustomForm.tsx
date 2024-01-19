import {useForm} from '../../../hooks';
import { Form, FormInputsList } from "./CustomForm.styled";
import { State } from "hooks/useForm";
import CustomFormInput from "./CustomFormInput";
import Button from '../Buttons/Button/Button';

type FormInput = {
    name: string,
    type: string,
    id?: string | number,
};

type Props = {
    formType: string,
    inputs: FormInput[],
    onSubmit: (state: State) => void,
    initialState: State
}

const CustomForm = ({inputs, onSubmit, initialState, formType}: Props) => {
    const {handleChange, handleSubmit, state} = useForm({initialState, onSubmit});

    return (
        <Form onSubmit={handleSubmit}>
            <FormInputsList>
                {inputs.map(({name, type}, i) =>
                    <CustomFormInput
                        key={i}
                        type={type}
                        name={name}
                        value={state[name as keyof State]}
                        handleChange={handleChange}
                    />
                )}
            </FormInputsList>
            <Button $bgColor='button' $type='text' type='submit' children={formType === 'register' ? 'Зареєструватись' : 'Увійти'} />
        </Form>
    )
};

export default CustomForm;