import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
// import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from "@mui/material/Button";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import { FilterButton } from "./FilterButton";
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
  changeTodolistTitle: (title: string, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
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
    changeTodolistTitle,
    changeTaskTitle,
  } = props;
  // const [taskTitle, setTaskTitle] = useState("");
  // const [taskInputError, setTaskInputError] = useState(false);

  const addTaskHandler = (taskTitle: string) => {
    addTask(taskTitle, todolistId);
  };

  // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTaskTitle(event.currentTarget.value);
  //   taskInputError && setTaskInputError(false);
  // };

  // const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     addTaskHandler();
  //   }
  // };

  const changeTodolistFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter(filter, todolistId);
  };

  const setTaskNewStatusHandler = (
    taskId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTaskNewStatus(taskId, e.currentTarget.checked, todolistId);
  };
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(title, todolistId);
  };

  return (
    <div className="todolist">
      <div>
        <Typography align="center" variant="h6">
          <EditableSpan
            title={title}
            changeTitle={changeTodolistTitleHandler}
          />
          <IconButton
            aria-label="delete"
            onClick={() => {
              removeTodolist(todolistId);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
      </div>

      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId);
            };
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(task.id, title, todolistId);
            };
            return (
              <ListItem
                disablePadding
                key={task.id}
                // className={task.isDone ? "task-done" : "task"}
                sx={getListItemSx(task.isDone)}
              >
                <Box>
                  <Checkbox
                    checked={task.isDone}
                    onChange={(e) => {
                      setTaskNewStatusHandler(task.id, e);
                    }}
                  />

                  <EditableSpan
                    changeTitle={changeTaskTitleHandler}
                    title={task.title}
                  />
                </Box>
                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={filterButtonsContainerSx}>
        <FilterButton
          filter={filter}
          title="all"
          onClickHandler={() => changeTodolistFilterHandler("all")}
          activeFilterValue="all"
        />
        <FilterButton
          filter={filter}
          title="active"
          onClickHandler={() => changeTodolistFilterHandler("active")}
          activeFilterValue="active"
        />
        <FilterButton
          filter={filter}
          title="completed"
          onClickHandler={() => changeTodolistFilterHandler("completed")}
          activeFilterValue="completed"
        />
      </Box>
    </div>
  );
};
