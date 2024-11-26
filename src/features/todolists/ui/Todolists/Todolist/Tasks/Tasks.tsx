import { List } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { TaskStatus } from "features/todolists/lib/enums";
import { fetchTasksTC } from "features/todolists/model/tasks-reducer/tasks-reducer";
import { useEffect } from "react";
import { selectTasks } from "../../../../../../app/appSelectors";
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector";
import { Task } from "./Task/Task";

export function Tasks(props: Props) {
  const { todolist } = props;
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id));
  }, []);
  const allTodolistTasks = tasks[todolist.id];
  let filteredTasks = allTodolistTasks;
  if (todolist.filter === "active") {
    filteredTasks = allTodolistTasks.filter(task => task.status === TaskStatus.Active);
  }
  if (todolist.filter === "completed") {
    filteredTasks = allTodolistTasks.filter(task => task.status === TaskStatus.Done);
  }
  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map(task => (
            <Task
              key={task.id}
              todolistId={todolist.id}
              task={task}
              disabled={todolist.entityStatus === "loading"}
            />
          ))}
        </List>
      )}
    </>
  );
}
type Props = { todolist: DomainTodolist };
