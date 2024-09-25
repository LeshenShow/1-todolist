import { useState } from "react";
import "./App.css";
import { data1, data2, Hw1 } from "./hw1/P.S-1/src/hw1";
import { Todolist } from "./Todolist";
import { PetApp } from "./pet-cube/PetApp";
import { v1 } from "uuid";

export type FilterValueType = "all" | "active" | "completed";
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: "1", title: "HTML&CSS", isDone: true },
    { id: "2", title: "JS", isDone: true },
    { id: "3", title: "ReactJS", isDone: false },
    { id: "4", title: "Redux", isDone: false },
    { id: "5", title: "Typescript", isDone: false },
    { id: "6", title: "RTK query", isDone: false },
  ]);
  const removeTask = (taskId: string) => {
    const nextState: TaskType[] = tasks.filter((t) => t.id !== taskId);
    setTasks(nextState);
  };
  const addTask = (title: string) => {
    const newTask: TaskType = { title: title, isDone: false, id: v1() };
    const copyState = [newTask, ...tasks];
    setTasks(copyState);
  };

  const [filter, setFilter] = useState<FilterValueType>("all");
  let filteredTasks: Array<TaskType> = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.isDone === true);
  }
  const changeFilter = (newFilter: FilterValueType) => {
    setFilter(newFilter);
  };
  return (
    <div className="App">
      <PetApp />
      {/* <Todolist
        title={`Learn`}
        tasks={filteredTasks}
        date={"10.09.2024"}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      /> */}
      {/* <Hw1 data={data1} />
      <Hw1 data={data2} /> */}
    </div>
  );
}
