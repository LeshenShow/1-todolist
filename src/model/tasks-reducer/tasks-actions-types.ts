import { AddTodolistAction, RemoveTodolistAction } from "../todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./index";

export type RemoveTaskAction = ReturnType<typeof removeTaskAC>;
export type AddTaskAction = ReturnType<typeof addTaskAC>;
export type ChangeStatusTaskAction = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTitleTaskAction = ReturnType<typeof changeTaskTitleAC>;
export type Actions =
  | RemoveTaskAction
  | AddTaskAction
  | ChangeStatusTaskAction
  | ChangeTitleTaskAction
  | AddTodolistAction
  | RemoveTodolistAction;
// export type RemoveTaskAction = {
//   type: "REMOVE_TASK";
//   payload: {
//     todolistId: string;
//     taskId: string;
//   };
// };
// export type AddTaskAction = {
//   type: "ADD_TASK";
//   payload: {
//     todolistId: string;
//     title: string;
//   };
// };
// export type ChangeStatusTaskAction = {
//   type: "CHANGE_STATUS_TASK";
//   payload: {
//     todolistId: string;
//     taskId: string;
//     isDone: boolean;
//   };
// };
// export type ChangeTitleTaskAction = {
//   type: "CHANGE_TITLE_TASK";
//   payload: {
//     todolistId: string;
//     taskId: string;
//     title: string;
//   };
// };
