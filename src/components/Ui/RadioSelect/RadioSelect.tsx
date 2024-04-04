import { RadioSelectItem, RadioSelectList } from './RadioSelect.styled';

export type RadioSelectItemType = {
    id: string;
    label: string;
};

type Props = {
    width?: number;
    selectedItemId: string;
    items: RadioSelectItemType[];
    onSelect: (item: RadioSelectItemType) => void;
};

const RadioSelect = ({ width, items, selectedItemId, onSelect }: Props) => {
    return (
        <RadioSelectList width={width}>
            {items.map(item => (
                <RadioSelectItem
                    key={item.id}
                    selected={item.id === selectedItemId}
                    $itemsCount={items.length}
                    onClick={() => onSelect(item)}
                >
                    <button type="button">{item.label}</button>
                </RadioSelectItem>
            ))}
        </RadioSelectList>
    );
};

export default RadioSelect;
