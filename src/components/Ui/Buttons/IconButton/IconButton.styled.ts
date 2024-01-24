import styled from 'styled-components';
import theme from 'utils/theme';
import { IButton } from '../Button/Button';

export const Btn = styled.button<IButton>`
  padding: ${theme.space[3]};
  border-radius: ${theme.radii.round};
  transition: ${theme.transition.primary};
  position: ${props => (props.$position ? props.$position : 'static')};
  top: ${props => (props.$top ? props.$top : null)};
  right: ${props => (props.$right ? props.$right : null)};
  background-color: ${theme.colors.bg.main};

  &:hover,
  :focus {
    background-color: ${theme.colors.bg.main};
  }
`;

export const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: ${theme.colors.bg.main};
  transition: ${theme.transition.primary};

  ${Btn}:hover & {
    fill: ${theme.colors.accent.main};
  }
  ${Btn}:focus & {
    fill: ${theme.colors.accent.main};
  }
`;
