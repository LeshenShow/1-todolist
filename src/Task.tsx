import { ListItem, Box, Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { getListItemSx } from "./Todolist.styles";
import { TaskType } from "./Main";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent } from "react";
import { useAppDispatch } from "./app/hooks";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./model/tasks-reducer";

type TaskProps = { task: TaskType; todolistId: string };
export function Task(props: TaskProps) {
  const { task, todolistId } = props;
  const dispatch = useAppDispatch();
  const removeTask = () => {
    dispatch(removeTaskAC({ todolistId, taskId: task.id }));
  };

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }));
  };
  const changeTaskStatus = (
    taskId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      changeTaskStatusAC({
        todolistId,
        taskId,
        isDone: e.currentTarget.checked,
      })
    );
  };
  return (
    <ListItem disablePadding sx={getListItemSx(task.isDone)}>
      <Box>
        <Checkbox
          checked={task.isDone}
          onChange={(e) => {
            changeTaskStatus(task.id, e);
          }}
        />

        <EditableSpan changeTitle={changeTaskTitle} title={task.title} />
      </Box>
      <IconButton aria-label="delete" onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
//const {} = props;
