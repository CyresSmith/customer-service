import React, { ReactNode } from 'react';

export interface IButton {
    id?: string;
    isLoading?: boolean;
    disabled?: boolean;
    children?: ReactNode | undefined;
    onClick?: (e: MouseEvent) => void;
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
        | 'transparent'
        | undefined;
    $variant?: 'solid' | 'text' | undefined;
    $round?: boolean;
    $isIcon?: boolean;
    shake?: boolean;
}
