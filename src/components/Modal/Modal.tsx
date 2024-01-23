import React, { useEffect, useState } from "react";
import { Backdrop, ModalContainer } from "./Modal.styled";
import Button from "components/Ui/Buttons/Button/Button";
import { IoMdClose } from "react-icons/io";
import { useClickOutside, useEscapeKey } from "hooks";

export type Modal = {
    children?: React.ReactNode,
    open?: string | null,
    $isOpen?: boolean,
    closeModal: () => void,
    $w?: string,
    $h?: string
}

const Modal = ({children, closeModal, open, $w, $h}: Modal) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        open ? setIsOpen(true) : setIsOpen(false);
    }, [open]);

    const close = (): void => {
        setIsOpen(false);
        setTimeout(() => {
            closeModal();
        }, 250)
    };

    const modalRef = useClickOutside(close);
    useEscapeKey(close);

    return (
        <Backdrop $isOpen={isOpen}>
            <ModalContainer $w={$w} $h={$h} ref={modalRef} $isOpen={isOpen}>
                <Button type="button" Icon={IoMdClose} $position="absolute" $top="5px" $right="5px" handleClick={close} />
                {children}
            </ModalContainer>
        </Backdrop>
    )
};

export default Modal;