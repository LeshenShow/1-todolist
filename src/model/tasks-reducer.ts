import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { AddTodolistAction, RemoveTodolistAction } from "./todolists-reducer";
const todolistID1 = v1();
const todolistID2 = v1();
const initialState: TaskStateType = {
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
};
export type RemoveTaskAction = {
  type: "REMOVE_TASK";
  payload: {
    todolistId: string;
    taskId: string;
  };
};
export type AddTaskAction = {
  type: "ADD_TASK";
  payload: {
    todolistId: string;
    title: string;
  };
};
export type ChangeStatusTaskAction = {
  type: "CHANGE_STATUS_TASK";
  payload: {
    todolistId: string;
    taskId: string;
    isDone: boolean;
  };
};
export type ChangeTitleTaskAction = {
  type: "CHANGE_TITLE_TASK";
  payload: {
    todolistId: string;
    taskId: string;
    title: string;
  };
};
export type Actions =
  | RemoveTaskAction
  | AddTaskAction
  | ChangeStatusTaskAction
  | ChangeTitleTaskAction
  | AddTodolistAction
  | RemoveTodolistAction;

export const taskReducer = (
  state: TaskStateType = initialState,
  action: Actions
): TaskStateType => {
  switch (action.type) {
    case "REMOVE_TASK": {
      const { todolistId, taskId } = action.payload;

      return {
        ...state,
        [todolistId]: state[todolistId].filter((task) => task.id !== taskId),
      };
    }
    case "ADD_TASK": {
      const { todolistId, title } = action.payload;

      return {
        ...state,
        [todolistId]: [
          ...state[todolistId],
          { id: v1(), title, isDone: false },
        ],
      };
    }
    case "CHANGE_STATUS_TASK": {
      const { todolistId, taskId, isDone } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => {
          return task.id === taskId ? { ...task, isDone } : task;
        }),
      };
    }
    case "CHANGE_TITLE_TASK": {
      const { todolistId, taskId, title } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => {
          return task.id === taskId ? { ...task, title } : task;
        }),
      };
    }
    case "ADD_TODOLIST": {
      const { id } = action.payload;
      return { ...state, [id]: [] };
    }
    case "REMOVE_TODOLIST": {
      const { id } = action.payload;
      delete state[id];
      return { ...state };
    }
    default:
      throw new Error("Unknown action type");
      return { ...state };
  }
};
