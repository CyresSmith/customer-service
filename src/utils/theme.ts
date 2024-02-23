const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    text: {
      light: '#fff',
      main: '#30313A',
      dark: '#111114',
    },
    bg: {
      light: '#5e6073',
      main: '#30313A',
      dark: '#111114',
    },
    accent: {
      light: '#ffc23b',
      main: '#FFB000',
      dark: '#d49302',
      // main: '#D2DE32',
      // main: '#EF5B0C',
      // main: '#7DCE13',
      // main: '#28B5B5',
      // main: '#FB743E',
      // main: '#D2E603',
    },
    primary: {
      rgba: 'rgba(143, 227, 217, 0.6)',
      light: '#8fe3d9',
      main: '#5a8c86',
      dark: '#213331',
    },
    secondary: {
      light: '#b1b3ba',
      main: '#87888C',
      dark: '#737478',
    },
    danger: {
      light: '#cc3837',
      main: '#cf1e1d',
      dark: '#cc0100',
    },
    success: {
      light: '#3dcc4f',
      main: '#1ec933',
      dark: '#00ad15',
    },
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
      xs: '30px',
      s: '35px',
      m: '65px',
      l: '100px',
      xl: '165px',
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
    bold: '2px solid',
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
    modal: 'all 350ms linear',
    drop: 'all 500ms linear',
  },

  shadow: {
    s: ``,
    m: `1px 3px 13px 2px rgba(0, 0, 0, 0.37);
        -webkit-box-shadow: 1px 3px 13px 2px rgba(0, 0, 0, 0.37);
        -moz-box-shadow: 1px 3px 13px 2px rgba(0, 0, 0, 0.37);`,
    l: ``,
  },
  timeStep: 30
};

export default theme;

// document.body.style.fontFamily = theme.fonts.body;
document.body.style.fontSize = theme.fontSizes.m;
document.body.style.color = theme.colors.text.light;
document.body.style.backgroundColor = theme.colors.bg.main;
