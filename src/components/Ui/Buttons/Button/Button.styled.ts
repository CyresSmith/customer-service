import styled from 'styled-components';
import theme from 'utils/theme';
import { IButton } from './Button.types';
import buttonStyle from './dynamicButtonStyles';

export interface IButtonStyle
  extends Pick<
    IButton,
    '$colors' | 'size' | '$round' | '$variant' | '$isIcon' | '$iconPosition'
  > {
  $isIconThere: boolean;
  $shake?: boolean;
}

export const BTN_DISABLED_OPACITY = 0.65;

export const Btn = styled.button<IButtonStyle>`
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
        ${iconMargin()};
      }
    `;
  }}

  animation: ${({ $shake }) => ($shake ? theme.animation.shaking : 'none')} 2s
      ease-in-out infinite;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ $round }) =>
    $round ? theme.radii.round : theme.radii.s};

  font-weight: ${theme.fontWeights.bold};
  transition: ${theme.transition.primary};

  svg {
    transition: ${theme.transition.primary};
    opacity: ${({ disabled }) => (disabled ? `${BTN_DISABLED_OPACITY}` : 1)};
  }

  span {
    color: inherit;
    pointer-events: none;
  }

  &:disabled {
    opacity: ${BTN_DISABLED_OPACITY};
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
