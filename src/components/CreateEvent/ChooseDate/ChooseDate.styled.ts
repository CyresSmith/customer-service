import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    height: 100%;
    display: flex;
    gap: ${theme.space[5]};
`;

export const SelectBox = styled.div`
    width: 100%;
    margin-top: ${theme.space[4]};
`;

export const CalendarBox = styled.div`
    width: fit-content;
    margin: 0 auto;
`;

export const Selected = styled.p`
    font-size: ${theme.fontSizes.xxl};
    margin: ${theme.space[5]} 0;
`;
