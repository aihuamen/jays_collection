import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    custom: true;
  }
}

const theme = createMuiTheme({
  palette: {
    type: "light",
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
