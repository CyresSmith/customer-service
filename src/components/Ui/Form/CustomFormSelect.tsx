import { useState } from 'react';
import { Select, Selected, SelectIcon, SelectList, SelectListItem } from './CustomForm.styled';
import { SelectProps } from './types';
import { useClickOutside, useEscapeKey } from 'hooks';
import { HiChevronDown } from 'react-icons/hi';

const CustomFormSelect = <T,>({ selectItems, selectedItem, handleSelect }: SelectProps<T>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const toggleOpen = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true)
        }
    };

    const close = () => {
        setIsOpen(false);
    };

    const onSelect = (item: T) => {
        handleSelect(item);
    };

    const translate = (item: T): string | undefined => {
        switch (item) {
            case '':
                return 'не обрано'
            case 'male':
                return 'чоловіча'
            case 'female':
                return 'жіноча'
            case 'other':
                return 'інша'
            default: break;
        }
    }

    useEscapeKey(close);
    const selectRef = useClickOutside(close);

    return (
        <Select onClick={toggleOpen} ref={selectRef} $open={isOpen}>
            <Selected>{translate(selectedItem)}</Selected>
            <SelectList $open={isOpen}>
                {selectItems.map((item, i) => <SelectListItem onClick={() => onSelect(item)} key={i}>{translate(item)}</SelectListItem>)}
            </SelectList>
            <SelectIcon as={HiChevronDown} $open={isOpen} />
        </Select>
    )
};

export default CustomFormSelect;