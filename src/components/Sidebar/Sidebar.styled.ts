import { LAYOUT_GAP, LAYOUT_PADDING } from 'components/Layout/MainLayout/MainLayout.styled';
import { HEADER_HIGHT } from 'components/TopBar/TopBar.styled';
import styled from 'styled-components';
import theme from 'utils/theme';

export const MenuList = styled.ul<{ $isOpen: boolean }>`
    font-size: ${theme.fontSizes.xl};
    background-color: ${theme.colors.bg.dark};
    padding: ${LAYOUT_PADDING};
    border-radius: ${theme.radii.l};
    box-shadow: ${theme.shadow.m};
    min-width: 150px;
    max-width: 250px;
    position: fixed;
    right: ${LAYOUT_PADDING};
    top: calc(${HEADER_HIGHT} + ${LAYOUT_GAP} + ${LAYOUT_PADDING});
    z-index: 999;
    transition: ${theme.transition.primary};

    @media ${theme.breakpoints.mobile.media} {
        transform: ${({ $isOpen }) => ($isOpen ? `` : `translateX(110%)`)};
    }

    @media ${theme.breakpoints.tablet.media} {
        transform: ${({ $isOpen }) => ($isOpen ? `` : `translateX(110%)`)};
    }

    @media ${theme.breakpoints.desktop.media} {
        position: static;
        height: 100%;
        z-index: unset;
    }
`;
