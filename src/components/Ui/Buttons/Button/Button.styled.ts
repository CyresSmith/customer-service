import styled from 'styled-components';
import theme from 'utils/theme';
import { IButton } from './Button.types';
import buttonStyle from './dynamicButtonStyles';

export const Btn = styled.button<IButton>`
  ${p => {
    const {
      color,
      backgroundColor,
      fontSize,
      hoverColor,
      hoverBackgroundColor,
      iconSize,
      padding,
      iconMargin,
    } = buttonStyle(p);

    return `
      color: ${color()};
      background-color: ${backgroundColor()};      
      font-size: ${fontSize()};
      padding: ${padding()};

      &:hover:not(:disabled),
      :focus:not(:disabled) {
          color: ${hoverColor()};
          background-color: ${hoverBackgroundColor()};
          transform: scale(1.005);

          svg {
          fill: ${hoverColor()};
        }
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

  span {
    color: inherit;
  }

  &:disabled {
    opacity: 0.65;
    cursor: default;
  }
`;

export const Loader = styled.svg`
  animation: spin 1.5s linear 0s infinite;
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
