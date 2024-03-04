import { useClickOutside, useEscapeKey } from 'hooks';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import {
  Select,
  SelectIcon,
  SelectList,
  SelectListItem,
  Selected,
} from './CustomForm.styled';
import { SelectItem, SelectProps } from './types';

const CustomFormSelect = ({
  selectItems,
  selectedItem,
  closeOnSelect,
  width = '100%',
  handleSelect,
  fieldName,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(p => !p);

  const handleClose = () => setIsOpen(false);

  const onSelect = (item: SelectItem) => {
    handleSelect(item, fieldName);
    // if (!Array.isArray(selectedItem) || closeOnSelect) {
    //   handleClose();
    // }
  };

  const onEnterSelect = (
    event: React.KeyboardEvent<HTMLLIElement>,
    item: SelectItem
  ) => {
    if (event.key === 'Enter') {
      handleSelect(item, fieldName);
    }
  };

  const onEnterToggleOpen = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') toggleOpen();
  };

  useEscapeKey(handleClose);
  const selectRef = useClickOutside(handleClose);

  const isSelected = (item: SelectItem) => {
    if (Array.isArray(selectedItem)) {
      return (
        selectedItem.findIndex(
          selected => item?.id === selected?.id || item.value === selected.value
        ) !== -1
      );
    } else {
      return (
        item?.id === selectedItem?.id || item?.value === selectedItem?.value
      );
    }
  };

  return (
    <Select
      $width={width}
      onKeyDown={event => onEnterToggleOpen(event)}
      tabIndex={0}
      onClick={toggleOpen}
      ref={selectRef}
      $open={isOpen}
    >
      <Selected>
        {!selectedItem
          ? 'Не обрано'
          : Array.isArray(selectedItem)
          ? selectedItem.length === 0
            ? 'Не обрано'
            : selectedItem.length > 1
            ? `${selectedItem[0].value} + ${selectedItem.length - 1}`
            : selectedItem[0].value
          : selectedItem.value}
      </Selected>

      <SelectList $open={isOpen}>
        {isOpen &&
          selectItems.map((item, i) => (
            <SelectListItem
              id={String(item?.id || i)}
              tabIndex={0}
              onKeyDown={event => onEnterSelect(event, item)}
              onClick={() => onSelect(item)}
              key={i}
              $selected={isSelected(item)}
            >
              {item.value}
            </SelectListItem>
          ))}
      </SelectList>
      <SelectIcon as={HiChevronDown} $open={isOpen} />
    </Select>
  );
};

export default CustomFormSelect;
