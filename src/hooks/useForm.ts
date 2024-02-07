import {inputsValidation} from 'helpers/inputsValidation';
import { ChangeEvent, FormEvent, useState } from 'react';

export type State = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  phone?: string;
  confirm?: string;
  avatar?: string;
  birthday?: string,
  sex?: string,
  discount?: string,
  card?: string,
  sourse?: string,
  coments?: string,
};

type Props = {
  initialState: State;
  onSubmit: (arg: State) => void;
};

export type ValidationReturn = { [key: string]: string }[];

export const useForm = ({ initialState, onSubmit }: Props) => {
  const [state, setState] = useState<State>(initialState);
  const [invalidFields, setInvalidFields] = useState<ValidationReturn>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    inputsValidation({name, value, state, invalidFields, setInvalidFields});

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    onSubmit(state);
  };

  const reset = () => setState(initialState);

  return { state, setState, handleChange, handleSubmit, invalidFields, reset };
};