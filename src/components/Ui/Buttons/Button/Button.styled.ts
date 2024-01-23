import styled from 'styled-components';
import theme from 'utils/theme';
import { IButton } from './Button';

export const Btn = styled.button<IButton>`
  position: ${props => (props.$position ? props.$position : 'static')};
  display: flex;
  align-items: center;
  justify-content: center;
  top: ${props => (props.$top ? props.$top : null)};
  right: ${props => (props.$right ? props.$right : null)};
  color: ${props =>
    props.color
      ? props.theme.colors.text[props.color]
      : props.theme.colors.primary.light};
  background-color: ${props =>
    props.$bgColor ? props.theme.colors.bg[props.$bgColor] : 'transparent'};
  border-radius: ${props =>
    props.$type === 'text' ? props.theme.radii.s : props.theme.radii.round};
  padding: ${props =>
    props.$type === 'text' ? props.theme.space[2] : props.theme.space[2]};
  ${props =>
    props.$type === 'text' ? props.theme.space[4] : props.theme.space[2]};
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.bold};
  transition: ${theme.transition.primary};

  &:hover,
  :focus {
    background-color: ${props =>
      props.$type === 'text' ? props.theme.colors.primary.main : 'transparent'};
    color: ${theme.colors.primary.light};
  }
`;

export const StyledIcon = styled.svg`
  width: 25px;
  height: 25px;
  fill: ${theme.colors.accent.main};
  transition: ${theme.transition.primary};

  ${Btn}:hover & {
    fill: ${theme.colors.white};
  }
  ${Btn}:focus & {
    fill: ${theme.colors.white};
  }
`;
