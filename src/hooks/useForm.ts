import inputsValidation from 'helpers/inputsValidation';
// import validateInputs from 'helpers/validators';
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

    const validationResults: ValidationReturn = inputsValidation(name, value, state);

    setState(prevState => ({ ...prevState, [name]: value }));
    setInvalidFields(validationResults)
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    onSubmit(state);
  };

  const reset = () => setState(initialState);

  return { state, setState, handleChange, handleSubmit, invalidFields, reset };
};


// =============================== Стара версія валідації, хай повисить

    // const isValid = validateInputs(name, value);

    // if (!isValid.ok && value !== '') {
    //   if (!invalidFields.find(i => Object.keys(i)[0] === name)) {
    //     setInvalidFields(s => [...s, { [name]: isValid.message }]);
    //   }
    // } else {
    //   setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
    // }

    // if (name === 'newPassword' && isValid.ok) {
    //   if (value !== '' && value === state?.password) {
    //       setInvalidFields(s => [...s, { [name]: 'It must be different from the previous one' }]);
    //     } else {
    //       setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
    //     }
    // }
    
    // if (name === 'confirm') {
    //   if (state.newPassword) {
    //     if (value !== '' && value !== state?.newPassword) {
    //       setInvalidFields(s => [...s, { [name]: 'Passwords must match' }]);
    //     } else {
    //       setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
    //     }
    //   } else {
    //     if (value !== '' && value !== state?.password) {
    //       setInvalidFields(s => [...s, { [name]: 'Passwords must match' }]);
    //     } else {
    //       setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
    //     }
    //   }
    // }