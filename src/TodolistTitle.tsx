import { IconButton, Typography } from "@mui/material";
import { useAppDispatch } from "./app/hooks";
import {
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./model/todolists-reducer";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodolistType } from "./Main";

export function TodolistTitle(props: TodolistTitleProps) {
  const { todolist } = props;
  const dispatch = useAppDispatch();
  const removeTodolist = () => {
    dispatch(removeTodolistAC({ id: todolist.id }));
  };
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolist.id, title }));
  };
  return (
    <div>
      <Typography align="center" variant="h6">
        <EditableSpan
          title={todolist.title}
          changeTitle={changeTodolistTitle}
        />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </Typography>
    </div>
  );
}
type TodolistTitleProps = {
  todolist: TodolistType;
};
