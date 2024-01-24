import { State } from 'hooks/useForm';
import { useForm } from '../../../hooks';
import Button from '../Buttons/Button/Button';
import { Form, FormInputsList } from './CustomForm.styled';
import CustomFormInput from './CustomFormInput';

type FormInput = {
  name: string;
  type: string;
  id?: string | number;
};

type Props = {
  buttonLabel: string;
  inputs: FormInput[];
  onSubmit: (state: State) => void;
  initialState: State;
};

const CustomForm = ({ inputs, onSubmit, initialState, buttonLabel }: Props) => {
  const { handleChange, handleSubmit, state } = useForm({
    initialState,
    onSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormInputsList>
        {inputs.map(({ name, type }, i) => (
          <CustomFormInput
            key={i}
            type={type}
            name={name}
            value={state[name as keyof State]}
            handleChange={handleChange}
          />
        ))}
      </FormInputsList>

      <Button
        $bgColor="button"
        $type="text"
        type="submit"
        children={buttonLabel}
      />
    </Form>
  );
};

export default CustomForm;
