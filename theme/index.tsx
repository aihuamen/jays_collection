import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    custom: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
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
});

const myTheme = responsiveFontSizes(theme);

export default myTheme;
