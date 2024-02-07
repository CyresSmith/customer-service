import { State } from 'hooks/useForm';
import { IconType } from 'react-icons';

export type InputProps = {
  name: string;
  type: string;
  id?: string | number;
};

export type FormProps = {
  SubmitButtonIcon?: IconType;
  ResetButtonIcon?: IconType;
  buttonLabel: string;
  resetButtonLabel?: string;
  buttonWidth?: string;
  inputs: InputProps[];
  onSubmit: (state: State) => void;
  initialState: State;
  isLoading?: boolean;
  buttonsDirection?: string;
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
