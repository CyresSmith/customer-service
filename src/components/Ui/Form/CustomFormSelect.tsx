import { ReactNode, useState } from 'react';
import { Select, Selected, SelectIcon, SelectList, SelectListItem } from './CustomForm.styled';
import { SelectItem, SelectProps } from './types';
import { useClickOutside, useEscapeKey } from 'hooks';
import { HiChevronDown } from 'react-icons/hi';

const CustomFormSelect = ({ selectItems, selectedItem, closeOnSelect, width = '100%', handleSelect }: SelectProps) => {
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

    const onSelect = (item: SelectItem) => {
        handleSelect(item);
        if (closeOnSelect) {
            handleClose();
        }
    };

    const onEnterSelect = (event: React.KeyboardEvent<HTMLLIElement>, item: SelectItem) => {
        if (event.key === 'Enter') {
            handleSelect(item);
            if (closeOnSelect) {
                handleClose();
            }
        }
    };

    const onEnterToggleOpen = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            toggleOpen()
        }
    };

    const translate = (item: SelectItem): ReactNode => {
        switch (item.value) {
            case '':
                return 'не обрано';
            case 'male':
                return 'чоловіча'
            case 'female':
                return 'жіноча'
            case 'other':
                return 'інша'
            default:
                return item.value as string;
        }
    }

    useEscapeKey(handleClose);
    const selectRef = useClickOutside(handleClose);

    const isSelected = (item: SelectItem) => {
        if (Array.isArray(selectedItem)) {
            return selectedItem.find(i => i.id === item.id) ? true : false;
        } else {
            return item.value === selectedItem.value ? true : false;
        }
    }

    return (
        <Select $width={width} onKeyDown={(event) => onEnterToggleOpen(event)} tabIndex={0} onClick={toggleOpen} ref={selectRef} $open={isOpen}>
            <Selected>
                {Array.isArray(selectedItem) && selectedItem.find(i => i.id === 'all') ?
                    `Вибрано всіх працівників: ${selectItems.length}` :
                    Array.isArray(selectedItem) ?
                    `Вибрано працівників: ${selectedItem.length}` :
                    translate(selectedItem)
                }
            </Selected>
            <SelectList $open={isOpen}>
                {isOpen && selectItems.map((item, i) =>
                    <SelectListItem
                        id={item.id ? item.id as string : undefined}
                        tabIndex={0}
                        onKeyDown={(event) => onEnterSelect(event, item)}
                        onClick={() => onSelect(item)}
                        key={i}
                        $selected={isSelected(item)}
                    >{translate(item)}</SelectListItem>)}
            </SelectList>
            <SelectIcon as={HiChevronDown} $open={isOpen} />
        </Select>
    )
};

export default CustomFormSelect;