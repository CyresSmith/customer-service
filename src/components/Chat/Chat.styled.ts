import styled from 'styled-components';
import theme from 'utils/theme';

const CHAT_WIDTH = '700px';

export const ChatBox = styled.div<{ $isOpen: boolean }>`
    width: ${CHAT_WIDTH};
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: 100%;
    gap: ${theme.space[3]};
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.m};
    height: calc(100vh - 146px);
    padding: ${theme.space[4]};
    position: fixed;
    top: 114px;
    right: ${({ $isOpen }) => ($isOpen ? '32px' : `-${CHAT_WIDTH}`)};
    transition: ${theme.transition.primary};
    z-index: 999;
    box-shadow: ${theme.shadow.m};
`;
