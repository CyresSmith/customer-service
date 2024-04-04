import { useClickOutside, useEscapeKey } from 'hooks';
import { DropWrapper, DropdownContent } from './Dropdown.styled';
import React, { useEffect, useState } from 'react';

export type Props = {
  closeDropdown: () => void;
  $isOpen: boolean;
  open?: boolean;
  children: React.ReactElement;
};

export const Dropdown = ({
  closeDropdown,
  $isOpen,
  children,
}: Props): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (): void => {
    setOpen(false);
    setTimeout(() => {
      closeDropdown();
    }, 500);
  };

  const dropRef = useClickOutside(handleClose);
  useEscapeKey(handleClose);

  useEffect(() => {
    $isOpen ? setOpen(true) : setOpen(false);
  }, [$isOpen]);

  return (
    <DropWrapper ref={dropRef} $isOpen={open}>
      <DropdownContent>{children}</DropdownContent>
    </DropWrapper>
  );
};

export default Dropdown;
