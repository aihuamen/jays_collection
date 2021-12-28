import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    custom: true;
  }
}

const MyTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        custom: 1540,
        xl: 1920,
      },
    },
  })
);

export const generateTheme = (mode: PaletteMode) =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode,
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          custom: 1540,
          xl: 1920,
        },
      },
    })
  );

export default MyTheme;
