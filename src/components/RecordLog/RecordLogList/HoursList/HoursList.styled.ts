import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    /* border-radius: ${theme.radii.m}; */
    background-color: ${theme.colors.bg.main};
    display: flex;
    padding: ${theme.space[4]} 50px;
    overflow: hidden;
`

export const TableList = styled.ul`
    width: 100%;
`

export const TableListItem = styled.li`
    min-width: 100%;
    min-height: 25px;
    border-bottom: ${theme.borders.normal} ${theme.colors.secondary.dark};

    &:first-child {
        border-top: ${theme.borders.normal} ${theme.colors.secondary.dark};
    }
`

export const List = styled.ul<{ $side: string }>`
    position: absolute;
    top: 7px;
    left: ${props => props.$side === 'left' ? '0' : null};
    right: ${props => props.$side === 'rigth' ? '0' : null};
    width: 50px;
`

export const ListItem = styled.li`
    width: 100%;
    text-align: center;
    
    &:not(:last-child) {
        height: 100px;
    }
`

export const Hour = styled.div`
    height: 25px;
    border-bottom: ${theme.borders.normal} transparent;
    font-size: ${theme.fontSizes.l};
    color: ${theme.colors.secondary.light};
`

export const Half = styled(Hour)`
    font-size: ${theme.fontSizes.m};
    color: ${theme.colors.secondary.main};
`

export const Quarter = styled(Half)`
    color: transparent;
`

export const Time = styled.p`

`

