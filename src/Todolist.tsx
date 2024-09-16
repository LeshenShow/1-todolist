import { FilterValueType } from "./App";
import "./App.css";
import { Button } from "./Button";

export type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  date?: string;
  removeTask: (taskId: number) => void;
  changeFilter: (newFilter: FilterValueType) => void;
};
export type TaskType = { id: number; title: string; isDone: boolean };

export function Todolist(props: TodolistPropsType) {
  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input />
        <Button title={"+"} />
      </div>
      {props.tasks?.length === 0 ? (
        <p>Not Tasks</p>
      ) : (
        <ul>
          {props.tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>
                  <span>Delete</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div>{props.date}</div>
      <div>
        <Button
          title={"All"}
          onClickHandler={() => {
            props.changeFilter("all");
          }}
        />
        <Button
          title={"Active"}
          onClickHandler={() => {
            props.changeFilter("active");
          }}
        />
        <Button
          title={"Completed"}
          onClickHandler={() => {
            props.changeFilter("completed");
          }}
        />
      </div>
    </div>
  );
}
