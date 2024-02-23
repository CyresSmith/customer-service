import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul<{$wh: number}>`
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-rows: repeat($wh, ${theme.timeStep});
    
    &:not(:last-child) {
        border-right: ${theme.borders.normal} ${theme.colors.bg.light};
    }
`

export const ListItem = styled.li<{ $skip: boolean, $isHour: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${theme.timeStep};
    background-color: ${props => props.$skip ? 'rgba(17, 17, 20, 0.5)' : 'none'};
    pointer-events: ${props => props.$skip ? 'none' : 'all'};
    transition: ${theme.transition.primary};
    border-top: ${props => props.$isHour ? `${theme.borders.normal} ${theme.colors.secondary.light}` : 'none'};
    cursor: ${props => props.$skip ? 'not-allowed' : 'pointer'};

    &:hover {
        background-color: ${theme.colors.bg.light};
    }

    &:first-child {
        border-top: ${theme.borders.normal} ${theme.colors.secondary.light};
    }

    &:last-child {
        border-bottom: ${theme.borders.normal} ${theme.colors.secondary.light};
    }
`

export const Time = styled.p`
    font-size: ${theme.fontSizes.l};
    color: ${theme.colors.bg.dark};
    opacity: 0;
    transition: ${theme.transition.primary};

    ${ListItem}:hover & {
        opacity: 1;
    }
`