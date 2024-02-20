import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul`
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    background-color: ${theme.colors.bg.main};
    pointer-events: none;
`

export const ListItem = styled.li`
    min-width: 100%;
    min-height: 50px;
    
    &:not(:last-child) {
        border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
    }
`

