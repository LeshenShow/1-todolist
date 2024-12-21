import { Box } from "@mui/material";
import { FilterButton } from "common/components";
import { useAppDispatch } from "common/hooks";
import type { FilterValuesType } from "common/types";
import { todolistsApi } from "features/todolists/api/todolistsApi";
import type { DomainTodolist } from "features/todolists/api/todolistsApi.types";
import { filterButtonsContainerSx } from "./FilterTasksButtons.style";

export function FilterTasksButtons(props: Props) {
  const { todolist } = props;
  const dispatch = useAppDispatch();
  const changeTodolistFilter = (filter: FilterValuesType) => {
    // dispatch(updateTodolistFilter({ id: todolist.id, filter }));
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, state => {
        const index = state.findIndex(tl => tl.id === todolist.id);
        if (index !== -1) {
          state[index].filter = filter;
        }
      })
    );
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