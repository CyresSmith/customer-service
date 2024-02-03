import { ChangeEvent, useRef, useState } from 'react';
import {
  DoneIcon,
  FormInput,
  FormInputBox,
  FormInputLabel,
  FormInputsListItem,
  HideButton,
  HideIcon,
  ValidationError,
} from './CustomForm.styled';

import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdOutlineDone } from "react-icons/md";
import { IoMdClose } from 'react-icons/io';

type Props = {
  name: string;
  value: string | undefined;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid?: string;
  disabledIcon: boolean;
};

const CustomFormInput = ({
  name,
  type,
  value,
  handleChange,
  isValid,
  disabledIcon
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
      case 'name':
        return 'Назва';
      case 'city':
        return 'Місто';
      case 'address':
        return 'Адреса';
      case 'index':
        return 'Індекс';
      default:
        break;
    }
  };

  const [hidden, setHidden] = useState(true);
  const valueRef = useRef(value).current;

  return (
    <FormInputsListItem>
      <FormInputLabel>{translateName(name)}</FormInputLabel>
      <FormInputBox>
        <FormInput
          type={type !== 'password' ? type : hidden ? type : 'text'}
          name={name}
          value={value}
          onChange={handleChange}
        />

        {type === 'password' && (
          <HideButton type="button" onClick={() => setHidden(p => !p)}>
            <HideIcon as={hidden ? HiEyeOff : HiEye} hidden={hidden} />
          </HideButton>
        )}
        { !disabledIcon && value !== valueRef && value !== '' && <DoneIcon $complate={isValid ? false : true} as={isValid ? IoMdClose : MdOutlineDone } />}
      </FormInputBox>
      {isValid && <ValidationError>{isValid}</ValidationError>}
    </FormInputsListItem>
  );
};

export default CustomFormInput;
