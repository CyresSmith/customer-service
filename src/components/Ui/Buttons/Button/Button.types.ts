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
  $colors?: 'light' | 'main' | 'dark' | 'accent' | 'text' | undefined;
  $variant?: 'solid' | 'text' | undefined;
  $round?: boolean;
}
