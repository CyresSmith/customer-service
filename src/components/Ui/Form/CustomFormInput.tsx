import { ChangeEvent, useState } from 'react';
import {
  FormInput,
  FormInputBox,
  FormInputLabel,
  FormInputsListItem,
  HideButton,
  HideIcon,
} from './CustomForm.styled';

import { HiEye, HiEyeOff } from 'react-icons/hi';

type Props = {
  name: string;
  value: string | number | undefined;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CustomFormInput = ({ name, type, value, handleChange }: Props) => {
  const translateName = (name: string): string | undefined => {
    switch (name) {
      case 'firstName':
        return "ім'я";
        break;
      case 'lastName':
        return 'прізвище';
        break;
      case 'phone':
        return 'номер телефону';
        break;
      case 'email':
        return 'email';
        break;
      case 'password':
        return 'пароль';
        break;
      case 'confirm':
        return 'підтвердіть пароль';
        break;
      case 'code':
        return 'код підтвердження';
        break;
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
          autoComplete="off"
        />

        {type === 'password' && (
          <HideButton type="button" onClick={() => setHidden(p => !p)}>
            <HideIcon as={hidden ? HiEyeOff : HiEye} hidden={hidden} />
          </HideButton>
        )}
      </FormInputBox>
    </FormInputsListItem>
  );
};

export default CustomFormInput;
