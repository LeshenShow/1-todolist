import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Typography } from "@mui/material";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "../../../../../../common/hooks/useAddDispatch";
import {
  changeTodolistTitleAC,
  removeTodolistAC,
} from "../../../../model/todolists-reducer";
import { TodolistType } from "../Todolist";

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
        <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
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
