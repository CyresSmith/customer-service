import { getErrorMessage } from 'helpers/inputsValidation';
import { useForm } from '../../../hooks';
import {
  Form,
  FormInputsList,
  FormInputsListItem,
  FormTitle,
} from './CustomForm.styled';
import CustomFormButtons from './CustomFormButtons';
import CustomFormInput from './CustomFormInput';
import { FormProps, InputValueType } from './types';

const CustomForm = <T extends { [k: string]: InputValueType }>({
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
  title,
  selectItems,
}: FormProps<T>) => {
  const {
    handleChange,
    handleSelect,
    handleSubmit,
    state,
    invalidFields,
    reset,
  } = useForm<T>(initialState, onSubmit);

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
      {title && <FormTitle>{title}</FormTitle>}
      <FormInputsList>
        {inputs.map(
          ({ name, type, isRequired = false, isReadonly = false }, i) => (
            <FormInputsListItem key={i}>
              {
                <CustomFormInput
                  selectItems={selectItems}
                  type={type}
                  name={name}
                  value={state[name] as InputValueType}
                  handleChange={handleChange}
                  handleSelect={handleSelect}
                  isValid={getErrorMessage(name, invalidFields)}
                  disabledIcon={disabledReset}
                  isRequired={isRequired}
                  isReadonly={isReadonly}
                />
              }
            </FormInputsListItem>
          )
        )}
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
    </Form>
  );
};

export default CustomForm;
