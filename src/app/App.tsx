import { CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme } from "../common/theme/theme";
import { Header } from "../Header";
import { Main } from "../Main";
import "./App.css";
import { useAppSelector } from "./hooks";

export function App() {
  const themeMode = useAppSelector((state) => state.app.themeMode);
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
