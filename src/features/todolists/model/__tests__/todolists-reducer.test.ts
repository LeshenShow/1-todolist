import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import {
  addTodolist,
  removeTodolist,
  todolistsReducer,
  updateTodolistFilter,
  updateTodolistTitle,
} from "../todolistsSlice";
let todolistId1: string;
let todolistId2: string;
let startState: DomainTodolist[];
beforeEach(() => {
  todolistId1 = "todolist1";
  todolistId2 = "todolist2";
  startState = [
    {
      id: todolistId1,
      addedDate: "bla",
      order: 0,
      title: todolistId1,
      filter: "all",
      entityStatus: "idle",
    },
    {
      id: todolistId2,
      addedDate: "bla",
      order: 0,
      title: todolistId2,
      filter: "all",
      entityStatus: "idle",
    },
  ];
});

test("Remove Todolist", () => {
  const endState: DomainTodolist[] = todolistsReducer(
    startState,
    removeTodolist({ id: todolistId1 })
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
    entityStatus: "idle",
  };
  const endState: DomainTodolist[] = todolistsReducer(
    startState,
    addTodolist({ todolist: newTodolist })
  );
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("newTodolist");
});
test("Change Todolist title", () => {
  const endState: DomainTodolist[] = todolistsReducer(
    startState,
    updateTodolistTitle({ id: todolistId1, title: "New Todolist" })
  );
  expect(endState[0].title).toBe("New Todolist");
  expect(endState[1].title).toBe("todolist2");
});
test("Change Todolist filter", () => {
  const endState: DomainTodolist[] = todolistsReducer(
    startState,
    updateTodolistFilter({ id: todolistId2, filter: "completed" })
  );
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
});
