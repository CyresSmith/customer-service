import { ReactNode } from 'react';

export interface IButton {
  id?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode | undefined;
  onClick?: () => void;
  Icon?: React.ElementType | undefined;
  type?: 'submit' | 'button';
  size?: 's' | 'm' | 'l' | undefined;
  $variant?: 'light' | 'main' | 'dark' | 'accent' | 'text' | undefined;
  $round?: boolean;
}

export interface IIConButton extends Omit<IButton, 'children' | 'Icon'> {
  Icon: React.ElementType | undefined;
}
