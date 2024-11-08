import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Switch, Toolbar } from "@mui/material";

import { changeThemeModeAC } from "../../../app/app-reducer";
import { selectThemeMode } from "../../../app/appSelectors";
import { useAppDispatch } from "../../hooks/useAddDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { MenuButton } from "../MenuButton/MenuButton";

export function Header() {
  const themeMode = useAppSelector(selectThemeMode);
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
