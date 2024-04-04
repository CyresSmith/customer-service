import { IButton } from '../Buttons/Button/Button.types';

export interface ISelect
    extends Pick<IButton, 'id' | 'disabled' | 'size' | '$colors' | '$variant'> {
    items: string[];
    selectedItem: string | string[];
    several?: boolean;
    onSelect: (item: string | string[], id?: string) => void;
}

export interface ISelectStyle extends Omit<ISelect, 'id' | 'items' | 'onSelect' | 'selectedItem'> {
    $isOpen: boolean;
}
