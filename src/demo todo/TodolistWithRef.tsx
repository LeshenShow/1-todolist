export {};
// import React, { KeyboardEvent, useState } from "react";
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
// };

// export function Todolist(props: TodolistPropsType) {
//   const onClickAddTaskHandler = () => {
//     props.addTask(taskTitle);
//     setTaskTitle("");
//   };
//   const [taskTitle, setTaskTitle] = useState<string>("");
//   const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       onClickAddTaskHandler();
//     }
//   };
//   const isTitleLengthValid = taskTitle.length >= 15;
//   return (
//     <div className="todolist">
//       <h3>{props.title}</h3>
//       <div>
//         <input
//           placeholder="add task 15 length"
//           value={taskTitle}
//           onChange={(e) => {
//             setTaskTitle(e.currentTarget.value);
//           }}
//           onKeyDown={onKeyDownAddTaskHandler}
//         />
//         <Button
//           title={"+"}
//           onClickHandler={onClickAddTaskHandler}
//           isDisabled={isTitleLengthValid}
//         />
//         {!isTitleLengthValid && <div>max length 15 sim</div>}
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
//                   checked={task.isDone}
//                   onChange={() => {}}
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
