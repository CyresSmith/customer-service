import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul<{ $side: string }>`
    position: absolute;
    top: 8px;
    left: ${props => props.$side === 'left' ? '0' : null};
    right: ${props => props.$side === 'right' ? '0' : null};
    width: 50px;
`

export const ListItem = styled.li<{$quarter: boolean, $half: boolean}>`
    width: 100%;
    text-align: center;
    height: ${theme.timeStep};
    font-size: ${props => props.$quarter || props.$half ? `${theme.fontSizes.m}` : `${theme.fontSizes.l}`};
    color: ${props => props.$quarter ? 'transparent' : props.$half ? `${theme.colors.secondary.main}` : `${theme.colors.secondary.light}`};
`

export const Time = styled.p`

`

