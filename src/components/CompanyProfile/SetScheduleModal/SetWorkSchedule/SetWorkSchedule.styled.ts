import styled from 'styled-components';
import theme from 'utils/theme';

export const DayList = styled.ul`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
`;

export const WeekBox = styled.div`
    display: flex;
    gap: ${theme.space[5]};
`;

export const Time = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.secondary.light};
`;
