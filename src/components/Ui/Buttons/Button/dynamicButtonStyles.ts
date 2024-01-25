import { IButton, IIConButton } from 'types';
import theme from 'utils/theme';

const buttonStyle = ({ $colors, size, $round }: IButton | IIConButton) => {
  const color = (): string => {
    switch ($colors) {
      case 'light':
        return theme.colors.primary.dark;

      case 'dark':
        return theme.colors.primary.light;

      case 'main':
        return theme.colors.bg.main;

      case 'accent':
        return theme.colors.secondary.main;

      default:
        return theme.colors.primary.dark;
    }
  };

  const backgroundColor = (): string => {
    switch ($colors) {
      case 'light':
        return theme.colors.secondary.light;

      case 'dark':
        return theme.colors.secondary.dark;

      case 'main':
        return theme.colors.secondary.light;

      case 'accent':
        return theme.colors.accent.light;

      default:
        return theme.colors.secondary.light;
    }
  };

  const padding = (): string => {
    switch (size) {
      case 's':
        return $round ? theme.space[2] : `${theme.space[1]} ${theme.space[2]}`;

      case 'm':
        return $round ? theme.space[3] : `${theme.space[2]} ${theme.space[3]}`;

      case 'l':
        return $round ? theme.space[4] : `${theme.space[2]} ${theme.space[4]}`;

      default:
        return $round ? theme.space[3] : `${theme.space[2]} ${theme.space[3]}`;
    }
  };

  const fontSize = (): string => {
    switch (size) {
      case 's':
        return theme.fontSizes.m;

      case 'm':
        return theme.fontSizes.l;

      case 'l':
        return theme.fontSizes.xxl;

      default:
        return theme.fontSizes.l;
    }
  };

  const hoverColor = (): string => {
    switch ($colors) {
      case 'light':
        return theme.colors.secondary.main;

      case 'dark':
        return theme.colors.secondary.main;

      case 'main':
        return theme.colors.bg.dark;

      case 'accent':
        return theme.colors.accent.main;

      default:
        return theme.colors.secondary.main;
    }
  };

  const hoverBackgroundColor = (): string => {
    switch ($colors) {
      case 'light':
        return theme.colors.secondary.main;

      case 'dark':
        return theme.colors.secondary.main;

      case 'main':
        return theme.colors.primary.light;

      case 'accent':
        return theme.colors.accent.main;

      default:
        return theme.colors.secondary.main;
    }
  };

  const iconSize = (): string => {
    switch (size) {
      case 's':
        return '17px';

      case 'm':
        return '19px';

      case 'l':
        return '24px';

      default:
        return '19px';
    }
  };

  const iconMargin = (): string => {
    switch (size) {
      case 's':
        return theme.space[1];

      case 'm':
        return theme.space[2];

      case 'l':
        return theme.space[3];

      default:
        return theme.space[2];
    }
  };

  return {
    color,
    backgroundColor,
    padding,
    fontSize,
    hoverColor,
    hoverBackgroundColor,
    iconSize,
    iconMargin,
  };
};

export default buttonStyle;
