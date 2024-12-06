import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material";
// import LinearProgress from "@mui/material/LinearProgress"; так лучше, чтобы не тянуть весь пакет
import { logoutTC, selectIsLoggedIn } from "features/auth/model/authSlice";

import { changeTheme, selectAppStatus, selectThemeMode } from "../../../app/appSlice";
import { useAppDispatch } from "../../hooks/useAddDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { MenuButton } from "../MenuButton/MenuButton";

export function Header() {
  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectAppStatus);
  const dispatch = useAppDispatch();
  const changeThemeMode = () => {
    dispatch(changeTheme({ themeMode: themeMode === "dark" ? "light" : "dark" }));
  };
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const logout = () => {
    dispatch(logoutTC());
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>

        <Box>
          {isLoggedIn && (
            <MenuButton color="inherit" variant="outlined" onClick={logout}>
              Logout
            </MenuButton>
          )}

          <MenuButton color="inherit" variant="outlined" background={"green"}>
            FAQ
          </MenuButton>
          <Switch onChange={changeThemeMode} />
        </Box>
      </Toolbar>
      <Box sx={{ height: 4 }}>
        {status === "loading" && <LinearProgress color="secondary" />}
      </Box>
    </AppBar>
  );
}
//const {} = props;
