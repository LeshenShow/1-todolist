import { useState } from "react";
import "./App.css";
import { data1, data2, Hw1 } from "./hw1/P.S-1/src/hw1";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";

export type FilterValueType = "all" | "active" | "completed";
export type TasksType = {
  id: number;
  title: string;
  isDone: boolean;
};

export function App() {
  const [tasks, setTasks] = useState<TasksType[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Typescript", isDone: false },
    { id: 6, title: "RTK query", isDone: false },
  ]);
  const removeTask = (taskId: number) => {
    const nextState: TaskType[] = tasks.filter((t) => t.id !== taskId);
    setTasks(nextState);
  };

  const [filter, setFilter] = useState<FilterValueType>("all");
  let filteredTasks: Array<TasksType> = tasks;
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
      <Todolist
        title={`Learn`}
        tasks={filteredTasks}
        date={"10.09.2024"}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      {/* <Hw1 data={data1} />
      <Hw1 data={data2} /> */}
    </div>
  );
}
