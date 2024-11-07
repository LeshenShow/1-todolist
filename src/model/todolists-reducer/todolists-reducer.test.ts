import { v1 } from "uuid";
import { TodolistType } from "../../Main";
import {
  todolistsReducer,
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./index";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[];
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {
      id: todolistId1,
      title: "What to Learn",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
    },
  ];
});
// test("Remove Todolist", () => {
//   const action = {
//     type: "REMOVE-TODOLIST",
//     payload: { id: todolistId1 },
//   } as const;
//   const endState: TodolistType[] = todolistReducer(startState, action);
//   expect(endState.length).toBe(1);
//   expect(endState[0].id).toBe(todolistId2);
// });
test("Remove Todolist", () => {
  const endState: TodolistType[] = todolistsReducer(
    startState,
    removeTodolistAC({ id: todolistId1 })
  );
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
test("Add new Todolist", () => {
  const endState: TodolistType[] = todolistsReducer(
    startState,
    addTodolistAC({ title: "New Todolist" })
  );
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("New Todolist");
});
test("Change Todolist title", () => {
  const endState: TodolistType[] = todolistsReducer(
    startState,
    changeTodolistTitleAC({ id: todolistId1, title: "New Todolist" })
  );
  expect(endState[0].title).toBe("New Todolist");
  expect(endState[1].title).toBe("What to buy");
});
test("Change Todolist filter", () => {
  const endState: TodolistType[] = todolistsReducer(
    startState,
    changeTodolistFilterAC({ id: todolistId2, filter: "completed" })
  );
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
});
