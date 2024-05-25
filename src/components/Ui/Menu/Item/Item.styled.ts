import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'utils/theme';
import { Size } from '../Menu.styled';

type IsItemOpen = {
    $isOpen: boolean;
};

interface Item extends IsItemOpen, Size {}

type IsIcon = {
    $isIcon: boolean;
};

export const ItemBox = styled.li<Item>`
    > button,
    a {
        padding: ${({ $menuSize }) =>
            $menuSize === 'l'
                ? `${theme.space[2]} ${theme.space[3]}`
                : `${theme.space[1]} ${theme.space[3]}`};

        &:hover {
            color: ${theme.colors.bg.main};
            background-color: ${theme.colors.secondary.light};

            > svg {
                fill: ${theme.colors.bg.main};
            }
        }
    }

    a.active {
        color: ${theme.colors.bg.main};
        background-color: ${theme.colors.primary.light};

        > svg {
            fill: ${theme.colors.bg.main};
        }
    }

    > button {
        color: ${({ $isOpen, $menuSize }) => {
            if ($menuSize === 'l') {
                return $isOpen ? theme.colors.accent.main : theme.colors.secondary.light;
            }

            return $isOpen ? theme.colors.primary.light : theme.colors.secondary.light;
        }};
    }

    &:not(:last-of-type) {
        margin-bottom: ${({ $menuSize }) => ($menuSize === 'l' ? theme.space[3] : theme.space[2])};
    }
`;

export const ItemChevron = styled.svg<Item>`
    width: 20px;
    height: 20px;
    margin-left: auto;
    fill: ${({ $isOpen, $menuSize }) => {
        if ($menuSize === 'l') {
            return $isOpen ? theme.colors.accent.main : theme.colors.secondary.light;
        }

        return $isOpen ? theme.colors.primary.light : theme.colors.secondary.light;
    }};
    transition: ${theme.transition.primary};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0)')};
`;

export const StyledIcon = styled.svg<Item>`
    width: ${({ $menuSize }) => ($menuSize === 'l' ? '25px' : '20px')};
    height: ${({ $menuSize }) => ($menuSize === 'l' ? '25px' : '20px')};
    fill: ${({ $isOpen, $menuSize }) => {
        if ($menuSize === 'l') {
            return theme.colors.accent.main;
        }

        return $isOpen ? theme.colors.primary.light : theme.colors.secondary.light;
    }};
    transition: ${theme.transition.primary};
`;

export const ItemLink = styled(NavLink)`
    width: 100%;
    display: flex;
    color: ${theme.colors.secondary.light};
    align-items: center;
    transition: ${theme.transition.primary};
    border-radius: ${theme.radii.m};
`;

export const Label = styled.span<IsIcon>`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-width: calc(100% - 20px);
    margin-left: ${({ $isIcon }) => ($isIcon ? theme.space[3] : 0)};
`;

export const ChildrenBox = styled.li<Item>`
    max-height: ${({ $isOpen }) => ($isOpen ? '50vh' : 0)};
    margin-left: ${({ $menuSize }) => ($menuSize === 'l' ? theme.space[6] : theme.space[3])};
    margin-bottom: ${({ $isOpen }) => ($isOpen ? theme.space[3] : 0)};
    padding-bottom: ${({ $isOpen }) => ($isOpen ? theme.space[3] : 0)};
    overflow: hidden;
    transition: ${theme.transition.primary};
    position: relative;

    :after {
        content: '';
        height: 1px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: ${({ $menuSize }) =>
            $menuSize === 'l' ? theme.colors.accent.main : theme.colors.primary.light};
    }
`;
