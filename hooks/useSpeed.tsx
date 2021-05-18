import { Theme, useMediaQuery, useTheme } from "@material-ui/core";

export const useSpeed = () => {
  const theme = useTheme();
  const upMD = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

  return upMD ? 400 : theme.transitions.duration.enteringScreen;
};
