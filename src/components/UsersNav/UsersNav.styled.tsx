import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavWrapper = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xl};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space[3]};
    margin-left: ${({ theme }) => theme.space[6]};
`

export const UsersOptions = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};

`

export const UsersEmail = styled.p`
    color: ${({ theme }) => theme.colors.button};
`

export const UsersAvatarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.componentsBg};
    position: relative;
    height: 40px;
    width: 40px;
    background-color: ${({ theme }) => theme.colors.accent};
    border-radius: ${({ theme }) => theme.radii.round};
`

export const UsersAvatar = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`

export const UsersNoAvatar = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    text-transform: uppercase;
`

export const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space[3]};
    padding: ${({ theme }) => theme.space[3]};
`

export const NavListItem = styled.li`
    
`

export const NavListItemLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.colors.white};
    transition: ${({ theme }) => theme.transition.primary};

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }
    &:focus-visible {
        color: ${({ theme }) => theme.colors.accent};
    }
`

export const NavListItemBtn = styled.button`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.colors.white};
    transition: ${({ theme }) => theme.transition.primary};

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }
    &:focus-visible {
        color: ${({ theme }) => theme.colors.accent};
    }
`

export const StyledIcon = styled.svg`
    width: 25px;
    height: 25px;
    fill: ${({ theme }) => theme.colors.white};
    transition: inherit;

    ${NavListItemBtn}:hover & {
        fill: ${({ theme }) => theme.colors.accent};
    }

    ${NavListItemBtn}:focus-visible & {
        fill: ${({ theme }) => theme.colors.accent};
    }

    ${NavListItemLink}:hover & {
        fill: ${({ theme }) => theme.colors.accent};
    }

    ${NavListItemLink}:focus-visible & {
        fill: ${({ theme }) => theme.colors.accent};
    }
`