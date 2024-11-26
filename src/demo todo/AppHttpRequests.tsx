// import Checkbox from "@mui/material/Checkbox";
// import type { DomainTask } from "features/todolists/api/tasksApi.types";
// import React, { ChangeEvent, useEffect, useState } from "react";
// import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
// import { EditableSpan } from "../common/components/EditableSpan/EditableSpan";
// import { tasksAPI } from "../features/todolists/api/tasksApi";
// import { todolistAPI } from "../features/todolists/api/todolistsApi";
// import type { Todolist } from "../features/todolists/api/todolistsApi.types";
// import { TaskStatus } from "../features/todolists/lib/enums";
export {};
// export const AppHttpRequests = () => {
//   const [todolists, setTodolists] = useState<Todolist[]>([]);
//   const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({});

//   useEffect(() => {
//     todolistAPI.getTodolists().then(res => {
//       const todolists = res.data;
//       setTodolists(todolists);
//       todolists.forEach(tl => {
//         tasksAPI.getTasks(tl.id).then(res => {
//           setTasks(prev => ({ ...prev, [tl.id]: res.data.items }));
//         });
//       });
//     });
//   }, []);
//   const createTodolistHandler = (title: string) => {
//     todolistAPI.createTodolist(title).then(res => {
//       const newTodolist = res.data.data.item;
//       setTodolists(prev => [newTodolist, ...prev]);
//     });
//   };
//   const removeTodolistHandler = (id: string) => {
//     todolistAPI.removeTodolist(id).then(() => {
//       setTodolists(prev => prev.filter(tl => tl.id !== id));
//     });
//   };
//   const updateTodolistHandler = (id: string, title: string) => {
//     todolistAPI.updateTodolist({ id, title }).then(() => {
//       setTodolists(todolists.map(tl => (tl.id === id ? { ...tl, title } : tl)));
//     });
//   };
//   const createTaskHandler = (title: string, todolistId: string) => {
//     tasksAPI.createTask({ todolistId, title }).then(res => {
//       const newTask = res.data.data.item;
//       setTasks(prev => ({
//         ...prev,
//         [todolistId]: [newTask, ...(prev[todolistId] || [])],
//       }));
//     });
//   };
//   const removeTaskHandler = (taskId: string, todolistId: string) => {
//     tasksAPI.removeTask({ todolistId, taskId }).then(() => {
//       setTasks(prev => ({
//         ...prev,
//         [todolistId]: prev[todolistId].filter(t => t.id !== taskId),
//       }));
//     });
//   };
//   const changeTaskStatusHandler = (
//     e: ChangeEvent<HTMLInputElement>,
//     task: DomainTask,
//     todolistId: string
//   ) => {
//     const checked = e.currentTarget.checked;
//     tasksAPI.changeTaskStatus({ todolistId, task, checked }).then(response => {
//       const update = response.data.data.item;
//       setTasks({
//         ...tasks,
//         [todolistId]: tasks[todolistId].map(t => (t.id === task.id ? update : t)),
//       });
//     });
//   };
//   const changeTaskTitleHandler = (
//     title: string,
//     task: DomainTask,
//     todolistId: string
//   ) => {
//     tasksAPI.changeTaskTitle({ todolistId, task, title }).then(response => {
//       const update = response.data.data.item;
//       setTasks({
//         ...tasks,
//         [todolistId]: tasks[todolistId].map(t => (t.id === task.id ? update : t)),
//       });
//     });
//   };
//   return (
//     <div style={{ margin: "20px" }}>
//       <AddItemForm addItem={createTodolistHandler} />

//       {/* Todolists */}
//       {todolists.map(tl => {
//         return (
//           <div key={tl.id} style={todolist}>
//             <div>
//               <EditableSpan
//                 value={tl.title}
//                 onChange={(title: string) => updateTodolistHandler(tl.id, title)}
//               />
//               <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
//             </div>
//             <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

//             {/* Tasks */}
//             {!!tasks[tl.id] &&
//               tasks[tl.id].map(task => {
//                 return (
//                   <div key={task.id}>
//                     <Checkbox
//                       checked={task.status === TaskStatus.Done}
//                       onChange={e => changeTaskStatusHandler(e, task, tl.id)}
//                     />
//                     <EditableSpan
//                       value={task.title}
//                       onChange={title => changeTaskTitleHandler(title, task, tl.id)}
//                     />
//                     <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
//                   </div>
//                 );
//               })}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // Styles
// const todolist: React.CSSProperties = {
//   border: "1px solid black",
//   margin: "20px 0",
//   padding: "10px",
//   width: "300px",
//   display: "flex",
//   justifyContent: "space-between",
//   flexDirection: "column",
// };
