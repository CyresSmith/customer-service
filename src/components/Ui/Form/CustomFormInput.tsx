import { FormInput, FormInputLabel, FormInputsListItem } from "./CustomForm.styled";
import { ChangeEvent } from "react";

type Props = {
    name: string,
    value: string | number | undefined,
    type: string,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
};

const CustomFormInput = ({name, type, value, handleChange}: Props) => {
    const translateName = (name: string): string | undefined => {
        switch (name) {
            case 'firstName':
                return 'ім"я';
                break;
            case 'lastName':
                return 'прізвище';
                break;
            case 'phone':
                return 'номер телефону';
                break;
            case 'email':
                return 'email';
                break;
            case 'password':
                return 'пароль';
                break;
            case 'confirm':
                return 'підтвердіть пароль';
                break;
            case 'code':
                return 'код підтвердження';
                break;
            default:
                break;
        }
    }

    return (
        <FormInputsListItem>
            <FormInputLabel>{translateName(name)}</FormInputLabel>
            <FormInput
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
        </FormInputsListItem>
    )
};

export default CustomFormInput;