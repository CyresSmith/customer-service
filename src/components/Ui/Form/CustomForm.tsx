import { State } from 'hooks/useForm';
import { IconType } from 'react-icons';
import { useForm } from '../../../hooks';
import Button from '../Buttons/Button/Button';
import { ButtonBox, Form, FormInputsList } from './CustomForm.styled';
import CustomFormInput from './CustomFormInput';

type FormInput = {
  name: string;
  type: string;
  id?: string | number;
};

type Props = {
  SubmitButtonIcon?: IconType | undefined;
  buttonLabel: string;
  buttonWidth?: string;
  inputs: FormInput[];
  onSubmit: (state: State) => void;
  initialState: State;
  isLoading?: boolean;
};

const CustomForm = ({
  buttonWidth,
  isLoading,
  inputs,
  onSubmit,
  initialState,
  buttonLabel,
  SubmitButtonIcon,
}: Props) => {

  const { handleChange, handleSubmit, state, invalidFields } = useForm({
    initialState,
    onSubmit,
  });

  const errorMessage = (name: string): string | undefined => {
    const error = invalidFields.find(f => Object.keys(f)[0] === name);
    if (error) {
      return Object.values(error)[0];
    }
  };

  const disabledBtn: boolean =
    isLoading ||
    invalidFields?.length > 0 ||
      JSON.stringify(state) === JSON.stringify(initialState)
      ? true
      : false;

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
            isValid={errorMessage(name)}
          />
        ))}
      </FormInputsList>

      {
        buttonWidth ?
          <ButtonBox $buttonWidth={buttonWidth}>
            <Button
              isLoading={isLoading}
              disabled={disabledBtn}
              type="submit"
              children={buttonLabel}
              Icon={SubmitButtonIcon}
              $colors="light"
            />
          </ButtonBox> :
          <Button
            isLoading={isLoading}
            disabled={disabledBtn}
            type="submit"
            children={buttonLabel}
            Icon={SubmitButtonIcon}
            $colors="light"
          />
      }
    </Form>
  );
};

export default CustomForm;
