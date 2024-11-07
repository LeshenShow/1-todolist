import { TaskStateType, TodolistType } from "../Main";
import { tasksReducer } from "./tasks-reducer/tasks-reducer";
import { addTodolistAC } from "./todolists-reducer/todolistAC";
import { todolistsReducer } from "./todolists-reducer/todolists-reducer";

test("Add Task after Add Todolist", () => {
  const startTodolistsState: TodolistType[] = [];
  const startTasksState: TaskStateType = {};

  const action = addTodolistAC({ title: "without title" });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;
  expect(idFromTodolists).toBe(action.payload.id);
  expect(idFromTasks).toBe(action.payload.id);
});
