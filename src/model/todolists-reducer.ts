import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";
// export const REMOVE_TODOLIST = "REMOVE_TODOLIST";
// export const ADD_TODOLIST = "ADD_TODOLIST";
const todolistID1 = v1();
const todolistID2 = v1();
const initialState: TodolistType[] = [
  {
    id: todolistID1,
    title: "What to Learn",
    filter: "all",
  },
  {
    id: todolistID2,
    title: "What to buy",
    filter: "all",
  },
];
export type RemoveTodolistAction = {
  type: "REMOVE_TODOLIST";
  payload: {
    id: string;
  };
};
export type AddTodolistAction = {
  type: "ADD_TODOLIST";
  payload: {
    title: string;
    id: string;
  };
};
export type ChangeTodolistTitleAction = {
  type: "CHANGE_TODOLIST_TITLE";
  payload: {
    id: string;
    title: string;
  };
};
export type ChangeTodolistFilterAction = {
  type: "CHANGE_TODOLIST_FILTER";
  payload: {
    id: string;
    filter: FilterValuesType;
  };
};
export type Actions =
  | RemoveTodolistAction
  | AddTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction;

export const todolistReducer = (
  state: TodolistType[] = initialState,
  action: Actions
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE_TODOLIST": {
      const { id } = action.payload;
      return state.filter((todolist) => todolist.id !== id);
    }
    case "ADD_TODOLIST": {
      const { title, id } = action.payload;
      return [
        ...state,
        {
          id,
          title,
          filter: "all",
        },
      ];
    }
    case "CHANGE_TODOLIST_TITLE": {
      const { id, title } = action.payload;
      return state.map((todolist) =>
        todolist.id === id ? { ...todolist, title } : todolist
      );
    }
    case "CHANGE_TODOLIST_FILTER": {
      const { id, filter } = action.payload;
      return state.map((todolist) =>
        todolist.id === id ? { ...todolist, filter } : todolist
      );
    }
    default:
      throw new Error("Unknown action type");
      return [...state];
  }
};
