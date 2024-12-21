import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "common/components/EditableSpan";
import {
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} from "features/todolists/api/tasksApi";
import type { DomainTask, UpdateTaskModel } from "features/todolists/api/tasksApi.types";
import { TaskStatus } from "features/todolists/lib/enums";
import { ChangeEvent } from "react";
import { getListItemSx } from "./Task.style";

export function Task(props: Props) {
  const { task, todolistId, disabled } = props;
  // const dispatch = useAppDispatch();
  const [remove] = useRemoveTaskMutation();
  const removeTask = () => {
    // dispatch(removeTaskTC({ todolistId, taskId: task.id }));
    remove({ todolistId, taskId: task.id });
  };
  const [update] = useUpdateTaskMutation();
  const changeTaskTitle = (title: string) => {
    updateTask({ title });
    // dispatch(updateTaskTC({ task: { ...task, title } }));
    // update({ taskId: task.id, todolistId, task: { ...task, title } });
  };
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Done : TaskStatus.Active;
    updateTask({ status });
    // dispatch(updateTaskTC({ task: { ...task, status } }));
    // update({ taskId: task.id, todolistId, task: { ...task, status } });
  };
  const updateTask = (updates: Partial<UpdateTaskModel>) => {
    update({ taskId: task.id, todolistId, task: { ...task, ...updates } });
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
