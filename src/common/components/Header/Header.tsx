import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material";
// import LinearProgress from "@mui/material/LinearProgress"; так лучше, чтобы не тянуть весь пакет

import { baseApi } from "app/baseApi";
import { useLogoutMutation } from "features/auth/api/authApi";
import { ResultCode } from "features/todolists/lib/enums";
import {
  changeTheme,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode,
  setLoggedIn,
} from "../../../app/appSlice";
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
  const [logout] = useLogoutMutation();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const logoutCB = () => {
    logout()
      .then(res => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setLoggedIn({ isLoggedIn: false }));
          localStorage.removeItem("token");
          // dispatch(baseApi.util.resetApiState());
          // dispatch(clearData());
          // dispatch(clearTasks());
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", 'Task']));
      });
    // dispatch(logoutTC());
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>

        <Box>
          {isLoggedIn && (
            <MenuButton color="inherit" variant="outlined" onClick={logoutCB}>
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
