import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.space[5]};
`;

export const SelectBox = styled.div`
    /* margin: 0 auto; */
`;

export const CalendarBox = styled.div`
    width: fit-content;
    margin: 0 auto;
`;
