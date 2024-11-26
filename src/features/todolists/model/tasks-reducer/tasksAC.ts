import type { DomainTask } from "features/todolists/api/tasksApi.types";

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return {
    type: "REMOVE_TASK",
    payload,
  } as const;
};
export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD_TASK",
    payload,
  } as const;
};
export const updateTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const;
};
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASKS", payload } as const;
};
