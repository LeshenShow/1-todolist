import {
  addTodolistAC,
  removeTodolistAC,
  updateTodolistFilterAC,
  type changeDisabledAC,
  type setTodolistsAC,
  type updateTodolistTitleAC,
} from "./index";

export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAction = ReturnType<typeof addTodolistAC>;
export type UpdateTodolistTitleAction = ReturnType<typeof updateTodolistTitleAC>;
export type UpdateTodolistFilterAction = ReturnType<typeof updateTodolistFilterAC>;
export type SetTodolistsAction = ReturnType<typeof setTodolistsAC>;
export type ChangeDisabledAction = ReturnType<typeof changeDisabledAC>;

export type Actions =
  | RemoveTodolistAction
  | AddTodolistAction
  | UpdateTodolistTitleAction
  | UpdateTodolistFilterAction
  | SetTodolistsAction
  | ChangeDisabledAction;
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
