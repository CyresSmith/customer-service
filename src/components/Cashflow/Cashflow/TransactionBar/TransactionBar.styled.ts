import styled from 'styled-components';
import theme from 'utils/theme';

export const TransactionBarBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${theme.space[5]};
`;

export const LeftSide = styled.div`
    display: flex;
    gap: ${theme.space[3]};
`;

export const RightSide = styled.ul`
    display: flex;
    gap: ${theme.space[3]};
`;

export const TransactionFormBox = styled.div`
    /* min-height: 500px; */
`;
