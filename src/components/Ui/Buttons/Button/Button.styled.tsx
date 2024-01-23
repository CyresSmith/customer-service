import styled from 'styled-components';
import { IButton } from './Button';

export const Btn = styled.button<IButton>`
    position: ${props => props.$position ? props.$position : 'static'};
    display: flex;
    align-items: center;
    justify-content: center;
    top: ${props => props.$top ? props.$top : null};
    right: ${props => props.$right ? props.$right : null};
    color: ${props => props.color ? props.theme.colors[props.color] : props.theme.colors.componentBg};
    background-color: ${props => props.$bgColor ? props.theme.colors[props.$bgColor] : 'transparent'};
    border-radius: ${props => props.$type === 'text' ? props.theme.radii.s : props.theme.radii.round};
    padding: ${props => props.$type === 'text' ? props.theme.space[2] : props.theme.space[2]} ${props => props.$type === 'text' ? props.theme.space[4] : props.theme.space[2]};
    font-size: ${({ theme }) => theme.fontSizes.l};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    transition: ${({ theme }) => theme.transition.primary};

    &:hover,
    :focus {
        background-color: ${props => props.$type === 'text' ? props.theme.colors.accent : 'transparent'};
        color: ${({ theme }) => theme.colors.componentsBg};
    }
`

export const StyledIcon = styled.svg`
    width: 25px;
    height: 25px;
    fill: ${({ theme }) => theme.colors.button};
    transition: ${({ theme }) => theme.transition.primary};

    ${Btn}:hover & {
        fill: ${({ theme }) => theme.colors.accent};
    }
    ${Btn}:focus & {
        fill: ${({ theme }) => theme.colors.accent};
    }
`