import { v1 } from "uuid";
import { FilterValuesType } from "../App";

export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE_TODOLIST",
    payload: { id },
  } as const;
};
export const addTodolistAC = (title: string) => {
  return {
    type: "ADD_TODOLIST",
    payload: { title, id: v1() },
  } as const;
};
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    payload: { id, title },
  } as const;
};
export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
) => {
  return {
    type: "CHANGE_TODOLIST_FILTER",
    payload: { id, filter },
  } as const;
};
