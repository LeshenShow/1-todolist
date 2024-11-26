import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "common/components";
import { useAppDispatch } from "common/hooks";
import { addTodolistTC } from "features/todolists/model/todolists-reducer";
import { Todolists } from "features/todolists/ui/Todolists/Todolists";

export function Main() {
  const dispatch = useAppDispatch();

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

      <div></div>
    </Container>
  );
}
