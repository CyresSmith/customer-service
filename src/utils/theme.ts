const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    mainText: '#fff',
    linkText: '#87888C',
    descText: '#87888C',
    mainBg: '#30313A',
    componentsBg: '#171821',
    primary: '#43FFD2',
    secondary: '#7D2253',
    accent: '#A9DFD8',
    danger: '#FF3A44',
    success: '#31985A',
  },

  fonts: {
    body: '"Comfortaa", cursive',
    heading: '"Comfortaa", cursive',
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
    light: 300,
    regular: 400,
    bold: 700,
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
    primary: 'all 250ms linear',
  },
};

export default theme;

document.body.style.fontFamily = theme.fonts.body;
document.body.style.fontSize = theme.fontSizes.m;
document.body.style.color = theme.colors.mainText;
document.body.style.backgroundColor = theme.colors.mainBg;
