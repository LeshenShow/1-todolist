import type { RequestStatus } from "app/appSlice";
import type { FilterValuesType } from "common/types";

export type Todolist = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};
