import styled from 'styled-components';
import { IModal } from './Modal';

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ModalContainer = styled.div<IModal>`
    z-index: 100;
    position: relative;
    width: 300px;
    height: 500px;
    background-color: ${({ theme }) => theme.colors.mainBg};
    border-radius: ${({ theme }) => theme.radii.s};
    opacity: ${props => props.open ? 1 : 0};
    transform: ${props => props.open ? 'translate(0, 0)' : 'translate(-100%, 0)'};
    transition: ${({ theme }) => theme.transition.primary};
`