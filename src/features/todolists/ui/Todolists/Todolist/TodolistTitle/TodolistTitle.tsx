import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Typography } from "@mui/material";
import type { RequestStatus } from "app/appSlice";
import { useAppDispatch } from "common/hooks";
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistMutation,
} from "features/todolists/api/todolistsApi";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";

export function TodolistTitle(props: Props) {
  const { todolist } = props;
  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolist] = useUpdateTodolistMutation();
  const dispatch = useAppDispatch();
  // const removeTodolistCB = () => {
  //   // dispatch(removeTodolistTC({ todolistId: todolist.id }));
  //   removeTodolist({ id: todolist.id });
  // };
  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, state => {
        const index = state.findIndex(tl => tl.id === todolist.id);
        if (index !== -1) {
          state[index].entityStatus = status;
        }
      })
    );
  };
  const removeTodolistCB = () => {
    updateQueryData("loading");
    removeTodolist({ id: todolist.id })
      .unwrap()
      .catch(() => {
        updateQueryData("idle");
      });
  };
  const updateTodolistCB = (title: string) => {
    // dispatch(updateTodolistTitleTC({ todolistId: todolist.id, title }));
    updateTodolist({ title, id: todolist.id });
  };
  return (
    <div>
      <Typography align="center" variant="h6">
        <EditableSpan
          value={todolist.title}
          onChange={updateTodolistCB}
          disabled={todolist.entityStatus === "loading"}
        />
        <IconButton
          aria-label="delete"
          onClick={removeTodolistCB}
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
