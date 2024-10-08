import "./App.css";
// import { PetApp } from "./pet-cube/PetApp";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TaskStateType = { [todolistId: string]: TaskType[] };
function App() {
  const [todolists, setTodolists] = useState<TodolistType[]>([
    {
      id: v1(),
      title: "What to Learn",
      filter: "all",
    },
    {
      id: v1(),
      title: "What to buy",
      filter: "all",
    },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todolists[0].id]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolists[1].id]: [
      { id: v1(), title: "Beer", isDone: true },
      { id: v1(), title: "Cheeps", isDone: true },
      { id: v1(), title: "Milk", isDone: false },
    ],
  });

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
  };

  const changeTaskStatus = (
    taskId: string,
    taskStatus: boolean,
    todolistId: string
  ) => {
    const newTasks = tasks[todolistId].map((task) =>
      task.id === taskId ? { ...task, isDone: taskStatus } : task
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const changeTodolistFilter = (
    newFilter: FilterValuesType,
    todolistId: string
  ) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId
          ? { ...todolist, filter: newFilter }
          : todolist
      )
    );
  };

  const removeTodolist = (todolistId: string) => {
    const copyTasks = { ...tasks };
    delete copyTasks[todolistId];
    setTasks(copyTasks);
    const newTodolistId = todolistId;
    // delete tasks[newTodolistId];
    // debugger;
    const newState = todolists.filter(
      (todolist) => todolist.id !== newTodolistId
    );
    setTodolists(newState);
  };

  return (
    <div className="App">
      {/* <PetApp /> */}
      {todolists.map((todolist) => {
        let filteredTasks = tasks[todolist.id];
        if (todolist.filter === "active") {
          filteredTasks = filteredTasks.filter((task) => !task.isDone);
        }
        if (todolist.filter === "completed") {
          filteredTasks = filteredTasks.filter((task) => task.isDone);
        }
        return (
          <Todolist
            filter={todolist.filter}
            title={todolist.title}
            tasks={filteredTasks}
            todolistId={todolist.id}
            removeTask={removeTask}
            changeTodolistFilter={changeTodolistFilter}
            addTask={addTask}
            setTaskNewStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
