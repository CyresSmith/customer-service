import { IButton } from '../Buttons/Button/Button.types';

export interface ISelect
  extends Pick<IButton, 'id' | 'disabled' | 'size' | '$colors' | '$variant'> {
  items: string[];
  selectedItemIdx?: number;
  onSelect: (item: string) => void;
}

export interface ISelectStyle
  extends Omit<ISelect, 'id' | 'items' | 'onSelect'> {}
