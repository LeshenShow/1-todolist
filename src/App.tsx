import "./App.css";
import { Exam1 } from "./Exams/exam1";
import { PetApp } from "./pet-cube/PetApp";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  const addTask = (title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };
  const setTaskNewStatus = (taskId: string, newStatus: boolean) => {
    const nextState: TaskType[] = tasks.map((t) =>
      t.id === taskId ? { ...t, isDone: newStatus } : t
    );
    setTasks(nextState);
  };
  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => !task.isDone);
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone);
  }

  return (
    <div className="App">
      <PetApp />
      <Todolist
        filter={filter}
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        setTaskNewStatus={setTaskNewStatus}
      />
      <Exam1 />
    </div>
  );
}

export default App;
