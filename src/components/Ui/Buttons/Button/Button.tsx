import { BiLoaderCircle } from 'react-icons/bi';
import { Btn, Loader } from './Button.styled';
import { IButton } from './Button.types';

const Button = ({
  id = '',
  isLoading = false,
  disabled = false,
  children,
  onClick,
  Icon,
  $iconPosition = 'l',
  type = 'button',
  size = 'm',
  $colors = 'main',
  $variant = 'solid',
  $round = false,
  $isIcon = false,
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
      $isIconThere={Boolean(Icon)}
      $iconPosition={$iconPosition}
    >
      {$iconPosition === 'l' &&
        Icon &&
        (isLoading ? <Loader as={BiLoaderCircle} /> : <Icon />)}

      {!$round && !$isIcon && children && <span>{children}</span>}

      {$iconPosition === 'r' &&
        Icon &&
        (isLoading ? <Loader as={BiLoaderCircle} /> : <Icon />)}
    </Btn>
  );
};

export default Button;
