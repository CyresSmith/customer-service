import { translateLabels } from 'helpers/translateLabels';
import { ChangeEvent, useRef, useState } from 'react';
import {
  DoneIcon,
  FormInput,
  FormInputBox,
  FormInputLabel,
  FormInputsListItem,
  HideButton,
  HideIcon,
  Required,
  ValidationError,
} from './CustomForm.styled';

import { HiEye, HiEyeOff } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineDone } from 'react-icons/md';

type Props = {
  name: string;
  value: string | number | undefined;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid?: string;
  disabledIcon?: boolean;
  isRequired?: boolean;
};

const CustomFormInput = ({
  name,
  type,
  value,
  handleChange,
  isValid,
  disabledIcon,
  isRequired,
}: Props) => {
  const [hidden, setHidden] = useState(true);
  const valueRef = useRef(value).current;

  return (
    <FormInputsListItem>
      <FormInputLabel>
        {translateLabels(name)}
        {isRequired && <Required>{' (!)'}</Required>}
      </FormInputLabel>
      <FormInputBox>
        <FormInput
          type={type !== 'password' ? type : hidden ? type : 'text'}
          name={name}
          value={value}
          as={type === 'textarea' ? 'textarea' : 'input'}
          onChange={handleChange}
        />

        {type === 'password' && (
          <HideButton type="button" onClick={() => setHidden(p => !p)}>
            <HideIcon as={hidden ? HiEyeOff : HiEye} hidden={hidden} />
          </HideButton>
        )}
        {!disabledIcon && value !== valueRef && value !== '' && (
          <DoneIcon
            $complete={isValid ? false : true}
            as={isValid ? IoMdClose : MdOutlineDone}
          />
        )}
      </FormInputBox>
      {isValid && <ValidationError>{isValid}</ValidationError>}
    </FormInputsListItem>
  );
};

export default CustomFormInput;
