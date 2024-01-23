const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    text: {
      light: '#fff',
      main: '#87888C',
      dark: '#171821',
    },
    bg: {
      light: '#95bdb7',
      main: '#30313A',
      dark: '#171821',
    },
    accent: {
      light: '#43FFD2',
      // main: '#D2DE32',
      // main: '#FFB000',
      // main: '#EF5B0C',
      // main: '#7DCE13',
      // main: '#28B5B5',
      // main: '#FB743E',
      // main: '#FB743E',
      // main: '#D2E603',
      main: '#D2E603',
      dark: '#171821',
    },
    primary: {
      light: '#43FFD2',
      main: '#30313A',
      dark: '#171821',
    },
    secondary: {
      light: '#A9DFD8',
      main: '#30313A',
      dark: '#171821',
    },
    danger: '#FF3A44',
    success: '#31985A',
    backdrop: 'rgba(23, 24, 33, 0.5)',
  },

  fonts: {
    body: '"Sofia Sans", sans-serif;',
    heading: '"Sofia Sans", sans-serif;',
  },

  fontSizes: {
    xs: '10px',
    s: '12px',
    m: '14px',
    l: '16px',
    xl: '18px',
    xxl: '20px',

    heading: {
      s: '40px',
      m: '60px',
      l: '100px',
      xl: '200px',
    },
  },

  fontWeights: {
    light: 400,
    regular: 600,
    bold: 800,
  },

  lineHeights: {
    m: 1.25,
  },

  space: [
    '2px',
    '4px',
    '6px',
    '10px',
    '16px',
    '26px',
    '42px',
    '110px',
    '152px',
    '262px',
  ],

  mediaBreakpoints: {
    mobile: {
      media: 'screen and (320px <= width <= 767px)',
      width: '320px',
    },
    tablet: {
      media: 'screen and (768px <= width <= 1149px)',
      width: '768px',
    },
    desktop: { media: 'screen and (1280px <= width)', width: '1280px' },
  },

  borders: {
    normal: '1px solid',
  },

  radii: {
    xs: '6px',
    s: '10px',
    m: '16px',
    l: '26px',
    round: '50%',
  },

  transition: {
    primary: 'all 250ms ease-in-out',
    modal: 'all 250ms linear',
  },

  shadow: {
    s: ``,
    m: `1px 3px 13px 2px rgba(0, 0, 0, 0.37);
        -webkit-box-shadow: 1px 3px 13px 2px rgba(0, 0, 0, 0.37);
        -moz-box-shadow: 1px 3px 13px 2px rgba(0, 0, 0, 0.37);`,
    l: ``,
  },
};

export default theme;

// document.body.style.fontFamily = theme.fonts.body;
document.body.style.fontSize = theme.fontSizes.m;
document.body.style.color = theme.colors.mainText;
document.body.style.backgroundColor = theme.colors.mainBg;
