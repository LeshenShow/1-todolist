import { setAppStatusAC } from "app/app-reducer";
import type { AppThunk } from "app/store";
import { handleServerAppError, handleServerNetworkError } from "common/utils";
import { todolistAPI } from "features/todolists/api";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { ResultCode } from "features/todolists/lib/enums";
import {
  Actions,
  addTodolistAC,
  changeDisabledAC,
  removeTodolistAC,
  setTodolistsAC,
  updateTodolistTitleAC,
} from "./index";

export const todolistsReducer = (
  state: DomainTodolist[] = [],
  action: Actions
): DomainTodolist[] => {
  switch (action.type) {
    case "SET_TODOLISTS": {
      const { todolists } = action.payload;
      return todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }));
    }
    case "REMOVE_TODOLIST": {
      const { todolistId } = action.payload;
      return state.filter(todolist => todolist.id !== todolistId);
    }
    case "ADD_TODOLIST": {
      const { todolist } = action.payload;
      return [...state, { ...todolist, filter: "all", entityStatus: "idle" }];
    }
    case "UPDATE_TODOLIST_TITLE": {
      const { todolistId, title } = action.payload;
      return state.map(todolist =>
        todolist.id === todolistId ? { ...todolist, title } : todolist
      );
    }
    case "UPDATE_TODOLIST_FILTER": {
      const { id, filter } = action.payload;
      return state.map(todolist =>
        todolist.id === id ? { ...todolist, filter } : todolist
      );
    }
    case "CHANGE_DISABLED": {
      const { todolistId, entityStatus } = action.payload;
      return state.map(todolist =>
        todolist.id === todolistId ? { ...todolist, entityStatus } : todolist
      );
    }
    default:
      return state;
  }
};

export const fetchTodolistsTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI
    .getTodolists()
    .then(res => {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setTodolistsAC({ todolists: res.data }));
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch);
    });
};
export const addTodolistTC =
  (payload: { title: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .createTodolist(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(addTodolistAC({ todolist: res.data.data.item }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export const removeTodolistTC =
  (payload: { todolistId: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"));
    dispatch(
      changeDisabledAC({ todolistId: payload.todolistId, entityStatus: "loading" })
    );
    todolistAPI
      .removeTodolist(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(removeTodolistAC(payload));
        } else {
          handleServerAppError(res.data, dispatch);
          changeDisabledAC({
            todolistId: payload.todolistId,
            entityStatus: "succeeded",
          });
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export const updateTodolistTitleTC =
  (payload: { todolistId: string; title: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .updateTodolist(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(updateTodolistTitleAC(payload));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
