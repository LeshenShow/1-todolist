import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "./AddItemForm";
import { Todolist } from "./Todolist";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./model/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./model/todolists-reducer";
import { Todolists } from "./Todolists";

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
    </Container>
  );
}
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TaskStateType = { [key: string]: TaskType[] };
