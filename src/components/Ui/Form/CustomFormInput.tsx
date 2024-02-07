import { ChangeEvent, useRef, useState } from 'react';
import {
  DoneIcon,
  FormInput,
  FormInputBox,
  FormInputLabel,
  FormInputsListItem,
  HideButton,
  HideIcon,
  Requiried,
  ValidationError,
} from './CustomForm.styled';
import { translateLabels } from 'helpers/translateLabels';

import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdOutlineDone } from "react-icons/md";
import { IoMdClose } from 'react-icons/io';

type Props = {
  name: string;
  value: string | undefined;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid?: string;
  disabledIcon?: boolean;
  isRequiried?: boolean;
};

const CustomFormInput = ({
  name,
  type,
  value,
  handleChange,
  isValid,
  disabledIcon,
  isRequiried
}: Props) => {
  const [hidden, setHidden] = useState(true);
  const valueRef = useRef(value).current;

  return (
    <FormInputsListItem>
      <FormInputLabel>{translateLabels(name)}{ isRequiried && <Requiried>{" (!)"}</Requiried> }</FormInputLabel>
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
        { !disabledIcon && value !== valueRef && value !== '' && <DoneIcon $complate={isValid ? false : true} as={isValid ? IoMdClose : MdOutlineDone } />}
      </FormInputBox>
      {isValid && <ValidationError>{isValid}</ValidationError>}
    </FormInputsListItem>
  );
};

export default CustomFormInput;
