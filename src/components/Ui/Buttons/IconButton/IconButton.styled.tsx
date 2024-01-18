import styled from 'styled-components';
import { IButton } from '../Button/Button';

export const Btn = styled.button<IButton>`
    padding: ${({ theme }) => theme.space[3]};
    border-radius: ${({ theme }) => theme.radii.round};
    transition: ${({ theme }) => theme.transition.primary};
    position: ${props => props.$position ? props.$position : 'static'};
    top: ${props => props.$top ? props.$top : null};
    right: ${props => props.$right ? props.$right : null};
    background-color: ${({ theme }) => theme.colors.accent};

    &:hover,
    :focus {
        background-color: ${({ theme }) => theme.colors.componentsBg};
    }
`

export const StyledIcon = styled.svg`
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.colors.componentsBg};
    transition: ${({ theme }) => theme.transition.primary};

    ${Btn}:hover & {
        fill: ${({ theme }) => theme.colors.accent};
    }
    ${Btn}:focus & {
        fill: ${({ theme }) => theme.colors.accent};
    }
`