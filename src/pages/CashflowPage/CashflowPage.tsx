import Cashflow from 'components/Cashflow/Cashflow';
import CashflowBar from 'components/Cashflow/CashflowBar';
import PageContentLayout from 'components/Layout/PageContentLayout';
import { RadioSelectItemType } from 'components/Ui/RadioSelect/RadioSelect';
import {
    addDays,
    endOfDay,
    endOfMonth,
    endOfWeek,
    endOfYear,
    startOfDay,
    startOfMonth,
    startOfWeek,
    startOfYear,
} from 'date-fns';
import { StatisticPeriod } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { useGetTransactionsPeriodQuery } from 'services/cashbox.api';

export type Period = { from: Date; to: Date };

const CashflowPage = () => {
    const { id: companyId } = useCompany();

    const today = new Date();

    const todayParams = {
        from: startOfDay(today),
        to: endOfDay(today),
    };

    const [selectedTimeId, setSelectedTimeId] = useState(StatisticPeriod.TODAY);
    const [periodParams, setPeriodParams] = useState<Period>(todayParams);

    const { from, to } = periodParams;

    const { data: transactions, isError } = useGetTransactionsPeriodQuery(
        { companyId, from: from.toISOString(), to: to.toISOString() },
        {
            refetchOnMountOrArgChange: true,
            skip: !companyId,
        }
    );

    const setTodayParams = () => setPeriodParams(todayParams);

    const handleTypeSelectClick = ({ id }: RadioSelectItemType) => {
        setSelectedTimeId(+id);

        switch (id) {
            case 1:
                return setTodayParams();

            case 2:
                return setPeriodParams({
                    from: addDays(todayParams.from, -1),
                    to: addDays(todayParams.to, -1),
                });

            case 3:
                return setPeriodParams({
                    from: startOfWeek(todayParams.from),
                    to: endOfWeek(todayParams.to),
                });

            case 4:
                return setPeriodParams({
                    from: startOfMonth(todayParams.from),
                    to: endOfMonth(todayParams.to),
                });

            case 5:
                return setPeriodParams({
                    from: startOfYear(todayParams.from),
                    to: endOfYear(todayParams.to),
                });

            default:
                break;
        }
    };

    useEffect(() => {
        if (isError) setSelectedTimeId(p => p);
    }, [isError]);

    return (
        <PageContentLayout
            bar={
                <CashflowBar
                    selectedTimeId={selectedTimeId}
                    handleTypeSelectClick={handleTypeSelectClick}
                />
            }
            content={<Cashflow transactions={transactions || []} period={periodParams} />}
        />
    );
};

export default CashflowPage;
