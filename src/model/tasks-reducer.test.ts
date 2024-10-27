import { TaskStateType } from "../App";
import { taskReducer } from "./tasks-reducer";
import {
  addTaskAC,
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
} from "./tasksAC";
import { addTodolistAC, removeTodolistAC } from "./todolistAC";
let todolistId1: string;
let todolistId2: string;
let taskId1: string;
let startState: TaskStateType;
beforeEach(() => {
  todolistId1 = "todolist1";
  todolistId2 = "todolist2";
  taskId1 = "id1";
  startState = {
    ["todolist1"]: [
      { id: "id1", title: "HTML&CSS", isDone: true },
      { id: "id2", title: "JS", isDone: true },
      { id: "id3", title: "ReactJS", isDone: false },
    ],
    ["todolist2"]: [
      { id: "id1", title: "Beer", isDone: true },
      { id: "id2", title: "Cheeps", isDone: true },
      { id: "id3", title: "Milk", isDone: false },
    ],
  };
});
test("Remove Task", () => {
  const endState: TaskStateType = taskReducer(
    startState,
    removeTaskAC(todolistId1, taskId1)
  );
  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId2].length).toBe(3);
  expect(
    endState[todolistId1].every((task) => task.id !== taskId1)
  ).toBeTruthy();
});
test("Add Task", () => {
  const endState: TaskStateType = taskReducer(
    startState,
    addTaskAC(todolistId1, "newTask")
  );
  expect(endState[todolistId1].length).toBe(4);
  expect(endState[todolistId2].length).toBe(3);
  expect(endState[todolistId1][3].title).toBe("newTask");
});
test("Change status Task", () => {
  const endState: TaskStateType = taskReducer(
    startState,
    changeStatusTaskAC(todolistId1, "id1", false)
  );
  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId1][0].isDone).toBe(false);
  expect(endState[todolistId2][0].isDone).toBe(true);
});
test("Change title Task", () => {
  const endState: TaskStateType = taskReducer(
    startState,
    changeTitleTaskAC(todolistId1, "id1", "newTitle")
  );
  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId1][0].title).toBe("newTitle");
  expect(endState[todolistId2][0].title).toBe("Beer");
});
test("Add Task after Add Todolist", () => {
  const action = addTodolistAC("without title");
  const endState: TaskStateType = taskReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find((key) => key !== todolistId1 && key !== todolistId2);
  if (!newKey) {
    throw Error("error");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("Remove tasks after remove todolist", () => {
  const action = removeTodolistAC(todolistId2);
  const endState: TaskStateType = taskReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistId2]).toBeUndefined();
});
