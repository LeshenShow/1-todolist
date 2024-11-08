import { CssBaseline, ThemeProvider } from "@mui/material";
import { Header } from "../common/components/Header/Header";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { getTheme } from "../common/theme/theme";
import { Main } from "./Main";
import { selectThemeMode } from "./appSelectors";

export function App() {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  );
}
