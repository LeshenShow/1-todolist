import { AddItemForm } from "./AddItemForm";
import "./App.css";

import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Grid2,
  Paper,
  Switch,
} from "@mui/material";
import { MenuButton } from "./MenuButton";
import { ThemeProvider } from "@emotion/react";
import { deepPurple } from "@mui/material/colors";
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TaskStateType = { [todolistId: string]: TaskType[] };
function App() {
  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    {
      id: todolistID1,
      title: "What to Learn",
      filter: "all",
    },
    {
      id: todolistID2,
      title: "What to buy",
      filter: "all",
    },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Beer", isDone: true },
      { id: v1(), title: "Cheeps", isDone: true },
      { id: v1(), title: "Milk", isDone: false },
    ],
  });

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
  };

  const changeTaskStatus = (
    taskId: string,
    taskStatus: boolean,
    todolistId: string
  ) => {
    const newTasks = tasks[todolistId].map((task) =>
      task.id === taskId ? { ...task, isDone: taskStatus } : task
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const changeTodolistFilter = (
    newFilter: FilterValuesType,
    todolistId: string
  ) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId
          ? { ...todolist, filter: newFilter }
          : todolist
      )
    );
  };

  const removeTodolist = (todolistId: string) => {
    const copyTasks = { ...tasks };
    delete copyTasks[todolistId];
    setTasks(copyTasks);
    const newTodolistId = todolistId;
    // delete tasks[newTodolistId];
    // debugger;
    const newState = todolists.filter(
      (todolist) => todolist.id !== newTodolistId
    );
    setTodolists(newState);
  };
  const addTodolist = (title: string) => {
    const todolistID = v1();
    const newTodolist: TodolistType = {
      id: todolistID,
      title: title,
      filter: "all",
    };
    setTodolists([...todolists, newTodolist]);
    setTasks({ ...tasks, [todolistID]: [] });
  };
  const changeTodolistTitle = (title: string, todolistId: string) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, title } : todolist
      )
    );
  };
  const changeTaskTitle = (
    taskId: string,
    title: string,
    todolistId: string
  ) => {
    const newTasks = tasks[todolistId].map((task) =>
      task.id === taskId ? { ...task, title } : task
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  const [isDark, setIsDark] = useState(false);
  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: deepPurple,
      secondary: {
        main: "#d81b60",
      },
    },
  });
  console.log(theme);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Box>
              <MenuButton color="inherit" variant="outlined">
                Login
              </MenuButton>
              <MenuButton color="inherit" variant="outlined">
                Logout
              </MenuButton>
              <MenuButton
                color="inherit"
                variant="outlined"
                background={"green"}
              >
                FAQ
              </MenuButton>
              <Switch
                onChange={() => {
                  setIsDark(!isDark);
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid2 container sx={{ p: "15px 0" }}>
            <AddItemForm addItem={addTodolist} />
          </Grid2>
          <Grid2 container spacing={4}>
            {todolists.map((todolist) => {
              let filteredTasks = tasks[todolist.id];
              if (todolist.filter === "active") {
                filteredTasks = filteredTasks.filter((task) => !task.isDone);
              }
              if (todolist.filter === "completed") {
                filteredTasks = filteredTasks.filter((task) => task.isDone);
              }
              return (
                <Grid2>
                  <Paper elevation={8} sx={{ p: "20px" }}>
                    <Todolist
                      filter={todolist.filter}
                      title={todolist.title}
                      tasks={filteredTasks}
                      todolistId={todolist.id}
                      removeTask={removeTask}
                      changeTodolistFilter={changeTodolistFilter}
                      changeTodolistTitle={changeTodolistTitle}
                      addTask={addTask}
                      setTaskNewStatus={changeTaskStatus}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                    />
                  </Paper>
                </Grid2>
              );
            })}
          </Grid2>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
