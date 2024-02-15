import { IconType } from 'react-icons';

export type InputProps = {
  name: string;
  type: string;
  id?: string | number;
  isRequired?: boolean;
  isReadonly?: boolean;
};

export type FormProps<T> = {
  title?: string;
  SubmitButtonIcon?: IconType;
  ResetButtonIcon?: IconType;
  buttonLabel: string;
  resetButtonLabel?: string;
  buttonWidth?: string;
  inputs: InputProps[];
  onSubmit: (state: T) => void;
  initialState: T;
  isLoading?: boolean;
  buttonsDirection?: string;
  selectItems?: string[];
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

export type SelectProps<T> = {
  selectItems: T[];
  selectedItem: T;
  handleSelect: (item: T) => void;
}