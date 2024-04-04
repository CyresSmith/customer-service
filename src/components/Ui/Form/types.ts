import { ChangeEvent } from 'react';
import { IconType } from 'react-icons';

export type InputValueType = string | number | boolean | SelectItem | SelectItem[] | Date;

export type InputProps = {
    name: string;
    value: InputValueType;
    type: string;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSelect?: (selected: SelectItem, fieldName?: string) => void;
    handlePickDate?: (date: Date) => void;
    isValid?: string;
    disabledIcon?: boolean;
    isRequired?: boolean;
    isReadonly?: boolean;
    label?: boolean;
    placeholder?: string;
    selectItems?: SelectItem[];
    selected?: SelectItem;
    disabled?: boolean;
};

export type FormProps<T> = {
    title?: string;
    SubmitButtonIcon?: IconType;
    ResetButtonIcon?: IconType;
    buttonLabel: string;
    resetButtonLabel?: string;
    buttonWidth?: string;
    inputs: Partial<InputProps>[];
    onSubmit: (state: T) => void;
    initialState: T;
    isLoading?: boolean;
    buttonsDirection?: string;
    selectItems?: SelectItem[];
};

export type ButtonsProps = {
    submitButtonLabel: string;
    resetButtonLabel?: string;
    direction?: string;
    buttonWidth?: string;
    onReset: () => void;
    SubmitIcon?: IconType;
    ResetIcon?: IconType;
    isLoading?: boolean;
    disabledSubmit: boolean;
    disabledReset: boolean;
};

export type SelectItem = {
    id?: string | number;
    value: string;
    count?: number;
};

export type SelectHandler = (item: SelectItem, fieldName?: string) => void;

export type SelectProps = {
    width?: string;
    selectItems: SelectItem[];
    selectedItem: SelectItem | SelectItem[];
    handleSelect: SelectHandler;
    closeOnSelect?: boolean;
    fieldName?: string;
    disabled?: boolean;
    isReadonly?: boolean;
};
