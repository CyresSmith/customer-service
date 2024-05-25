import { translateSelect } from 'helpers/translateSelect';
import { useClickOutside, useEscapeKey } from 'hooks';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import {
    Select,
    SelectBox,
    SelectIcon,
    SelectList,
    SelectListItem,
    Selected,
} from './CustomForm.styled';
import { SelectItem, SelectProps } from './types';

const CustomFormSelect = ({
    selectItems,
    selectedItem,
    width = '100%',
    handleSelect,
    fieldName,
    disabled = false,
    isReadonly = false,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        if (disabled || isReadonly) return;

        setIsOpen(p => !p);
    };

    const handleClose = () => setIsOpen(false);

    const onSelect = (item: SelectItem) => {
        if (disabled || isReadonly) return;

        handleSelect(item, fieldName);

        if (!Array.isArray(selectedItem)) handleClose();
    };

    const onEnterSelect = (event: React.KeyboardEvent<HTMLLIElement>, item: SelectItem) => {
        if (event.key === 'Enter') {
            handleSelect(item, fieldName);
        }
    };

    const onEnterToggleOpen = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') toggleOpen();
    };

    useEscapeKey(handleClose);
    const selectRef = useClickOutside<HTMLDivElement>(handleClose);

    const isSelected = (item: SelectItem) => {
        if (Array.isArray(selectedItem)) {
            return (
                selectedItem.findIndex(selected =>
                    item?.id ? item?.id === selected?.id : item.value === selected.value
                ) !== -1
            );
        } else {
            return item?.id ? item?.id === selectedItem?.id : item?.value === selectedItem?.value;
        }
    };

    const setSelectedValue = () => {
        const notSelectStr = 'Не обрано';

        if ((!Array.isArray(selectedItem) && !selectedItem?.value) || !selectedItem) {
            return notSelectStr;
        } else if (Array.isArray(selectedItem)) {
            if (selectedItem.length === 0) {
                return notSelectStr;
            } else {
                if (selectedItem.length > 1) {
                    const countAcc = selectedItem.reduce((acc, item) => {
                        if (item.count) {
                            return acc + item.count;
                        }
                        return acc;
                    }, 0);

                    return countAcc > 0
                        ? `Обрано: ${selectedItem.length} (${countAcc})`
                        : `Обрано: ${selectedItem.length}`;
                } else {
                    const { value, count } = selectedItem[0];
                    const translated = translateSelect(value);

                    return count ? `${translated} (${count})` : translated;
                }
            }
        } else {
            const { value, count } = selectedItem;
            const translated = translateSelect(value);

            return count ? `${translated}  (${count})` : translated;
        }
    };

    return (
        <SelectBox ref={selectRef} $width={width} disabled={disabled}>
            <Select
                onKeyDown={event => onEnterToggleOpen(event)}
                tabIndex={0}
                $open={isOpen}
                onClick={toggleOpen}
            >
                <Selected>{setSelectedValue()}</Selected>

                <SelectIcon as={HiChevronDown} $open={isOpen} />
            </Select>

            <SelectList $open={isOpen} $itemsCount={selectItems.length}>
                {selectItems.map((item, i) => (
                    <SelectListItem
                        id={String(item?.id || i)}
                        tabIndex={0}
                        onKeyDown={event => onEnterSelect(event, item)}
                        onClick={() => onSelect(item)}
                        key={i}
                        $selected={isSelected(item)}
                    >
                        {translateSelect(item.value)}
                        {item.count && ` (${item.count})`}
                    </SelectListItem>
                ))}
            </SelectList>
        </SelectBox>
    );
};

export default CustomFormSelect;
