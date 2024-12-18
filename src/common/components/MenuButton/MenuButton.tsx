import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
type Props = {
  background?: string;
  //   theme?: any;
};
export const MenuButton = styled(Button)<Props>(({ background, theme }) => ({
  minWidth: "110px",
  fontWeight: "bold",
  //   boxShadow: "0 0 0 2px #054B62, 4px 4px 0 0 #054B62",
  borderRadius: "5px",
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: "#ffffff",
  background: background || theme.palette.primary.main, //"primary"
}));
