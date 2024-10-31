export {};
// import { ThemeProvider } from "@emotion/react";
// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   Box,
//   Container,
//   createTheme,
//   CssBaseline,
//   Grid2,
//   Paper,
//   Switch,
// } from "@mui/material";
// import AppBar from "@mui/material/AppBar";
// import { deepPurple } from "@mui/material/colors";
// import IconButton from "@mui/material/IconButton";
// import Toolbar from "@mui/material/Toolbar";
// import { useReducer, useState } from "react";
// import { v1 } from "uuid";
// import { AddItemForm } from "./AddItemForm";
// import "./App.css";
// import { MenuButton } from "./MenuButton";
// import {
//   addTodolistAC,
//   changeTodolistFilterAC,
//   changeTodolistTitleAC,
//   removeTodolistAC,
// } from "./model/todolists-reducer/todolistAC";
// import { todolistReducer } from "./model/todolists-reducer/todolists-reducer";
// import { Todolist } from "./Todolist";
// export type TaskType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };
// export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistType = {
//   id: string;
//   title: string;
//   filter: FilterValuesType;
// };
// export type TaskStateType = { [key: string]: TaskType[] };
// function App() {
//   const todolistID1 = v1();
//   const todolistID2 = v1();

//   const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
//     {
//       id: todolistID1,
//       title: "What to Learn",
//       filter: "all",
//     },
//     {
//       id: todolistID2,
//       title: "What to buy",
//       filter: "all",
//     },
//   ]);
//   const [tasks, setTasks] = useState<TaskStateType>({
//     [todolistID1]: [
//       { id: v1(), title: "HTML&CSS", isDone: true },
//       { id: v1(), title: "JS", isDone: true },
//       { id: v1(), title: "ReactJS", isDone: false },
//     ],
//     [todolistID2]: [
//       { id: v1(), title: "Beer", isDone: true },
//       { id: v1(), title: "Cheeps", isDone: true },
//       { id: v1(), title: "Milk", isDone: false },
//     ],
//   });

//   const removeTask = (taskId: string, todolistId: string) => {
//     setTasks({
//       ...tasks,
//       [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
//     });
//   };
//   const addTask = (title: string, todolistId: string) => {
//     const newTask = {
//       id: v1(),
//       title: title,
//       isDone: false,
//     };
//     setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
//   };
//   const changeTaskStatus = (
//     taskId: string,
//     taskStatus: boolean,
//     todolistId: string
//   ) => {
//     const newTasks = tasks[todolistId].map((task) =>
//       task.id === taskId ? { ...task, isDone: taskStatus } : task
//     );
//     setTasks({ ...tasks, [todolistId]: newTasks });
//   };
//   const changeTodolistFilter = (
//     todolistId: string,
//     newFilter: FilterValuesType
//   ) => {
//     dispatchTodolists(changeTodolistFilterAC(todolistId, newFilter));
//   };
//   const removeTodolist = (todolistId: string) => {
//     const copyTasks = { ...tasks };
//     delete copyTasks[todolistId];
//     setTasks(copyTasks);
//     dispatchTodolists(removeTodolistAC(todolistId));
//   };
//   const addTodolist = (title: string) => {
//     const id = v1();
//     dispatchTodolists(addTodolistAC(title));
//     setTasks({ ...tasks, [id]: [] });
//   };
//   const changeTodolistTitle = (title: string, todolistId: string) => {
//     dispatchTodolists(changeTodolistTitleAC(title, todolistId));
//   };
//   const changeTaskTitle = (
//     taskId: string,
//     title: string,
//     todolistId: string
//   ) => {
//     const newTasks = tasks[todolistId].map((task) =>
//       task.id === taskId ? { ...task, title } : task
//     );
//     setTasks({ ...tasks, [todolistId]: newTasks });
//   };
//   const [isDark, setIsDark] = useState(false);
//   const theme = createTheme({
//     palette: {
//       mode: isDark ? "dark" : "light",
//       primary: deepPurple,
//       secondary: {
//         main: "#d81b60",
//       },
//     },
//   });
//   return (
//     <div className="App">
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <AppBar position="static">
//           <Toolbar sx={{ justifyContent: "space-between" }}>
//             <IconButton color="inherit">
//               <MenuIcon />
//             </IconButton>
//             <Box>
//               <MenuButton color="inherit" variant="outlined">
//                 Login
//               </MenuButton>
//               <MenuButton color="inherit" variant="outlined">
//                 Logout
//               </MenuButton>
//               <MenuButton
//                 color="inherit"
//                 variant="outlined"
//                 background={"green"}
//               >
//                 FAQ
//               </MenuButton>
//               <Switch
//                 onChange={() => {
//                   setIsDark(!isDark);
//                 }}
//               />
//             </Box>
//           </Toolbar>
//         </AppBar>
//         <Container>
//           <Grid2 container sx={{ p: "15px 0" }}>
//             <AddItemForm addItem={addTodolist} />
//           </Grid2>
//           <Grid2 container spacing={4}>
//             {todolists.map((todolist) => {
//               let filteredTasks = tasks[todolist.id];
//               if (todolist.filter === "active") {
//                 filteredTasks = filteredTasks.filter((task) => !task.isDone);
//               }
//               if (todolist.filter === "completed") {
//                 filteredTasks = filteredTasks.filter((task) => task.isDone);
//               }
//               return (
//                 <Grid2>
//                   <Paper elevation={8} sx={{ p: "20px" }}>
//                     <Todolist
//                       filter={todolist.filter}
//                       title={todolist.title}
//                       tasks={filteredTasks}
//                       todolistId={todolist.id}
//                       removeTask={removeTask}
//                       changeTodolistFilter={changeTodolistFilter}
//                       changeTodolistTitle={changeTodolistTitle}
//                       addTask={addTask}
//                       setTaskNewStatus={changeTaskStatus}
//                       removeTodolist={removeTodolist}
//                       changeTaskTitle={changeTaskTitle}
//                     />
//                   </Paper>
//                 </Grid2>
//               );
//             })}
//           </Grid2>
//         </Container>
//       </ThemeProvider>
//     </div>
//   );
// }

// export default App;
