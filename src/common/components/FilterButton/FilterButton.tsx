import { Button } from "@mui/material";
import type { FilterValuesType } from "common/types";

export const FilterButton = ({
  title,
  filter,
  activeFilterValue,
  onClickHandler,
}: Props) => {
  return (
    <Button
      size="small"
      variant="contained"
      color={filter === activeFilterValue ? "secondary" : "primary"}
      onClick={onClickHandler}>
      {title}
    </Button>
  );
};
type Props = {
  title: string;
  filter: FilterValuesType;
  activeFilterValue: FilterValuesType;
  onClickHandler: () => void;
};