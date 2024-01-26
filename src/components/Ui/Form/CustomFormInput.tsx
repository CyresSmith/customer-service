import { ChangeEvent } from 'react';
import {
  FormInput,
  FormInputLabel,
  FormInputsListItem,
  ValidationError,
} from './CustomForm.styled';

type Props = {
  name: string;
  value: string | undefined;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid?: string;
};

const CustomFormInput = ({ name, type, value, handleChange, isValid }: Props) => {
  const translateName = (name: string): string | undefined => {
    switch (name) {
      case 'firstName':
        return "ім'я";
      case 'lastName':
        return 'прізвище';
      case 'phone':
        return 'номер телефону';
      case 'email':
        return 'email';
      case 'password':
        return 'пароль';
      case 'confirm':
        return 'підтвердіть пароль';
      case 'code':
        return 'код підтвердження';
      default:
        break;
    }
  };

  return (
    <FormInputsListItem>
      <FormInputLabel>{translateName(name)}</FormInputLabel>
      <FormInput
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      {isValid && <ValidationError>{isValid}</ValidationError>}
    </FormInputsListItem>
  );
};

export default CustomFormInput;
