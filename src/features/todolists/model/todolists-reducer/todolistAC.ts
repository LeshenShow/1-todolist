import type { RequestStatus } from "app/app-reducer";
import type { FilterValuesType } from "common/types";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";

export const removeTodolistAC = (payload: { todolistId: string }) => {
  return {
    type: "REMOVE_TODOLIST",
    payload,
  } as const;
};
export const addTodolistAC = (payload: { todolist: DomainTodolist }) => {
  return {
    type: "ADD_TODOLIST",
    payload,
  } as const;
};
export const updateTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
  return {
    type: "UPDATE_TODOLIST_TITLE",
    payload,
  } as const;
};
export const updateTodolistFilterAC = (payload: {
  id: string;
  filter: FilterValuesType;
}) => {
  return {
    type: "UPDATE_TODOLIST_FILTER",
    payload,
  } as const;
};
export const setTodolistsAC = (payload: { todolists: DomainTodolist[] }) => {
  return { type: "SET_TODOLISTS", payload } as const;
};
export const changeDisabledAC = (payload: {
  todolistId: string;
  entityStatus: RequestStatus;
}) => {
  return { type: "CHANGE_DISABLED", payload } as const;
};
