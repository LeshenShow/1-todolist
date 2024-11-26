test("Add Task after Add Todolist", () => {
  const startTodolistsState: DomainTodolist[] = [];
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

test("Add Task after Add Todolist", () => {
  const newTodolist: DomainTodolist = {
    id: "todolist3",
    addedDate: "bla",
    order: 0,
    title: "newTodolist",
    filter: "all",
  };
  const action = addTodolistAC({ todolist: newTodolist });
  const endState: TasksState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find(key => key !== todolistId1 && key !== todolistId2);
  if (!newKey) {
    throw Error("error");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
