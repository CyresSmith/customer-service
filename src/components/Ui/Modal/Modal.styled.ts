import { LAYOUT_PADDING } from 'components/Layout/MainLayout/MainLayout.styled';
import styled from 'styled-components';
import theme from 'utils/theme';
import { Modal } from './Modal';

type Style = Pick<Modal, '$isOpen' | '$w' | '$h'>;

export const Backdrop = styled.div<Style>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.backdrop};
    opacity: ${props => (props.$isOpen ? 1 : 0)};
    transition: ${theme.transition.primary};
    backdrop-filter: blur(2px);
`;

export const ModalContainer = styled.div<Style>`
    z-index: 100;
    position: relative;
    height: ${({ $h }) => $h || 'unset'};
    width: calc(100% - ${LAYOUT_PADDING});
    max-height: 100%;
    padding: ${theme.space[5]};
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.l};
    opacity: ${props => (props.$isOpen ? 1 : 0)};
    transform: ${props => (props.$isOpen ? 'translate(0, 0)' : 'translate(0, 100%)')};
    transition: ${theme.transition.modal};
    box-shadow: ${theme.shadow.m};
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;

    @media ${theme.breakpoints.tablet.media} {
        width: ${props => (props.$w ? props.$w : '650px')};
        min-width: 400px;
        max-width: 90vw;
    }

    @media ${theme.breakpoints.desktop.media} {
        width: ${props => (props.$w ? props.$w : '850px')};
        min-width: 400px;
        max-width: 90vw;
    }
`;

export const ModalHeaderBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
    margin-bottom: ${theme.space[4]};
`;

export const Title = styled.h2<{ $titleMargin: string | undefined }>`
    font-size: ${theme.fontSizes.xxl};
    font-weight: ${theme.fontWeights.light};
    margin-bottom: ${props => (props.$titleMargin ? props.$titleMargin : theme.space[6])};
    position: relative;

    &:after {
        content: '';
        position: absolute;
        bottom: -${theme.space[3]};
        left: 0;
        height: 1px;
        width: 100%;
        background-color: #fff;
    }
`;

export const ButtonBox = styled.div`
    position: absolute;
    top: ${theme.space[3]};
    right: ${theme.space[3]};
`;
