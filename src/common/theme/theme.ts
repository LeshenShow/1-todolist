import { createTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ThemeMode } from "../../app/appSlice";

export const getTheme = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode,
      primary: deepPurple,
      secondary: {
        main: "#d81b60",
      },
    },
  });
};
