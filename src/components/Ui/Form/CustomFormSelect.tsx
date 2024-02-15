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

    const handleClose = () => {
        setIsOpen(false);
    };

    const onSelect = (item: T) => {
        handleSelect(item);
        handleClose();
    };

    const onEnterSelect = (event: React.KeyboardEvent<HTMLLIElement>, item: T) => {
        if (event.key === 'Enter') {
            handleSelect(item);
            handleClose();
        }
    };

    const onEnterToggleOpen = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            toggleOpen()
        }
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

    useEscapeKey(handleClose);
    const selectRef = useClickOutside(handleClose);

    return (
        <Select onKeyDown={(event) => onEnterToggleOpen(event)} tabIndex={0} onClick={toggleOpen} ref={selectRef} $open={isOpen}>
            <Selected>{translate(selectedItem)}</Selected>
            <SelectList $open={isOpen}>
                {isOpen && selectItems.map((item, i) =>
                    <SelectListItem
                        tabIndex={0}
                        onKeyDown={(event) => onEnterSelect(event, item)}
                        onClick={() => onSelect(item)}
                        key={i}
                    >{translate(item)}</SelectListItem>)}
            </SelectList>
            <SelectIcon as={HiChevronDown} $open={isOpen} />
        </Select>
    )
};

export default CustomFormSelect;