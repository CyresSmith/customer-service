import { ReactNode } from 'react';
import { HiCheck, HiX } from 'react-icons/hi';
import Button from '../Buttons/Button';
import Modal from '../Modal/Modal';
import { ConfirmBtnsWrapper, ConfirmContainer, ConfirmText } from './ConfirmOperation.styled';

type Props = {
    id: string;
    callback: () => void;
    children: ReactNode;
    closeConfirm: () => void;
    isOpen: boolean;
    isLoading?: boolean;
};

const ConfirmOperation = ({
    id,
    callback,
    children,
    closeConfirm,
    isOpen,
    isLoading = false,
}: Props) => {
    return (
        <Modal
            $isOpen={isOpen}
            id={`confirmModal_${id}`}
            closeIconBtn={false}
            closeModal={closeConfirm}
            children={
                <ConfirmContainer id="modal">
                    <ConfirmText>{children}</ConfirmText>

                    <ConfirmBtnsWrapper>
                        <Button
                            Icon={HiCheck}
                            $colors="success"
                            onClick={callback}
                            isLoading={isLoading}
                        >
                            Так
                        </Button>

                        <Button Icon={HiX} $colors="danger" onClick={closeConfirm}>
                            Ні
                        </Button>
                    </ConfirmBtnsWrapper>
                </ConfirmContainer>
            }
        />
    );
};

export default ConfirmOperation;
