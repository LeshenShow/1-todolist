import { Button } from "@mui/material";
import type { FilterValuesType } from "../../../features/todolists/ui/Todolists/Todolist/Todolist";
 

type FilterButtonProps = {
  title: string;
  filter: FilterValuesType;
  activeFilterValue: FilterValuesType;
  onClickHandler: () => void;
};
export const FilterButton = ({
  title,
  filter,
  activeFilterValue,
  onClickHandler,
}: FilterButtonProps) => {
  return (
    <Button
      size="small"
      variant="contained"
      color={filter === activeFilterValue ? "secondary" : "primary"}
      onClick={onClickHandler}
    >
      {title}
    </Button>
  );
};
