import { BiLoaderCircle } from 'react-icons/bi';
import { Btn, Loader } from './Button.styled';
import { IButton } from './button.types';

const Button = ({
  id = '',
  isLoading = false,
  disabled = false,
  children,
  onClick,
  Icon,
  type = 'button',
  size = 'm',
  $colors = 'main',
  $variant = 'solid',
  $round = false,
}: IButton) => {
  return (
    <Btn
      id={id}
      disabled={disabled}
      onClick={onClick}
      type={type}
      size={size}
      $colors={$colors}
      $variant={$variant}
      $round={$round}
    >
      {isLoading && Icon && <Loader as={BiLoaderCircle} />}
      {!isLoading && Icon && <Icon />}
      {!$round && children && <span>{children}</span>}
    </Btn>
  );
};

export default Button;
