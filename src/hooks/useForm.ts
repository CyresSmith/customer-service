import { inputsValidation } from 'helpers/inputsValidation';
import { ChangeEvent, FormEvent, useState } from 'react';

type ReturnType<Type> = {
    state: Type;
    setState: React.Dispatch<React.SetStateAction<Type>>;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent) => void;
    invalidFields: ValidationReturn;
    reset: () => void;
}

export type ValidationReturn = { [key: string]: string }[];

export function useForm<Type extends { [k: string]: unknown}> (initialState: Type, onSubmit: (state: Type) => void): ReturnType<Type> {
  const [state, setState] = useState<Type>(initialState);
  const [invalidFields, setInvalidFields] = useState<ValidationReturn>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    inputsValidation<Type>(name, value, state, invalidFields, setInvalidFields);

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    onSubmit(state);
  };

  const reset = () => setState(initialState);

  return { state, setState, handleChange, handleSubmit, invalidFields, reset };
}
