import RadioSelect, { RadioSelectItemType } from 'components/Ui/RadioSelect/RadioSelect';
import { StatisticPeriod } from 'helpers/enums';

type Props = {
    selectedTimeId: number;
    handleTypeSelectClick: ({ id }: RadioSelectItemType) => void;
};

const selectItems = [
    { id: StatisticPeriod.TODAY, label: 'Сьогодні' },
    { id: StatisticPeriod.YESTERDAY, label: 'Вчора' },
    { id: StatisticPeriod.WEEK, label: 'Тиждене' },
    { id: StatisticPeriod.MONTH, label: 'Місяць' },
    { id: StatisticPeriod.YEAR, label: 'Рік' },
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
