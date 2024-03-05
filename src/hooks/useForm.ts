import { SelectItem } from 'components/Ui/Form/types';
import { inputsValidation } from 'helpers/inputsValidation';
import { ChangeEvent, FormEvent, useState } from 'react';

type ReturnType<Type> = {
  state: Type;
  setState: React.Dispatch<React.SetStateAction<Type>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (selected: SelectItem, fieldName?: string) => void;
  handleSubmit: (event: FormEvent) => void;
  invalidFields: ValidationReturn;
  reset: () => void;
};

export type ValidationReturn = { [key: string]: string }[];

export function useForm<
  Type extends {
    [k: string]: string | number | boolean | SelectItem | SelectItem[] | null;
  }
>(initialState: Type, onSubmit: (state: Type) => void): ReturnType<Type> {
  const [state, setState] = useState<Type>(initialState);

  const [invalidFields, setInvalidFields] = useState<ValidationReturn>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = event.target;

    inputsValidation<Type>(name, value, state, invalidFields, setInvalidFields);

    setState(prevState => {
      let newState = { ...prevState };

      if (type === 'checkbox') {
        newState = { ...newState, [name]: !prevState[name] };
      } else if (name === 'discount') {
        newState = { ...newState, [name]: +value };
      } else if (name === 'durationHours') {
        newState = {
          ...newState,
          [name]: +value >= 23 ? 23 : +value <= 0 ? 0 : +value,
        };
      } else if (name === 'durationMinutes') {
        newState = {
          ...newState,
          [name]: +value >= 55 ? 55 : +value <= 0 ? 0 : +value,
        };
      } else if (name === 'breakDuration') {
        newState = {
          ...newState,
          [name]: +value >= 60 ? 60 : +value <= 0 ? 0 : +value,
        };
      } else {
        newState = { ...newState, [name]: value };
      }

      return newState;
    });
  };

  const handleSelect = (selected: SelectItem, fieldName?: string): void => {
    setState(p => {
      let newState = { ...p };

      if (fieldName) {
        const currentState = Array.isArray(newState[fieldName])
          ? (newState[fieldName] as SelectItem[])
          : (newState[fieldName] as SelectItem);

        if (Array.isArray(currentState)) {
          newState = {
            ...newState,
            [fieldName]:
              currentState.findIndex(
                item =>
                  item?.id === selected?.id || item.value === selected.value
              ) !== -1
                ? currentState.filter(
                    ({ id, value }) =>
                      id !== selected.id || value !== selected.value
                  )
                : [...currentState, selected],
          };
        } else {
          newState = {
            ...newState,
            [fieldName]: currentState?.id
              ? currentState?.id === selected?.id
                ? null
                : selected
              : currentState?.value === selected.value
              ? null
              : selected,
          };
        }
      }

      return newState;
    });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    onSubmit(state);
  };

  const reset = () => setState(initialState);

  return {
    state,
    setState,
    handleChange,
    handleSelect,
    handleSubmit,
    invalidFields,
    reset,
  };
}
