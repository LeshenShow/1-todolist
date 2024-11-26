import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { addTaskTC } from "features/todolists/model/tasks-reducer";
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm";
import { useAppDispatch } from "../../../../../common/hooks/useAddDispatch";
import { FilterTasksButtons } from "./FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

export const Todolist = (props: Props) => {
  const { todolist } = props;
  const dispatch = useAppDispatch();

  const addTask = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }));
  };

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
type Props = {
  todolist: DomainTodolist;
};
