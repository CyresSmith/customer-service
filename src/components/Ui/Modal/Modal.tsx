import Button from 'components/Ui/Buttons/Button/Button';
import { useClickOutside, useEscapeKey } from 'hooks';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { Backdrop, ButtonBox, ModalContainer } from './Modal.styled';

export type Modal = {
  children?: ReactNode;
  $isOpen?: boolean;
  $w?: string;
  $h?: string;
  closeModal: () => void;
};

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, closeModal, $w, $h, $isOpen }: Modal) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(p => !p);
  }, [$isOpen]);

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
        <ButtonBox>
          <Button
            Icon={IoMdClose}
            onClick={close}
            $round
            $colors="accent"
            $variant="text"
          />
        </ButtonBox>
        {children}
      </ModalContainer>
    </Backdrop>,
    modalRoot as Element
  );
};

export default Modal;
