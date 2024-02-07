import { State } from 'hooks/useForm';
import { useForm } from '../../../hooks';
import { Form, FormInputsList } from './CustomForm.styled';
import CustomFormButtons from './CustomFormButtons';
import CustomFormInput from './CustomFormInput';
import { FormProps } from './types';

const CustomForm = ({
  buttonWidth,
  isLoading,
  inputs,
  onSubmit,
  initialState,
  buttonLabel,
  resetButtonLabel,
  SubmitButtonIcon,
  ResetButtonIcon,
  buttonsDirection,
}: FormProps) => {
  const { handleChange, handleSubmit, state, invalidFields, reset } = useForm({
    initialState,
    onSubmit,
  });

  const errorMessage = (name: string): string | undefined => {
    const error = invalidFields.find(f => Object.keys(f)[0] === name);
    if (error) {
      return Object.values(error)[0];
    }
  };

  const disabledReset: boolean =
    isLoading ||
    JSON.stringify(
      Object.fromEntries(Object.entries(state).filter(i => i[0] !== 'avatar'))
    ) ===
      JSON.stringify(
        Object.fromEntries(
          Object.entries(initialState).filter(i => i[0] !== 'avatar')
        )
      )
      ? true
      : false;

  const disabledSubmit: boolean =
    invalidFields?.length > 0 ||
    disabledReset ||
    Object.values(state).some(i => i === '')
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
            disabledIcon={disabledSubmit}
          />
        ))}
      </FormInputsList>

      <CustomFormButtons
        buttonWidth={buttonWidth}
        submitButtonLabel={buttonLabel}
        resetButtonLabel={resetButtonLabel}
        SubmitIcon={SubmitButtonIcon}
        ResetIcon={ResetButtonIcon}
        direction={buttonsDirection}
        isLoading={isLoading}
        disabledSubmit={disabledSubmit}
        disabledReset={disabledReset}
        onReset={reset}
      />

      {/* {
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
      } */}
    </Form>
  );
};

export default CustomForm;
