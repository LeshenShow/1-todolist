import { TaskStateType, TodolistType } from "../App";
import { taskReducer } from "./tasks-reducer";
import { addTodolistAC } from "./todolistAC";
import { todolistReducer } from "./todolists-reducer";

test("Add Task after Add Todolist", () => {
  const startTodolistsState: TodolistType[] = [];
  const startTasksState: TaskStateType = {};

  const action = addTodolistAC("without title");

  const endTasksState = taskReducer(startTasksState, action);
  const endTodolistsState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;
  expect(idFromTodolists).toBe(action.payload.id);
  expect(idFromTasks).toBe(action.payload.id);
});
