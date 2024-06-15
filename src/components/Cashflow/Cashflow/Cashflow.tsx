import ItemsList from 'components/Ui/ItemsList';
import { TransactionBasicInfo } from 'services/types/transaction.types';
import { CashflowBox, TransactionListBox } from './Cashflow.styled';
import CashflowStatistic from './CashflowStatistic';
import TransactionBar from './TransactionBar';

type Props = { transactions: TransactionBasicInfo[] };

const Cashflow = ({ transactions }: Props) => {
    return (
        <CashflowBox>
            <CashflowStatistic />

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
