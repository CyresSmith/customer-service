import styled from 'styled-components';
import { IButton } from './Button';

export const Btn = styled.button<IButton>`
    color: ${props => props.color ? props.theme.colors[props.color] : 'inherit'};
    background-color: ${props => props.bgColor ? props.theme.colors[props.bgColor] : 'transparent'};
    border-radius: ${({ theme }) => theme.radii.s};
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
    font-size: ${({ theme }) => theme.fontSizes.l};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    transition: ${({ theme }) => theme.transition.primary};

    &:hover,
    :focus {
        background-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.componentsBg};
    }
`