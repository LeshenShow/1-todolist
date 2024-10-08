export {};

// import React, { KeyboardEvent } from "react";
// import { FilterValueType, TaskType } from "./App";
// import "./App.css";
// import { Button } from "./Button";
// import { useRef } from "react";
// export type TodolistPropsType = {
//   title: string;
//   tasks: TaskType[];
//   date?: string;
//   removeTask: (taskId: string) => void;
//   changeFilter: (newFilter: FilterValueType) => void;
//   addTask: (title: string) => void;
//   setTaskStatus: (id: string, newStatus: boolean) => void;
// };

// export function Todolist(props: TodolistPropsType) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const onClickAddTaskHandler = () => {
//     if (inputRef.current) {
//       if (inputRef.current.value.length > 15) {
//       } else {
//         props.addTask(inputRef.current.value);
//         inputRef.current.value = "";
//       }
//     }
//   };
//   const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       onClickAddTaskHandler();
//     }
//   };
//   return (
//     <div className="todolist">
//       <h3>{props.title}</h3>
//       <div>
//         <input ref={inputRef} placeholder="add task 15 length" />
//         <Button title={"+"} onClickHandler={onClickAddTaskHandler} />
//         <div>max length 15 sim</div>
//       </div>
//       {props.tasks?.length === 0 ? (
//         <p>Not Tasks</p>
//       ) : (
//         <ul>
//           {props.tasks.map((task) => {
//             return (
//               <li key={task.id}>
//                 <input
//                   type="checkbox"
//                   // checked={task.isDone}
//                   onChange={(e) => {
//                     props.setTaskStatus(task.id, e.currentTarget.checked);
//                   }}
//                 />
//                 <span>{task.title}</span>
//                 <button onClick={() => props.removeTask(task.id)}>
//                   <span>Delete</span>
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       )}

//       <div>{props.date}</div>
//       <div>
//         <Button
//           title={"All"}
//           onClickHandler={() => {
//             props.changeFilter("all");
//           }}
//         />
//         <Button
//           title={"Active"}
//           onClickHandler={() => {
//             props.changeFilter("active");
//           }}
//         />
//         <Button
//           title={"Completed"}
//           onClickHandler={() => {
//             props.changeFilter("completed");
//           }}
//         />
//       </div>
//     </div>
//   );
// }
