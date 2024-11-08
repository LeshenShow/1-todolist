import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./index";

export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAction = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAction = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeTodolistFilterAction = ReturnType<
  typeof changeTodolistFilterAC
>;
export type Actions =
  | RemoveTodolistAction
  | AddTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction;
// export type RemoveTodolistAction = {
//   type: "REMOVE_TODOLIST";
//   payload: {
//     id: string;
//   };
// };
// export type AddTodolistAction = {
//   type: "ADD_TODOLIST";
//   payload: {
//     title: string;
//     id: string;
//   };
// };
// export type ChangeTodolistTitleAction = {
//   type: "CHANGE_TODOLIST_TITLE";
//   payload: {
//     id: string;
//     title: string;
//   };
// };
// export type ChangeTodolistFilterAction = {
//   type: "CHANGE_TODOLIST_FILTER";
//   payload: {
//     id: string;
//     filter: FilterValuesType;
//   };
// };
