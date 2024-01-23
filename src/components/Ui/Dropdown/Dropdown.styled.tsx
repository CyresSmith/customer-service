import styled from 'styled-components';
import { Props } from './Dropdown';

export const DropWrapper = styled.div<Pick <Props, '$isOpen'>>`
    position: absolute;
    top: 100%;
    right: 0;
    /* height: 100px; */
    background-color: ${({ theme }) => theme.colors.mainBg};
    padding: ${({ theme }) => theme.space[3]};
    border: ${({ theme }) => theme.borders.normal} ${({ theme }) => theme.colors.componentsBg};
    border-radius: ${({ theme }) => theme.radii.xs};
    height: ${props => props.$isOpen ? '115px' : '0'};
    transition: ${({ theme }) => theme.transition.primary};
    overflow: hidden;
`

export const DropListItem = styled.li`
    
`