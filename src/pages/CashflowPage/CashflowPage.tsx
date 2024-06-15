import Cashflow from 'components/Cashflow/Cashflow';
import CashflowBar from 'components/Cashflow/CashflowBar';
import PageContentLayout from 'components/Layout/PageContentLayout';
import { getDate, getMonth, getYear } from 'date-fns';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { useGetTransactionsByParamsQuery } from 'services/cashbox.api';
import { GetTransactionsParams, TransactionTimeParams } from 'services/types/transaction.types';

const today = new Date(Date.now());

const todayParams = {
    year: getYear(today),
    month: getMonth(today),
    day: getDate(today),
};

const CashflowPage = () => {
    const { id: companyId } = useCompany();

    const [transactionParams, setTransactionParams] = useState<GetTransactionsParams>({
        companyId,
        ...todayParams,
    });

    const { data: transactions } = useGetTransactionsByParamsQuery(transactionParams, {
        refetchOnMountOrArgChange: true,
        skip: !companyId,
    });

    const handleSetParams = (params: Partial<TransactionTimeParams>) => {
        setTransactionParams(p => ({ companyId: p.companyId, ...params }));
    };

    const setTodayParams = () => {
        setTransactionParams(p => ({ ...p, ...todayParams }));
    };

    return (
        <PageContentLayout
            bar={
                <CashflowBar
                    transactionParams={transactionParams}
                    setTransactionsParams={handleSetParams}
                    setTodayParams={setTodayParams}
                    todayParams={todayParams}
                />
            }
            content={<Cashflow transactions={transactions || []} />}
        />
    );
};

export default CashflowPage;
