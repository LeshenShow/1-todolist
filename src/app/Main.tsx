import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Path } from "common/router";
import { addTodolistTC } from "features/todolists/model/todolists-reducer";
import { Todolists } from "features/todolists/ui/Todolists/Todolists";
import { Navigate, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "./appSelectors";

export function Main() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate(Path.Login);
  //   }
  // }, [isLoggedIn]);
  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />;
  }
  const addTodolist = (title: string) => {
    dispatch(addTodolistTC({ title }));
  };

  return (
    <Container>
      <Grid2 container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  );
}
