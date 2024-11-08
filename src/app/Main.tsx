import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { useAppDispatch } from "../common/hooks/useAddDispatch";

import { addTodolistAC } from "../features/todolists/model/todolists-reducer";
import { Todolists } from "../features/todolists/ui/Todolists/Todolists";

export function Main() {
  const dispatch = useAppDispatch();

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC({ title }));
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
