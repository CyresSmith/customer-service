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
import { IoMdClose } from 'react-icons/io';
import { MdOutlineDone } from 'react-icons/md';

type Props = {
  name: string;
  value: string | undefined;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid?: string;
  disabledIcon: boolean;
  as?: string;
};

const CustomFormInput = ({
  name,
  type,
  value,
  handleChange,
  isValid,
  disabledIcon,
  as = 'input',
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
      case 'desc':
        return 'Опис';
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
          as={as}
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
        {!disabledIcon && value !== valueRef && value !== '' && (
          <DoneIcon
            $complate={isValid ? false : true}
            as={isValid ? IoMdClose : MdOutlineDone}
          />
        )}
      </FormInputBox>
      {isValid && <ValidationError>{isValid}</ValidationError>}
    </FormInputsListItem>
  );
};

export default CustomFormInput;
