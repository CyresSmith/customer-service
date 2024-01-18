import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const List = styled.ul`
    color: ${({ theme }) => theme.colors.linkText};
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space[2]};
`;

export const ListItem = styled.li`
    
`;

export const ListItemLink = styled(NavLink)`
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};
    border-radius: ${({ theme }) => theme.radii.s};
    transition: ${({ theme }) => theme.transition.primary};

    &:hover,
    :focus {
        background-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.componentsBg};
    }
`

export const StyledIcon = styled.svg`
    width: 25px;
    height: 25px;
    transition: ${({ theme }) => theme.transition.primary};

    ${ListItemLink}:hover & {
        fill: ${({ theme }) => theme.colors.componentsBg};
    }
`