import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "common/components/EditableSpan";
import { useAppDispatch } from "common/hooks/useAddDispatch";
import type { DomainTask } from "features/todolists/api/tasksApi.types";
import { TaskStatus } from "features/todolists/lib/enums";
import {
  removeTaskTC,
  updateTaskTC,
} from "features/todolists/model/tasks-reducer/tasks-reducer";
import { ChangeEvent } from "react";
import { getListItemSx } from "./Task.style";

export function Task(props: Props) {
  const { task, todolistId, disabled } = props;
  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(removeTaskTC({ todolistId, taskId: task.id }));
  };

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ task: { ...task, title } }));
  };
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Done : TaskStatus.Active;
    dispatch(updateTaskTC({ task: { ...task, status } }));
  };

  return (
    <ListItem disablePadding sx={getListItemSx(task.status === TaskStatus.Done)}>
      <Box>
        <Checkbox
          checked={task.status === TaskStatus.Done}
          onChange={changeTaskStatus}
          disabled={disabled}
        />
        <EditableSpan onChange={changeTaskTitle} value={task.title} disabled={disabled} />
      </Box>
      <IconButton aria-label="delete" onClick={removeTask} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
type Props = { task: DomainTask; todolistId: string; disabled?: boolean };
