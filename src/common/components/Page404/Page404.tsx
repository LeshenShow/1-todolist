import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import s from "./Page404.module.css";
export const Page404 = () => {
  const nav = useNavigate();

  return (
    <div>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <div className={s.btns}>
        <Button
          variant="outlined"
          onClick={() => {
            nav(-1);
          }}>
          Go back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            nav("/");
          }}>
          Go to home
        </Button>
      </div>
    </div>
  );
};
