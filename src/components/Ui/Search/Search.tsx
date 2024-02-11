import { ChangeEvent } from "react";
import CustomFormInput from "../Form/CustomFormInput";
// import { HiSearch, HiX } from 'react-icons/hi';

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({value, onChange}: Props) => {

    return (
        <CustomFormInput
            label={false}
            name='phone'
            type='text'
            value={value}
            handleChange={onChange}
            placeholder="Введіть номер телефону"
            disabledIcon={true}
        />
    )
};

export default Search;