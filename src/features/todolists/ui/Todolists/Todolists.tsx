import { Grid2, Paper } from "@mui/material";
import { selectTodolists } from "../../../../app/appSelectors";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { Todolist } from "./Todolist/Todolist";

export function Todolists() {
  const todolists = useAppSelector(selectTodolists);

  return (
    <>
      {todolists.map((todolist) => (
        <Grid2 key={todolist.id}>
          <Paper elevation={8} sx={{ p: "20px" }}>
            <Todolist todolist={todolist} />
          </Paper>
        </Grid2>
      ))}
    </>
  );
}
