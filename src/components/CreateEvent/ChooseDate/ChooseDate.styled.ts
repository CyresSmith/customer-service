import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    max-width: 260px;
    margin: ${theme.space[4]} auto 0;
    gap: ${theme.space[4]};
`;

export const SelectBox = styled.div`
    width: 100%;
    margin-bottom: ${theme.space[4]};
`;

export const CalendarBox = styled.div`
    width: fit-content;
    margin: 0 auto;
`;

export const Selected = styled.p`
    font-size: ${theme.fontSizes.xxl};
    margin: ${theme.space[5]} 0;
`;
