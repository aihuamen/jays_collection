import { createContext } from 'react';

export interface IColorToggleMode {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<IColorToggleMode>({
  toggleColorMode: () => {},
});
