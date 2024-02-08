import { ValidationReturn } from 'hooks/useForm';
import React from 'react';

type Result<T> = { ok: true; value: T } | { ok: false; message: string };
type Value = string;
type IndexType = { [prop: string]: RegExp };

const validators: IndexType = {
  phone: new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/
  ),
  password: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\W]{8,}$/),
  newPassword: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\W]{8,}$/),
  email: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
  lastName: new RegExp(/^[A-zА-Яа-яЁёЇїІіЄєҐґ']{3,30}$/),
  firstName: new RegExp(/^[A-zА-Яа-яЁёЇїІіЄєҐґ']{3,30}$/),
  index: new RegExp(/^\d{5}$/),
  desc: new RegExp(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ'.,!?;:(){}[\]\s]{30,1000}$/),
};

const validateInputs = (name: string, value: Value): Result<Value> => {
  if (!Object.keys(validators).includes(name)) {
    return { ok: true, value };
  } else {
    let message: string = '';

    switch (name) {
      case 'email':
        // message = 'Please enter a valid e-mail';
        message = 'Введіть валідний e-mail!';
        break;
      case 'password':
      case 'newPassword':
        // message = 'At least 8 characters, 1 number, 1 upper and 1 lowercase!'
        message = 'Мінімум 8 сиволів, 1 цифра, 1 велика та прописна літери!';
        break;
      case 'firstName':
      case 'lastName':
        // message = 'At least 3 characters needed';
        message = 'Від 3 до 30 символів';
        break;
      case 'phone':
        // message = 'Please enter a valid phone number';
        message = 'Введіть валідний номер телефону';
        break;

      case 'index':
        message = 'Введіть валідний індекс';
        break;

      case 'desc':
        message = 'Мінімум 30, максимум 1000 символів';
        break;
      default:
        break;
    }

    return validators[name as keyof IndexType].test(value)
      ? { ok: true, value }
      : { ok: false, message };
  }
};

// type Args = {
//   name: string;
//   value: string;
//   state: State;
//   invalidFields: ValidationReturn;
//   setInvalidFields: React.Dispatch<React.SetStateAction<ValidationReturn>>;
// };

export const inputsValidation = <T extends {[k: string]: unknown}>(
  name: string,
  value: string,
  state: T,
  invalidFields: ValidationReturn,
  setInvalidFields: React.Dispatch<React.SetStateAction<ValidationReturn>>
  ): void => {
  const isValid = validateInputs(name, value);

  if (!isValid.ok && value !== '') {
    if (!invalidFields.find(i => Object.keys(i)[0] === name)) {
      // invalidFields.push({ [name]: isValid.message });
      setInvalidFields(s => [...s, { [name]: isValid.message }]);
    }
  } else {
    setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
  }

  if (name === 'newPassword' && isValid.ok) {
    if (value !== '' && value === state?.password) {
      // invalidFields.push({ [name]: 'It must be different from the previous one' })
      setInvalidFields(s => [
        ...s,
        { [name]: 'Має відрізнятись від попереднього паролю' },
      ]);
    } else {
      setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
    }
  }

  if (name === 'confirm') {
    if (state.newPassword) {
      if (value !== '' && value !== state?.newPassword) {
        // invalidFields.push({ [name]: 'Passwords must match' })
        setInvalidFields(s => [...s, { [name]: 'Паролі повинні співпадати' }]);
      } else {
        setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
      }
    } else {
      if (value !== '' && value !== state?.password) {
        // invalidFields.push({ [name]: 'Passwords must match' })
        invalidFields.push({ [name]: 'Паролі повинні співпадати' });
        setInvalidFields(s => [...s, { [name]: 'Паролі повинні співпадати' }]);
      } else {
        setInvalidFields(s => s.filter(ss => Object.keys(ss)[0] !== name));
      }
    }
  }
};

export const getErrorMessage = (
  name: string,
  invalidFields: ValidationReturn
): string | undefined => {
  const error = invalidFields.find(f => Object.keys(f)[0] === name);
  if (error) {
    return Object.values(error)[0];
  }
};
