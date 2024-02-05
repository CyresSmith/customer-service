import { useClickOutside } from 'hooks';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
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
  selectedItemIdx,
}: ISelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(
    selectedItemIdx ? items[selectedItemIdx] : items[0]
  );
  const selectRef = useClickOutside(() => setIsOpen(false));

  const handleSelect = (item: string) => {
    setSelected(item);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <SelectBox ref={selectRef}>
      <SelectEl
        id={id}
        disabled={disabled}
        onClick={() => setIsOpen(p => !p)}
        size={size}
        $colors={$colors}
        $variant={$variant}
      >
        <span>{selected}</span>
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
          <li key={item} onClick={() => handleSelect(item)}>
            {item}
          </li>
        ))}
      </List>
    </SelectBox>
  );
};

export default Select;