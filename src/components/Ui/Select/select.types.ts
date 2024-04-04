import { IButton } from '../Buttons/Button/Button.types';

export type ISelectHandler = (item: string | string[], id?: string) => void;

export type ISelect = Pick<IButton, 'id' | 'disabled' | 'size' | '$colors' | '$variant'> & {
    items: string[];
    selectedItem: string | string[];
    several?: boolean;
    onSelect: ISelectHandler;
};

export type ISelectStyle = Omit<ISelect, 'id' | 'items' | 'onSelect' | 'selectedItem'> & {
    $isOpen: boolean;
};
