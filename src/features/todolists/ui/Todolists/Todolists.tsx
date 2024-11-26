import { Grid2, Paper } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { fetchTodolistsTC } from "features/todolists/model/todolists-reducer/todolists-reducer";
import { useEffect } from "react";
import { selectTodolists } from "../../../../app/appSelectors";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { Todolist } from "./Todolist/Todolist";

export function Todolists() {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);
  return (
    <>
      {todolists.map(todolist => (
        <Grid2 key={todolist.id}>
          <Paper elevation={8} sx={{ p: "20px" }}>
            <Todolist todolist={todolist} />
          </Paper>
        </Grid2>
      ))}
    </>
  );
}