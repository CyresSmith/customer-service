import styled from 'styled-components';
import theme from 'utils/theme';

export const CashboxDetailsBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
    margin-bottom: ${theme.space[5]};
`;

export const DetailsBox = styled.p`
    display: grid;
    gap: ${theme.space[4]};
    grid-template-columns: max-content 1fr;
    grid-template-rows: auto;
`;

export const DetailName = styled.span`
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.bold};
`;

export const Detail = styled.span`
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.light};
    text-align: right;
`;
