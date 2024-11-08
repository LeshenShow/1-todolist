import { Box } from "@mui/material";
import { FilterButton } from "../../../../../../common/components/FilterButton/FilterButton";
import { useAppDispatch } from "../../../../../../common/hooks/useAddDispatch";
import { changeTodolistFilterAC } from "../../../../model/todolists-reducer";
import { FilterValuesType, TodolistType } from "../Todolist";
import { filterButtonsContainerSx } from "./FilterTasksButtons.style";

type FilterTasksButtonsProps = { todolist: TodolistType };
export function FilterTasksButtons(props: FilterTasksButtonsProps) {
  const { todolist } = props;
  const dispatch = useAppDispatch();
  const changeTodolistFilter = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id: todolist.id, filter }));
  };
  return (
    <Box sx={filterButtonsContainerSx}>
      <FilterButton
        filter={todolist.filter}
        title="all"
        onClickHandler={() => changeTodolistFilter("all")}
        activeFilterValue="all"
      />
      <FilterButton
        filter={todolist.filter}
        title="active"
        onClickHandler={() => changeTodolistFilter("active")}
        activeFilterValue="active"
      />
      <FilterButton
        filter={todolist.filter}
        title="completed"
        onClickHandler={() => changeTodolistFilter("completed")}
        activeFilterValue="completed"
      />
    </Box>
  );
}
