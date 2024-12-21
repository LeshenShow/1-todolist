import { Box, CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { ErrorSnackbar } from "common/components";
import { useAppDispatch } from "common/hooks";
import { useMeQuery } from "features/auth/api/authApi";
import { ResultCode } from "features/todolists/lib/enums";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../common/components/Header/Header";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { getTheme } from "../common/theme/theme";
import { selectThemeMode, setLoggedIn } from "./appSlice";

export function App() {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  // const isInitialized = useAppSelector(selectIsInitialized);
  // useEffect(() => {
  //   dispatch(initializeAppTC());
  // }, []);
  const { data, isLoading } = useMeQuery();
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setLoggedIn({ isLoggedIn: true }));
      }
    }
  }, [isLoading, data]);

  if (!isInitialized) {
    return (
      <Box position={"fixed"} top={"30%"} textAlign={"center"} width={"100%"}>
        <CircularProgress size={150} thickness={3} color="secondary" />
      </Box>
    );
  }
  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Outlet />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
}
