import styled from 'styled-components';
import { Modal } from './Modal';

type Style = Pick<Modal, 'open' | '$w' | '$h'>;

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
    background-color: ${({ theme }) => theme.colors.backdrop};
    opacity: ${props => props.open ? 1 : 0};
    transition: ${({ theme }) => theme.transition.primary};
`

export const ModalContainer = styled.div<Style>`
    z-index: 100;
    position: relative;
    width: ${props => props.$w ? props.$w : 'fit-content'};
    height: ${props => props.$h ? props.$h : 'fit-content'};
    padding: ${({ theme }) => theme.space[5]};
    background-color: ${({ theme }) => theme.colors.mainBg};
    border-radius: ${({ theme }) => theme.radii.s};
    opacity: ${props => props.open ? 1 : 0};
    transform: ${props => props.open ? 'translate(0, 0)' : 'translate(100%, 0)'};
    transition: ${({ theme }) => theme.transition.primary};
    box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37);
    -webkit-box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37);
    -moz-box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37);
`