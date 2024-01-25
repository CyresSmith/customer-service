import { State } from 'hooks/useForm';
import { useForm } from '../../../hooks';
import Button from '../Buttons/Button/Button';
import { Form, FormInputsList } from './CustomForm.styled';
import CustomFormInput from './CustomFormInput';

import { HiLogin } from 'react-icons/hi';

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
  isLoading?: boolean;
};

const CustomForm = ({
  isLoading,
  inputs,
  onSubmit,
  initialState,
  buttonLabel,
}: Props) => {
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
        isLoading={isLoading}
        disabled={isLoading}
        type="submit"
        children={buttonLabel}
        Icon={HiLogin}
      />
    </Form>
  );
};

export default CustomForm;
