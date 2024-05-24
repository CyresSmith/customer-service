import { LAYOUT_GAP, LAYOUT_PADDING } from 'components/Layout/MainLayout/MainLayout.styled';
import { HEADER_HIGHT } from 'components/TopBar/TopBar.styled';
import styled from 'styled-components';
import theme from 'utils/theme';

const CHAT_WIDTH = '900px';

export const ChatBox = styled.div<{ $isOpen: boolean }>`
    width: calc(100vw - (${LAYOUT_PADDING} * 2));
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100%;
    gap: ${theme.space[4]};
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.s};
    height: calc(100vh - (${HEADER_HIGHT} + (${LAYOUT_PADDING} * 2) + ${LAYOUT_GAP}));
    padding: ${theme.space[4]};
    position: fixed;
    top: calc(${HEADER_HIGHT} + ${LAYOUT_PADDING} + ${LAYOUT_GAP});
    right: ${LAYOUT_PADDING};
    transform: ${({ $isOpen }) => ($isOpen ? `` : `translateX(110%)`)};
    transition: ${theme.transition.primary};
    z-index: 999;
    box-shadow: ${theme.shadow.m};

    @media ${theme.breakpoints.desktop.media} {
        grid-template-columns: 300px 1fr;
        width: ${CHAT_WIDTH};
        right: ${LAYOUT_PADDING};
        height: calc(100vh - (${HEADER_HIGHT} + (${LAYOUT_PADDING} * 2) + ${LAYOUT_GAP}));
    }

    @media ${theme.breakpoints.tablet.media} {
        grid-template-columns: 200px 1fr;
        width: calc(100% - (${LAYOUT_PADDING} * 2));
        right: ${LAYOUT_PADDING};
        height: calc(100vh - (${HEADER_HIGHT} + (${LAYOUT_PADDING} * 2) + ${LAYOUT_GAP}));
    }
`;
