import { Grid2, Paper } from "@mui/material";
import { Todolist } from "./Todolist";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { FilterValuesType } from "./Main";
import {
  changeTaskTitleAC,
  removeTaskAC,
  addTaskAC,
  changeTaskStatusAC,
} from "./model/tasks-reducer";
import { changeTodolistFilterAC } from "./model/todolists-reducer";

export function Todolists() {
  const tasks = useAppSelector((state) => state.tasks);
  const todolists = useAppSelector((state) => state.todolists);

  const dispatch = useAppDispatch();
  const changeTodolistFilter = (
    todolistId: string,
    filter: FilterValuesType
  ) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const changeTaskTitle = (
    taskId: string,
    title: string,
    todolistId: string
  ) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
  };
  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ todolistId, taskId }));
  };
  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC({ todolistId, title }));
  };
  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
  };
  return (
    <>
      {todolists.map((todolist) => {
        const allTodolistTasks = tasks[todolist.id];
        let filteredTasks = allTodolistTasks;
        if (todolist.filter === "active") {
          filteredTasks = allTodolistTasks.filter((task) => !task.isDone);
        }
        if (todolist.filter === "completed") {
          filteredTasks = allTodolistTasks.filter((task) => task.isDone);
        }
        return (
          <Grid2 key={todolist.id}>
            <Paper elevation={8} sx={{ p: "20px" }}>
              <Todolist
                todolist={todolist}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                setTaskNewStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
              />
            </Paper>
          </Grid2>
        );
      })}
    </>
  );
}
