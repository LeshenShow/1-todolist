import { Box } from "@mui/material";
import { FilterButton } from "common/components";
import { useAppDispatch } from "common/hooks";
import type { FilterValuesType } from "common/types";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { updateTodolistFilterAC } from "features/todolists/model/todolists-reducer";
import { filterButtonsContainerSx } from "./FilterTasksButtons.style";

export function FilterTasksButtons(props: Props) {
  const { todolist } = props;
  const dispatch = useAppDispatch();
  const changeTodolistFilter = (filter: FilterValuesType) => {
    dispatch(updateTodolistFilterAC({ id: todolist.id, filter }));
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
type Props = { todolist: DomainTodolist };