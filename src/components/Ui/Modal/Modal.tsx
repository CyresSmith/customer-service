import Button from 'components/Ui/Buttons/Button/Button';
import { useClickOutside, useEscapeKey } from 'hooks';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { Backdrop, ModalContainer } from './Modal.styled';

export type Modal = {
  children?: React.ReactNode;
  open?: string | null;
  $isOpen?: boolean;
  closeModal: () => void;
  $w?: string;
  $h?: string;
};

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, closeModal, open, $w, $h }: Modal) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    open ? setIsOpen(true) : setIsOpen(false);
  }, [open]);

  const close = (): void => {
    setIsOpen(false);
    setTimeout(() => {
      closeModal();
    }, 250);
  };

  const modalRef = useClickOutside(close);
  useEscapeKey(close);

  return createPortal(
    <Backdrop $isOpen={isOpen}>
      <ModalContainer $w={$w} $h={$h} ref={modalRef} $isOpen={isOpen}>
        <Button
          type="button"
          Icon={IoMdClose}
          $position="absolute"
          $top="5px"
          $right="5px"
          handleClick={close}
        />
        {children}
      </ModalContainer>
    </Backdrop>,
    modalRoot as Element
  );
};

export default Modal;
