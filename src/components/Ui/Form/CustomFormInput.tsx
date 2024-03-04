import { translateLabels } from 'helpers/translateLabels';
import { useRef, useState } from 'react';
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
import Checkbox from './Checkbox';
import CustomFormSelect from './CustomFormSelect';
import { InputProps, SelectItem } from './types';

const CustomFormInput = ({
  name,
  type,
  value,
  handleChange,
  handleSelect,
  isValid,
  disabledIcon,
  isRequired,
  isReadonly = false,
  label = true,
  placeholder = '',
  selectItems,
}: InputProps) => {
  const [hidden, setHidden] = useState(true);
  const valueRef = useRef(value).current;

  return (
    <FormInputsListItem $type={type}>
      {label && (
        <FormInputLabel>
          {translateLabels(name)}
          {isRequired && <Required>{' (!)'}</Required>}
        </FormInputLabel>
      )}
      <FormInputBox>
        {type === 'checkbox' && typeof value === 'boolean' ? (
          <Checkbox
            name={name}
            isRequired={isRequired}
            isChecked={value}
            handleCheck={handleChange}
          />
        ) : type === 'select' && selectItems ? (
          <CustomFormSelect
            width="100%"
            handleSelect={handleSelect}
            selectItems={selectItems}
            fieldName={name}
            selectedItem={
              Array.isArray(value)
                ? (value as SelectItem[])
                : (value as SelectItem)
            }
          />
        ) : (
          <FormInput
            type={type !== 'password' ? type : hidden ? type : 'text'}
            name={name}
            value={value as string}
            as={type === 'textarea' ? 'textarea' : 'input'}
            onChange={handleChange}
            readOnly={isReadonly}
            placeholder={placeholder}
            // autoComplete='off'
          />
        )}
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
