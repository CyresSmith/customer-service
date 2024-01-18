import React from "react";
import { Backdrop, ModalContainer } from "./Modal.styled";
import IconButton from "components/Ui/Buttons/IconButton/IconButton";

export interface IModal {
    children?: React.ReactNode,
    open?: boolean,
    toggleModal?: () => void,
}

const Modal = ({children, toggleModal, open}: IModal) => {

    return (
        <Backdrop>
            <ModalContainer open={open}>
                <IconButton $position="absolute" $top="15px" $right="15px" handleClick={toggleModal} />
                {children}
            </ModalContainer>
        </Backdrop>
    )
};

export default Modal;