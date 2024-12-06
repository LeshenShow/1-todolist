import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Typography } from "@mui/material";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "../../../../../../common/hooks/useAddDispatch";
import {
  removeTodolistTC,
  updateTodolistTitleTC,
} from "../../../../model/todolistsSlice";

export function TodolistTitle(props: Props) {
  const { todolist } = props;
  const dispatch = useAppDispatch();
  const removeTodolist = () => {
    dispatch(removeTodolistTC({ todolistId: todolist.id }));
  };
  const changeTodolistTitle = (title: string) => {
    dispatch(updateTodolistTitleTC({ todolistId: todolist.id, title }));
  };
  return (
    <div>
      <Typography align="center" variant="h6">
        <EditableSpan
          value={todolist.title}
          onChange={changeTodolistTitle}
          disabled={todolist.entityStatus === "loading"}
        />
        <IconButton
          aria-label="delete"
          onClick={removeTodolist}
          disabled={todolist.entityStatus === "loading"}>
          <DeleteIcon />
        </IconButton>
      </Typography>
    </div>
  );
}
type Props = {
  todolist: DomainTodolist;
};
