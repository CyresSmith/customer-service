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
  width: ${props => (props.$w ? props.$w : 'auto')};
  height: ${props => (props.$h ? props.$h : 'auto')};
  min-width: 360px;
  padding: ${theme.space[5]};
  background-color: ${theme.colors.bg.main};
  border-radius: ${theme.radii.s};
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  transform: ${props =>
    props.$isOpen ? 'translate(0, 0)' : 'translate(100%, 0)'};
  transition: ${theme.transition.modal};
  box-shadow: ${theme.shadow.m};
`;

export const Title = styled.h2`
  font-size: ${theme.fontSizes.xxl};
  font-weight: ${theme.fontWeights.light};
  margin-bottom: ${theme.space[6]};
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
