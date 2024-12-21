import { useCreateTaskMutation } from "features/todolists/api/tasksApi";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm";
import { FilterTasksButtons } from "./FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

export const Todolist = (props: Props) => {
  const { todolist } = props;
  // const dispatch = useAppDispatch();
  const [create] = useCreateTaskMutation();
  const createTaskCB = (title: string) => {
    // dispatch(addTaskTC({ todolistId: todolist.id, title }));
    create({ title, todolistId: todolist.id });
  };

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={createTaskCB}
        disabled={todolist.entityStatus === "loading"}
      />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
type Props = {
  todolist: DomainTodolist;
};
