import { setAppStatusAC } from "app/app-reducer";
import type { AppThunk } from "app/store";
import { handleServerAppError } from "common/utils";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { tasksAPI } from "features/todolists/api";
import type { DomainTask, UpdateTaskModel } from "features/todolists/api/tasksApi.types";
import { ResultCode } from "features/todolists/lib/enums";
import { Actions, addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from "./index";

export const tasksReducer = (state: TasksState = {}, action: Actions): TasksState => {
  switch (action.type) {
    case "REMOVE_TASK": {
      const { todolistId, taskId } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].filter(task => task.id !== taskId),
      };
    }
    case "ADD_TASK": {
      const { task } = action.payload;
      return {
        ...state,
        [task.todoListId]: [task, ...state[task.todoListId]],
      };
    }
    case "UPDATE_TASK": {
      const { task } = action.payload;
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map(t => {
          return t.id === task.id ? { ...t, title: task.title, status: task.status } : t;
        }),
      };
    }
    case "SET-TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = action.payload.tasks;
      return stateCopy;
    }
    case "ADD_TODOLIST": {
      const { todolist } = action.payload;
      return { ...state, [todolist.id]: [] };
    }
    case "REMOVE_TODOLIST": {
      const { todolistId } = action.payload;
      const stateCopy = { ...state };
      delete stateCopy[todolistId];
      return stateCopy;
    }
    default:
      return state;
  }
};
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .getTasks(todolistId)
      .then(res => {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setTasksAC({ todolistId, tasks: res.data.items }));
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export const removeTaskTC =
  (payload: { todolistId: string; taskId: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .removeTask(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(removeTaskAC(payload));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export const addTaskTC =
  (payload: { todolistId: string; title: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .createTask(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(addTaskAC({ task: res.data.data.item }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export const updateTaskTC =
  (payload: { task: DomainTask }): AppThunk =>
  dispatch => {
    const { task } = payload;
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };
    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .updateTask({ model, todolistId: task.todoListId, taskId: task.id })
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(updateTaskAC({ task: res.data.data.item }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export type TasksState = { [key: string]: DomainTask[] };
