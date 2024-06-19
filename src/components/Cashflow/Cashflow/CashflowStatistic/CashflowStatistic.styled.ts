import styled from 'styled-components';
import theme from 'utils/theme';

export const StatisticBox = styled.section`
    padding-bottom: ${theme.space[4]};
    border-bottom: ${theme.borders.normal} ${theme.colors.secondary.main};
    display: flex;
    gap: ${theme.space[4]};
    align-items: flex-start;
`;

export const ChartBox = styled.div`
    height: 100%;
`;

export const CashboxList = styled.ul`
    display: flex;
    gap: ${theme.space[4]};
`;

export const Cashbox = styled.li`
    width: 200px;
    height: 200px;
    padding: ${theme.space[4]};
    border-radius: ${theme.radii.m};
    background-color: ${theme.colors.bg.main};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const CashboxTitle = styled.h5`
    font-size: ${theme.fontSizes.xl};
`;

export const CashboxBalance = styled.p`
    font-size: 30px;
    text-align: right;
    font-weight: ${theme.fontWeights.light};
`;
