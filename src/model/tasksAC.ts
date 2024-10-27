import { FilterValuesType } from "../App";
import {
  AddTaskAction,
  ChangeStatusTaskAction,
  ChangeTitleTaskAction,
  RemoveTaskAction,
} from "./tasks-reducer";

export const removeTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskAction => {
  return {
    type: "REMOVE_TASK",
    payload: {
      todolistId,
      taskId,
    },
  } as const;
};
export const addTaskAC = (todolistId: string, title: string): AddTaskAction => {
  return {
    type: "ADD_TASK",
    payload: {
      todolistId,
      title,
    },
  } as const;
};
export const changeStatusTaskAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
): ChangeStatusTaskAction => {
  return {
    type: "CHANGE_STATUS_TASK",
    payload: {
      todolistId,
      taskId,
      isDone,
    },
  } as const;
};
export const changeTitleTaskAC = (
  todolistId: string,
  taskId: string,
  title: string
): ChangeTitleTaskAction => {
  return {
    type: "CHANGE_TITLE_TASK",
    payload: {
      todolistId,
      taskId,
      title,
    },
  } as const;
};
