import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";
import { ChangeEvent } from "react";
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "../../../../../../../common/hooks/useAddDispatch";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../../../../model/tasks-reducer";
import { getListItemSx } from "./Task.style";

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
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusAC({
        todolistId,
        taskId: task.id,
        isDone: e.currentTarget.checked,
      })
    );
  };
  return (
    <ListItem disablePadding sx={getListItemSx(task.isDone)}>
      <Box>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />

        <EditableSpan onChange={changeTaskTitle} value={task.title} />
      </Box>
      <IconButton aria-label="delete" onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
//const {} = props;
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TaskStateType = { [key: string]: TaskType[] };
