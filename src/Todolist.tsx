import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";

type PropsType = {
  title: string;
  todolistId: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  setTaskNewStatus: (
    taskId: string,
    newStatus: boolean,
    todolistId: string
  ) => void;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = (props: PropsType) => {
  const {
    title,
    todolistId,
    tasks,
    filter,
    removeTask,
    changeTodolistFilter,
    addTask,
    setTaskNewStatus,
    removeTodolist,
  } = props;
  const [taskTitle, setTaskTitle] = useState("");
  const [taskInputError, setTaskInputError] = useState(false);

  const addTaskHandler = () => {
    const trimmedTaskTitle = taskTitle.trim();
    trimmedTaskTitle
      ? addTask(trimmedTaskTitle, todolistId)
      : setTaskInputError(true);
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

  const changeTodolistFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter(filter, todolistId);
  };

  const setTaskNewStatusHandler = (
    taskId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => setTaskNewStatus(taskId, e.currentTarget.checked, todolistId);
  return (
    <div className="todolist">
      <h3>{title}</h3>
      <Button
        title="x"
        onClick={() => {
          removeTodolist(todolistId);
        }}
      />
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
              removeTask(task.id, todolistId);
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
          onClick={() => changeTodolistFilterHandler("all")}
        />
        <Button
          className={filter === "active" ? "btn-filter-active" : ""}
          title={"Active"}
          onClick={() => changeTodolistFilterHandler("active")}
        />
        <Button
          className={filter === "completed" ? "btn-filter-active" : ""}
          title={"Completed"}
          onClick={() => changeTodolistFilterHandler("completed")}
        />
      </div>
    </div>
  );
};
