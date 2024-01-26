import { ChangeEvent, FormEvent, useState } from 'react';
import validateInputs from 'helpers/validators';

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
  const [invalidFields, setInvalidFields] = useState<object[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    const isValid = validateInputs(name, value);

    if (!isValid.ok) {
      if (!invalidFields.find(i => Object.keys(i)[0] === name)) {
        setInvalidFields(s => [...s, {[name]: isValid.message}]);
      }
    } else {
      setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
    }

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    onSubmit(state);
    setState(initialState);
  };

  return { state, setState, handleChange, handleSubmit, invalidFields };
};
