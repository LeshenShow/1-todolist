import { List } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import { TodolistType } from "./Main";
import { Task } from "./Task";

type TasksProps = { todolist: TodolistType };
export function Tasks(props: TasksProps) {
  const { todolist } = props;
  const tasks = useAppSelector((state) => state.tasks);

  const allTodolistTasks = tasks[todolist.id];
  let filteredTasks = allTodolistTasks;
  if (todolist.filter === "active") {
    filteredTasks = allTodolistTasks.filter((task) => !task.isDone);
  }
  if (todolist.filter === "completed") {
    filteredTasks = allTodolistTasks.filter((task) => task.isDone);
  }
  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <Task key={task.id} todolistId={todolist.id} task={task} />
          ))}
        </List>
      )}
    </>
  );
}
//
