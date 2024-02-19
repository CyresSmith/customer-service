import { ReactNode } from "react";
import { ConfirmBtnsWrapper, ConfirmContainer, ConfirmText } from "./ConfirmOperation.styled";
import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";

type Props = {
    callback: () => void;
    children: ReactNode;
    closeConfirm: () => void;
};

const ConfirmOperation = ({ callback, children, closeConfirm }: Props) => {
    return (
        <Modal
            id="modal"
            closeIconBtn={false}
            closeModal={closeConfirm}
            children={
                <ConfirmContainer id='modal'>
                    <ConfirmText>{children}</ConfirmText>
                    <ConfirmBtnsWrapper>
                        <Button id="modal" children='Відмінити' onClick={closeConfirm} $colors="light" />
                        <Button id="modal" children='Підтвердити' onClick={callback} $colors="accent" />
                    </ConfirmBtnsWrapper>
                </ConfirmContainer> 
            }
        />
    )
};

export default ConfirmOperation;