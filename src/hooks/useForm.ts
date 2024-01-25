import { ChangeEvent, FormEvent, useState } from 'react';

export type State = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  confirm?: string;
};

type Props = {
  initialState: State;
  onSubmit: (arg: State) => void;
};

export const useForm = ({ initialState, onSubmit }: Props) => {
  const [state, setState] = useState<State>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    onSubmit(state);
    setState(initialState);
  };

  return { state, setState, handleChange, handleSubmit };
};
