import styled from 'styled-components';
import theme from 'utils/theme';

export const STATISTIC_HIGHT = '400px';
export const TRANSACTION_BAR_HIGHT = '31px';

export const CashflowBox = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: ${STATISTIC_HIGHT} ${TRANSACTION_BAR_HIGHT} calc(
            100% - (${STATISTIC_HIGHT} + ${TRANSACTION_BAR_HIGHT} + (${theme.space[4]} * 2))
        );
    gap: ${theme.space[4]};
    max-height: 100%;
    overflow: hidden;
`;

export const TransactionListBox = styled.section`
    flex: 1;
    height: 100%;
`;
