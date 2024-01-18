import { FormInput, FormInputLabel, FormInputWrapper } from "./CustomForm.styled";
import { ChangeEvent } from "react";

type Props = {
    name: string,
    value: string | number | undefined,
    type: string,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
};

const CustomFormInput = ({name, type, value, handleChange}: Props) => {
    return (
        <FormInputWrapper>
            <FormInputLabel></FormInputLabel>
            <FormInput
                type={type}
                name={name}
                value={value}
                onChange={handleChange} 
            />
        </FormInputWrapper>
    )
};

export default CustomFormInput;