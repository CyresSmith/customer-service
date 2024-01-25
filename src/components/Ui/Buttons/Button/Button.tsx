import { BiLoaderCircle } from 'react-icons/bi';
import { IButton } from 'types';
import { Btn, Loader } from './Button.styled';

const Button = ({
  id = '',
  isLoading = false,
  disabled = false,
  children,
  onClick,
  Icon,
  type = 'button',
  size = 'm',
  $variant = 'main',
  $round = false,
}: IButton) => {
  return (
    <Btn
      id={id}
      disabled={disabled}
      onClick={onClick}
      type={type}
      size={size}
      $variant={$variant}
      $round={$round}
    >
      {isLoading && Icon && (
        <Loader>
          <BiLoaderCircle />
        </Loader>
      )}
      {!isLoading && Icon && <Icon />}
      {children && <span>{children}</span>}
    </Btn>
  );
};

export default Button;
