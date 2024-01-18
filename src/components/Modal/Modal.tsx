import React from "react";
import { Backdrop, ModalContainer } from "./Modal.styled";
import Button from "components/Ui/Buttons/Button/Button";
import { IoMdClose } from "react-icons/io";
import { useClickOutside, useEscapeKey } from "hooks";

export interface IModal {
    children?: React.ReactNode,
    open?: boolean,
    toggleModal: () => void,
}

const Modal = ({children, toggleModal, open}: IModal) => {
    const modalRef = useClickOutside(toggleModal);

    useEscapeKey(toggleModal);

    return (
        <Backdrop>
            <ModalContainer ref={modalRef} open={open}>
                <Button Icon={IoMdClose} $position="absolute" $top="5px" $right="5px" handleClick={toggleModal} />
                {children}
            </ModalContainer>
        </Backdrop>
    )
};

export default Modal;