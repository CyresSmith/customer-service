import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'utils/theme';

export const NavWrapper = styled.div`
    font-size: ${theme.fontSizes.xl};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.space[3]};
`;

export const UsersOptions = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
`;

export const UserWrapper = styled.button`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
`;

export const UsersEmail = styled.p`
    color: ${theme.colors.secondary.light};
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.light};
`;

export const MenuButtonWrapper = styled.div`
    display: block;

    @media ${theme.breakpoints.desktop.media} {
        display: none;
    }
`;

export const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
`;

export const NavListItemLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    color: ${theme.colors.secondary.light};
    transition: ${theme.transition.primary};

    &:hover {
        color: ${theme.colors.primary.light};
    }
    &:focus-visible {
        color: ${theme.colors.primary.light};
    }
`;

export const StyledIcon = styled.svg`
    width: 25px;
    height: 25px;
    fill: ${theme.colors.secondary.light};
    transition: inherit;

    ${NavListItemLink}:hover & {
        fill: ${theme.colors.accent.light};
    }

    ${NavListItemLink}:focus-visible & {
        fill: ${theme.colors.accent.light};
    }
`;
