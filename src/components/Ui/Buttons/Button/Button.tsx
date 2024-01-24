import React from 'react';
import { Btn, StyledIcon } from './Button.styled';

export interface IButton {
  $bgColor?: string;
  color?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  openModal?: (arg: string) => void;
  Icon?: React.ElementType;
  $position?: string;
  $top?: string;
  $right?: string;
  $type?: string;
  type: string;
  name?: string;
}

const Button = ({
  $bgColor,
  children,
  handleClick,
  $position,
  $top,
  $right,
  Icon,
  $type,
  openModal,
  type,
  name,
}: IButton) => {
  const onClick = (): void | null => {
    return openModal && name
      ? openModal(name)
      : handleClick
      ? handleClick()
      : null;
  };

  return (
    <Btn
      name={name}
      type={type}
      onClick={onClick}
      $type={$type}
      $bgColor={$bgColor}
      $position={$position}
      $top={$top}
      $right={$right}
    >
      {Icon && <StyledIcon as={Icon} />}
      {children ? children : null}
    </Btn>
  );
};

export default Button;
