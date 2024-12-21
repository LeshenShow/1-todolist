import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "common/components";
import { useAppSelector } from "common/hooks";
import { Path } from "common/router";

import { useCreateTodolistMutation } from "features/todolists/api/todolistsApi";
import { Todolists } from "features/todolists/ui/Todolists/Todolists";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "./appSlice";

export function Main() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate(Path.Login);
  //   }
  // }, [isLoggedIn]);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [createTodolist] = useCreateTodolistMutation();
  // const [trigger, res] = useCreateTodolistMutation();
  const createTodolistCB = (title: string) => {
    createTodolist({ title });
    // dispatch(addTodolistTC({ title }));
  };
  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />;
  }
  return (
    <Container>
      <Grid2 container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={createTodolistCB} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  );
}

