import Button from 'components/Ui/Buttons/Button/Button';
import useLockBodyScroll from 'hooks/useLockBodyScroll';
import { MouseEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { Backdrop, ButtonBox, ModalContainer, Title } from './Modal.styled';

export type Modal = {
    children?: ReactNode;
    $isOpen?: boolean;
    $w?: string;
    $h?: string;
    title?: string;
    closeModal: () => void;
    closeIconBtn?: boolean;
    id?: string;
    titleMargin?: string;
};

const modalRoot = document.querySelector('#modal-root');

const Modal = ({
    children,
    closeModal,
    $w,
    $h,
    title,
    $isOpen,
    closeIconBtn = true,
    id = '',
    titleMargin,
}: Modal) => {
    useLockBodyScroll();
    const [isOpen, setIsOpen] = useState(false);

    const close = useCallback(() => {
        setIsOpen(false);
        setTimeout(() => {
            closeModal();
        }, 250);
    }, [closeModal]);

    const backdropClose: MouseEventHandler<HTMLDivElement> = e => {
        if (e.target === e.currentTarget) close();
    };

    const modalId = id ? `modal-id${id}` : '';

    useEffect(() => {
        setIsOpen($isOpen ?? false);
    }, [$isOpen]);

    useEffect(() => {
        if (!modalRoot) return;

        const escClose = (e: KeyboardEvent) => {
            if (id !== '') {
                if (
                    modalRoot?.lastChild?.isSameNode(
                        document.querySelector(`div[id=${modalId}]`)
                    ) &&
                    e.code === 'Escape'
                ) {
                    return close();
                }
            } else {
                e.code === 'Escape' && close();
            }
        };

        document.addEventListener('keydown', escClose);

        return () => document.removeEventListener('keydown', escClose);
    }, [close, id, modalId]);

    return createPortal(
        <Backdrop id={modalId} $isOpen={isOpen} onClick={backdropClose}>
            <ModalContainer $w={$w} $h={$h} $isOpen={isOpen}>
                {closeIconBtn && (
                    <ButtonBox>
                        <Button
                            Icon={IoMdClose}
                            onClick={close}
                            $round
                            $colors="accent"
                            $variant="text"
                        />
                    </ButtonBox>
                )}

                {title && <Title $titleMargin={titleMargin}>{title}</Title>}
                {children}
            </ModalContainer>
        </Backdrop>,
        modalRoot as Element
    );
};

export default Modal;
