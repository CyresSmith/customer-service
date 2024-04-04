import { useClickOutside } from 'hooks';
import { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { HiCheckCircle } from 'react-icons/hi2';
import { List, SelectBox, SelectEl } from './Select.styled';
import { ISelect } from './select.types';

const Select = ({
    id = '',
    disabled = false,
    size = 'm',
    $colors = 'main',
    $variant = 'solid',
    onSelect,
    items,
    selectedItem,
    several,
}: ISelect) => {
    const isSelectedItemString = typeof selectedItem === 'string';
    const isSelectedItemArray = Array.isArray(selectedItem);

    const [isOpen, setIsOpen] = useState(false);

    const [selected, setSelected] = useState<string | null>(
        selectedItem && isSelectedItemString ? selectedItem : items[0]
    );

    const [severalSelected, setSeveralSelected] = useState<string[]>([]);

    const selectRef = useClickOutside(() => setIsOpen(false));

    const handleSelect = (item: string, id: string) => {
        if (disabled) return;

        if (several) {
            setSeveralSelected(p =>
                p?.includes(item) ? p.filter(selected => selected !== item) : [...p, item]
            );
            onSelect(item, id);
        } else {
            setSelected(item);
            onSelect(item, id);
            setIsOpen(false);
        }
    };

    const handleOpen = () => {
        if (disabled) return;

        setIsOpen(p => !p);
    };

    useEffect(() => {
        if (selectedItem && isSelectedItemString) {
            return setSelected(selectedItem);
        }

        if (selectedItem && isSelectedItemArray) {
            return setSeveralSelected(selectedItem);
        }

        setSelected(items[0]);
    }, [isSelectedItemArray, isSelectedItemString, items, selectedItem]);

    return (
        <SelectBox ref={selectRef}>
            <SelectEl
                id={id}
                disabled={disabled}
                onClick={handleOpen}
                size={size}
                $colors={$colors}
                $variant={$variant}
                $isOpen={isOpen}
            >
                <span>
                    {!several
                        ? selected
                        : severalSelected.length > 0
                          ? severalSelected.join(', ')
                          : 'Нічого не вибрано'}
                </span>

                <HiChevronDown />
            </SelectEl>

            <List
                disabled={disabled}
                size={size}
                $colors={$colors}
                $variant={$variant}
                $isOpen={isOpen}
            >
                {items.map(item => (
                    <li key={item} onClick={() => handleSelect(item, id)}>
                        <p>{item}</p>
                        {several && severalSelected.includes(item) && <HiCheckCircle />}
                    </li>
                ))}
            </List>
        </SelectBox>
    );
};

export default Select;
