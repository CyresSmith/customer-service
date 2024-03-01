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
import CustomFormSelect from './CustomFormSelect';
import { SelectItem } from './types';

type Props = {
  name: string;
  value: string | number | undefined;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelect?: (item: SelectItem) => void;
  isValid?: string;
  disabledIcon?: boolean;
  isRequired?: boolean;
  isReadonly?: boolean;
  label?: boolean;
  placeholder?: string;
  selectItems?: SelectItem[];
  selected?: SelectItem;
};

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
  selected
}: Props) => {
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
        {type === 'select' && selectItems && handleSelect && selected ? (
          <CustomFormSelect
            width='100%'
            handleSelect={handleSelect}
            selectItems={selectItems}
            selectedItem={selected}
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
