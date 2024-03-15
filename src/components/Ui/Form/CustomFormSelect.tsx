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
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    if (disabled) return;

    setIsOpen(p => !p);
  };

  const handleClose = () => setIsOpen(false);

  const onSelect = (item: SelectItem) => {
    if (disabled) return;

    handleSelect(item, fieldName);

    if (!Array.isArray(selectedItem)) handleClose();
  };

  const onEnterSelect = (
    event: React.KeyboardEvent<HTMLLIElement>,
    item: SelectItem
  ) => {
    if (event.key === 'Enter') {
      handleSelect(item, fieldName);
    }
  };

  const onEnterToggleOpen = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') toggleOpen();
  };

  useEscapeKey(handleClose);
  const selectRef = useClickOutside(handleClose);

  const isSelected = (item: SelectItem) => {
    if (Array.isArray(selectedItem)) {
      return (
        selectedItem.findIndex(selected =>
          item?.id ? item?.id === selected?.id : item.value === selected.value
        ) !== -1
      );
    } else {
      return item?.id
        ? item?.id === selectedItem?.id
        : item?.value === selectedItem?.value;
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
        <Selected>
          {(!Array.isArray(selectedItem) && !selectedItem?.value) ||
          !selectedItem
            ? 'Не обрано'
            : Array.isArray(selectedItem)
            ? selectedItem.length === 0
              ? 'Не обрано'
              : selectedItem.length > 1
              ? `${selectedItem[0].value} + ${selectedItem.length - 1}`
              : translateSelect(selectedItem[0].value)
            : translateSelect(selectedItem.value)}
        </Selected>

        <SelectIcon as={HiChevronDown} $open={isOpen} />
      </Select>

      <SelectList $open={isOpen}>
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
          </SelectListItem>
        ))}
      </SelectList>
    </SelectBox>
  );
};

export default CustomFormSelect;
