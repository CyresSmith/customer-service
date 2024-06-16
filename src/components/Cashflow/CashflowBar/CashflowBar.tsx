import RadioSelect, { RadioSelectItemType } from 'components/Ui/RadioSelect/RadioSelect';

type Props = {
    selectedTimeId: number;
    handleTypeSelectClick: ({ id }: RadioSelectItemType) => void;
};

const selectItems = [
    { id: 1, label: 'Сьогодні' },
    { id: 2, label: 'Вчора' },
    { id: 3, label: 'Тиждене' },
    { id: 4, label: 'Місяць' },
    { id: 5, label: 'Рік' },
];

const CashflowBar = ({ selectedTimeId, handleTypeSelectClick }: Props) => {
    return (
        <div>
            <RadioSelect
                width={450}
                items={selectItems}
                selectedItemId={selectedTimeId}
                onSelect={handleTypeSelectClick}
            />
        </div>
    );
};

export default CashflowBar;
