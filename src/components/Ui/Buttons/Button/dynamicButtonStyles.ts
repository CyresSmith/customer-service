import theme from 'utils/theme';
import { IButton } from './button.types';

const buttonStyle = ({ $colors, size, $round, $variant }: IButton) => {
  const color = (): string => {
    switch ($colors) {
      case 'light':
        return $variant === 'solid'
          ? theme.colors.primary.dark
          : theme.colors.secondary.light;

      case 'dark':
        return $variant === 'solid'
          ? theme.colors.primary.light
          : theme.colors.bg.dark;

      case 'main':
        return $variant === 'solid'
          ? theme.colors.primary.dark
          : theme.colors.primary.main;

      case 'accent':
        return $variant === 'solid'
          ? theme.colors.secondary.dark
          : theme.colors.accent.light;

      default:
        return theme.colors.primary.dark;
    }
  };

  const hoverColor = (): string => {
    switch ($colors) {
      case 'light':
        return $variant === 'solid'
          ? theme.colors.bg.dark
          : theme.colors.primary.light;

      case 'dark':
        return $variant === 'solid'
          ? theme.colors.accent.light
          : theme.colors.accent.dark;

      case 'main':
        return $variant === 'solid'
          ? theme.colors.accent.light
          : theme.colors.accent.light;

      case 'accent':
        return $variant === 'solid'
          ? theme.colors.bg.dark
          : theme.colors.accent.main;

      default:
        return theme.colors.secondary.main;
    }
  };

  const backgroundColor = (): string => {
    const setColor = () => {
      switch ($colors) {
        case 'light':
          return theme.colors.secondary.light;

        case 'dark':
          return theme.colors.bg.dark;

        case 'main':
          return theme.colors.primary.main;

        case 'accent':
          return theme.colors.accent.light;

        default:
          return theme.colors.secondary.light;
      }
    };

    return $variant === 'text' ? 'transparent' : setColor();
  };

  const hoverBackgroundColor = (): string => {
    const setColor = () => {
      switch ($colors) {
        case 'light':
          return theme.colors.primary.light;

        case 'dark':
          return theme.colors.bg.dark;

        case 'main':
          return theme.colors.primary.main;

        case 'accent':
          return theme.colors.accent.main;

        default:
          return theme.colors.secondary.main;
      }
    };

    return $variant === 'text' ? 'transparent' : setColor();
  };

  const padding = (): string => {
    switch (size) {
      case 's':
        return $round || $variant === 'text'
          ? theme.space[0]
          : `${theme.space[1]} ${theme.space[2]}`;

      case 'm':
        return $round || $variant === 'text'
          ? theme.space[1]
          : `${theme.space[2]} ${theme.space[3]}`;

      case 'l':
        return $round || $variant === 'text'
          ? theme.space[2]
          : `${theme.space[2]} ${theme.space[4]}`;

      default:
        return $round || $variant === 'text'
          ? theme.space[3]
          : `${theme.space[2]} ${theme.space[3]}`;
    }
  };

  const iconSize = (): string => {
    switch (size) {
      case 's':
        return $variant === 'text' ? '21px' : '17px';

      case 'm':
        return $variant === 'text' ? '23px' : '19px';

      case 'l':
        return $variant === 'text' ? '24px' : '24px';

      default:
        return $variant === 'text' ? '25px' : '19px';
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
