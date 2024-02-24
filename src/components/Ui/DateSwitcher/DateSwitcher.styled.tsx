import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
`

export const DateWrapper = styled.div`
    text-align: center;
    width: 150px;
    padding: ${theme.space[3]};
    border: ${theme.borders.normal} ${theme.colors.bg.light};
    border-radius: ${theme.radii.s};
`

export const DateValue = styled.p`
    font-size: ${theme.fontSizes.l};

    &::first-letter {
        text-transform: uppercase;
    }
`