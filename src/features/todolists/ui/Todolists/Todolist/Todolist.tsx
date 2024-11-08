import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm";
import { useAppDispatch } from "../../../../../common/hooks/useAddDispatch";
import { addTaskAC } from "../../../model/tasks-reducer";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

export const Todolist = (props: PropsType) => {
  const { todolist } = props;
  const dispatch = useAppDispatch();

  const addTask = (title: string) => {
    dispatch(addTaskAC({ todolistId: todolist.id, title }));
  };

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
type PropsType = {
  todolist: TodolistType;
};
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type FilterValuesType = "all" | "active" | "completed";
