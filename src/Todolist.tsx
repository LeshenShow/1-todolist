import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import { FilterButton } from "./FilterButton";
import { FilterValuesType, TaskType, TodolistType } from "./Main";
import { TodolistTitle } from "./TodolistTitle";
import { Tasks } from "./Tasks";

export const Todolist = (props: PropsType) => {
  const {
    todolist,
    tasks,
    removeTask,
    changeTodolistFilter,
    addTask,
    setTaskNewStatus,

    changeTaskTitle,
  } = props;
  const addTaskHandler = (taskTitle: string) => {
    addTask(taskTitle, todolist.id);
  };

  const changeTodolistFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter(todolist.id, filter);
  };

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <Box sx={filterButtonsContainerSx}>
        <FilterButton
          filter={todolist.filter}
          title="all"
          onClickHandler={() => changeTodolistFilterHandler("all")}
          activeFilterValue="all"
        />
        <FilterButton
          filter={todolist.filter}
          title="active"
          onClickHandler={() => changeTodolistFilterHandler("active")}
          activeFilterValue="active"
        />
        <FilterButton
          filter={todolist.filter}
          title="completed"
          onClickHandler={() => changeTodolistFilterHandler("completed")}
          activeFilterValue="completed"
        />
      </Box>
    </div>
  );
};
type PropsType = {
  tasks: TaskType[];
  todolist: TodolistType;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void;
  addTask: (title: string, todolistId: string) => void;
  setTaskNewStatus: (
    taskId: string,
    newStatus: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
};
