import React, { ReactNode } from 'react';

export interface IButton {
  id?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any | undefined) => void;
  Icon?: React.ElementType | undefined;
  $iconPosition?: 'l' | 'r' | undefined;
  type?: 'submit' | 'button';
  size?: 's' | 'm' | 'l' | undefined;
  $colors?:
    | 'light'
    | 'main'
    | 'dark'
    | 'accent'
    | 'success'
    | 'danger'
    | undefined;
  $variant?: 'solid' | 'text' | undefined;
  $round?: boolean;
  $isIcon?: boolean;
}
