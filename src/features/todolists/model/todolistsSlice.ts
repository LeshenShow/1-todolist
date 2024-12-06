import { createSlice, current } from "@reduxjs/toolkit";
import type { RequestStatus } from "app/appSlice";
import { setAppStatus } from "app/appSlice";
import type { AppThunk } from "app/store";
import type { FilterValuesType } from "common/types";
import { handleServerAppError, handleServerNetworkError } from "common/utils";
import { todolistAPI } from "features/todolists/api";
import type { DomainTodolist, Todolist } from "features/todolists/api/todolistsApi.types";
import { ResultCode } from "features/todolists/lib/enums";
import { fetchTasksTC } from "./tasksSlice";
export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: { todolists: [] as DomainTodolist[] }, // объект проще расширять
  reducers: create => ({
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      // return action.payload.todolists.map(tl => ({
      //   ...tl,
      //   filter: "all",
      //   entityStatus: "idle",
      // }));
      action.payload.todolists.forEach(tl => {
        state.todolists.push({ ...tl, filter: "all", entityStatus: "idle" });
      });
      const a = current(state.todolists); // debug state
    }),
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.todolists.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.todolists.splice(index, 1);
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      };
      state.todolists.unshift(newTodolist);
    }),
    updateTodolistTitle: create.reducer<{ id: string; title: string }>(
      (state, action) => {
        const index = state.todolists.findIndex(tl => tl.id === action.payload.id);
        if (index !== -1) state.todolists[index].title = action.payload.title;
      }
    ),
    updateTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>(
      (state, action) => {
        const index = state.todolists.findIndex(tl => tl.id === action.payload.id);
        if (index !== -1) state.todolists[index].filter = action.payload.filter;
      }
    ),
    updateTodolistStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>(
      (state, action) => {
        const index = state.todolists.findIndex(tl => tl.id === action.payload.id);
        if (index !== -1)
          state.todolists[index].entityStatus = action.payload.entityStatus;
      }
    ),
    clearData: create.reducer(state => {
      // return [];
      // return todolistSlice.getInitialState()
      state.todolists.length = 0;
    }),
  }),
  selectors: {
    selectTodolists: state => state.todolists,
  },
});
export const todolistsReducer = todolistsSlice.reducer;
export const { selectTodolists } = todolistsSlice.selectors;
export const {
  setTodolists,
  removeTodolist,
  addTodolist,
  updateTodolistTitle,
  updateTodolistFilter,
  updateTodolistStatus,
  clearData,
} = todolistsSlice.actions;

export const fetchTodolistsTC = () => (dispatch: any) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistAPI
    .getTodolists()
    .then(res => {
      dispatch(setAppStatus({ status: "succeeded" }));
      dispatch(setTodolists({ todolists: res.data }));
      return res.data;
    })
    .then(todolists => {
      todolists.forEach(tl => {
        dispatch(fetchTasksTC(tl.id));
      });
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch);
    });
};
export const addTodolistTC =
  (payload: { title: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }));
    todolistAPI
      .createTodolist(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(addTodolist({ todolist: res.data.data.item }));
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
    dispatch(setAppStatus({ status: "loading" }));
    dispatch(updateTodolistStatus({ id: payload.todolistId, entityStatus: "loading" }));
    todolistAPI
      .removeTodolist(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(removeTodolist({ id: payload.todolistId }));
        } else {
          handleServerAppError(res.data, dispatch);
          updateTodolistStatus({
            id: payload.todolistId,
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
    dispatch(setAppStatus({ status: "loading" }));
    todolistAPI
      .updateTodolist(payload)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(updateTodolistTitle({ id: payload.todolistId, title: payload.title }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
// {
//   filter: "all" as FilterValuesType,
//   entityStatus: "idle" as RequestStatus,
//   id: "",
//   addedDate: "",
//   order: 0,
//   title: "",
// },
// export const todolistsReducer = (
//   state: DomainTodolist[] = [],
//   action: Actions
// ): DomainTodolist[] => {
//   switch (action.type) {
//     case "SET_TODOLISTS": {
//       const { todolists } = action.payload;
//       return todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }));
//     }
//     case "REMOVE_TODOLIST": {
//       const { todolistId } = action.payload;
//       return state.filter(todolist => todolist.id !== todolistId);
//     }
//     case "ADD_TODOLIST": {
//       const { todolist } = action.payload;
//       return [...state, { ...todolist, filter: "all", entityStatus: "idle" }];
//     }
//     case "UPDATE_TODOLIST_TITLE": {
//       const { todolistId, title } = action.payload;
//       return state.map(todolist =>
//         todolist.id === todolistId ? { ...todolist, title } : todolist
//       );
//     }
//     case "UPDATE_TODOLIST_FILTER": {
//       const { id, filter } = action.payload;
//       return state.map(todolist =>
//         todolist.id === id ? { ...todolist, filter } : todolist
//       );
//     }
//     case "CHANGE_DISABLED": {
//       const { todolistId, entityStatus } = action.payload;
//       return state.map(todolist =>
//         todolist.id === todolistId ? { ...todolist, entityStatus } : todolist
//       );
//     }
//     case "CLEAR_DATA": {
//       return [];
//     }
//     default:
//       return state;
//   }
// };
// export const removeTodolistAC = (payload: { todolistId: string }) => {
//   return {
//     type: "REMOVE_TODOLIST",
//     payload,
//   } as const;
// };
// export const addTodolistAC = (payload: { todolist: DomainTodolist }) => {
//   return {
//     type: "ADD_TODOLIST",
//     payload,
//   } as const;
// };
// export const updateTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
//   return {
//     type: "UPDATE_TODOLIST_TITLE",
//     payload,
//   } as const;
// };
// export const updateTodolistFilterAC = (payload: {
//   id: string;
//   filter: FilterValuesType;
// }) => {
//   return {
//     type: "UPDATE_TODOLIST_FILTER",
//     payload,
//   } as const;
// };
// export const setTodolistsAC = (payload: { todolists: DomainTodolist[] }) => {
//   return { type: "SET_TODOLISTS", payload } as const;
// };
// export const changeDisabledAC = (payload: {
//   todolistId: string;
//   entityStatus: RequestStatus;
// }) => {
//   return { type: "CHANGE_DISABLED", payload } as const;
// };
// export const clearDataAC = () => {
//   return { type: "CLEAR_DATA" } as const;
// };
