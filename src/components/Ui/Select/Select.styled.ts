import styled from 'styled-components';
import theme from 'utils/theme';
import { BTN_DISABLED_OPACITY } from '../Buttons/Button/Button.styled';
import buttonStyle from '../Buttons/Button/dynamicButtonStyles';
import { ISelectStyle } from './select.types';

export const SelectBox = styled.div`
  position: relative;
`;

export const SelectEl = styled.div<ISelectStyle>`
  ${p => {
    const {
      color,
      backgroundColor,
      fontSize,
      hoverColor,
      hoverBackgroundColor,
      iconSize,
      padding,
    } = buttonStyle(p);

    return `
      color: ${color()};
      background-color: ${backgroundColor()};      
      font-size: ${fontSize()};
      padding: ${padding()};

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
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
    `;
  }}
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radii.s};
  font-weight: ${theme.fontWeights.bold};
  transition: ${theme.transition.primary};
  min-width: 90px;

  > svg {
    transition: ${theme.transition.primary};
    opacity: ${({ disabled }) => (disabled ? `${BTN_DISABLED_OPACITY}` : 1)};
    margin-left: auto;
  }

  span {
    color: inherit;
    margin-right: ${theme.space[2]};
  }

  &:disabled {
    opacity: ${BTN_DISABLED_OPACITY};
    cursor: default;
  }
`;

interface IsOpen extends ISelectStyle {
  $isOpen: boolean;
}

export const List = styled.ul<IsOpen>`
  ${p => {
    const { color, backgroundColor, fontSize, iconSize, padding, hoverColor } =
      buttonStyle(p);

    return `
      color: ${color()};
      background-color: ${backgroundColor()};      
      font-size: ${fontSize()};     


      svg {
          width: ${iconSize()};
          height: ${iconSize()};
          fill: ${color()};
          transition: ${theme.transition.primary};
      }    
      
      > li {
        padding: ${padding()};

        &:hover {
            color: ${hoverColor()};
        }
      }
    `;
  }}

  max-height: ${({ $isOpen, size }) => {
    if ($isOpen) {
      switch (size) {
        case 's':
          return 'calc(25px * 5)';

        case 'm':
          return 'calc(31px * 5)';

        case 'l':
          return 'calc(36px * 5)';

        default:
          return 'calc(31px * 5)';
      }
    } else {
      return 0;
    }
  }};
  overflow-y: auto;
  width: 100%;
  position: absolute;
  left: 0;
  top: calc(100% + ${theme.space[2]});
  display: flex;
  flex-direction: column;
  border-radius: ${theme.radii.s};
  font-weight: ${theme.fontWeights.bold};
  transition: ${theme.transition.primary};
  z-index: 10;
  box-shadow: ${theme.shadow.m};

  > li {
    transition: ${theme.transition.primary};
    cursor: pointer;
    width: 100%;
    text-align: center;
    border-radius: ${theme.radii.s};

    &:hover {
      background-color: ${({ $colors }) =>
        $colors !== 'main'
          ? 'rgba(255, 255, 255, 0.5)'
          : theme.colors.backdrop};
    }
  }
`;
