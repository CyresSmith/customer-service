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
            case 'name':
                return 'ім"я';
                break;
            case 'email':
                return 'email';
                break;
            case 'password':
                return 'Пароль';
                break;
            case 'confirm':
                return 'Підтвердіть пароль';
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