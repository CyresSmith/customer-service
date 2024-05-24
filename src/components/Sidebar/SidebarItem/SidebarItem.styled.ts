import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'utils/theme';

type IsItemOpen = {
    $isOpen: boolean;
};

type IsIcon = {
    $isIcon: boolean;
};

type Item = IsItemOpen;

export const ItemBox = styled.li<Item>`
    > button,
    a {
        padding: ${theme.space[2]} ${theme.space[3]};

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
        color: ${({ $isOpen }) =>
            $isOpen ? theme.colors.accent.main : theme.colors.secondary.light};
    }

    &:not(:first-of-type) {
        margin-top: ${theme.space[3]};
    }
`;

const CHEVRON_SIZE = '20px';

export const ItemChevron = styled.svg<Item>`
    width: ${CHEVRON_SIZE};
    height: ${CHEVRON_SIZE};
    margin-left: auto;
    fill: ${({ $isOpen }) => ($isOpen ? theme.colors.accent.main : theme.colors.secondary.light)};
    transition: ${theme.transition.primary};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0)')};
`;

const ICON_SIZE = '25px';

export const StyledIcon = styled.svg<Item>`
    width: ${ICON_SIZE};
    height: ${ICON_SIZE};
    fill: ${({ $isOpen }) => ($isOpen ? theme.colors.primary.light : theme.colors.accent.main)};
    transition: ${theme.transition.primary};
`;

export const ItemLink = styled(NavLink)`
    width: 100%;
    display: flex;
    color: ${theme.colors.secondary.light};
    align-items: center;
    transition: ${theme.transition.primary};
    border-radius: ${theme.radii.xs};
`;

export const Label = styled.span<IsIcon>`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-width: ${({ $isIcon }) => ($isIcon ? '75%' : '100%')};
    margin-left: ${({ $isIcon }) => ($isIcon ? theme.space[3] : 0)};
`;

export const ChildrenBox = styled.li<Item>`
    margin-top: ${({ $isOpen }) => ($isOpen ? theme.space[3] : 0)};
    max-height: ${({ $isOpen }) => ($isOpen ? '50vh' : 0)};
    margin-left: ${theme.space[6]};
    /* margin-bottom: ${({ $isOpen }) => ($isOpen ? theme.space[3] : 0)}; */
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
        background-color: ${theme.colors.accent.main};
    }
`;
