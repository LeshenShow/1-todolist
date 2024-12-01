import { Box, CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { ErrorSnackbar } from "common/components";
import { useAppDispatch } from "common/hooks";
import { initializeAppTC } from "features/auth/model/auth-reducer";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../common/components/Header/Header";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { getTheme } from "../common/theme/theme";
import { selectIsInitialized, selectThemeMode } from "./appSelectors";

export function App() {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);
  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);
  if (!isInitialized) {
    return (
      <Box position={"fixed"} top={"30%"} textAlign={"center"} width={"100%"}>
        <CircularProgress size={150} thickness={3} color="secondary" />
      </Box>
    );
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Outlet />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
}
