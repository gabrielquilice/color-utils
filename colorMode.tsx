import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDarkMode } from "usehooks-ts";

interface ColorModeData {
  isDarkMode: boolean;
  changeMode: () => void;
}

interface ColorModeProviderProps {
  children: ReactNode;
}

const ColorModeContext = createContext<ColorModeData>({} as ColorModeData);

function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [dark, setDark] = useState(false);
  const { toggle, isDarkMode } = useDarkMode();

  useEffect(() => {
    setDark(isDarkMode);
  }, [isDarkMode]);

  function changeMode() {
    toggle();
  }

  return (
    <ColorModeContext.Provider value={{ isDarkMode: dark, changeMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

function useColorMode(): ColorModeData {
  const context = useContext(ColorModeContext);

  return context;
}

export { ColorModeProvider, useColorMode };
