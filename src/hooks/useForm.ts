import validateInputs from 'helpers/validators';
import { ChangeEvent, FormEvent, useState } from 'react';

export type State = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  confirm?: string;
  avatar?: string;
  city?: string;
  address?: string;
  index?: string;
  desc?: string;
};

// type RegisterState = {
//   firstName?: string;
//   lastName?: string;
//   phone?: string;
//   email: string;
//   password: string;
//   confirm: string;
// };

// type LoginState = Pick<RegisterState, 'email' | 'password'>;

// type UpdateState = Omit<RegisterState, 'password' | 'confirm'>

// type InitialState = RegisterState | LoginState | UpdateState;

type Props = {
  initialState: State;
  onSubmit: (arg: State) => void;
};

export const useForm = ({ initialState, onSubmit }: Props) => {
  const [state, setState] = useState<State>(initialState);
  const [invalidFields, setInvalidFields] = useState<object[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    const isValid = validateInputs(name, value);

    if (!isValid.ok && value !== '') {
      if (!invalidFields.find(i => Object.keys(i)[0] === name)) {
        setInvalidFields(s => [...s, { [name]: isValid.message }]);
      }
    } else {
      setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
    }

    if (name === 'confirm') {
      if (value !== '' && value !== state?.password) {
        setInvalidFields(s => [...s, { [name]: 'Passwords must match' }]);
      } else {
        setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
      }
    }

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    onSubmit(state);
  };

  const reset = () => setState(initialState);

  return { state, setState, handleChange, handleSubmit, invalidFields, reset };
};
