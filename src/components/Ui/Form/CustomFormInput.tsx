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
import DatePicker from '../DatePicker';

const CustomFormInput = ({
    name,
    type,
    value,
    handleChange,
    handleSelect,
    handlePickDate,
    isValid,
    disabledIcon,
    isRequired = false,
    isReadonly = false,
    label = true,
    placeholder = '',
    selectItems,
    disabled = false,
}: InputProps) => {
    const [hidden, setHidden] = useState(true);
    const valueRef = useRef(value).current;

    return (
        <FormInputsListItem $type={type}>
            {type !== 'checkbox' && label && (
                <FormInputLabel>
                    {translateLabels(name)}
                    {isRequired && <Required>{' (!)'}</Required>}
                </FormInputLabel>
            )}
            <FormInputBox>
                {type === 'checkbox' && typeof value === 'boolean' && handleChange ? (
                    <Checkbox
                        disabled={disabled}
                        name={name}
                        isRequired={isRequired}
                        isChecked={value}
                        handleCheck={handleChange}
                        isReadonly={isReadonly}
                    />
                ) : type === 'select' && selectItems && handleSelect ? (
                    <CustomFormSelect
                        disabled={disabled}
                        width="100%"
                        handleSelect={handleSelect}
                        selectItems={selectItems}
                        fieldName={name}
                        isReadonly={isReadonly}
                        selectedItem={
                            Array.isArray(value) ? (value as SelectItem[]) : (value as SelectItem)
                        }
                    />
                ) : name === 'birthday' && handlePickDate ? (
                    <DatePicker
                        prewDate={value as Date}
                        calendarCellSize={25}
                        bgColor="dark"
                        handleDateConfirm={handlePickDate}
                    />
                ) : (
                    <FormInput
                        disabled={disabled}
                        type={type !== 'password' ? type : hidden ? type : 'text'}
                        name={name}
                        value={typeof value === 'string' ? (value as string) : (value as number)}
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
