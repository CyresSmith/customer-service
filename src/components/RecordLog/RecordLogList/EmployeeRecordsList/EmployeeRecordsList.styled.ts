import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul<{$wh: number}>`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${props => props.$wh}, 25px);
`

export const ListItem = styled.li<{$from: number, $to: number}>`
    display: grid;
    width: 100%;
    grid-row: ${props => props.$from} / ${props => props.$to};
    padding: ${theme.space[0]};
`

export const ListItemContent = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.primary.rgba};
    border-radius: ${theme.radii.s};
`