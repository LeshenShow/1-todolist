import { createSlice } from "@reduxjs/toolkit";
import { setAppStatus } from "app/appSlice";
import type { AppThunk } from "app/store";
import { handleServerAppError } from "common/utils";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { tasksAPI } from "features/todolists/api";
import type { DomainTask, UpdateTaskModel } from "features/todolists/api/tasksApi.types";
import { ResultCode } from "features/todolists/lib/enums";
import { addTodolist, removeTodolist } from "./todolistsSlice";
export type TasksState = { [key: string]: DomainTask[] }; // { 'TodoId1':[ {id:1}, {id:2} ]}
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: create => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>(
      (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      }
    ),
    removeTask: create.reducer<{ todolistId: string; taskId: string }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(t => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      }
    ),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    }),
    updateTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId];
      const task = tasks.find(t => t.id === action.payload.task.id);
      if (task) {
        task.title = action.payload.task.title;
        task.status = action.payload.task.status;
      }
    }),
    clearTasks: create.reducer(() => {
      return {};
    }),
  }),

  extraReducers: builder => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id];
      });
  },
  selectors: {
    selectTasks: (state: TasksState) => state,
  },
});
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;
export const { removeTask, addTask, updateTask, setTasks, clearTasks } =
  tasksSlice.actions;

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }));
    tasksAPI
      .getTasks(todolistId)
      .then(res => {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(setTasks({ todolistId, tasks: res.data.items }));
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export const removeTaskTC =
  (payload: { todolistId: string; taskId: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }));
    tasksAPI
      .removeTask(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(removeTask(payload));
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
    dispatch(setAppStatus({ status: "loading" }));
    tasksAPI
      .createTask(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(addTask({ task: res.data.data.item }));
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
    dispatch(setAppStatus({ status: "loading" }));
    tasksAPI
      .updateTask({ model, todolistId: task.todoListId, taskId: task.id })
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(updateTask({ task: res.data.data.item }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
// export const tasksReducer = (state: TasksState = {}, action: Actions): TasksState => {
// switch (action.type) {
//     case "REMOVE_TASK": {
//       const { todolistId, taskId } = action.payload;
//       return {
//         ...state,
//         [todolistId]: state[todolistId].filter(task => task.id !== taskId),
//       };
//     }
//     case "ADD_TASK": {
//       const { task } = action.payload;
//       return {
//         ...state,
//         [task.todoListId]: [task, ...state[task.todoListId]],
//       };
//     }
//     case "UPDATE_TASK": {
//       const { task } = action.payload;
//       return {
//         ...state,
//         [task.todoListId]: state[task.todoListId].map(t => {
//           return t.id === task.id ? { ...t, title: task.title, status: task.status } : t;
//         }),
//       };
//     }
//     case "SET-TASKS": {
//       const stateCopy = { ...state };
//       stateCopy[action.payload.todolistId] = action.payload.tasks;
//       return stateCopy;
//     }
//     case "ADD_TODOLIST": {
//       const { todolist } = action.payload;
//       return { ...state, [todolist.id]: [] };
//     }
//     case "REMOVE_TODOLIST": {
//       const { todolistId } = action.payload;
//       const stateCopy = { ...state };
//       delete stateCopy[todolistId];
//       return stateCopy;
//     }
//     case "CLEAR_DATA": {
//       return {};
//     }
//     default:
//       return state;
//   }
// };
// export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
//   return {
//     type: "REMOVE_TASK",
//     payload,
//   } as const;
// };
// export const addTaskAC = (payload: { task: DomainTask }) => {
//   return {
//     type: "ADD_TASK",
//     payload,
//   } as const;
// };
// export const updateTaskAC = (payload: { task: DomainTask }) => {
//   return {
//     type: "UPDATE_TASK",
//     payload,
//   } as const;
// };
// export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
//   return { type: "SET-TASKS", payload } as const;
// };
