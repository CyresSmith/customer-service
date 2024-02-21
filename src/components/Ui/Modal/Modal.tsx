import Button from 'components/Ui/Buttons/Button/Button';
import { useClickOutside, useEscapeKey } from 'hooks';
import { ReactNode, useEffect, useState } from 'react';
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
};

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, closeModal, $w, $h, title, $isOpen, closeIconBtn = true, id }: Modal) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(p => !p);
  }, [$isOpen]);

  const close = (e: KeyboardEvent | MouseEvent): void => {
    if ('target' in e && 'id' in e!.target! && e?.target?.id === 'modal') {
      return;
    }

    setIsOpen(false);
    setTimeout(() => {
      closeModal();
    }, 250);
  };

  const modalRef = useClickOutside(close);
  useEscapeKey(close);

  return createPortal(
    <Backdrop $isOpen={isOpen} id={id}>
      <ModalContainer $w={$w} $h={$h} ref={modalRef} $isOpen={isOpen} id={id}>
        {closeIconBtn && 
          <ButtonBox>
            <Button
              Icon={IoMdClose}
              onClick={close}
              $round
              $colors="accent"
              $variant="text"
            />
          </ButtonBox>
        }

        {title && <Title>{title}</Title>}
        {children}
      </ModalContainer>
    </Backdrop>,
    modalRoot as Element
  );
};

export default Modal;
