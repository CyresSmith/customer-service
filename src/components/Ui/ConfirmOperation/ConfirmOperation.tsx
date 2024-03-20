import { ReactNode } from 'react';
import Button from '../Buttons/Button';
import Modal from '../Modal/Modal';
import {
  ConfirmBtnsWrapper,
  ConfirmContainer,
  ConfirmText,
} from './ConfirmOperation.styled';

type Props = {
  id: string;
  callback: () => void;
  children: ReactNode;
  closeConfirm: () => void;
  isOpen: boolean;
};

const ConfirmOperation = ({
  id,
  callback,
  children,
  closeConfirm,
  isOpen,
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
              id="modal"
              children="Відмінити"
              onClick={closeConfirm}
              $colors="light"
            />
            <Button
              id="modal"
              children="Підтвердити"
              onClick={callback}
              $colors="accent"
            />
          </ConfirmBtnsWrapper>
        </ConfirmContainer>
      }
    />
  );
};

export default ConfirmOperation;
