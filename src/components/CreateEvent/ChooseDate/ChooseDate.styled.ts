import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    max-height: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media ${theme.breakpoints.desktop.media} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        gap: ${theme.space[5]};
        height: 100%;
        min-width: 380px;
    }
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
