import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";

type PropsType = {
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
  setTaskNewStatus: (taskId: string, newStatus: boolean) => void;
};

export const Todolist = ({
  title,
  tasks,
  filter,
  removeTask,
  changeFilter,
  addTask,
  setTaskNewStatus,
}: PropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskInputError, setTaskInputError] = useState(false);

  const addTaskHandler = () => {
    const trimmedTaskTitle = taskTitle.trim();
    trimmedTaskTitle ? addTask(trimmedTaskTitle) : setTaskInputError(true);
    setTaskTitle("");
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
    taskInputError && setTaskInputError(false);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter);
  };

  const setTaskNewStatusHandler = (
    taskId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => setTaskNewStatus(taskId, e.currentTarget.checked);

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
          className={taskInputError ? "error" : ""}
        />

        <Button title={"+"} onClick={addTaskHandler} />
        {taskInputError && <div style={{ color: "red" }}>Enter value</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id);
            };

            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => {
                    setTaskNewStatusHandler(task.id, e);
                  }}
                />

                <span className={task.isDone ? "task-done" : "task"}>
                  {task.title}
                </span>
                <Button onClick={removeTaskHandler} title={"x"} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "btn-filter-active" : ""}
          title={"All"}
          onClick={() => changeFilterTasksHandler("all")}
        />
        <Button
          className={filter === "active" ? "btn-filter-active" : ""}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button
          className={filter === "completed" ? "btn-filter-active" : ""}
          title={"Completed"}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
