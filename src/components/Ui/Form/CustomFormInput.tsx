import { ChangeEvent, useState } from 'react';
import {
  FormInput,
  FormInputBox,
  FormInputLabel,
  FormInputsListItem,
  HideButton,
  HideIcon,
  ValidationError,
} from './CustomForm.styled';

import { HiEye, HiEyeOff } from 'react-icons/hi';

type Props = {
  name: string;
  value: string | undefined;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid?: string;
};

const CustomFormInput = ({
  name,
  type,
  value,
  handleChange,
  isValid,
}: Props) => {
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

  const [hidden, setHidden] = useState(true);

  return (
    <FormInputsListItem>
      <FormInputLabel>{translateName(name)}</FormInputLabel>
      <FormInputBox>
        <FormInput
          type={type !== 'password' ? type : hidden ? type : 'text'}
          name={name}
          value={value}
          onChange={handleChange}
          // autoComplete="off"
          $invalid={isValid}
        />

        {type === 'password' && (
          <HideButton type="button" onClick={() => setHidden(p => !p)}>
            <HideIcon as={hidden ? HiEyeOff : HiEye} hidden={hidden} />
          </HideButton>
        )}
      </FormInputBox>
      {isValid && <ValidationError>{isValid}</ValidationError>}
    </FormInputsListItem>
  );
};

export default CustomFormInput;
