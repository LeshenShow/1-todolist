import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material";
// import LinearProgress from "@mui/material/LinearProgress"; так лучше, чтобы не тянуть весь пакет
import { changeThemeModeAC } from "../../../app/app-reducer";
import { selectAppStatus, selectThemeMode } from "../../../app/appSelectors";
import { useAppDispatch } from "../../hooks/useAddDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { MenuButton } from "../MenuButton/MenuButton";

export function Header() {
  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectAppStatus);
  const dispatch = useAppDispatch();
  const changeThemeMode = () => {
    dispatch(changeThemeModeAC(themeMode === "dark" ? "light" : "dark"));
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>

        <Box>
          <MenuButton color="inherit" variant="outlined">
            Login
          </MenuButton>
          <MenuButton color="inherit" variant="outlined">
            Logout
          </MenuButton>
          <MenuButton color="inherit" variant="outlined" background={"green"}>
            FAQ
          </MenuButton>
          <Switch onChange={changeThemeMode} />
        </Box>
      </Toolbar>
      {status === "loading" && <LinearProgress color="secondary" />}
    </AppBar>
  );
}
//const {} = props;
