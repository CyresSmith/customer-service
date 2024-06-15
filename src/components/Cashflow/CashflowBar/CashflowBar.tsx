import RadioSelect, { RadioSelectItemType } from 'components/Ui/RadioSelect/RadioSelect';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { useGetCashboxesQuery } from 'services/cashbox.api';
import { GetTransactionsParams, TransactionTimeParams } from 'services/types/transaction.types';

type Props = {
    transactionParams: GetTransactionsParams;
    setTransactionsParams: (params: Partial<TransactionTimeParams>) => void;
    setTodayParams: () => void;
    todayParams: TransactionTimeParams;
};

const selectItems = [
    { id: 1, label: 'Сьогодні' },
    { id: 2, label: 'Вчьора' },
    { id: 3, label: 'Місяць' },
    { id: 4, label: 'Рік' },
];

const CashflowBar = ({
    transactionParams,
    setTransactionsParams,
    setTodayParams,
    todayParams,
}: Props) => {
    const { id: companyId } = useCompany();
    const [selectedTimeId, setSelectedTimeId] = useState(1);

    const { data: cashboxes } = useGetCashboxesQuery({ companyId }, { skip: !companyId });
    const { year: selectedYear, month: selectedMonth, day: selectedDay } = transactionParams;
    const { year, month, day } = todayParams;

    const handleTypeSelectClick = ({ id }: RadioSelectItemType) => {
        setSelectedTimeId(+id);

        switch (id) {
            case 1:
                return setTodayParams();

            case 2:
                return setTransactionsParams({ ...todayParams, day: day - 1 });

            case 3:
                return setTransactionsParams({ year, month });

            case 4:
                return setTransactionsParams({ year });

            default:
                break;
        }
    };

    const dateType = selectedTimeId === 3 ? 'month' : selectedTimeId === 4 ? 'year' : 'day';

    const DateSwitcherDate =
        selectedTimeId === 3
            ? selectedYear && selectedMonth && new Date(selectedYear, selectedMonth)
            : selectedTimeId === 4
            ? selectedYear && new Date(selectedYear)
            : selectedYear &&
              selectedMonth &&
              selectedDay &&
              new Date(selectedYear, selectedMonth, selectedDay);

    return (
        <div>
            <RadioSelect
                width={350}
                items={selectItems}
                selectedItemId={selectedTimeId}
                onSelect={handleTypeSelectClick}
            />

            {/* <DateSwitcher dateType={dateType} date={} /> */}
        </div>
    );
};

export default CashflowBar;
