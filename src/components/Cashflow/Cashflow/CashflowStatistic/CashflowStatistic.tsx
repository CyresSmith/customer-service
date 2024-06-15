import { useCompany } from 'hooks/useCompany';
import { useGetCashboxesQuery } from 'services/cashbox.api';
import {
    Cashbox,
    CashboxBalance,
    CashboxList,
    CashboxTitle,
    StatisticBox,
} from './CashflowStatistic.styled';

type Props = {};

const CashflowStatistic = (props: Props) => {
    const { id: companyId } = useCompany();

    const { data: cashboxes, isLoading: isCashboxesLoading } = useGetCashboxesQuery(
        { companyId },
        { skip: !companyId }
    );

    return (
        <StatisticBox>
            <CashboxList>
                {cashboxes?.map(({ id, name, balance }) => (
                    <Cashbox key={id}>
                        <CashboxTitle>{name}</CashboxTitle>
                        <CashboxBalance>{balance}.00 грн</CashboxBalance>
                    </Cashbox>
                ))}
            </CashboxList>
        </StatisticBox>
    );
};

export default CashflowStatistic;
