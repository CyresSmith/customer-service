import ItemsList from 'components/Ui/ItemsList';
import { Transaction } from 'services/types/transaction.types';
import { CashflowBox, TransactionListBox } from './Cashflow.styled';
import CashflowStatistic from './CashflowStatistic';
import TransactionBar from './TransactionBar';
import { Period } from 'pages/CashflowPage/CashflowPage';

type Props = { transactions: Transaction[]; period: Period };

const Cashflow = ({ transactions, period }: Props) => {
    return (
        <CashflowBox>
            <CashflowStatistic transactions={transactions} period={period} />

            <TransactionBar />

            <TransactionListBox>
                <ItemsList
                    listHeader={false}
                    items={transactions.map(({ id, amount, type }) => ({ id, amount, name: type }))}
                />
            </TransactionListBox>
        </CashflowBox>
    );
};

export default Cashflow;
