import { List } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { useGetTasksQuery } from "features/todolists/api/tasksApi";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { TaskStatus } from "features/todolists/lib/enums";
import { useState } from "react";
import { TasksPagination } from "../TasksPagination/TasksPagination";
import { Task } from "./Task/Task";
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton";

// type ErrorData = {
//   status: number;
//   data: {
//     message: string;
//   };
// };

export function Tasks(props: Props) {
  const { todolist } = props;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  // const tasks: TasksState = useAppSelector(selectTasks);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id));
  // }, []);
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ todolistId: todolist.id, args: { page } });
  // useEffect(() => {
  //   if (error) {
  //     let errMsg = "Some error occurred";
  //     if ("data" in error) {
  //       const errData = error.data as ErrorData;
  //       if ("message" in errData) {
  //         errMsg = errData.message as string;
  //       }
  //     }
  //     dispatch(setAppError({ error: errMsg }));
  //   }
  // }, [error]);
  let tasksForTodolist = tasks?.items;
  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter(
      (task) => task.status === TaskStatus.Active
    );
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter(
      (task) => task.status === TaskStatus.Done
    );
  }
  if (isLoading) {
    return <TasksSkeleton />;
  }
  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {tasksForTodolist?.map((task) => (
              <Task
                key={task.id}
                todolistId={todolist.id}
                task={task}
                disabled={todolist.entityStatus === "loading"}
              />
            ))}
          </List>
          <TasksPagination
            totalCount={tasks?.totalCount || 0}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
}
type Props = { todolist: DomainTodolist };
