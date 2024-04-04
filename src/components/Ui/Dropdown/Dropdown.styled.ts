import styled from 'styled-components';
import theme from 'utils/theme';
import { Props } from './Dropdown';

export const DropWrapper = styled.div<Pick<Props, '$isOpen'>>`
    position: absolute;
    z-index: 100;
    top: calc(100% + ${theme.space[3]});
    right: 0;
    background-color: ${theme.colors.bg.main};
    /* border: ${theme.borders.normal} ${theme.colors.bg.main}; */
    border-radius: ${theme.radii.m};
    display: flex;
    max-height: ${props => (props.$isOpen ? '1000px' : '0')};
    transition: ${theme.transition.primary};
    box-shadow: ${theme.shadow.m};
    overflow: hidden;
`;

export const DropdownContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space[3]};
    overflow: hidden;
    padding: ${theme.space[3]};
`;
