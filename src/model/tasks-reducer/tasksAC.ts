export const removeTaskAC = (payload: {
  todolistId: string;
  taskId: string;
}) => {
  return {
    type: "REMOVE_TASK",
    payload,
  } as const;
};
export const addTaskAC = (payload: { todolistId: string; title: string }) => {
  return {
    type: "ADD_TASK",
    payload,
  } as const;
};
export const changeTaskStatusAC = (payload: {
  todolistId: string;
  taskId: string;
  isDone: boolean;
}) => {
  return {
    type: "CHANGE_STATUS_TASK",
    payload,
  } as const;
};
export const changeTaskTitleAC = (payload: {
  todolistId: string;
  taskId: string;
  title: string;
}) => {
  return {
    type: "CHANGE_TITLE_TASK",
    payload,
  } as const;
};
