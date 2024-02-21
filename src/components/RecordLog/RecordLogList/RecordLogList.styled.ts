import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul<{$wh: number}>`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(4, 0.25fr);
    grid-template-rows: 1fr;
    padding: ${theme.space[4]} 50px;
    width: 100%;
    height: ${props => props.$wh * 50}px;
    margin: 0 auto;
`

export const ListItem = styled.li<{$wh: number}>`
    width: 100%;
    height: 100%;
    
    &:not(:last-child) {
        border-right: ${theme.borders.normal} ${theme.colors.bg.dark};
    }
`