import type { DomainTask } from "features/todolists/api/tasksApi.types";
import { TaskPriority, TaskStatus } from "features/todolists/lib/enums";
import {
  type TasksState,
  addTaskAC,
  removeTaskAC,
  tasksReducer,
  updateTaskAC,
} from "../tasks-reducer";
import { removeTodolistAC } from "../todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let taskId1: string;
let startState: TasksState;
beforeEach(() => {
  todolistId1 = "todolist1";
  todolistId2 = "todolist2";
  taskId1 = "id1";
  startState = {
    todolist1: [
      {
        description: "",
        title: "task1",
        status: TaskStatus.Active,
        priority: TaskPriority.High,
        startDate: "",
        deadline: "",
        id: "id1",
        todoListId: "todolist1",
        order: 0,
        addedDate: "bla",
      },
      {
        description: "",
        title: "task2",
        status: TaskStatus.Active,
        priority: TaskPriority.High,
        startDate: "",
        deadline: "",
        id: "id2",
        todoListId: "todolist1",
        order: 0,
        addedDate: "bla",
      },
    ],
    todolist2: [
      {
        description: "",
        title: "task3",
        status: TaskStatus.Active,
        priority: TaskPriority.High,
        startDate: "",
        deadline: "",
        id: "id3",
        todoListId: "todolist2",
        order: 0,
        addedDate: "bla",
      },
      {
        description: "",
        title: "task3",
        status: TaskStatus.Active,
        priority: TaskPriority.High,
        startDate: "",
        deadline: "",
        id: "id3",
        todoListId: "todolist2",
        order: 0,
        addedDate: "bla",
      },
    ],
  };
});
test("Remove Task", () => {
  const endState: TasksState = tasksReducer(
    startState,
    removeTaskAC({ todolistId: todolistId1, taskId: taskId1 })
  );
  expect(endState[todolistId1].length).toBe(1);
  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId1].every(task => task.id !== taskId1)).toBeTruthy();
});
test("Add Task", () => {
  const newTask: DomainTask = {
    description: "",
    title: "newTask",
    status: TaskStatus.Active,
    priority: TaskPriority.High,
    startDate: "",
    deadline: "",
    id: "id1",
    todoListId: "todolist1",
    order: 0,
    addedDate: "bla",
  };
  const endState: TasksState = tasksReducer(startState, addTaskAC({ task: newTask }));
  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe("newTask");
});
test("Change status Task", () => {
  const newTask: DomainTask = {
    description: "",
    title: "newTask",
    status: TaskStatus.Done,
    priority: TaskPriority.High,
    startDate: "",
    deadline: "",
    id: "id1",
    todoListId: "todolist1",
    order: 0,
    addedDate: "bla",
  };
  const endState: TasksState = tasksReducer(
    startState,
    updateTaskAC({
      task: newTask,
    })
  );
  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId1][0].status).toBe(TaskStatus.Done);
  expect(endState[todolistId2][0].status).toBe(TaskStatus.Active);
});
test("Change title Task", () => {
  const newTask: DomainTask = {
    description: "",
    title: "newTask",
    status: TaskStatus.Active,
    priority: TaskPriority.High,
    startDate: "",
    deadline: "",
    id: "id1",
    todoListId: "todolist1",
    order: 0,
    addedDate: "bla",
  };
  const endState: TasksState = tasksReducer(
    startState,
    updateTaskAC({
      task: newTask,
    })
  );
  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe("newTask");
  expect(endState[todolistId2][0].title).toBe("task3");
});

test("Remove tasks after remove todolist", () => {
  const action = removeTodolistAC({ todolistId: todolistId2 });
  const endState: TasksState = tasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistId2]).toBeUndefined();
});
