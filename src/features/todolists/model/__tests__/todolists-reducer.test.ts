import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import {
  addTodolistAC,
  removeTodolistAC,
  todolistsReducer,
  updateTodolistFilterAC,
  updateTodolistTitleAC,
} from "../todolists-reducer";
let todolistId1: string;
let todolistId2: string;
let startState: DomainTodolist[];
beforeEach(() => {
  todolistId1 = "todolist1";
  todolistId2 = "todolist2";
  startState = [
    {
      id: "todolist1",
      addedDate: "bla",
      order: 0,
      title: "todolist1",
      filter: "all",
    },
    {
      id: "todolist2",
      addedDate: "bla",
      order: 0,
      title: "todolist2",
      filter: "all",
    },
  ];
});

test("Remove Todolist", () => {
  const endState: DomainTodolist[] = todolistsReducer(
    startState,
    removeTodolistAC({ todolistId: todolistId1 })
  );
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
test("Add new Todolist", () => {
  const newTodolist: DomainTodolist = {
    id: "todolist3",
    addedDate: "bla",
    order: 0,
    title: "newTodolist",
    filter: "all",
  };
  const endState: DomainTodolist[] = todolistsReducer(
    startState,
    addTodolistAC({ todolist: newTodolist })
  );
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("newTodolist");
});
test("Change Todolist title", () => {
  const endState: DomainTodolist[] = todolistsReducer(
    startState,
    updateTodolistTitleAC({ todolistId: todolistId1, title: "New Todolist" })
  );
  expect(endState[0].title).toBe("New Todolist");
  expect(endState[1].title).toBe("todolist2");
});
test("Change Todolist filter", () => {
  const endState: DomainTodolist[] = todolistsReducer(
    startState,
    updateTodolistFilterAC({ id: todolistId2, filter: "completed" })
  );
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
});
