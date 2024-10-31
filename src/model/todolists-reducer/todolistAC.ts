import { v1 } from "uuid";
import { FilterValuesType } from "../../App";

export const removeTodolistAC = (payload: { id: string }) => {
  return {
    type: "REMOVE_TODOLIST",
    payload,
  } as const;
};
export const addTodolistAC = (payload: { title: string }) => {
  return {
    type: "ADD_TODOLIST",
    payload: { ...payload, id: v1() },
  } as const;
};
export const changeTodolistTitleAC = (payload: {
  id: string;
  title: string;
}) => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    payload,
  } as const;
};
export const changeTodolistFilterAC = (payload: {
  id: string;
  filter: FilterValuesType;
}) => {
  return {
    type: "CHANGE_TODOLIST_FILTER",
    payload,
  } as const;
};
