import theme from 'utils/theme';
import { IButtonStyle } from './Button.styled';

const buttonStyle = ({
  $colors,
  size,
  $round,
  $variant,
  $isIcon,
  $isIconThere,
  $iconPosition,
}: Partial<IButtonStyle>) => {
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
          ? theme.colors.bg.dark
          : theme.colors.accent.light;

      case 'success':
        return $variant === 'solid'
          ? theme.colors.bg.dark
          : theme.colors.success.light;

      case 'danger':
        return $variant === 'solid'
          ? theme.colors.bg.dark
          : theme.colors.danger.light;
      
      case 'transparent':
        return $variant === 'solid'
          ? theme.colors.accent.light
          : theme.colors.accent.dark;

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

      case 'success':
        return $variant === 'solid'
          ? theme.colors.bg.dark
          : theme.colors.success.main;

      case 'danger':
        return $variant === 'solid'
          ? theme.colors.bg.dark
          : theme.colors.danger.main;
      
      case 'transparent':
        return $variant === 'solid'
          ? theme.colors.accent.main
          : theme.colors.accent.light;

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

        case 'success':
          return theme.colors.success.light;

        case 'danger':
          return theme.colors.danger.light;
        
        case 'transparent':
          return theme.colors.transparent;

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

        case 'success':
          return theme.colors.success.main;

        case 'danger':
          return theme.colors.danger.main;
        
        case 'transparent':
          return theme.colors.transparent;

        default:
          return theme.colors.secondary.main;
      }
    };

    return $variant === 'text' ? 'transparent' : setColor();
  };

  const padding = (): string => {
    switch (size) {
      case 's':
        return $round ? theme.space[0] : `${theme.space[1]} ${theme.space[3]}`;

      case 'm':
        return $round ? theme.space[1] : `${theme.space[2]} ${theme.space[3]}`;

      case 'l':
        return $round ? theme.space[2] : `${theme.space[2]} ${theme.space[4]}`;

      default:
        return $round ? theme.space[3] : `${theme.space[2]} ${theme.space[3]}`;
    }
  };

  const iconSize = (): string => {
    switch (size) {
      case 's':
        return $isIcon ? '21px' : '17px';

      case 'm':
        return $isIcon ? '23px' : '19px';

      case 'l':
        return $isIcon ? '24px' : '24px';

      default:
        return $isIcon ? '23px' : '19px';
    }
  };

  const iconMargin = (): string => {
    const setMargin = () => {
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

    return $isIconThere
      ? $iconPosition === 'l'
        ? `margin-left: ${setMargin()};`
        : `margin-right: ${setMargin()};`
      : 'margin: 0';
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
