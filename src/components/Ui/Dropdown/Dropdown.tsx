import { useClickOutside, useEscapeKey } from "hooks";
import { DropWrapper } from "./Dropdown.styled";
import React, { useEffect, useState } from "react";

export type Props = {
    closeDropdown: () => void;
    $isOpen: boolean;
    open?: boolean;
    children: React.ReactElement
};

export const Dropdown = ({closeDropdown, $isOpen, children}: Props): React.ReactElement => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (): void => {
        setOpen(false);
        setTimeout(() => {
            closeDropdown();
        }, 250)
    }

    const dropRef = useClickOutside(handleClose);
    useEscapeKey(handleClose);

    useEffect(() => {
        $isOpen ? setOpen(true) : setOpen(false);
    }, [$isOpen])

    return (
        <DropWrapper $isOpen={open} ref={dropRef}>
            {children}
        </DropWrapper>
    )
};

export default Dropdown;