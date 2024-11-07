import { AppBar, Toolbar, IconButton, Box, Switch } from "@mui/material";
import { MenuButton } from "./MenuButton";
import MenuIcon from "@mui/icons-material/Menu";
import { changeThemeModeAC } from "./app/app-reducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";

export function Header() {
  const themeMode = useAppSelector((state) => state.app.themeMode);
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
    </AppBar>
  );
}
//const {} = props;
