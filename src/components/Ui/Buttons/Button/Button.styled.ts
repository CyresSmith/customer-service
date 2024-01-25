import styled from 'styled-components';
import { IButton } from 'types';
import theme from 'utils/theme';
import buttonStyle from './dinamicButtonStyles';

export const Btn = styled.button<IButton>`
  ${p => {
    const {
      color,
      backgroundColor,
      fontSize,
      hoverBackgroundColor,
      iconSize,
      padding,
      iconMargin,
    } = buttonStyle(p);

    return `color ${color()};
      background-color: ${backgroundColor()};
      font-size: ${fontSize()};
      padding: ${padding()};
      &:hover,
      :focus {
          background-color: ${hoverBackgroundColor()};
          transform: scale(1.005);
      }   
      svg {          
          width: ${iconSize()};
          height: ${iconSize()};
          fill: ${color()};
          transition: ${theme.transition.primary};
      }
      span {
        margin-left: ${iconMargin()};
      }
    `;
  }}

  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ $round }) =>
    $round ? theme.radii.round : theme.radii.s};

  font-weight: ${theme.fontWeights.bold};
  transition: ${theme.transition.primary};

  svg {
    transition: ${theme.transition.primary};
    opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  }
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 1s linear 0s infinite;
  transform-origin: center center;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
