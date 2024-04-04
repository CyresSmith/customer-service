import { ChangeEvent } from 'react';
import CustomFormInput from '../Form/CustomFormInput';
// import { HiSearch, HiX } from 'react-icons/hi';

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

const Search = ({ value, onChange, placeholder }: Props) => {
    return (
        <CustomFormInput
            label={false}
            name="phone"
            type="text"
            value={value}
            handleChange={onChange}
            placeholder={placeholder ? placeholder : 'Введіть номер телефону'}
            disabledIcon={true}
        />
    );
};

export default Search;
